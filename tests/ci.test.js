/* Guards the CI wiring itself: a workflow must actually run the test suite,
   and the deploy workflow must actually gate its publish step on it — not
   just claim to in a comment. Parses the workflow YAML as text (no YAML
   library available), so keep the regexes tolerant of reasonable
   reformatting rather than pinned to exact whitespace. */
'use strict';
const { describe, test, ok, eq, match, includes, read, exists } = require('./harness');

const WORKFLOWS_DIR = '.github/workflows';

function workflowFiles() {
  const fs = require('fs');
  const path = require('path');
  const { ROOT } = require('./harness');
  return fs.readdirSync(path.join(ROOT, WORKFLOWS_DIR))
    .filter(f => /\.ya?ml$/.test(f))
    .sort();
}

/* Very small YAML-ish "jobs:" splitter: given full workflow text, return
   { jobId: jobBodyText } by slicing between top-level (2-space-indented)
   job keys under the "jobs:" block. Good enough for our own workflow files
   without pulling in a YAML parser. */
function splitJobs(src) {
  const jobsIdx = src.search(/^jobs:\s*$/m);
  ok(jobsIdx !== -1, 'workflow has a top-level jobs: block');
  const jobsBlock = src.slice(jobsIdx);
  const lines = jobsBlock.split('\n').slice(1); // drop "jobs:" itself
  const jobs = {};
  let currentId = null;
  let buf = [];
  for (const line of lines) {
    const m = line.match(/^  ([A-Za-z0-9_-]+):\s*$/);
    if (m) {
      if (currentId) jobs[currentId] = buf.join('\n');
      currentId = m[1];
      buf = [];
    } else if (currentId) {
      buf.push(line);
    }
  }
  if (currentId) jobs[currentId] = buf.join('\n');
  return jobs;
}

