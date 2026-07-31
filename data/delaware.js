window.SCHOOLS = window.SCHOOLS || {};
window.SCHOOL_ORDER = ['delaware', 'pennstate', 'pitt', 'rutgers', 'ohiostate', 'michiganstate', 'indiana', 'southcarolina', 'umass', 'fordham', 'northeastern', 'tufts', 'bu'];

window.SCHOOLS['delaware'] = {
  id: 'delaware',
  name: 'University of Delaware',
  short: 'Delaware',
  city: 'Newark, DE',
  colors: { sc: '#00539F', scDark: '#003d75' },
  locChip: '📍 Newark, Delaware · ~1¼ hr from the northern Philadelphia suburbs',
  heroTitle: 'University of Delaware<br><span class="gold">Blue Hens</span> at a glance',
  heroSub: 'A flagship-scale public research university on a classic brick-and-green campus that borders a walkable college-town Main Street — with a nationally accredited business school and one of the strongest school-spirit cultures in the region.',
  heroStats: [
    { b: '74.1%', s: 'acceptance rate (Fall 2025)' },
    { b: '#88', s: 'U.S. News National Universities (2026) · #43 Top Public' },
    { b: '24,564', s: 'total students · 19,385 undergrad (Fall 2025)' },
    { b: '$65,884', s: 'out-of-state total cost/yr (2026–27, before aid)' }
  ],
  visitCard: '<b>Visiting?</b> Tours start at the <b>Visitors Center, 210 South College Ave, Newark, DE 19716</b> · Visitor Lot 41 is next door (pay via Passport app) · From I-95 take Exit 1 (DE-896 N) · 302-831-8123',
  contact: {
    maps: 'https://maps.google.com/?q=210+South+College+Ave,+Newark,+DE+19716',
    mapsLabel: '210 S College Ave · Visitor Lot 41',
    tel: '+13028318123', telLabel: '302-831-8123 · Mon–Fri 8:30–4:30',
    email: 'admissions@udel.edu',
    tourUrl: 'https://www.udel.edu/apply/undergraduate-admissions/plan-your-visit/',
    siteUrl: 'https://www.udel.edu', siteLabel: 'udel.edu'
  },
  card: {
    type: 'Public (state-assisted)',
    blurb: 'Big-spirit public with a walkable Main Street, direct-admit AACSB business school, and merit money for out-of-state students.',
    accept: '74.1%', rank: '#88', cost: '$65.9K OOS', sat: '1220–1370',
    undergrads: '19,385', biz: 'Lerner (AACSB, direct admit)', placed: '94%',
    grad4: '74%', greek: '20% M · 25% W', sports: 'D1 FBS · Conf. USA',
    drive: '~1¼ hr', deadlines: 'EA Nov 1 · RD Jan 15'
  },
  sections: [
    {
      id: 'overview', nav: 'Overview', kicker: 'Overview', title: 'Quick facts',
      lead: "UD is Delaware's largest university — technically a privately chartered, state-assisted institution — with R1 (top-tier) research status and a student body that is nearly two-thirds out-of-state, drawing heavily from PA, NJ, NY, and MD. The campus sits about 5 miles from the Pennsylvania border.",
      html: `
  <div class="cards g4">
    <div class="tile"><b>1743</b><span>founding roots; among the oldest in the U.S.</span></div>
    <div class="tile"><b>13:1</b><span>student–faculty ratio · 58% of classes under 30 students</span></div>
    <div class="tile"><b>65%</b><span>of students come from out of state</span></div>
    <div class="tile"><b>$2.3B</b><span>endowment (June 2025)</span></div>
    <div class="tile"><b>150+</b><span>majors · 400+ student organizations</span></div>
    <div class="tile"><b>R1</b><span>highest research activity classification</span></div>
    <div class="tile"><b>1923</b><span>invented U.S. study abroad — 100+ programs today, ~1 in 3 students go</span></div>
    <div class="tile"><b>FBS</b><span>football moved up to FBS / Conference USA in 2025</span></div>
  </div>
  <div class="cards g2">
    <div class="card">
      <h3>🐔 Blue Hen lore</h3>
      <ul>
        <li><b>Why "Blue Hens"?</b> Revolutionary War soldiers of the Delaware Regiment carried fighting gamecocks bred from a famous blue hen — their grit earned them the nickname "Blue Hens' Chickens." The Blue Hen is now Delaware's state bird.</li>
        <li><b>YoUDee</b>, the mascot (debuted 1993), is in the Mascot Hall of Fame and has a sibling mascot, Baby Blue.</li>
        <li>Memorial Hall's carillon plays the fight song and alma mater across The Green.</li>
      </ul>
    </div>
    <div class="card">
      <h3>⭐ Notable alumni</h3>
      <ul>
        <li><b>Joe Biden</b> — 46th U.S. President (BA 1965); campus hosts the Biden Institute</li>
        <li><b>Joe Flacco</b> — Super Bowl XLVII MVP quarterback</li>
        <li><b>Elena Delle Donne</b> — WNBA MVP; chose Delaware over UConn</li>
        <li><b>Chris Christie</b> — New Jersey Governor (BA 1984)</li>
        <li><b>Rich Gannon</b> — NFL MVP quarterback</li>
      </ul>
    </div>
  </div>`
    },
    {
      id: 'admissions', nav: 'Admissions', kicker: 'Admissions', title: 'Getting in',
      lead: 'UD is moderately selective and friendly to strong B+/A students. Grades and course rigor matter most; test scores are optional (only ~1 in 5 admitted students submitted the SAT). It uses the Common App, has non-binding Early Action, and no Early Decision.',
      html: `
  <div class="cards g4">
    <div class="tile"><b>74.1%</b><span>acceptance rate, Fall 2025 (69.2% in Fall 2024)</span></div>
    <div class="tile"><b>1220–1370</b><span>SAT middle 50% of enrolled students (median 1300)</span></div>
    <div class="tile"><b>28–32</b><span>ACT middle 50% (median 30)</span></div>
    <div class="tile"><b>3.98</b><span>average high-school GPA (weighted scale as reported)</span></div>
    <div class="tile"><b>92%</b><span>freshman retention rate</span></div>
    <div class="tile"><b>74%</b><span>graduate in 4 years · 82.6% in 6</span></div>
    <div class="tile"><b>Nov 1</b><span>Early Action deadline (non-binding) · decision by Jan 31</span></div>
    <div class="tile"><b>Jan 15</b><span>Regular Decision deadline · rolling decisions</span></div>
  </div>
  <div class="cards g2">
    <div class="card">
      <h3>📋 What UD weighs most</h3>
      <p>From UD's official Common Data Set, the "very important" factors are:</p>
      <div class="chips"><span class="chip">Course rigor</span><span class="chip">GPA</span><span class="chip">State residency</span></div>
      <p>Essay, recommendation, extracurriculars, and talent are "considered." Out-of-state applicants were admitted at essentially the same rate as Delawareans in Fall 2024 (70.0% vs 70.7%), so PA residency is not a practical disadvantage. Test-optional: scores are considered only if submitted.</p>
    </div>
    <div class="card">
      <h3>📚 Required high-school prep</h3>
      <p>18 units: 4 English · 3 math · 3 science (2 lab) · 2 foreign language · 2 social studies · 2 history · 2 academic electives. Application fee $75 (Common App; fee waivers available). One recommendation + essay required.</p>
      <p style="margin-top:8px"><b>Honors College:</b> considered with the regular application — smaller seminar-style courses, Honors housing, and priority registration. About 90% of Honors students finish in 4 years. Top invited students compete for the full-ride Distinguished Scholar awards.</p>
    </div>
  </div>`
    },
    {
      id: 'costs', nav: 'Costs & Aid', kicker: 'Costs & Aid', title: 'What it costs from Pennsylvania',
      lead: 'Pennsylvania has no tuition reciprocity with Delaware, so a PA family pays the out-of-state rate. The main discount lever is merit aid: every out-of-state applicant is automatically reviewed for scholarships of roughly $8,500–$15,000 per year — no separate application.',
      html: `
  <div class="chart">
    <h3>Sticker cost of attendance, 2026–27</h3>
    <div class="sub">Per year, on campus, before any aid — official UD cost-of-attendance figures. Hover a segment for exact amounts.</div>
    <div class="crow">
      <div class="lbl"><span>Out-of-state (PA resident)</span><span class="tot">$65,884</span></div>
      <div class="bar-h" role="img" aria-label="Out-of-state: tuition and fees $45,020, housing and food $16,614, books and other $4,250, total $65,884">
        <div class="seg s1" style="width:68.3%" data-tip="Tuition &amp; fees — $45,020"><i>$45,020</i></div>
        <div class="seg s2" style="width:25.2%" data-tip="Housing &amp; food — $16,614"><i>$16,614</i></div>
        <div class="seg s3" style="width:6.5%" data-tip="Books, travel &amp; personal — $4,250"><i></i></div>
      </div>
    </div>
    <div class="crow">
      <div class="lbl"><span>In-state (for comparison)</span><span class="tot">$39,154</span></div>
      <div class="bar-h" role="img" aria-label="In-state: tuition and fees $18,290, housing and food $16,614, books and other $4,250, total $39,154">
        <div class="seg s1" style="width:27.8%;flex:none" data-tip="Tuition &amp; fees — $18,290"><i>$18,290</i></div>
        <div class="seg s2" style="width:25.2%;flex:none" data-tip="Housing &amp; food — $16,614"><i>$16,614</i></div>
        <div class="seg s3" style="width:6.5%;flex:none" data-tip="Books, travel &amp; personal — $4,250"><i></i></div>
      </div>
    </div>
    <div class="legend">
      <span><b style="background:var(--mark-1)"></b>Tuition &amp; fees</span>
      <span><b style="background:var(--mark-2)"></b>Housing &amp; food</span>
      <span><b style="background:var(--ink-3)"></b>Books, travel &amp; personal ($4,250)</span>
    </div>
    <p class="src">Note: business (Lerner), engineering, nursing, and Honors students pay an additional differential tuition surcharge. In-state bars drawn to the same dollar scale.</p>
  </div>
  <div class="cards g2" style="margin-top:16px">
    <div class="card">
      <h3>🎓 Merit scholarships (out-of-state, automatic review)</h3>
      <div class="tscroll"><table>
        <tr><th>Award</th><th>Per year</th></tr>
        <tr><td>UD Trustee Scholarship</td><td>$12,500–$15,000</td></tr>
        <tr><td>UD Presidential Scholarship</td><td>$10,000–$12,000</td></tr>
        <tr><td>UD Provost Scholarship</td><td>$8,500–$12,000</td></tr>
        <tr><td>Delaware Scholar Award</td><td>$6,500–$7,500</td></tr>
        <tr><td>Blue Hen Scholarship</td><td>$1,500–$2,500</td></tr>
      </table></div>
      <p style="margin-top:8px">Renewable up to 8 semesters. UD no longer publishes hard cutoffs, but historically the top tier tracked with roughly top-5%-of-class profiles. The invitation-only Eugene du Pont Distinguished Scholar award covers full tuition, room &amp; board, and fees.</p>
    </div>
    <div class="card">
      <h3>💵 Aid, debt &amp; payoff</h3>
      <ul>
        <li>~73% of students receive grants or scholarships (avg ≈ $14,100); 60% of freshmen get need-based aid (avg grant ≈ $15,900)</li>
        <li>Median federal student debt at graduation: <b>$24,572</b> (≈ $261/mo)</li>
        <li>Median earnings 10 years after entry: <b>$72,950</b> (College Scorecard)</li>
        <li>Housing: only the <b>first year</b> is required on campus (~$16,614 with dining); shared off-campus houses in Newark typically run $400–800/person/month</li>
        <li>Realistic OOS net with a mid-tier merit award: roughly <b>$51K–57K/yr</b> — comparable to Penn State's out-of-state neighbors but above PA in-state options</li>
      </ul>
      <div class="rq">"Unless you receive a significant scholarship, you shouldn't be attending UD — tuition for out-of-staters is too high." … vs. "He got merit for University of Delaware which brought the cost down to the low $30s."<b>— r/udel &amp; r/ApplyingToCollege (archived threads) — the classic debate; merit aid is the swing factor</b></div>
    </div>
  </div>`
    },
    {
      id: 'business', nav: 'Business', kicker: 'Business', title: 'Alfred Lerner College of Business & Economics',
      lead: 'Lerner is AACSB-accredited in both business <em>and</em> accounting (a distinction held by fewer than 6% of business schools worldwide) with about 3,900 undergrads across 18 majors. Freshmen are admitted <b>directly into their business major</b> — or can choose "Business Undeclared" (about 30% do) and sample fields before declaring by sophomore year.',
      html: `
  <div class="cards g4">
    <div class="tile"><b>#88</b><span>U.S. News undergrad business (of 533) · WSJ #14 public school for high-paying finance jobs</span></div>
    <div class="tile"><b>92–95%</b><span>employed or in grad school within 6 months</span></div>
    <div class="tile"><b>$67.5–70K</b><span>median starting salary, recent classes</span></div>
    <div class="tile"><b>18</b><span>undergrad majors + 21 minors + 4+1 master's options</span></div>
  </div>
  <div class="cards g2">
    <div class="card">
      <h3>🚀 Standout hands-on features</h3>
      <ul>
        <li><b>Geltzeiler Trading Center</b> — a real-time, Bloomberg-terminal trading floor used in finance, accounting, and MIS courses (ask to see it on the tour)</li>
        <li><b>Blue Hen Investment Club</b> — students manage a real multi-million-dollar equity portfolio</li>
        <li><b>Vita Nova</b> — student-run fine-dining restaurant (hospitality program)</li>
        <li>Recruiting pipeline into JPMorgan Chase, Goldman Sachs, Deloitte, EY, PwC, KPMG, Vanguard, BlackRock — helped by proximity to Wilmington's banking hub and Philly/NYC</li>
      </ul>
    </div>
    <div class="card">
      <h3>📈 The 18 majors</h3>
      <div class="chips">
        <span class="chip">Finance</span><span class="chip">Accounting</span><span class="chip">Marketing</span><span class="chip">Management</span><span class="chip">Entrepreneurship</span><span class="chip">Business Analytics</span><span class="chip">Fintech</span><span class="chip">Sport Management</span><span class="chip">Economics (BA/BS)</span><span class="chip">MIS</span><span class="chip">Operations</span><span class="chip">Global Business</span><span class="chip">Financial Planning &amp; Wealth Mgmt</span><span class="chip">CS &amp; Business</span><span class="chip">Hospitality (2 tracks)</span><span class="chip">Economics Education</span><span class="chip">Business Undeclared</span>
      </div>
      <p>About 30% of Lerner students start as <b>Business Undeclared</b> and explore before committing — the full course path is below.</p>
    </div>
  </div>
  <div class="card" style="margin-top:14px">
    <h3>🧭 Business Undeclared → declared: the actual course path</h3>
    <ul class="tl" style="margin-top:14px">
      <li><span class="when">Year 1</span><b>Shared start — no major decision needed</b><span><b>BUAD 110 Basics of Business</b> (the first-year experience course every Lerner freshman takes) + ECON 101 &amp; 103 (micro/macro) + MATH 221 Calculus + ENGL 110 + university breadth courses.</span></li>
      <li><span class="when">Year 2</span><b>Business core ramps up · declaration deadline</b><span>ACCT 207/208 (financial &amp; managerial accounting), statistics (MATH 201/202), MISY 160 &amp; 261 (business computing/info systems), COMM 212 business communication, FINC 311 Principles of Finance. <b>Declare by Oct 1 of sophomore year</b> — before that deadline, switching into nearly any Lerner major (finance, accounting, marketing, analytics, MIS, sport management…) is <b>guaranteed, with no GPA gate</b>, via a form in UDSIS. After it, most majors require a 3.0 GPA. Entrepreneurship is the one exception: a separate, selective application.</span></li>
      <li><span class="when">Years 3–4</span><b>Major courses + capstone → done in 4</b><span>BUAD 301 Marketing, BUAD 306 Operations, BUAD 309 Organizational Behavior, then major-specific courses, finishing with the <b>BUAD 441 Strategic Management capstone</b> senior year. ~120–121 credits total, C- or better required in core courses, plus one Discovery Learning Experience (internship, co-op, or study abroad). Four years is the normal finish; 4+1 master's options add a fifth year for an M.S./MBA (or the 150 hours accountants need for the CPA).</span></li>
    </ul>
    <div class="rq">"Career fairs each semester, ton of recruiting from Big 4 firms and IB roles. If you're looking to stay in the Delaware/Philly area postgrad you'll be competitive." … "Lerner is what you make it — if you want to push yourself there are a lot of ways to do that."<b>— r/udel students, "Is Lerner worth it?" (archived thread)</b></div>
  </div>`
    },
    {
      id: 'outcomes', nav: 'Outcomes', kicker: 'After graduation', title: 'Hiring rates & outcomes',
      lead: 'UD tracks graduates six months out using the national NACE First-Destination survey model. "Placed" below means employed or enrolled in further education within six months of graduation.',
      html: `
  <div class="cards g4">
    <div class="tile"><b>94%</b><span>of all UD grads placed within 6 months (university-wide)</span></div>
    <div class="tile"><b>95%</b><span>of Lerner business grads placed (Class of 2024)</span></div>
    <div class="tile"><b>$70,000</b><span>average starting salary, Lerner Class of 2024</span></div>
    <div class="tile"><b>$72,950</b><span>median earnings 10 years after entry, all UD (College Scorecard)</span></div>
  </div>
  <div class="chart" style="margin-top:16px">
    <h3>Business majors: hiring rate &amp; mean starting salary</h3>
    <div class="sub">Class of 2025, six months after graduation — Lerner's official per-major figures. Bars show salary; "placed" = employed or in grad school.</div>
    <div class="crow">
      <div class="lbl"><span>Accounting · 97% placed</span><span class="tot">$79,306</span></div>
      <div class="bar-h" role="img" aria-label="Accounting: 97 percent placed, mean starting salary $79,306">
        <div class="seg s1" style="width:100%" data-tip="Accounting — $79,306 · 97% placed"><i>$79,306</i></div>
      </div>
    </div>
    <div class="crow">
      <div class="lbl"><span>Finance · 95% placed</span><span class="tot">$69,327</span></div>
      <div class="bar-h" role="img" aria-label="Finance: 95 percent placed, mean starting salary $69,327">
        <div class="seg s1" style="width:87.4%;flex:none" data-tip="Finance — $69,327 · 95% placed"><i>$69,327</i></div>
      </div>
    </div>
    <div class="crow">
      <div class="lbl"><span>Business Analytics · 94% placed</span><span class="tot">$66,800</span></div>
      <div class="bar-h" role="img" aria-label="Business Analytics: 94 percent placed, mean starting salary $66,800">
        <div class="seg s1" style="width:84.2%;flex:none" data-tip="Business Analytics — $66,800 · 94% placed"><i>$66,800</i></div>
      </div>
    </div>
    <div class="crow">
      <div class="lbl"><span>Marketing · 91% placed</span><span class="tot">$61,056</span></div>
      <div class="bar-h" role="img" aria-label="Marketing: 91 percent placed, mean starting salary $61,056">
        <div class="seg s1" style="width:77%;flex:none" data-tip="Marketing — $61,056 · 91% placed"><i>$61,056</i></div>
      </div>
    </div>
    <div class="crow">
      <div class="lbl"><span>Management · 88% placed</span><span class="tot">$60,210</span></div>
      <div class="bar-h" role="img" aria-label="Management: 88 percent placed, mean starting salary $60,210">
        <div class="seg s1" style="width:75.9%;flex:none" data-tip="Management — $60,210 · 88% placed"><i>$60,210</i></div>
      </div>
    </div>
    <p class="src">Economics (Class of 2024): 100% of BA and BS grads placed; mean starting salary $68,304 (BS) / $57,110 (BA, 3-year averages). Salaries are means of survey respondents and vary with role and city.</p>
  </div>
  <div class="cards g2" style="margin-top:16px">
    <div class="card">
      <h3>💼 How business grads land jobs</h3>
      <ul>
        <li>83.6% of Lerner's Class of 2024 had a job within <b>three</b> months; 41% received signing bonuses averaging <b>$8,573</b></li>
        <li>Top employers by major: <b>Accounting</b> — KPMG, EY, PwC, Deloitte, RSM · <b>Finance</b> — JPMorgan Chase, Goldman Sachs, Vanguard, Citi, TD, SEI · <b>Marketing</b> — PepsiCo, Amazon, PayPal, URBN · <b>Analytics</b> — BlackRock, Bank of America, Deloitte</li>
        <li>Common first roles: financial analyst, audit associate, investment analyst, business analyst, marketing analyst, leadership-development-program associate</li>
        <li>Wilmington's banking hub (20 min away) and the Philly–NYC corridor drive much of the recruiting pipeline</li>
      </ul>
    </div>
    <div class="card">
      <h3>🎓 Grad school &amp; the long run</h3>
      <ul>
        <li>Whole-university placement (94%) and WSJ's #26 overall / #10 public ranking both weigh graduate outcomes heavily</li>
        <li>Lerner 4+1 accelerated master's options let strong students add an M.S. or MBA in one extra year — accounting students often use it to reach the 150 credit hours needed for CPA licensure</li>
        <li>Lerner master's grads: ~97% placement with average salaries around $91K–96K</li>
        <li>Median federal debt at graduation ($24,572) vs. a ~$70K business starting salary is a favorable ratio — the payback math is one of UD's stronger selling points</li>
      </ul>
    </div>
  </div>`
    },
    {
      id: 'studentlife', nav: 'Student Life', kicker: "Who's on campus", title: 'Student body & campus life',
      lead: "Official demographics from UD's Fall 2024 Common Data Set, plus the social scene as students actually describe it — quoted lines come from archived r/udel threads.",
      html: `
  <div class="chart">
    <h3>Undergraduate demographics</h3>
    <div class="sub">18,332 degree-seeking undergrads, Fall 2024 (Common Data Set). 64% come from out of state.</div>
    <div class="crow tight">
      <div class="lbl"><span>Gender</span><span class="tot">60.6% women · 39.4% men</span></div>
      <div class="bar-h" role="img" aria-label="Gender: 60.6 percent women, 39.4 percent men">
        <div class="seg s1" style="width:60.6%" data-tip="Women — 11,103 students (60.6%)"><i>Women 60.6%</i></div>
        <div class="seg s2" style="width:39.4%" data-tip="Men — 7,229 students (39.4%)"><i>Men 39.4%</i></div>
      </div>
    </div>
    <div class="crow tight" style="margin-top:20px">
      <div class="lbl"><span>White</span><span class="tot">67.6%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:100%;flex:none" data-tip="White, non-Hispanic — 12,398 (67.6%)"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Hispanic / Latino</span><span class="tot">10.2%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:15.1%;flex:none" data-tip="Hispanic/Latino — 1,878 (10.2%)"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Black / African American</span><span class="tot">6.1%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:9%;flex:none" data-tip="Black/African American — 1,125 (6.1%)"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Asian</span><span class="tot">5.6%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:8.3%;flex:none" data-tip="Asian — 1,021 (5.6%)"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Two or more races</span><span class="tot">5.2%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:7.7%;flex:none" data-tip="Two or more races — 956 (5.2%)"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>International</span><span class="tot">3.3%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:4.9%;flex:none" data-tip="International — 596 (3.3%)"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Unknown / other</span><span class="tot">2.0%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:3%;flex:none" data-tip="Unknown or other — 358 (2.0%)"><i></i></div></div>
    </div>
    <p class="src">Bars scaled to the largest group. The first-year class skews even more female (61%).</p>
  </div>
  <div class="cards g2" style="margin-top:16px">
    <div class="card">
      <h3>🎉 Party scene: reputation vs. reality</h3>
      <p>The reputation is earned — Princeton Review's #1 party school in 2018, still Niche's #40 of ~1,500 today, with a culture of frat parties, "darties," and Main Street bars. It's <b>not a dry campus</b>, but rules are tight: alcohol only for 21+ in their own residence-hall room, with pong tables and funnels banned in dorms.</p>
      <div class="rq">"Tons of drinking and crazy parties." … but also: "I'm not a party person and I haven't been to one — you can honestly choose to be heavily involved or not involved at all."<b>— r/udel students (archived threads)</b></div>
    </div>
    <div class="card">
      <h3>🏛️ Greek life</h3>
      <p><b>20% of men and 25% of women</b> join one of <b>62 chapters</b> (29 fraternities, 13 sororities, 13 multicultural, 7 special-interest). Freshmen <b>can't rush in the fall</b> — eligibility requires 12 UD credits and a 2.50 GPA, so first rush is spring of freshman year, which gives new students a semester to settle in first.</p>
      <div class="rq">"Greek life is easy to find but also very easy to avoid; you have to be looking for it." … "Was part of Greek life and it was just so annoying. It's like a job, honestly."<b>— r/udel, "Greek life" thread (archived)</b></div>
    </div>
    <div class="card">
      <h3>🏈 Blue Hens sports</h3>
      <p><b>21+ varsity programs</b>, now anchored in <b>Conference USA</b> — football made the jump to FBS in 2025 (14 programs moved to CUSA; others compete as affiliates, e.g. lacrosse in the A-10/ASUN). Football claims <b>6 national titles</b>; field hockey won the <b>2016 NCAA championship</b>; alumni include Joe Flacco and Elena Delle Donne. Game days at 18,500-seat Delaware Stadium come with a serious tailgating tradition — UD out-drew every other FCS program for a decade. Beyond varsity: <b>37 club teams</b> and intramural leagues with 5,400+ players a year.</p>
    </div>
    <div class="card">
      <h3>💪 For a gym regular (PF member's guide)</h3>
      <p>The <b>Carpenter Sports Building — "the Little Bob"</b> — is a 167,000 sq ft rec center (post-$25M renovation): a three-floor strength/cardio center, rooftop indoor track, pool, climbing wall, CrossFit box, and racquetball courts. <b>Access is included in the student fee</b> — just swipe your student ID. Satellite gyms in Independence Hall (North Campus) and Harrington round it out.</p>
      <div class="rq">"Yes the gym at UD is phenomenal. I wouldn't waste time with another membership elsewhere. Best gym I've ever been to, frankly." … "Absolutely crowded [at peak]; only times it's not are weekends and Friday nights."<b>— r/udel gym threads (archived)</b></div>
      <p style="margin-top:10px">And yes — there's a <b>Planet Fitness 2 miles from campus</b> (53 Marrows Rd, Brookside Plaza, ~5-min drive; 24 hrs on weekdays). A PF Black Card works at any location, so an existing membership doubles as an off-peak/late-night backup and works back home on breaks.</p>
    </div>
  </div>
  <div class="card" style="margin-top:14px">
    <h3>🧾 The Reddit consensus, distilled</h3>
    <ul>
      <li><b>"Worth it out-of-state?"</b> is the eternal r/udel debate — the consistent answer: a great choice <em>with merit money</em> ("merit brought the cost down to the low $30s"), think hard at full sticker ("tuition for out-of-staters is too high").</li>
      <li><b>Party school:</b> real, but genuinely avoidable — the counterweight is the 400+ clubs, which is also how non-Greek students say they found their people.</li>
      <li><b>Lerner:</b> respected regionally — strong Big 4/banking pipeline in the Delaware–Philly corridor; students place it in the same tier as Penn State or JMU business.</li>
      <li><b>Dorms are bimodal:</b> Redding (Honors), Caesar Rodney, and Sharp get praise (AC, renovated); Russell and older East-campus halls mean fans in September and shared bathrooms.</li>
      <li><b>Most-complained-about services:</b> academic advising and the shuttle buses — by a wide margin. <b>Most positive surprise:</b> safety ("I am a woman who attends UD and have never felt unsafe on campus").</li>
    </ul>
    <p class="src">Sentiment from archived r/udel and r/ApplyingToCollege threads (2018–2025) — real posts, but anecdotes, not statistics.</p>
  </div>`
    },
    {
      id: 'proscons', nav: 'Pros & Cons', kicker: 'The balance sheet', title: 'Pros & cons',
      lead: 'Compiled from Niche student reviews (Overall grade A, 3.73/5 across ~3,900 reviews), Princeton Review, news coverage, and official data.',
      html: `
  <div class="cards g2">
    <div class="pc pros">
      <h3>Pros</h3>
      <ul>
        <li>Beautiful, classic campus<small>Georgian brick buildings around The Green — routinely called one of the prettiest campuses in the region</small></li>
        <li>Main Street is right on campus<small>A genuinely walkable college town with dozens of restaurants and shops</small></li>
        <li>Direct admit to business majors<small>No cutthroat secondary admission process into Lerner, plus AACSB dual accreditation</small></li>
        <li>Strong career outcomes<small>92–95% placement; Big 4 and major-bank recruiting; Wilmington banking hub 20 min away</small></li>
        <li>Study-abroad pioneer<small>Invented U.S. study abroad in 1923; 100+ programs, ~1 in 3 students participate</small></li>
        <li>Big-school spirit, D1 athletics<small>Football just moved up to FBS (Conference USA); Niche Athletics grade A</small></li>
        <li>Real research opportunities<small>R1 university with undergrad research access</small></li>
        <li>Easy reach from southeastern PA<small>~1¼ hr drive; SEPTA regional rail connects Newark to Philadelphia</small></li>
        <li>Merit money for out-of-state students<small>Automatic scholarship review, up to ~$15K/yr</small></li>
      </ul>
    </div>
    <div class="pc cons">
      <h3>Cons</h3>
      <ul>
        <li>Out-of-state sticker price<small>~$66K/yr all-in; no PA reciprocity — cost is the #1 recurring complaint in reviews</small></li>
        <li>Party-school reputation<small>Princeton Review's #1 party school in 2018; social scene can revolve around drinking and Greek life</small></li>
        <li>Greek life carries the social scene<small>Students who don't rush sometimes report feeling left out</small></li>
        <li>Dorms are hit-or-miss<small>Niche grade B-; some halls lack air conditioning; housing only guaranteed freshman year</small></li>
        <li>Big intro classes &amp; weed-outs<small>Some 100+ person lectures; uneven instructor quality in intro courses</small></li>
        <li>University budget pressures<small>$250M COVID-era gap with layoffs; more recent projected shortfalls and hiring freezes</small></li>
        <li>Everyday frictions<small>Parking is a chronic gripe; dining reviews are lukewarm; advising can feel impersonal at this scale</small></li>
      </ul>
    </div>
  </div>`
    },
    {
      id: 'criticisms', nav: 'Criticisms', kicker: 'Straight talk', title: 'Criticisms & feedback, in detail',
      lead: 'The things worth probing on a tour — sourced from student review sites, the campus paper, and regional news.',
      html: `
  <div class="cards g2">
    <div class="card">
      <h3>🍺 Party culture — how real is it?</h3>
      <p>Princeton Review ranked UD the <b>#1 party school in America (2018)</b> and #3 the following year; later surveys still placed it top-10 for hard liquor and Greek life. Niche currently ranks the party scene #40 of ~1,600. Plenty of students opt out and find their own scene in 400+ clubs — but the reputation is earned, and it's fair to ask tour guides what non-party social life looks like.</p>
    </div>
    <div class="card">
      <h3>🏛️ Budget troubles</h3>
      <p>UD faced a <b>$250M pandemic-era budget gap</b> with over 120 layoffs, and as recently as FY2025 leadership projected $20–40M shortfalls with hiring freezes and paused capital projects. Worth asking how this affects class availability, advising staffing, and facilities in Lerner.</p>
    </div>
    <div class="card">
      <h3>🛏️ Dorms &amp; dining</h3>
      <p>Niche grades: Dorms <span class="grade">B-</span> Campus food <span class="grade">B+</span>. Recurring complaints: older halls without AC, distance from North Campus, and dining quality that "declines as the year goes on." Housing is guaranteed (and required) only for year one; most upperclassmen move to off-campus houses, which are usually cheaper.</p>
      <div class="rq">"Redding is the nicest freshman dorm there is — air conditioned, super nice lounges." … "No AC in Russell so definitely bring a fan or two." On food: "You will get bored of it… you just kinda survive," though "Pencader has the best dining — you can never go wrong with the custom burger and pizza station."<b>— r/udel dorm &amp; dining threads (archived)</b></div>
    </div>
    <div class="card">
      <h3>🚔 Safety picture</h3>
      <p>Niche Safety grade <span class="grade">B</span>; 76% of surveyed students report feeling very safe. Reported on-campus Clery incidents rose from 23 (2021) to 37 (2023) — a trend typical of large residential campuses, but reviewable in UD's public Clery report. UD Police is a full-service department; free campus shuttles run at night. Reddit sentiment here is notably positive: "UD and Delaware in general are safe… we just have property and drug/alcohol crimes with the odd fight."</p>
    </div>
    <div class="card">
      <h3>👩‍🏫 Academics — the fine print</h3>
      <p>RateMyProfessors averages ~4.0/5 school-wide, but with a wide spread — some intro STEM and math instructors rate very poorly, and science/math weed-out courses draw complaints. Smaller upper-level courses (58% of all sections are under 30 students) get much better reviews.</p>
    </div>
    <div class="card">
      <h3>🅿️ Logistics gripes</h3>
      <p>Parking is the most persistent everyday complaint — permits are limited and enforcement is aggressive. Advising quality is mixed at this scale; students who use Lerner's dedicated career services report better experiences than those relying on general advising. The campus shuttle system draws similar fire.</p>
      <div class="rq">"For a university this size, the shuttle system is truly terrible." … "My assigned advisor never responds to my emails." … "There is no free parking in Newark/UD — the city uses the scarcity of parking as one of its largest money makers."<b>— r/udel (archived threads)</b></div>
    </div>
  </div>`
    },
    {
      id: 'visit', nav: 'Visit', kicker: 'On the ground', title: 'Campus & visit logistics',
      lead: '',
      html: `
  <div class="cards g2">
    <div class="card">
      <h3>🧭 Getting there &amp; checking in</h3>
      <dl class="dl">
        <dt>Visitors Center</dt><dd>210 South College Ave, Newark, DE 19716 · 302-831-8123 · admissions@udel.edu</dd>
        <dt>Parking</dt><dd>Visitor Lot 41, adjacent to the Visitors Center — pay with the Passport mobile app</dd>
        <dt>Directions</dt><dd>I-95 to Exit 1 (DE-896 North) → becomes South College Ave; you'll pass Delaware Stadium on the way in</dd>
        <dt>By train</dt><dd>Newark (Carper) Station is a few blocks from campus — SEPTA regional rail to Philadelphia on weekdays, limited Amtrak</dd>
      </dl>
      <div class="mapbtns">
        <a class="btn" href="https://maps.google.com/?q=210+South+College+Ave,+Newark,+DE+19716" rel="noopener">Open in Google Maps</a>
        <a class="btn alt" href="https://maps.apple.com/?q=210+South+College+Ave+Newark+DE+19716" rel="noopener">Apple Maps</a>
      </div>
    </div>
    <div class="card">
      <h3>🏛️ Don't-miss campus stops</h3>
      <ul>
        <li><b>The Green</b> — the historic heart; the classic UD photo op</li>
        <li><b>Memorial Hall</b> — 1925 WWI memorial; listen for the carillon</li>
        <li><b>Lerner Hall / Purnell</b> — ask to see the <b>Geltzeiler Trading Center</b></li>
        <li><b>Trabant &amp; Perkins</b> — the two student centers (food courts, bookstore)</li>
        <li><b>Morris Library</b> — main library on the Green</li>
        <li><b>Delaware Stadium &amp; Bob Carpenter Center</b> — 18,500-seat FBS home field</li>
        <li><b>UD Botanic Gardens</b> — free, self-guided, on South Campus</li>
      </ul>
    </div>
  </div>
  <div class="note">💡 <b>Good tour questions for a future business major:</b> How does Business Undeclared → major declaration work in practice? What percent of finance majors get internships through the Trading Center and Lerner Career Services? How hard is it to get into the Blue Hen Investment Club? What does the Lerner differential tuition add per year?</div>`
    },
    {
      id: 'nearby', nav: 'Nearby', kicker: 'Around town', title: 'Newark & nearby',
      lead: 'Newark (pop. ~30,000 — pronounced "new-ARK," unlike the NJ one) is a true college town: about a third of residents are in their twenties, and Main Street runs right along campus.',
      html: `
  <div class="cards g3">
    <div class="card"><h3>🍦 UDairy Creamery</h3><p>Ice cream made from the university's own dairy herd — the classic campus-visit stop. Main St café at 83 E Main St, plus the flagship creamery by the farm on South Campus.</p></div>
    <div class="card"><h3>🍻 Deer Park Tavern</h3><p>Landmark 1851 tavern on the National Register, famed for nachos and its Edgar Allan Poe lore. A five-minute walk from campus.</p></div>
    <div class="card"><h3>🍝 Caffe Gelato</h3><p>Upscale Northern Italian on Main Street with artisan gelato — the "parents' weekend dinner" spot.</p></div>
    <div class="card"><h3>🌳 White Clay Creek State Park</h3><p>37 miles of hiking/biking trails bordering campus and town. $8 out-of-state vehicle fee in season; open 8 a.m. to sunset.</p></div>
    <div class="card"><h3>🛍️ Main Street</h3><p>Dozens of restaurants, coffee shops (Brew HaHa!, The Greenhouse), and shops — the nightly social artery of the school. Also: Delaware has <b>no sales tax</b>.</p></div>
    <div class="card"><h3>🚆 Day-trip radius</h3><p>Wilmington 12 mi (~20 min) · Philadelphia ~45 mi (~50 min) · Baltimore ~55 mi (~1 hr) · Washington DC ~100 mi · Rehoboth Beach ~88 mi (~1¾ hr).</p></div>
  </div>`
    },
    {
      id: 'timeline', nav: 'Timeline', kicker: 'Planning ahead', title: 'Timeline for a rising high-school junior',
      lead: "Applying in fall 2027 for fall 2028 entry — here's how the next 18 months line up.",
      html: `
  <ul class="tl">
    <li><span class="when">Now — summer 2026</span><b>Campus visits &amp; course planning</b><span>Make sure junior-year schedule hits UD's required prep: 4 English, 3 math, 3 science with labs, 2 foreign language. Rigor is UD's #1 factor.</span></li>
    <li><span class="when">Fall 2026 (junior year)</span><b>PSAT/NMSQT in October</b><span>Baseline for SAT planning. Keep grades up — junior year weighs heaviest.</span></li>
    <li><span class="when">Spring 2027</span><b>First SAT/ACT sitting</b><span>UD is test-optional, but a 1300+ SAT strengthens merit-scholarship odds. Retake in fall if needed.</span></li>
    <li><span class="when">Summer 2027</span><b>Essay + Common App</b><span>Common App opens Aug 1. Draft the essay early; line up one teacher recommendation.</span></li>
    <li><span class="when">Nov 1, 2027</span><b>Early Action deadline</b><span>Non-binding — apply EA for the earliest decision (by Jan 31) and full merit consideration. Choose a Lerner major or Business Undeclared on the application.</span></li>
    <li><span class="when">Jan–Apr 2028</span><b>Compare offers</b><span>Merit awards arrive with admission. Regular Decision closes Jan 15 as a backup window.</span></li>
    <li><span class="when">May 1, 2028</span><b>Decision day</b><span>National reply deadline. Deposit, then housing sign-up (freshman year on campus is required and guaranteed).</span></li>
  </ul>`
    },
    {
      id: 'sources', nav: 'Sources', kicker: 'Fine print', title: 'Sources & notes',
      lead: 'Data compiled July 2026 from public sources. Figures change annually — verify with official UD pages before making decisions.',
      html: `
  <div class="card">
    <ul style="font-size:13.5px">
      <li><a href="https://ire.udel.edu/quick-facts/" rel="noopener">UD Quick Facts 2025–26</a> and the <a href="https://bpb-us-w2.wpmucdn.com/sites.udel.edu/dist/e/2019/files/2025/07/CDS2425_UDelaware.pdf" rel="noopener">UD Common Data Set 2024–25</a> — enrollment, admission stats, class sizes, retention/graduation</li>
      <li><a href="https://www.udel.edu/apply/undergraduate-admissions/" rel="noopener">UD Undergraduate Admissions</a> — deadlines, requirements, <a href="https://www.udel.edu/apply/undergraduate-admissions/plan-your-visit/" rel="noopener">visit planning</a>, and <a href="https://www.udel.edu/apply/undergraduate-admissions/financing-your-degree/out-of-state-freshmen/" rel="noopener">out-of-state scholarships</a></li>
      <li><a href="https://www.udel.edu/students/sfs/" rel="noopener">UD Student Financial Services</a> — official 2026–27 cost of attendance</li>
      <li><a href="https://lerner.udel.edu/" rel="noopener">Lerner College</a> — majors, quick facts, Trading Center, and per-major Class of 2025 hiring/salary data from the individual <a href="https://lerner.udel.edu/programs/undergraduate-programs/majors/" rel="noopener">major pages</a></li>
      <li><a href="https://www.udel.edu/apply/career-outcomes/" rel="noopener">UD Career Outcomes dashboard</a> (NACE first-destination data) and <a href="https://www.udel.edu/udaily/2024/september/wsj-wall-street-journal-college-pulse-rankings/" rel="noopener">UDaily</a> — university-wide 94% six-month placement</li>
      <li><a href="https://www.usnews.com/best-colleges/university-of-delaware-1431" rel="noopener">U.S. News</a> (2026 edition rankings) · <a href="https://www.niche.com/colleges/university-of-delaware/" rel="noopener">Niche</a> (grades &amp; ~3,900 student reviews) · <a href="https://collegescorecard.ed.gov/" rel="noopener">College Scorecard</a> (debt &amp; earnings)</li>
      <li>News: UDaily, The Review (campus paper), Newark Post, Delaware Business Times, ESPN (FBS move), Princeton Review party-school rankings coverage</li>
      <li>Demographics &amp; Greek participation: UD Common Data Set 2024–25 (Sections B and F1); chapters and rush rules from UD Fraternity &amp; Sorority Leadership &amp; Learning; athletics from UDaily, bluehens.com, and Conference USA; Business Undeclared path from Lerner advising (my.lerner.udel.edu) and UD catalog checksheets; recreation facilities from rec.bluehens.com</li>
      <li>Student-voice quotes: archived Reddit threads (r/udel, r/ApplyingToCollege, 2018–2025) retrieved via the Pullpush archive — real posts lightly trimmed for length; treat as anecdotes, not statistics</li>
    </ul>
  </div>
  <div class="note">📱 <b>Add this to your home screen:</b> in Safari tap Share → "Add to Home Screen"; in Chrome tap ⋮ → "Add to Home Screen." The page works offline once loaded — handy on a spotty-signal campus walk.</div>`
    }
  ]
};
