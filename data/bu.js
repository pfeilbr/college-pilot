window.SCHOOLS = window.SCHOOLS || {};
window.SCHOOLS['bu'] = {
  id: 'bu', name: 'Boston University', short: 'BU', city: 'Boston, MA',
  colors: { sc: '#CC0000', scDark: '#8f0000' },
  locChip: '📍 Boston, MA · ~5–6 hr drive from the northern Philadelphia suburbs',
  heroTitle: 'Boston University<br><span class="gold">Terriers</span> at a glance',
  heroSub: 'A huge, energetic private university strung along Commonwealth Avenue in the heart of Boston — a top-20 undergrad business school (Questrom), 100%-of-need aid for domestic students, hockey-mad school spirit, and a campus that IS the city.',
  heroStats: [
    { b: '12.8%', s: 'acceptance rate (Fall 2025 · 76,776 applications)' },
    { b: '#42', s: 'U.S. News National Universities (2026)' },
    { b: '18,289', s: 'undergrads · 36,977 total students' },
    { b: '$94,427', s: 'total sticker cost/yr (2025–26, before aid)' }
  ],
  visitCard: '<b>Visiting?</b> Check in at the <b>Admissions Reception Center (Leventhal Center), 233 Bay State Rd</b> · park at the Agganis Arena Garage, 925 Commonwealth Ave (~16-min walk) · Green Line B: "BU East" stop · arrive 20–30 min early.',
  contact: {
    maps: 'https://maps.google.com/?q=233+Bay+State+Rd,+Boston,+MA+02215',
    mapsLabel: '233 Bay State Rd · park at Agganis Garage',
    tel: '+16173532300', telLabel: '617-353-2300 (admissions)',
    email: 'admissions@bu.edu',
    tourUrl: 'https://www.bu.edu/admissions/visit-us/',
    siteUrl: 'https://www.bu.edu', siteLabel: 'bu.edu'
  },
  card: {
    type: 'Private',
    blurb: 'City-campus mega-university on Comm Ave: Questrom business (99% placed, $88K comp), full-need aid, Beanpot hockey.',
    accept: '12.8%', rank: '#42', cost: '$94.4K', sat: '1420–1510',
    undergrads: '18,289', biz: 'Questrom (AACSB)', placed: '99% (Questrom)',
    grad4: '82%', greek: '~11% W · few M', sports: 'D1 hockey · no football',
    drive: '~5½ hr', deadlines: 'ED1 Nov 1 · ED2/RD Jan 5'
  },
  sections: [
    {
      id: 'overview', nav: 'Overview', kicker: 'Overview', title: 'Quick facts',
      lead: "BU is the fourth-largest private residential research university in the U.S. — nearly 37,000 students on a 1.5-mile campus that runs along Commonwealth Avenue with the Green Line trolley down the middle. It's the \"city that happens to contain a university\" experience, one Fenway home run away from the ballpark.",
      html: `
  <div class="cards g4">
    <div class="tile"><b>1839</b><span>founded; chartered in Boston since 1869</span></div>
    <div class="tile"><b>10:1</b><span>student–faculty ratio · 58% of sections under 20 students</span></div>
    <div class="tile"><b>20.5%</b><span>of undergrads are international — one of the most global campuses in the U.S.</span></div>
    <div class="tile"><b>~$3.5B</b><span>endowment (one of 2025's best investment returns among privates)</span></div>
    <div class="tile"><b>94%</b><span>freshman retention · 90% graduate within 6 years</span></div>
    <div class="tile"><b>79%</b><span>of undergrads come from out of state</span></div>
    <div class="tile"><b>100+</b><span>study-abroad programs · 300+ clubs</span></div>
    <div class="tile"><b>1.5 mi</b><span>of campus along Commonwealth Ave — the T runs through it</span></div>
  </div>
  <div class="cards g2">
    <div class="card">
      <h3>🐾 Terrier lore</h3>
      <ul>
        <li><b>Rhett the Boston Terrier</b> — named for Gone with the Wind's Rhett Butler, because BU's color is scarlet and "no one loved Scarlett more than Rhett."</li>
        <li><b>The BU Bridge claim to fame:</b> one of the few spots on earth where a plane can fly over a car driving over a train traveling over a boat.</li>
        <li><b>Marsh Plaza</b> holds the MLK "Free at Last" memorial — Dr. King earned his PhD here in 1955.</li>
        <li>Hockey rules: BU has won the <b>Beanpot</b> (the February Boston hockey tournament vs. BC, Harvard, Northeastern) more than 30 times.</li>
      </ul>
    </div>
    <div class="card">
      <h3>⭐ Notable alumni</h3>
      <ul>
        <li><b>Martin Luther King Jr.</b> — PhD in systematic theology, 1955</li>
        <li><b>Alexandria Ocasio-Cortez</b> — U.S. Representative (economics &amp; international relations, 2011)</li>
        <li><b>Howard Stern</b> — radio legend (College of Communication, 1976)</li>
        <li><b>Julianne Moore</b> — Oscar-winning actor (College of Fine Arts)</li>
      </ul>
    </div>
  </div>`
    },
    {
      id: 'admissions', nav: 'Admissions', kicker: 'Admissions', title: 'Getting in',
      lead: "BU is a reach for nearly everyone: 12.8% acceptance overall, with Early Decision running ~31% — more than half the class enrolls through ED. Test-optional in practice (only ~1 in 3 submitted the SAT), and the Common Data Set says only two things are \"very important\": course rigor and GPA.",
      html: `
  <div class="cards g4">
    <div class="tile"><b>12.8%</b><span>acceptance rate, Fall 2025 (up from 11.1% the year before)</span></div>
    <div class="tile"><b>31.3%</b><span>Early Decision acceptance rate — ~59% of the class enrolls via ED</span></div>
    <div class="tile"><b>1420–1510</b><span>SAT middle 50% (median 1470); only 36% submitted</span></div>
    <div class="tile"><b>3.86</b><span>average HS GPA · 72% had 3.75+</span></div>
    <div class="tile"><b>94%</b><span>freshman retention rate</span></div>
    <div class="tile"><b>82%</b><span>graduate in 4 years · 90% in 6</span></div>
    <div class="tile"><b>Nov 1</b><span>ED I deadline (decision Dec 15) · merit priority Dec 1</span></div>
    <div class="tile"><b>Jan 5</b><span>ED II and Regular Decision deadline (decision by Apr 1)</span></div>
  </div>
  <div class="cards g2">
    <div class="card">
      <h3>📋 How BU reads applications</h3>
      <p>"Very important": <b>rigor and GPA — that's it.</b> Essay, recommendations, rank, extracurriculars, and character are "important"; test scores are merely "considered" (optional through the Fall 2028 cycle, including for scholarships). App fee $80; nonrefundable $650 housing deposit after admission.</p>
      <div class="chips"><span class="chip">Course rigor</span><span class="chip">GPA</span></div>
      <p><b>The ED math is the story:</b> 31% ED vs. an estimated single-digit RD rate. If BU is a clear first choice and the net-price calculator works, ED is the lever — but it's binding, so the aid math has to work first.</p>
    </div>
    <div class="card">
      <h3>🏫 Applying to Questrom</h3>
      <p>You apply directly to the Questrom School of Business on the Common App. Internal transfer into Questrom later requires roughly a <b>3.5 GPA and is not guaranteed</b> — r/BostonU describes the jump as "going from kicking toddlers over to fighting a gorilla." Apply directly if business is the plan.</p>
      <p style="margin-top:8px">Waitlist reality check: 16,135 offered a spot, 479 admitted — real but a long shot.</p>
    </div>
  </div>`
    },
    {
      id: 'costs', nav: 'Costs & Aid', kicker: 'Costs & Aid', title: 'What it really costs',
      lead: 'BU is a ~$94K sticker school with a genuinely strong need-aid pledge — "affordableBU" meets 100% of demonstrated need for domestic students all four years, and Pell-eligible students get loan-free packages. The catch: merit aid is nearly nonexistent (~4% of students).',
      html: `
  <div class="chart">
    <h3>Sticker cost of attendance, 2025–26</h3>
    <div class="sub">Per year, on campus, before aid — from BU's Common Data Set. One rate for everyone.</div>
    <div class="crow">
      <div class="lbl"><span>Boston University</span><span class="tot">$94,427</span></div>
      <div class="bar-h" role="img" aria-label="BU: tuition and fees $71,372, housing and food $19,970, books travel and personal about $3,085, total $94,427">
        <div class="seg s1" style="width:75.6%" data-tip="Tuition &amp; fees — $71,372"><i>$71,372</i></div>
        <div class="seg s2" style="width:21.1%" data-tip="Housing &amp; food — $19,970"><i>$19,970</i></div>
        <div class="seg s3" style="width:3.3%" data-tip="Books, travel &amp; personal — ~$3,085"><i></i></div>
      </div>
    </div>
    <div class="legend">
      <span><b style="background:var(--mark-1)"></b>Tuition &amp; fees</span>
      <span><b style="background:var(--mark-2)"></b>Housing &amp; food</span>
      <span><b style="background:var(--ink-3)"></b>Books, travel &amp; personal (~$3,085)</span>
    </div>
    <p class="src">Roughly $28K/yr more than Delaware's out-of-state sticker — but a strong need-aid family could pay far less at BU than at a merit-light public.</p>
  </div>
  <div class="cards g2" style="margin-top:16px">
    <div class="card">
      <h3>🎓 Aid: strong need, scarce merit</h3>
      <ul>
        <li><b>affordableBU:</b> 100% of demonstrated need met for domestic first-years, maintained all four years; average need-based grant ≈ <b>$65,700</b>; ~42% of undergrads receive need-based aid</li>
        <li><b>Merit is rare:</b> only ~4% of undergrads hold merit awards. <b>Trustee Scholarship</b> = full tuition + fees (~20/yr); <b>Presidential</b> = $25,000/yr — apply by <b>Dec 1</b>, no separate application</li>
        <li>Run the net price calculator: BU can beat a public's OOS price for need-eligible families and crush the budget for full-pay ones</li>
      </ul>
    </div>
    <div class="card">
      <h3>💵 Debt &amp; payoff</h3>
      <ul>
        <li>34% of 2025 grads borrowed; average cumulative debt ≈ <b>$36,800</b> (median federal ≈ $25,000)</li>
        <li>Median earnings 10 years after entry ≈ <b>$72,000</b> (College Scorecard) — Questrom grads run well above that (below)</li>
        <li>Boston cost-of-living is real: off-campus rooms in Allston commonly run $1,000–1,500+/mo</li>
      </ul>
      <div class="rq">"Even if they reject your aid appeal, if you nag them enough they'll give you like 1k to go away." … "BU doesn't do much of [merit] to begin with."<b>— r/BostonU (archived threads) — need aid is the real lever, not merit</b></div>
    </div>
  </div>`
    },
    {
      id: 'business', nav: 'Business', kicker: 'Business', title: 'Questrom School of Business',
      lead: 'Questrom is BU\'s AACSB-accredited business school — #18 in Poets&Quants (2026), ~800 students per class, with a signature junior-year "Cross-Functional Core": a team-based semester where you build a business concept across finance, marketing, operations, and IS at once.',
      html: `
  <div class="cards g4">
    <div class="tile"><b>#18</b><span>Poets&amp;Quants best undergrad business (2026) · #17 career outcomes</span></div>
    <div class="tile"><b>99%</b><span>of Class of 2025 employed within 6 months (86% knowledge rate)</span></div>
    <div class="tile"><b>$87,926</b><span>mean first-year total compensation (base $80,847 + bonuses)</span></div>
    <div class="tile"><b>11</b><span>concentrations — finance, analytics, entrepreneurship, marketing, and more</span></div>
  </div>
  <div class="cards g2">
    <div class="card">
      <h3>🚀 What stands out</h3>
      <ul>
        <li><b>Cross-Functional Core</b> (junior year) — the famous team semester integrating four disciplines around one product concept; alumni cite it as the best consulting/banking prep in the program</li>
        <li>Concentrations: Accounting, Business Analytics, Finance, Information Systems, Innovation &amp; Entrepreneurship, Law, Management, Marketing, Operations &amp; Tech, Strategy, or independent</li>
        <li>~129-credit BSBA over 4 years; the SM131/132 intro sequence starts freshman fall</li>
        <li>Boston's consulting/finance/tech job market is a subway ride from class</li>
      </ul>
    </div>
    <div class="card">
      <h3>💼 Where the money is (Class of 2025)</h3>
      <ul>
        <li>Financial services took 33% of the class (mean comp $94,094); consulting 11% ($92,859); tech 9% ($86,258)</li>
        <li>Investment banking placements averaged <b>$112,850</b> total comp; sales &amp; trading $125,600</li>
        <li>Top employers (10+ hires): <b>PwC, EY, KPMG, Deloitte</b>; plus JPMorgan, Bank of America, Fidelity, Goldman, Blackstone, Amazon, Wayfair — 283 companies total, 76% of jobs in the Northeast</li>
      </ul>
      <div class="rq">"Questrom Means Business… Great faculty, lots of resources, and they really do push recruiting efforts." … "Overloading will ruin your quality of life and social life."<b>— r/BostonU Questrom threads (archived)</b></div>
    </div>
  </div>`
    },
    {
      id: 'outcomes', nav: 'Outcomes', kicker: 'After graduation', title: 'Hiring rates & outcomes',
      lead: 'Questrom publishes an unusually detailed employment report (Feld Center) — these are Class of 2025 numbers at six months out.',
      html: `
  <div class="cards g4">
    <div class="tile"><b>99%</b><span>of job-seeking Questrom grads employed within 6 months</span></div>
    <div class="tile"><b>$80,847</b><span>mean base salary · $87,926 mean total comp</span></div>
    <div class="tile"><b>$8,191</b><span>mean signing bonus among those receiving one</span></div>
    <div class="tile"><b>90%</b><span>of all BU students graduate within 6 years (82% in 4)</span></div>
  </div>
  <div class="chart" style="margin-top:16px">
    <h3>Questrom mean first-year compensation by path</h3>
    <div class="sub">Class of 2025, total compensation, Feld Center employment report. Bars to a common dollar scale.</div>
    <div class="crow">
      <div class="lbl"><span>Investment banking · 7% of class</span><span class="tot">$112,850</span></div>
      <div class="bar-h"><div class="seg s1" style="width:100%" data-tip="Investment banking — $112,850 mean comp"><i>$112,850</i></div></div>
    </div>
    <div class="crow">
      <div class="lbl"><span>Financial services · 33% of class</span><span class="tot">$94,094</span></div>
      <div class="bar-h"><div class="seg s1" style="width:83.4%;flex:none" data-tip="Financial services — $94,094 mean comp"><i>$94,094</i></div></div>
    </div>
    <div class="crow">
      <div class="lbl"><span>Consulting · 11% of class</span><span class="tot">$92,859</span></div>
      <div class="bar-h"><div class="seg s1" style="width:82.3%;flex:none" data-tip="Consulting — $92,859 mean comp"><i>$92,859</i></div></div>
    </div>
    <div class="crow">
      <div class="lbl"><span>All Questrom grads (mean)</span><span class="tot">$87,926</span></div>
      <div class="bar-h"><div class="seg s1" style="width:77.9%;flex:none" data-tip="All Questrom — $87,926 mean comp"><i>$87,926</i></div></div>
    </div>
    <div class="crow">
      <div class="lbl"><span>Technology · 9% of class</span><span class="tot">$86,258</span></div>
      <div class="bar-h"><div class="seg s1" style="width:76.4%;flex:none" data-tip="Technology — $86,258 mean comp"><i>$86,258</i></div></div>
    </div>
    <p class="src">13% of the class went to grad school instead. Sales &amp; trading (2% of class) topped the chart at $125,600 mean comp.</p>
  </div>
  <div class="cards g2" style="margin-top:16px">
    <div class="card">
      <h3>💼 The placement machine</h3>
      <ul>
        <li>283 distinct employers hired the Class of 2025; top cities NYC, Boston, LA</li>
        <li>Big 4 accounting firms are the largest single pipeline (10+ hires each)</li>
        <li>The whole-university Scorecard median (~$72K at 10 years) blends every major — business, comms, and arts outcomes differ widely at BU</li>
      </ul>
    </div>
    <div class="card">
      <h3>🎓 Worth asking on tour</h3>
      <ul>
        <li>How does Feld Center coaching work for freshmen vs. juniors?</li>
        <li>What share of Questrom internships convert to offers?</li>
        <li>How did the 2025 budget cuts (below) affect career services staffing?</li>
      </ul>
    </div>
  </div>`
    },
    {
      id: 'studentlife', nav: 'Student Life', kicker: "Who's on campus", title: 'Student body & campus life',
      lead: 'Official demographics from BU\'s Fall 2025 Common Data Set, plus the scene as r/BostonU tells it. BU is strikingly global — 1 in 5 undergrads is international.',
      html: `
  <div class="chart">
    <h3>Undergraduate demographics</h3>
    <div class="sub">17,628 degree-seeking undergrads, Fall 2025 (Common Data Set). 79% from out of state.</div>
    <div class="crow tight">
      <div class="lbl"><span>Gender</span><span class="tot">59.3% women · 40.7% men</span></div>
      <div class="bar-h" role="img" aria-label="Gender: 59.3 percent women, 40.7 percent men">
        <div class="seg s1" style="width:59.3%" data-tip="Women — 10,837 (59.3%)"><i>Women 59.3%</i></div>
        <div class="seg s2" style="width:40.7%" data-tip="Men — 7,452 (40.7%)"><i>Men 40.7%</i></div>
      </div>
    </div>
    <div class="crow tight" style="margin-top:20px">
      <div class="lbl"><span>White</span><span class="tot">30.4%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:100%;flex:none" data-tip="White — 30.4%"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Asian</span><span class="tot">21.3%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:70.1%;flex:none" data-tip="Asian — 21.3%"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>International</span><span class="tot">20.5%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:67.4%;flex:none" data-tip="International — 20.5%"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Hispanic / Latino</span><span class="tot">12.3%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:40.5%;flex:none" data-tip="Hispanic/Latino — 12.3%"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Black / African American</span><span class="tot">5.8%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:19.1%;flex:none" data-tip="Black — 5.8%"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Two or more races</span><span class="tot">5.2%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:17.1%;flex:none" data-tip="Two or more races — 5.2%"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Unknown</span><span class="tot">4.4%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:14.5%;flex:none" data-tip="Unknown — 4.4%"><i></i></div></div>
    </div>
    <p class="src">Bars scaled to the largest group. Niche Diversity grade: A+.</p>
  </div>
  <div class="cards g2" style="margin-top:16px">
    <div class="card">
      <h3>🎉 Party scene: reputation vs. reality</h3>
      <p>Niche grades the party scene an <b>A</b>, but it's an off-campus scene — house parties in <b>Allston</b> ("parties in Allston are sweet") and Boston's bar/concert circuit, not a frat row. On-campus culture is busier than it is wild; think "cliquey but easy to make friends," per students.</p>
      <div class="rq">"Social life is great, easy to make friends but very cliquey." … "Parties in Allston are sweet, you have green space at the BU beach."<b>— r/BostonU (archived threads)</b></div>
    </div>
    <div class="card">
      <h3>🏛️ Greek life: small</h3>
      <p>About <b>11% of women</b> join sororities; men's numbers are small (historically ~3–5%), and there's no Greek housing. Reviews split: "Greek life at BU was AWESOME — do not listen to these total killjoys" vs. complaints that it's "very selective." Either way it doesn't run the social scene the way it does at Delaware.</p>
    </div>
    <div class="card">
      <h3>🏒 Terrier sports = hockey</h3>
      <p><b>No football since 1997.</b> BU is a hockey school: D1 <b>Hockey East</b> men's and women's programs, 30+ <b>Beanpot</b> titles, and the February Beanpot at TD Garden is the sports event of the year. Other sports play in the Patriot League (24 varsity programs). Agganis Arena (6,150 seats) is the home barn — try to catch a game on a winter visit.</p>
    </div>
    <div class="card">
      <h3>💪 For a gym regular (PF member's guide)</h3>
      <p><b>FitRec is a destination gym</b>: 270,000 sq ft, an 18,000 sq ft weight/cardio floor, 1/7-mile indoor track, 35-ft climbing wall, two pools — including a rec pool with a <b>100-ft lazy river and hot tub</b> — all <b>free for full-time students</b>.</p>
      <p style="margin-top:10px"><b>Planet Fitness:</b> 226 Harvard Ave, Allston — about a mile from West Campus (20-min walk or one T stop). With FitRec free and this good, PF becomes the home-for-break option rather than a necessity.</p>
    </div>
  </div>
  <div class="card" style="margin-top:14px">
    <h3>🧾 The Reddit consensus, distilled</h3>
    <ul>
      <li><b>Worth-it depends on aid and major:</b> "There isn't a school in the world that's worth full tuition" is the moderate take; program-specific — journalism and Questrom defenders vs. regretful comms grads.</li>
      <li><b>Housing is the #1 gripe:</b> "the damn BU housing number roulette," B- dorms, and "preference ranking is more an illusion" — balanced by love for West Campus and the Bay State Rd brownstones.</li>
      <li><b>"BUreaucracy" is a real word students use</b> — administrative runaround, and the recent MyBU student-portal rollout drew heavy fire.</li>
      <li><b>Big-school classes:</b> 132 sections have 100+ students; intro lectures are large even with a 10:1 overall ratio.</li>
      <li><b>They still love the place:</b> top posts are "Mice in Mugar" (library gripes) and "Rhett Jr. is absolutely adorable" — grumbling with school spirit.</li>
    </ul>
    <p class="src">Sentiment from archived r/BostonU threads via the Pullpush archive — real posts, anecdotes not statistics.</p>
  </div>`
    },
    {
      id: 'proscons', nav: 'Pros & Cons', kicker: 'The balance sheet', title: 'Pros & cons',
      lead: 'Compiled from the Common Data Set, Niche grades (Academics A+, Professors A+, Student Life A+, Location A+, Dorms B-), news coverage, and archived r/BostonU threads.',
      html: `
  <div class="cards g2">
    <div class="pc pros">
      <h3>Pros</h3>
      <ul>
        <li>Boston, fully immersed<small>Comm Ave campus in the middle of the biggest college town in America; Fenway is half a mile away</small></li>
        <li>Questrom's placement engine<small>99% employed, $88K mean comp, Big 4 + banking pipelines, #17 career outcomes (P&amp;Q)</small></li>
        <li>100%-of-need aid, four years<small>affordableBU is one of the stronger need pledges outside the Ivies; Pell packages are loan-free</small></li>
        <li>Strong academics at scale<small>10:1 ratio, A+ Niche academics, 90% six-year graduation</small></li>
        <li>Genuinely global student body<small>20% international, A+ diversity — a different world from a regional public</small></li>
        <li>Hockey culture &amp; the Beanpot<small>Real school spirit without football, at TD Garden every February</small></li>
        <li>FitRec<small>A 270K sq ft rec center with a lazy river, free</small></li>
        <li>Internships year-round<small>Boston's consulting/finance/biotech market is on the T</small></li>
      </ul>
    </div>
    <div class="pc cons">
      <h3>Cons</h3>
      <ul>
        <li>$94K sticker, merit-scarce<small>Only ~4% get merit aid; full-pay families carry the whole load</small></li>
        <li>Housing lottery &amp; quality<small>Niche Dorms B-; "housing number roulette"; 43% end up off campus in a pricey market</small></li>
        <li>Campus is a street<small>1.5 miles along a 4-lane road with a trolley — no quad-centered campus feel</small></li>
        <li>Bureaucracy<small>"BUreaucracy" is campus vocabulary; recent student-system rollout went badly</small></li>
        <li>Big intro classes<small>132 sections of 100+ students despite the 10:1 ratio</small></li>
        <li>Budget-cut climate<small>July 2025: 120 layoffs + 5% budget cuts after federal funding pressure and a grad-strike settlement; some PhD programs paused</small></li>
        <li>Hard to get into<small>12.8% overall and single-digit RD — this is the reach on the list</small></li>
      </ul>
    </div>
  </div>`
    },
    {
      id: 'criticisms', nav: 'Criticisms', kicker: 'Straight talk', title: 'Criticisms & feedback, in detail',
      lead: 'What to probe on a BU tour.',
      html: `
  <div class="cards g2">
    <div class="card">
      <h3>🏛️ The 2025 budget cuts</h3>
      <p>In July 2025 BU laid off <b>120 staff</b>, cut 120 vacant positions, and trimmed budgets ~5%, citing federal research-funding cuts and a graduate-enrollment revenue miss; several humanities PhD programs were later paused. The undergrad experience is largely insulated, but ask how advising, career services, and class availability are being protected.</p>
    </div>
    <div class="card">
      <h3>🛏️ Housing roulette</h3>
      <p>First-years are housed (99% live on campus), but after that the lottery draws the most heat of any topic on r/BostonU: "You get put where there is open space!" Dorms range from beloved brownstones and West Campus towers to tired mid-century stock (Niche B-). 43% of undergrads live off campus — budget $1,000–1,500+/month for an Allston room.</p>
    </div>
    <div class="card">
      <h3>🏙️ No-quad campus</h3>
      <p>BU's campus is Commonwealth Avenue itself. Some students love living on a city artery with the T at the door; others miss having a green heart (the "BU Beach" is the closest thing). The tour will tell you within an hour which kind of student you have.</p>
    </div>
    <div class="card">
      <h3>📚 Scale effects</h3>
      <p>A 37,000-student university means large intro lectures (100+ in 132 sections), TA-taught discussion sections, and administrative queues. Questrom's cohort structure softens this for business students, but the first year is big-school living.</p>
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
        <dt>Admissions</dt><dd>Alan &amp; Sherry Leventhal Center, 233 Bay State Rd, Boston, MA 02215</dd>
        <dt>Parking</dt><dd>Agganis Arena Garage (925 Commonwealth Ave) is the designated visitor garage — ~16-min walk; metered Bay State Rd spots via the Park Boston app fill fast. Arrive 20–30 min early</dd>
        <dt>By T</dt><dd>Green Line B branch runs through campus — "BU East" is a 5-min walk from admissions</dd>
        <dt>By car</dt><dd>~300 miles, 5–5.5 hr from the northern Philadelphia suburbs (I-95/I-84/I-90); plan around New York traffic</dd>
      </dl>
      <div class="mapbtns">
        <a class="btn" href="https://maps.google.com/?q=233+Bay+State+Rd,+Boston,+MA+02215" rel="noopener">Open in Google Maps</a>
        <a class="btn alt" href="https://www.bu.edu/admissions/visit-us/" rel="noopener">Book a tour</a>
      </div>
    </div>
    <div class="card">
      <h3>🏙️ Don't-miss campus stops</h3>
      <ul>
        <li><b>Marsh Plaza</b> — the campus heart, with the MLK "Free at Last" sculpture</li>
        <li><b>BU Beach</b> — the grassy quad-substitute behind Marsh Chapel</li>
        <li><b>Bay State Road</b> — the brownstone residential street that shows BU's softer side</li>
        <li><b>Questrom building</b> (595 Comm Ave) — see the hexagonal atrium</li>
        <li><b>FitRec &amp; Agganis Arena</b> — West Campus; walk the rec center</li>
        <li><b>BU Bridge</b> — Charles River views + the plane/car/train/boat trivia spot</li>
      </ul>
    </div>
  </div>
  <div class="note">💡 <b>Good tour questions for a business kid:</b> What GPA does internal transfer into Questrom actually take in practice? How does the Cross-Functional Core team assignment work? What share of Questrom internships come through the Feld Center vs. self-sourced? How has the 2025 budget picture affected career services?</div>`
    },
    {
      id: 'nearby', nav: 'Nearby', kicker: 'Around town', title: 'Boston & nearby',
      lead: "BU's neighborhood is Fenway–Kenmore: the ballpark, the Citgo sign, and the Charles River are all part of daily student life.",
      html: `
  <div class="cards g3">
    <div class="card"><h3>⚾ Fenway Park</h3><p>Half a mile from East Campus — game-day crowds pour through Kenmore Square. Park tours run daily even out of season.</p></div>
    <div class="card"><h3>🌊 Charles River Esplanade</h3><p>Cross a footbridge to the running/biking path and sailing docks — BU crew and sailing launch here.</p></div>
    <div class="card"><h3>🛍️ Newbury Street</h3><p>Boston's shopping-and-cafés street is a 15-minute walk from Kenmore.</p></div>
    <div class="card"><h3>🍜 Time Out Market</h3><p>Food hall at 401 Park Dr (Fenway) — easy group lunch after the tour.</p></div>
    <div class="card"><h3>🎓 College-town energy</h3><p>250,000+ students across Boston/Cambridge; the T connects BU to Harvard Square, MIT, and downtown in minutes.</p></div>
    <div class="card"><h3>🏒 Agganis Arena events</h3><p>Hockey, concerts, and shows on campus — check the calendar for visit weekend.</p></div>
  </div>`
    },
    {
      id: 'timeline', nav: 'Timeline', kicker: 'Planning ahead', title: 'Timeline for a rising high-school junior',
      lead: 'Applying in fall 2027 for fall 2028 entry. BU strategy revolves around one question: is it worth an ED commitment?',
      html: `
  <ul class="tl">
    <li><span class="when">Now — summer 2026</span><b>Visit &amp; calibrate</b><span>BU is the reach on this list (12.8%, single-digit RD). See it early so the ED question has time to settle.</span></li>
    <li><span class="when">Fall 2026 (junior year)</span><b>PSAT + maximum rigor</b><span>BU's only "very important" factors are rigor and GPA — junior-year schedule strength matters more here than anywhere else on the list.</span></li>
    <li><span class="when">Spring 2027</span><b>SAT/ACT + net price calculator</b><span>A 1450+ SAT is worth submitting; below the range, test-optional is safe. Run the NPC — the ED decision depends on it.</span></li>
    <li><span class="when">Summer 2027</span><b>Essay + the ED decision</b><span>If BU is the clear #1 AND the NPC works: ED I (Nov 1) triples the odds. Otherwise RD and keep leverage.</span></li>
    <li><span class="when">Nov 1 / Dec 1, 2027</span><b>ED I deadline · merit priority date</b><span>Trustee/Presidential consideration requires applying by Dec 1 — no separate application.</span></li>
    <li><span class="when">Jan 5, 2028</span><b>ED II / Regular Decision</b><span>ED II keeps a binding-commitment card if an ED I school says no. RD decisions by Apr 1.</span></li>
    <li><span class="when">May 1, 2028</span><b>Decision day</b><span>Compare real aid letters; remember BU's $650 nonrefundable housing deposit once committing.</span></li>
  </ul>`
    },
    {
      id: 'sources', nav: 'Sources', kicker: 'Fine print', title: 'Sources & notes',
      lead: 'Data compiled July 2026. Figures change annually — verify with official BU pages.',
      html: `
  <div class="card">
    <ul style="font-size:13.5px">
      <li><a href="https://www.bu.edu/asir/bu-facts/common-data-set" rel="noopener">BU Common Data Set 2025–26</a> — admissions, enrollment, demographics, costs, aid, Greek life</li>
      <li><a href="https://questromfeld.bu.edu/resources/undergraduate-employment-report/" rel="noopener">Questrom Feld Center Class of 2025 Employment Report</a> — placement, salaries by industry, employers</li>
      <li><a href="https://www.bu.edu/admissions/visit-us/" rel="noopener">BU Admissions visit pages</a> — Leventhal Center, parking, directions</li>
      <li><a href="https://www.usnews.com/best-colleges/boston-university-2130" rel="noopener">U.S. News</a> (#42, 2026) · <a href="https://poetsandquantsforundergrads.com/school-profile/boston-university-questrom-school-business/" rel="noopener">Poets&amp;Quants</a> (Questrom #18) · <a href="https://www.niche.com/colleges/boston-university/" rel="noopener">Niche</a> grades · <a href="https://collegescorecard.ed.gov/" rel="noopener">College Scorecard</a></li>
      <li>News: Boston Globe / Forbes / WBUR (July 2025 layoffs &amp; budget cuts), 2024 grad-worker strike coverage, Daily Free Press (MyBU rollout)</li>
      <li><a href="https://www.bu.edu/fitrec/about-us/" rel="noopener">BU FitRec</a> — facilities; Planet Fitness Allston location from planetfitness.com</li>
      <li>Student-voice quotes: archived r/BostonU threads via the Pullpush archive — real posts; anecdotes, not statistics</li>
    </ul>
  </div>`
    }
  ]
};