describe('CI: test suite is actually run', () => {
  const files = workflowFiles();

  test('a workflow file exists under .github/workflows', () => {
    ok(files.length > 0, 'expected at least one workflow file');
  });

  test('some workflow invokes node tests/run.js', () => {
    const hit = files.some(f => /node\s+tests\/run\.js/.test(read(`${WORKFLOWS_DIR}/${f}`)));
    ok(hit, `expected one of ${files.join(', ')} to run "node tests/run.js"`);
  });

  test('the test-running workflow triggers on push and pull_request (or is invoked by one that does)', () => {
    const withRunner = files.filter(f => /node\s+tests\/run\.js/.test(read(`${WORKFLOWS_DIR}/${f}`)));
    const hit = withRunner.some(f => {
      const src = read(`${WORKFLOWS_DIR}/${f}`);
      return /\bpush\s*:/.test(src) || /\bpush\s*$/m.test(src);
    });
    ok(hit, 'expected the workflow that runs the suite to trigger on push');
  });

  test('at least one workflow runs the suite on push without a branch allowlist', () => {
    // deploy-pages.yml legitimately keeps its branch-restricted push trigger
    // (it also runs the suite, as the deploy gate) — but a dedicated CI
    // workflow should run the suite on every branch, per CLAUDE.md's intent
    // of catching breakage before it ever reaches a deploy-triggering branch.
    const withRunner = files.filter(f => /node\s+tests\/run\.js/.test(read(`${WORKFLOWS_DIR}/${f}`)));
    const hit = withRunner.some(f => {
      const src = read(`${WORKFLOWS_DIR}/${f}`);
      const pushBlock = src.match(/\bpush\s*:\s*\n([\s\S]*?)(\n\S|\n\s*\n|$)/);
      return pushBlock ? !/branches\s*:/.test(pushBlock[1]) : /^\s*push\s*$/m.test(src);
    });
    ok(hit, `expected at least one of ${withRunner.join(', ')} to run the suite on push for all branches`);
  });

  test('setup-node is pinned to a current LTS major version, no install step assuming a lockfile', () => {
    const withRunner = files.filter(f => /node\s+tests\/run\.js/.test(read(`${WORKFLOWS_DIR}/${f}`)));
    for (const f of withRunner) {
      const src = read(`${WORKFLOWS_DIR}/${f}`);
      includes(src, 'actions/setup-node@v4', `${f} should use actions/setup-node@v4`);
      const nodeVersion = src.match(/node-version:\s*['"]?(\d+)/);
      ok(nodeVersion, `${f} should pin a node-version`);
      ok(Number(nodeVersion[1]) >= 18, `${f} node-version should be a current LTS (>=18)`);
      ok(!/npm\s+ci/.test(src), `${f} should not run npm ci (no package-lock.json in this repo)`);
    }
  });
});

describe('CI: deploy is gated on the tests, not just decorated with them', () => {
  test('deploy-pages.yml exists', () => {
    ok(exists(`${WORKFLOWS_DIR}/deploy-pages.yml`), 'expected .github/workflows/deploy-pages.yml');
  });

  const src = read(`${WORKFLOWS_DIR}/deploy-pages.yml`);
  const jobs = splitJobs(src);

  test('deploy-pages.yml still has a deploy job that publishes publish_dir: .', () => {
    ok(jobs.deploy, 'expected a "deploy" job in deploy-pages.yml');
    includes(jobs.deploy, 'peaceiris/actions-gh-pages@v4');
    includes(jobs.deploy, 'publish_dir: .');
  });

  test('the deploy job declares needs: on a job that runs the suite (the actual gate)', () => {
    const needsMatch = jobs.deploy.match(/needs\s*:\s*(\[[^\]]*\]|\S+)/);
    ok(needsMatch, 'expected deploy job to declare a "needs:" dependency — this is the gate itself; ' +
      'without it the workflow can define a test job that never blocks publishing');
    const needsRaw = needsMatch[1];
    const neededIds = needsRaw.startsWith('[')
      ? needsRaw.slice(1, -1).split(',').map(s => s.trim().replace(/['"]/g, '')).filter(Boolean)
      : [needsRaw.replace(/['"]/g, '')];
    ok(neededIds.length > 0, 'deploy needs: should name at least one job');
    const gateJobRunsTests = neededIds.some(id => jobs[id] && /node\s+tests\/run\.js/.test(jobs[id]));
    ok(gateJobRunsTests, `expected one of deploy's needs (${neededIds.join(', ')}) to be a job that runs node tests/run.js`);
  });

  test('deploy-pages.yml still triggers on push to main', () => {
    const pushBlock = src.match(/\bpush\s*:\s*\n([\s\S]*?)(\n\S|\n\s*\n|$)/);
    ok(pushBlock, 'expected a push: trigger block');
    match(pushBlock[1], /branches\s*:\s*\[[^\]]*\bmain\b[^\]]*\]/, 'expected main in the push branches list');
  });

  test('deploy-pages.yml keeps workflow_dispatch and the pages concurrency group', () => {
    includes(src, 'workflow_dispatch');
    match(src, /concurrency\s*:\s*\n\s*group\s*:\s*pages/, 'expected the pages concurrency group to be preserved');
  });

  test('deploy-pages.yml keeps the contents: write permission', () => {
    match(src, /permissions\s*:\s*\n\s*contents\s*:\s*write/, 'expected contents: write to be preserved');
  });
});

describe('CI: a dropped gate fails this suite (sanity-check the assertion itself)', () => {
  test('removing needs: from the deploy job would fail the gate test above', () => {
    const src = read(`${WORKFLOWS_DIR}/deploy-pages.yml`);
    const jobs = splitJobs(src);
    const withoutNeeds = jobs.deploy.replace(/needs\s*:\s*(\[[^\]]*\]|\S+)\s*\n?/, '');
    ok(!/needs\s*:/.test(withoutNeeds), 'test fixture sanity check: needs: should be removable for this simulation');
    const needsMatch = withoutNeeds.match(/needs\s*:\s*(\[[^\]]*\]|\S+)/);
    eq(needsMatch, null, 'a deploy job with needs: stripped must not appear gated');
  });
});
