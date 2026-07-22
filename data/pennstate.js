window.SCHOOLS = window.SCHOOLS || {};
window.SCHOOLS['pennstate'] = {
  id: 'pennstate', name: 'Penn State — University Park', short: 'Penn State', city: 'State College, PA',
  colors: { sc: '#1E407C', scDark: '#142d59' },
  locChip: '📍 State College, PA · ~3¼ hr from the northern Philadelphia suburbs',
  heroTitle: 'Penn State<br><span class="gold">Nittany Lions</span> at a glance',
  heroSub: "The in-state giant: 42,000 undergrads in Happy Valley, Big Ten football in a 106,000-seat stadium, the largest alumni network anywhere, and Smeal — a top-25 business school with the #1 supply-chain program — all at Pennsylvania resident tuition.",
  heroStats: [
    { b: '60.6%', s: 'acceptance rate, University Park (College Scorecard)' },
    { b: '42,284', s: 'undergrads — the biggest campus on this list by far' },
    { b: '$39,694', s: 'total IN-STATE cost/yr — resident tuition is the headline' },
    { b: '#1', s: 'supply chain (Smeal) · Big Ten everything' }
  ],
  visitCard: '<b>Visiting?</b> Book through admissions.psu.edu — tours depart from the Welcome Center (check your confirmation for building/parking). Do not leave without <b>Berkey Creamery</b> ice cream. ~3¼ hr drive via I-76/I-99.',
  contact: {
    maps: 'https://maps.google.com/?q=Penn+State+University+Park,+State+College,+PA',
    mapsLabel: 'University Park campus, State College',
    tel: '+18148655471', telLabel: '814-865-5471 (admissions)',
    email: 'admissions@psu.edu',
    tourUrl: 'https://admissions.psu.edu/visit/',
    siteUrl: 'https://www.psu.edu', siteLabel: 'psu.edu'
  },
  card: {
    type: 'State-related (PA in-state!)',
    blurb: 'Happy Valley at resident tuition: Big Ten scale, the largest alumni network anywhere, Smeal + #1 supply chain — and famously thin need aid.',
    accept: '60.6%', rank: 'Top 30 public', cost: '$39.7K in-state', sat: '1240–1420',
    undergrads: '42,284', biz: 'Smeal (AACSB, entrance-to-major)', placed: 'strong (Smeal reports high offers)',
    grad4: '86% (6-yr)', greek: 'Large system', sports: 'Big Ten · 106K stadium',
    drive: '~3¼ hr', deadlines: 'EA Nov 1 · rolling after'
  },
  sections: [
    {
      id: 'overview', nav: 'Overview', kicker: 'Overview', title: 'Quick facts',
      lead: "Penn State University Park is its own city in the middle of the state — \"Happy Valley\" — with the scale advantages (every major, every club, every employer recruiting) and scale costs (crowds, bureaucracy) that come with 42,000 undergrads. Note: it's \"state-related,\" not fully public — hence in-state tuition that's high for a public.",
      html: `
  <div class="cards g4">
    <div class="tile"><b>1855</b><span>founded; PA's land-grant university</span></div>
    <div class="tile"><b>106,572</b><span>Beaver Stadium seats — the White Out is a bucket-list sports event</span></div>
    <div class="tile"><b>92.6%</b><span>freshman retention · 86.1% graduation rate</span></div>
    <div class="tile"><b>#1</b><span>THON — the largest student-run philanthropy in the world (~$15M+/yr for pediatric cancer)</span></div>
    <div class="tile"><b>750K+</b><span>living alumni — the most powerful "network effect" on this list</span></div>
    <div class="tile"><b>$20,644</b><span>in-state tuition (Scorecard) — roughly half of any private here</span></div>
    <div class="tile"><b>1,000+</b><span>student organizations — everything exists at this scale</span></div>
    <div class="tile"><b>3¼ hr</b><span>drive from home across the PA Turnpike/I-99</span></div>
  </div>
  <div class="cards g2">
    <div class="card">
      <h3>🦁 Nittany Lion lore</h3>
      <ul>
        <li>The <b>Nittany Lion Shrine</b> is the most-photographed spot in Pennsylvania higher ed.</li>
        <li><b>"We Are… Penn State"</b> — the chant traces to the 1940s team that refused to bench its Black players for a segregated opponent.</li>
        <li><b>Berkey Creamery</b> — the largest university creamery in the country; Ben &amp; Jerry took its ice cream course. One scoop rule: no mixing flavors.</li>
        <li>THON weekend (46-hour no-sitting dance marathon) is the emotional center of the school year.</li>
      </ul>
    </div>
    <div class="card">
      <h3>⭐ Notable alumni</h3>
      <ul>
        <li>The network is the celebrity: 750K+ alumni with famously strong hiring loyalty</li>
        <li><b>Saquon Barkley, Micah Parsons</b> — recent NFL stars</li>
        <li><b>John Urschel</b> — NFL lineman turned MIT mathematician</li>
        <li><b>Keegan-Michael Key</b> — comedian (MFA)</li>
        <li>CEOs across supply chain, energy, and engineering — Smeal's specialty lanes</li>
      </ul>
    </div>
  </div>`
    },
    {
      id: 'admissions', nav: 'Admissions', kicker: 'Admissions', title: 'Getting in',
      lead: "University Park admits ~60% with an enrolled SAT band around 1240–1420 (Scorecard) — an attainable target for a solid student. The quirks: Penn State weighs GPA heavily (no essay required for most applicants), runs Early Action Nov 1 then rolling, and admission to University Park vs. a branch campus (2+2 pathway) is the real fork.",
      html: `
  <div class="cards g4">
    <div class="tile"><b>60.6%</b><span>acceptance rate, University Park (system-wide is higher)</span></div>
    <div class="tile"><b>1240–1420</b><span>SAT middle 50% (Scorecard); test-optional in recent cycles</span></div>
    <div class="tile"><b>92.6%</b><span>freshman retention</span></div>
    <div class="tile"><b>86.1%</b><span>graduate within 6 years</span></div>
    <div class="tile"><b>Nov 1</b><span>Early Action deadline — decisions by late December</span></div>
    <div class="tile"><b>Rolling</b><span>after EA; applying early matters at a capacity-managed campus</span></div>
    <div class="tile"><b>GPA-first</b><span>Penn State historically weights the transcript ~2/3 of the decision</span></div>
    <div class="tile"><b>2+2 offer?</b><span>a branch-campus offer (start elsewhere, finish at UP) is common for borderline UP applicants — evaluate it as its own thing</span></div>
  </div>
  <div class="cards g2">
    <div class="card">
      <h3>📋 How Penn State reads applications</h3>
      <p>Transcript-dominated and formulaic by big-school necessity: GPA and rigor carry roughly two-thirds of the weight, with test scores (optional) and activities filling the rest. No teacher recommendations required. Apply EA by Nov 1 — University Park fills up, and later applicants increasingly get the 2+2 branch-campus offer instead.</p>
    </div>
    <div class="card">
      <h3>🚪 Smeal's entrance-to-major gate</h3>
      <p>Business students enter as <b>pre-majors</b> and formally enter Smeal after ~4 semesters via <b>entrance-to-major requirements</b> — required courses plus a GPA bar that floats with demand (competitive majors like finance have historically needed well above the minimum; verify current cutoffs). Translation: admission to Penn State is not yet admission to a Smeal major — the first two years keep the pressure on. Ask for current ETM GPA cutoffs by major on the tour.</p>
    </div>
  </div>`
    },
    {
      id: 'costs', nav: 'Costs & Aid', kicker: 'Costs & Aid', title: 'What it costs in-state',
      lead: "Here's the two-sided truth: Pennsylvania resident tuition makes the sticker the second-cheapest on this list — but Penn State's need-based aid is famously thin (PA ranks near the bottom nationally in per-student support), so the discount off that sticker is small. What you see is close to what you pay.",
      html: `
  <div class="chart">
    <h3>Sticker cost of attendance (in-state, latest reported)</h3>
    <div class="sub">Per year on campus — College Scorecard figures. Out-of-state roughly doubles tuition ($41,790).</div>
    <div class="crow">
      <div class="lbl"><span>Penn State (PA resident)</span><span class="tot">$39,694</span></div>
      <div class="bar-h" role="img" aria-label="Penn State in-state: tuition and fees about $20,644, housing and food about $14,474, books and other remainder, total about $39,694">
        <div class="seg s1" style="width:52%" data-tip="Tuition &amp; fees — ~$20,644 (in-state)"><i>~$20,644</i></div>
        <div class="seg s2" style="width:36.5%" data-tip="Housing &amp; food — ~$14,474"><i>~$14,474</i></div>
        <div class="seg s3" style="width:11.5%" data-tip="Books, travel &amp; personal — remainder"><i></i></div>
      </div>
    </div>
    <div class="legend">
      <span><b style="background:var(--mark-1)"></b>Tuition &amp; fees (in-state)</span>
      <span><b style="background:var(--mark-2)"></b>Housing &amp; food</span>
      <span><b style="background:var(--ink-3)"></b>Books, travel &amp; personal</span>
    </div>
    <p class="src">Actual average net price by income (official): &lt;$30K → $19.8K · $30–48K → $20.0K · $48–75K → <b>$25.7K</b> · $75–110K → $31.8K · $110K+ → $37.8K. Read that first row again — that's the thin-aid story in one number.</p>
  </div>
  <div class="cards g2" style="margin-top:16px">
    <div class="card">
      <h3>🎓 Aid reality check</h3>
      <ul>
        <li><b>FAFSA-only</b> — one-parent income counts (good for this family's structure)</li>
        <li>But need aid is modest: even sub-$30K-income families average ~$20K/yr net — Penn State discounts less than any school here</li>
        <li>Merit (Provost/Discover awards) exists but is smaller and scarcer than Delaware's or Pitt's</li>
        <li><b>PA State Grant applies</b> (in-state school) and stacks on top</li>
      </ul>
    </div>
    <div class="card">
      <h3>💵 Debt &amp; payoff</h3>
      <ul>
        <li>Median debt: <b>$25,000</b>; PA students historically graduate with some of the nation's higher debt loads because of the thin-aid structure</li>
        <li>Median earnings 10 years after entry: <b>$63,435</b> — the lowest of the eight, diluted by the huge major mix; Smeal outcomes run well above it</li>
        <li>The in-state value case vs. Delaware-with-merit is closer than you'd guess — run both numbers</li>
      </ul>
    </div>
  </div>`
    },
    {
      id: 'business', nav: 'Business', kicker: 'Business', title: 'Smeal College of Business',
      lead: "Smeal is a top-25-caliber AACSB business school with ~5,000+ undergrads, the nation's #1-reputation supply chain program, and the Nittany Lion Fund — a student-run fund managing real money at a scale few schools match. The catch is the entrance-to-major gate covered above.",
      html: `
  <div class="cards g4">
    <div class="tile"><b>#1</b><span>supply chain &amp; information systems — the crown jewel, elite employer pipeline</span></div>
    <div class="tile"><b>~$10M+</b><span>Nittany Lion Fund — student-managed investment fund (finance's proving ground)</span></div>
    <div class="tile"><b>Top 25</b><span>overall undergrad business reputation (AACSB)</span></div>
    <div class="tile"><b>ETM</b><span>entrance-to-major after ~4 semesters — GPA gate varies by major</span></div>
  </div>
  <div class="cards g2">
    <div class="card">
      <h3>🏢 What stands out</h3>
      <ul>
        <li>Majors: finance, accounting, marketing, management, risk management, real estate, corporate innovation, and the famous <b>supply chain</b> track</li>
        <li>Career fairs at Penn State scale — hundreds of employers, heavy Big 4/F500 supply-chain/ops recruiting</li>
        <li>The alumni network is the placement engine: Penn Staters hire Penn Staters, everywhere</li>
        <li>Smeal's published placement/salary stats run strong (verify the current class report on tour)</li>
      </ul>
    </div>
    <div class="card">
      <h3>⚖️ Honest caveats</h3>
      <ul>
        <li><b>The ETM gate is real stress:</b> two years of GPA pressure before your major is locked; hot majors have historically required well above the floor</li>
        <li>Intro classes are huge; Smeal cohort feel arrives junior year, not day one</li>
        <li>Finance placement skews regional/F500 rather than bulge-bracket NYC (though NLF alumni do break through)</li>
      </ul>
    </div>
  </div>`
    },
    {
      id: 'outcomes', nav: 'Outcomes', kicker: 'After graduation', title: 'Hiring & outcomes',
      lead: "Scale cuts both ways: the whole-university numbers look mid, the network and the business-school outcomes run better.",
      html: `
  <div class="cards g4">
    <div class="tile"><b>$63,435</b><span>median 10-yr earnings, all majors (Scorecard) — Smeal runs above this</span></div>
    <div class="tile"><b>86.1%</b><span>graduation rate · 92.6% retention</span></div>
    <div class="tile"><b>$25,000</b><span>median debt at graduation</span></div>
    <div class="tile"><b>750K+</b><span>alumni — the hiring network that shows up in every industry</span></div>
  </div>
  <div class="cards g2">
    <div class="card">
      <h3>💼 Where business grads land</h3>
      <ul>
        <li>Supply chain: the elite lane — Amazon, P&amp;G, Dell, J&amp;J, and every F500 ops org recruit Smeal SCIS by name</li>
        <li>Accounting/finance: Big 4 (Philadelphia and national offices), corporate finance programs, regional banking</li>
        <li>The career fair scale means everyone gets at-bats; standing out is the student's job</li>
      </ul>
    </div>
    <div class="card">
      <h3>🎓 Worth asking on tour</h3>
      <ul>
        <li>Current ETM GPA cutoffs by major (especially finance) and what happens to students who miss them</li>
        <li>Smeal's latest placement rate and median salary by major</li>
        <li>How Nittany Lion Fund selection works and what its alumni placement looks like</li>
      </ul>
    </div>
  </div>`
    },
    {
      id: 'studentlife', nav: 'Student Life', kicker: "Who's on campus", title: 'Student body & campus life',
      lead: "Official demographics from College Scorecard — note this is the only school on the list with a male majority. Culture: football-and-THON scale spirit, a big Greek system with a heavily reformed rulebook, and a college town that exists because the university does.",
      html: `
  <div class="chart">
    <h3>Undergraduate demographics</h3>
    <div class="sub">42,284 undergrads at University Park (College Scorecard, latest).</div>
    <div class="crow tight">
      <div class="lbl"><span>Gender</span><span class="tot">52.6% men · 47.4% women</span></div>
      <div class="bar-h" role="img" aria-label="Gender: 52.6 percent men, 47.4 percent women">
        <div class="seg s1" style="width:52.6%" data-tip="Men — 52.6%"><i>Men 52.6%</i></div>
        <div class="seg s2" style="width:47.4%" data-tip="Women — 47.4%"><i>Women 47.4%</i></div>
      </div>
    </div>
    <div class="crow tight" style="margin-top:20px">
      <div class="lbl"><span>White</span><span class="tot">62.7%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:100%;flex:none" data-tip="White — 62.7%"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Hispanic / Latino</span><span class="tot">9.3%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:14.8%;flex:none" data-tip="Hispanic/Latino — 9.3%"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>International</span><span class="tot">9.3%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:14.8%;flex:none" data-tip="International — 9.3%"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Asian</span><span class="tot">7.6%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:12.1%;flex:none" data-tip="Asian — 7.6%"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Black / African American</span><span class="tot">4.5%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:7.2%;flex:none" data-tip="Black — 4.5%"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Two or more races</span><span class="tot">4.1%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:6.5%;flex:none" data-tip="Two or more — 4.1%"><i></i></div></div>
    </div>
    <p class="src">Bars scaled to the largest group.</p>
  </div>
  <div class="cards g2" style="margin-top:16px">
    <div class="card">
      <h3>🎉 Party scene: reputation vs. reality</h3>
      <p>Perennially ranked among the nation's top party schools — game-day Saturdays, apartment parties along Beaver Ave, and a bar scene built for 40,000 students. Like Delaware, opting out is possible (1,000+ clubs), but the ambient culture is loud and proud. State College's isolation concentrates it: the town IS the weekend.</p>
    </div>
    <div class="card">
      <h3>🏛️ Greek life: big, reformed</h3>
      <p>One of the country's larger Greek systems, operating under strict university oversight since the 2017 Piazza tragedy forced sweeping reforms (deferred rush, monitoring, sanctions). It's a major social lane but no longer an unsupervised one — worth asking students how the rules feel in practice.</p>
    </div>
    <div class="card">
      <h3>🏈 Sports = the identity</h3>
      <p><b>Big Ten everything.</b> The White Out at 106,572-seat Beaver Stadium is one of the best atmospheres in American sports; wrestling is a dynasty; hockey, hoops, and volleyball draw real crowds. If game-day culture is a deciding factor, nothing else on this list competes.</p>
    </div>
    <div class="card">
      <h3>💪 For a gym regular (PF member's guide)</h3>
      <p>Campus recreation runs multiple facilities (the IM Building complex got a major modern renovation) — included with fees, sized for 42,000. And yes, State College has a <b>Planet Fitness</b> minutes from campus, so the Black Card keeps working. Crowds at 5pm are a fact of life at this scale.</p>
    </div>
  </div>`
    },
    {
      id: 'proscons', nav: 'Pros & Cons', kicker: 'The balance sheet', title: 'Pros & cons',
      lead: 'Compiled from official data and the public record.',
      html: `
  <div class="cards g2">
    <div class="pc pros">
      <h3>Pros</h3>
      <ul>
        <li>In-state tuition<small>~$20.6K tuition — half of any private on this list before aid even starts</small></li>
        <li>The alumni network<small>750K+ Penn Staters with legendary hiring loyalty — the best pure network here</small></li>
        <li>Smeal + #1 supply chain<small>Top-25 business school with an elite specialty lane and a $10M student fund</small></li>
        <li>Unmatched school spirit<small>The White Out, THON, Happy Valley — peak American college experience</small></li>
        <li>Everything exists<small>Every major, club, sport, and employer at 42,000-student scale</small></li>
        <li>FAFSA-only<small>One-parent income counts for aid — right structure for this family</small></li>
        <li>Closest big-campus option<small>3¼ hours — day-trippable for games and move-ins</small></li>
      </ul>
    </div>
    <div class="pc cons">
      <h3>Cons</h3>
      <ul>
        <li>Thin need-based aid<small>Even low-income families average ~$20K/yr net — the sticker barely bends</small></li>
        <li>The ETM gate<small>Two years of GPA pressure before a Smeal major is locked; hot majors demand high GPAs</small></li>
        <li>Scale mechanics<small>Huge lectures, stretched advising, bureaucracy — the classic megaversity trade</small></li>
        <li>Geographic isolation<small>Happy Valley is 3+ hours from everywhere; internships mostly wait for summer</small></li>
        <li>Party culture is ambient<small>Top-party-school rankings are earned; quieter students must build their own lane</small></li>
        <li>Lowest measured earnings of the eight<small>$63.4K median at 10 years (all majors — Smeal runs higher)</small></li>
      </ul>
    </div>
  </div>`
    },
    {
      id: 'criticisms', nav: 'Criticisms', kicker: 'Straight talk', title: 'Criticisms & feedback, in detail',
      lead: 'What to probe on a Penn State tour.',
      html: `
  <div class="cards g2">
    <div class="card">
      <h3>💸 The aid gap</h3>
      <p>Pennsylvania ranks near the bottom nationally in per-student higher-ed funding, and it shows: Penn State's net price barely drops for low-income families. For this family the in-state sticker is the plan, not a starting point for discounts — budget accordingly and stack the PA State Grant.</p>
    </div>
    <div class="card">
      <h3>🚪 ETM anxiety</h3>
      <p>The entrance-to-major system is the #1 stress theme among Penn State business students: a bad sophomore semester can reroute a career plan. Ask Smeal advising for current cutoffs, the appeal process, and what actually happens to students who miss finance's bar.</p>
    </div>
    <div class="card">
      <h3>🗺️ The 2+2 fork</h3>
      <p>Many applicants get offered a branch campus start instead of University Park. It's a legitimate path (same degree), but it's a different college experience for two years — decide in advance whether a 2+2 offer would be a yes or a no, so it doesn't decide itself.</p>
    </div>
    <div class="card">
      <h3>🏛️ Scale &amp; system news</h3>
      <p>Penn State has been consolidating branch campuses and wrestling with budgets — statewide news more than University Park news, but ask how advising and class availability are being protected. At 42,000 undergrads, "you're a number until you make yourself known" is the honest baseline.</p>
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
        <dt>Admissions</dt><dd>Book at admissions.psu.edu/visit — confirmation names the check-in building and visitor parking (campus parking decks; allow extra time, the campus is enormous)</dd>
        <dt>By car</dt><dd>~3¼ hr from the northern Philadelphia suburbs (PA Turnpike → US-322/I-99)</dd>
        <dt>Plan the day</dt><dd>This campus needs a full day: tour + Smeal + stadium + Creamery + downtown</dd>
        <dt>Game-day trick</dt><dd>If possible, do the formal tour on a weekday and come back for a football Saturday — they're different planets and he should see both</dd>
      </dl>
      <div class="mapbtns">
        <a class="btn" href="https://maps.google.com/?q=Penn+State+University+Park,+State+College,+PA" rel="noopener">Open in Google Maps</a>
        <a class="btn alt" href="https://admissions.psu.edu/visit/" rel="noopener">Book a tour</a>
      </div>
    </div>
    <div class="card">
      <h3>🏛️ Don't-miss campus stops</h3>
      <ul>
        <li><b>The Nittany Lion Shrine</b> — the photo</li>
        <li><b>Old Main</b> — the lawn and frescoes</li>
        <li><b>Beaver Stadium</b> — even empty, the scale lands</li>
        <li><b>Business Building</b> — Smeal's home; ask about the trading room and NLF</li>
        <li><b>Berkey Creamery</b> — mandatory; one flavor per cone, no mixing</li>
        <li><b>The HUB</b> — the student union that feels like an airport terminal (in a good way)</li>
      </ul>
    </div>
  </div>
  <div class="note">💡 <b>Good tour questions for a business kid:</b> What are the current entrance-to-major GPA cutoffs for finance and supply chain? What percent of pre-majors make their first-choice major? How early can freshmen join business clubs and the career fair circuit?</div>`
    },
    {
      id: 'nearby', nav: 'Nearby', kicker: 'Around town', title: 'State College & nearby',
      lead: '"Happy Valley" is the archetypal college town — the university and the town are the same organism.',
      html: `
  <div class="cards g3">
    <div class="card"><h3>🍦 Berkey Creamery</h3><p>The country's largest university creamery — the single mandatory stop of the entire eight-school tour.</p></div>
    <div class="card"><h3>🍕 College Ave &amp; Beaver Ave</h3><p>The downtown strip: pizza institutions, diners (the Waffle Shop), bars, and Penn State merch on every corner.</p></div>
    <div class="card"><h3>⛰️ Mount Nittany</h3><p>The hike overlooking the valley — a rite of passage with the stadium view.</p></div>
    <div class="card"><h3>🌳 The Arboretum</h3><p>Beautiful gardens at the campus edge — the quiet counterweight to game day.</p></div>
    <div class="card"><h3>🏈 Football weekends</h3><p>107,000 people in a town of 42,000 — tailgates measured in square miles. See one before deciding anything.</p></div>
    <div class="card"><h3>🚗 The drive</h3><p>3¼ hours of Pennsylvania — far enough to feel away, close enough for a long-weekend pickup.</p></div>
  </div>`
    },
    {
      id: 'timeline', nav: 'Timeline', kicker: 'Planning ahead', title: 'Timeline for a rising high-school junior',
      lead: 'Applying in fall 2027 for fall 2028 entry.',
      html: `
  <ul class="tl">
    <li><span class="when">Now — summer 2026</span><b>Visit, including a football Saturday if possible</b><span>The scale is the whole question here — he'll know within hours whether 42,000 feels like energy or anonymity.</span></li>
    <li><span class="when">Fall 2026 (junior year)</span><b>GPA above all</b><span>Penn State's formula-ish review weights the transcript ~2/3. A strong GPA also pre-positions him for Smeal's ETM gate later.</span></li>
    <li><span class="when">Spring 2027</span><b>SAT + budget math</b><span>1300+ strengthens the UP (vs. branch) odds. Price the real cost: in-state sticker minus PA grant, not much else.</span></li>
    <li><span class="when">Summer 2027</span><b>Application prep</b><span>No essay/recs needed for most applicants — this one is quick; have the self-reported grades ready.</span></li>
    <li><span class="when">Nov 1, 2027</span><b>Early Action deadline</b><span>Apply EA — UP seats go early, and late applicants drift toward 2+2 offers. Decide the branch-campus question in advance.</span></li>
    <li><span class="when">Dec 2027 – spring 2028</span><b>Decision &amp; compare</b><span>EA decisions land by late December — likely his first admit. Compare against Delaware/Pitt with net-cost math.</span></li>
    <li><span class="when">May 1, 2028</span><b>Decision day</b><span>If Penn State wins, housing signup moves fast — East Halls is the classic freshman start.</span></li>
  </ul>`
    },
    {
      id: 'sources', nav: 'Sources', kicker: 'Fine print', title: 'Sources & notes',
      lead: "Stats pulled deterministically from official federal data via the repo's fetch script; editorial content compiled July 2026. Verify details with official Penn State pages.",
      html: `
  <div class="card">
    <ul style="font-size:13.5px">
      <li><b>College Scorecard (U.S. Dept. of Education)</b> — acceptance rate, SAT band, enrollment, demographics, costs, net price by income, debt, earnings; refreshed via <code>scripts/fetch_school_data.py</code> → <code>data/generated/scorecard.json</code></li>
      <li><a href="https://admissions.psu.edu/" rel="noopener">Penn State Undergraduate Admissions</a> — deadlines, EA policy, visit booking</li>
      <li><a href="https://www.smeal.psu.edu/" rel="noopener">Smeal College of Business</a> — majors, entrance-to-major requirements (verify current cutoffs), Nittany Lion Fund</li>
      <li>Reddit sentiment mining for r/PennStateUniversity is queued — culture notes here are reputation-level; the ETM stress theme is widely documented</li>
    </ul>
  </div>`
    }
  ]
};
