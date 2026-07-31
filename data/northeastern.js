window.SCHOOLS = window.SCHOOLS || {};
window.SCHOOLS['northeastern'] = {
  id: 'northeastern', name: 'Northeastern University', short: 'Northeastern', city: 'Boston, MA',
  colors: { sc: '#C8102E', scDark: '#8f0b20' },
  locChip: '📍 Boston, MA · ~5¼ hr drive from the northern Philadelphia suburbs',
  heroTitle: 'Northeastern University<br><span class="gold">Huskies</span> at a glance',
  heroSub: "The co-op school: Northeastern students alternate semesters of class with paid six-month jobs at real companies, graduating with 12–18 months of professional experience. The trade: hyper-competitive admissions, a $94K sticker, and a pre-professional culture that isn't for everyone.",
  heroStats: [
    { b: '5.6%', s: 'published acceptance rate (Class of 2029 · 105,092 applications)' },
    { b: '#46', s: 'U.S. News National Universities (2026) · #1 for co-ops/internships' },
    { b: '22,695', s: 'undergrads · ~39,800 total students' },
    { b: '$94,137', s: 'total sticker cost/yr (2025–26, before aid)' }
  ],
  visitCard: '<b>Visiting?</b> Check in at the <b>Northeastern Visitor Center, West Village F, 40 Leon St</b> · validated visitor parking at West Village Garage (30 Leon St) · Green Line E to "Northeastern" or Orange Line to Ruggles.',
  contact: {
    maps: 'https://maps.google.com/?q=Northeastern+Visitor+Center,+40+Leon+St,+Boston,+MA+02115',
    mapsLabel: '40 Leon St · West Village Garage parking',
    tel: '+16173732200', telLabel: '617-373-2200 (admissions)',
    email: 'admissions@northeastern.edu',
    tourUrl: 'https://admissions.northeastern.edu/visit/',
    siteUrl: 'https://www.northeastern.edu', siteLabel: 'northeastern.edu'
  },
  card: {
    type: 'Private',
    blurb: 'The co-op university — alternate classes with paid 6-month jobs; 99% business placement, but ~5% admissions and a 5-year rhythm.',
    accept: '5.6%', rank: '#46', cost: '$94.1K', sat: '1450–1520',
    undergrads: '22,695', biz: "D'Amore-McKim + co-op", placed: '99% (9 mo)',
    grad4: '~4.5–5 yrs typical', greek: '5% M · 9% W', sports: 'D1 hockey · no football',
    drive: '~5¼ hr', deadlines: 'EA/ED1 Nov 1 · RD Jan 1'
  },
  sections: [
    {
      id: 'overview', nav: 'Overview', kicker: 'Overview', title: 'Quick facts',
      lead: 'Northeastern runs on experiential learning: the co-op program (founded 1909) sends students into paid six-month jobs — no tuition charged while working — then back to class. The Boston campus sits between Fenway and the Museum of Fine Arts, with satellite campuses worldwide.',
      html: `
  <div class="cards g4">
    <div class="tile"><b>1898</b><span>founded in the Boston YMCA; co-ops since 1909</span></div>
    <div class="tile"><b>#1</b><span>U.S. News ranking for co-ops/internships · #5 Most Innovative</span></div>
    <div class="tile"><b>96.9%</b><span>freshman retention — among the highest anywhere</span></div>
    <div class="tile"><b>91%</b><span>graduate within 6 years (most take 4.5–5 by design)</span></div>
    <div class="tile"><b>16:1</b><span>student–faculty ratio</span></div>
    <div class="tile"><b>71%</b><span>of undergrads from out of state · 13% international</span></div>
    <div class="tile"><b>$20–33/hr</b><span>typical paid business co-op wages — a 6-month co-op ≈ $20–25K</span></div>
    <div class="tile"><b>~$2.1B</b><span>endowment — modest for its size</span></div>
  </div>
  <div class="cards g2">
    <div class="card">
      <h3>🐕 Husky lore</h3>
      <ul>
        <li><b>Paws</b> the mascot plus a live-dog <b>King Husky</b> line dating to 1927.</li>
        <li>The <b>co-op program (1909)</b> is one of the oldest in the world — the entire university is built around it.</li>
        <li>No football (cut in 2009) — the sports identity is <b>Beanpot hockey</b> at TD Garden every February (men's titles 2018, '19, '20, '23).</li>
        <li>Global campuses: NU.in students spend their first semester abroad; Oakland and London campuses host full first years.</li>
      </ul>
    </div>
    <div class="card">
      <h3>⭐ Notable alumni</h3>
      <ul>
        <li><b>Shawn Fanning</b> — created Napster as a Northeastern student</li>
        <li><b>Richard Egan &amp; Roger Marino</b> — co-founders of EMC (the rec center bears Marino's name)</li>
        <li><b>Reggie Lewis</b> — Boston Celtics captain</li>
        <li><b>José Juan Barea</b> — NBA champion guard</li>
      </ul>
    </div>
  </div>`
    },
    {
      id: 'admissions', nav: 'Admissions', kicker: 'Admissions', title: 'Getting in',
      lead: "Northeastern's published rate is 5.6% on 105,000+ applications — but the fine print matters: Early Decision admits at ~43%, and thousands more are admitted through NU.in (first semester abroad) and Global Scholars (first year in Oakland or London), which don't count in the published rate. Real odds are better than the headline, via the side doors.",
      html: `
  <div class="cards g4">
    <div class="tile"><b>5.6%</b><span>published acceptance rate, Class of 2029 (5.2% in the CDS for Fall 2024)</span></div>
    <div class="tile"><b>~43%</b><span>Early Decision acceptance rate (Fall 2024 CDS) — the biggest ED advantage on this list</span></div>
    <div class="tile"><b>1450–1520</b><span>SAT middle 50% (median 1490); only 24% submitted</span></div>
    <div class="tile"><b>87%</b><span>of enrolled students had a 4.0 GPA · 69% top tenth of class</span></div>
    <div class="tile"><b>96.9%</b><span>freshman retention rate</span></div>
    <div class="tile"><b>91%</b><span>6-year graduation rate — but plan on 4.5–5 years with co-ops</span></div>
    <div class="tile"><b>Nov 1</b><span>ED I &amp; Early Action deadlines (EA is non-restrictive)</span></div>
    <div class="tile"><b>Jan 1</b><span>ED II and Regular Decision deadline (RD decision by Apr 1)</span></div>
  </div>
  <div class="cards g2">
    <div class="card">
      <h3>📋 How Northeastern reads applications</h3>
      <p>"Very important" (CDS): rigor, GPA, <b>test scores</b> (unusual — most schools here demote them), and recommendations. The essay is only "considered," and legacy is officially <b>not considered</b>. Test-optional continues, but a 1450+ score is clearly welcome.</p>
      <div class="chips"><span class="chip">Course rigor</span><span class="chip">GPA</span><span class="chip">Test scores</span><span class="chip">Recommendations</span></div>
    </div>
    <div class="card">
      <h3>🌍 The side doors: NU.in &amp; Global Scholars</h3>
      <p><b>NU.in</b>: your only offer may be a first semester at a partner campus abroad (or Oakland), joining Boston in spring. <b>Global Scholars</b>: full first year in Oakland or London. Both lead to the same degree and don't count in the published admit rate — a deliberate strategy that critics call rankings gamesmanship and fans call a global feature. Families should price the logistics before accepting.</p>
    </div>
  </div>`
    },
    {
      id: 'costs', nav: 'Costs & Aid', kicker: 'Costs & Aid', title: 'What it really costs',
      lead: "A ~$94K sticker like BU's, with one big structural difference: no tuition is charged during co-op semesters, and co-ops pay. Need-based aid is strong for first-years (100% of need met); merit is small.",
      html: `
  <div class="chart">
    <h3>Sticker cost of attendance, 2025–26</h3>
    <div class="sub">Per year in class (co-op semesters bill no tuition). One rate for everyone.</div>
    <div class="crow">
      <div class="lbl"><span>Northeastern</span><span class="tot">$94,137</span></div>
      <div class="bar-h" role="img" aria-label="Northeastern: tuition and fees $69,289, housing and food $22,048, books and other about $2,800, total $94,137">
        <div class="seg s1" style="width:73.6%" data-tip="Tuition &amp; fees — $69,289"><i>$69,289</i></div>
        <div class="seg s2" style="width:23.4%" data-tip="Housing &amp; food — $22,048"><i>$22,048</i></div>
        <div class="seg s3" style="width:3%" data-tip="Books, travel &amp; personal — ~$2,800"><i></i></div>
      </div>
    </div>
    <div class="legend">
      <span><b style="background:var(--mark-1)"></b>Tuition &amp; fees</span>
      <span><b style="background:var(--mark-2)"></b>Housing &amp; food</span>
      <span><b style="background:var(--ink-3)"></b>Books, travel &amp; personal (~$2,800)</span>
    </div>
    <p class="src">The co-op offset is real: a paid 6-month business co-op grosses ~$20–25K, and no tuition is billed that semester — but you still pay Boston living costs while working.</p>
  </div>
  <div class="cards g2" style="margin-top:16px">
    <div class="card">
      <h3>🎓 Aid: need strong, merit thin</h3>
      <ul>
        <li>First-years with need: <b>100% of need met</b>, average package ≈ <b>$60,400</b> (average need grant ≈ $58,700)</li>
        <li>Merit: only ~13% of first-years get non-need awards, averaging ≈ <b>$16,100</b> — helpful, not transformative, against $94K</li>
        <li>Upper-class need met averages ~87% — ask how packages hold after year one</li>
      </ul>
    </div>
    <div class="card">
      <h3>💵 Debt &amp; payoff</h3>
      <ul>
        <li>44% borrow; average cumulative debt ≈ <b>$32,500</b> (median federal ≈ $24,250)</li>
        <li>Median earnings ≈ <b>$92,500</b> (College Scorecard) — among the best in the country, and the clearest evidence the co-op model pays off</li>
        <li>Business co-op wages by concentration: finance third co-ops average <b>$32.72/hr</b>; accounting ≈ $30/hr</li>
      </ul>
      <div class="rq">"Without aid it isn't worth it. Co-op pays well, yes, but you also need to use that money to, like… live." … vs. "Add the value of the co-ops, and it could be easily worth it."<b>— r/NEU (archived threads) — the eternal debate</b></div>
    </div>
  </div>`
    },
    {
      id: 'business', nav: 'Business', kicker: 'Business', title: "D'Amore-McKim School of Business",
      lead: "D'Amore-McKim (AACSB-accredited, #20 Poets&Quants) is built around the co-op: a BSBA with 17 concentrations, 2 co-ops in 4 years or 3 in 5, and an outcome profile — 99% with job offers, 60% hired by a former co-op employer — that's the program's whole argument.",
      html: `
  <div class="cards g4">
    <div class="tile"><b>#20</b><span>Poets&amp;Quants best undergrad business (2026)</span></div>
    <div class="tile"><b>99%</b><span>with job offers within 9 months of graduation</span></div>
    <div class="tile"><b>60%</b><span>hired by an employer they already co-oped for</span></div>
    <div class="tile"><b>$82,064</b><span>average starting salary (median $80K; 20% clear $100K)</span></div>
  </div>
  <div class="cards g2">
    <div class="card">
      <h3>🔁 How the co-op works for business majors</h3>
      <ul>
        <li>Standard patterns: <b>2 co-ops in 4 years</b> or <b>3 co-ops in 5 years</b> — six-month, full-time, paid rotations</li>
        <li>No tuition during co-op semesters; wages $20–33/hr in business roles</li>
        <li>Graduating with 12–18 months of experience is why 60% get hired by a co-op employer — the job interview lasted six months</li>
        <li>17 concentrations (finance, fintech, analytics, entrepreneurship, supply chain, marketing…) plus combined majors like <b>Business + Computer Science</b></li>
      </ul>
    </div>
    <div class="card">
      <h3>💼 Where grads land</h3>
      <ul>
        <li>38% into finance/banking/insurance; top cities Boston, NYC, SF</li>
        <li>Employers: Goldman Sachs, JPMorgan, Morgan Stanley, BlackRock, Blackstone, McKinsey/Bain/BCG, the Big 4, Fidelity, State Street, Wayfair, DraftKings — even the Celtics and Red Sox</li>
        <li>23% got signing bonuses averaging $10,526</li>
      </ul>
      <div class="rq">"Because of the co-op system I have a year and a half of experience… landed a $100K+/yr job." … but note the 2025 mood: "check the sub for how many posts there are lamenting difficulties finding a co-op" — placement takes more hustle than it did in the boom years.<b>— r/NEU (archived threads)</b></div>
    </div>
  </div>`
    },
    {
      id: 'outcomes', nav: 'Outcomes', kicker: 'After graduation', title: 'Hiring rates & outcomes',
      lead: "Northeastern's outcome numbers are the strongest on this list — the co-op model front-loads work experience, and the earnings data shows it.",
      html: `
  <div class="cards g4">
    <div class="tile"><b>99%</b><span>of D'Amore-McKim grads with offers within 9 months</span></div>
    <div class="tile"><b>≈$92,500</b><span>median earnings, all majors (College Scorecard) — best on this list</span></div>
    <div class="tile"><b>$82,064</b><span>average business starting salary</span></div>
    <div class="tile"><b>~$24K</b><span>median federal debt — a strong debt-to-earnings ratio</span></div>
  </div>
  <div class="cards g2">
    <div class="card">
      <h3>📈 Why the numbers are this good</h3>
      <ul>
        <li>Every co-op is a six-month audition — 60% of business grads convert one into their first job</li>
        <li>Co-op earnings (~$20–50K total across rotations) offset real costs along the way</li>
        <li>The trade: most students take 4.5–5 years, and the CDS four-year graduation rate is effectively zero — that's the design, not a failure</li>
      </ul>
    </div>
    <div class="card">
      <h3>🎓 Worth asking on tour</h3>
      <ul>
        <li>What share of first co-op seekers place within one cycle in the current market?</li>
        <li>How does co-op advising work — dedicated advisors per college?</li>
        <li>What do housing and billing look like during co-op semesters (moving out mid-year is a real logistics item families flag)?</li>
      </ul>
    </div>
  </div>`
    },
    {
      id: 'studentlife', nav: 'Student Life', kicker: "Who's on campus", title: 'Student body & campus life',
      lead: "Official demographics from Northeastern's Common Data Set, plus student voice from r/NEU. The culture is famously pre-professional — the campus rhythm follows co-op cycles, with friends rotating in and out of the city.",
      html: `
  <div class="chart">
    <h3>Undergraduate demographics</h3>
    <div class="sub">22,695 undergrads, Fall 2024 (Common Data Set). 71% out-of-state; the first-year class is 60% women.</div>
    <div class="crow tight">
      <div class="lbl"><span>Gender</span><span class="tot">57.0% women · 42.8% men</span></div>
      <div class="bar-h" role="img" aria-label="Gender: 57 percent women, 42.8 percent men">
        <div class="seg s1" style="width:57%" data-tip="Women — 12,944 (57.0%)"><i>Women 57.0%</i></div>
        <div class="seg s2" style="width:43%" data-tip="Men — 9,705 (42.8%)"><i>Men 42.8%</i></div>
      </div>
    </div>
    <div class="crow tight" style="margin-top:20px">
      <div class="lbl"><span>White</span><span class="tot">40.6%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:100%;flex:none" data-tip="White — 40.6%"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Asian</span><span class="tot">22.4%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:55.2%;flex:none" data-tip="Asian — 22.4%"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>International</span><span class="tot">13.1%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:32.3%;flex:none" data-tip="International — 13.1%"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Hispanic / Latino</span><span class="tot">10.4%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:25.6%;flex:none" data-tip="Hispanic/Latino — 10.4%"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Two or more races</span><span class="tot">6.8%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:16.7%;flex:none" data-tip="Two or more races — 6.8%"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Black / African American</span><span class="tot">4.8%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:11.8%;flex:none" data-tip="Black — 4.8%"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Unknown</span><span class="tot">1.8%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:4.4%;flex:none" data-tip="Unknown — 1.8%"><i></i></div></div>
    </div>
    <p class="src">Bars scaled to the largest group. 99% of first-years live on campus; 57% of all undergrads do.</p>
  </div>
  <div class="cards g2" style="margin-top:16px">
    <div class="card">
      <h3>🎉 Party scene: reputation vs. reality</h3>
      <p>Tame by state-school standards — "NEU is not a party school" is the standing subreddit verdict. Weekend house parties exist, but social life runs through clubs, cultural orgs, the city, and co-op networks. Students who want big-game tailgates and frat rows will not find them here.</p>
      <div class="rq">"There are lots of spots and parties on the weekends… I promise you will find your people here." … "On campus, people pretty much do their own thing."<b>— r/NEU (archived threads)</b></div>
    </div>
    <div class="card">
      <h3>🏛️ Greek life: small</h3>
      <p><b>5% of men, 9% of women</b> join Greek organizations — present but peripheral, with no houses dominating the scene. The co-op cycle also disrupts chapter continuity: friends (and brothers/sisters) disappear for six months at a time, which students say makes every social group churn.</p>
    </div>
    <div class="card">
      <h3>🏒 Huskies sports</h3>
      <p>D1 in the <b>CAA</b> with hockey in <b>Hockey East</b> — and hockey is the identity: Northeastern won the <b>Beanpot</b> in 2018, '19, '20, and '23, and the women's program has been a Hockey East dynasty. <b>No football</b> (cut 2009). Matthews Arena — the world's oldest hockey arena — is worth the walk-by.</p>
    </div>
    <div class="card">
      <h3>💪 For a gym regular (PF member's guide)</h3>
      <p><b>Marino Recreation Center</b> (369 Huntington Ave) plus the Cabot Center and <b>SquashBusters</b> facility are all included for full-time students (Husky Card swipe; SquashBusters open ~5:30am–midnight weekdays). Solid facilities, though not UD/BU-scale palaces — Marino gets crowded at peak.</p>
      <p style="margin-top:10px"><b>Planet Fitness:</b> 361 Newbury St (Back Bay) is about a mile away — one Green Line stop or a 20-minute walk — with the Allston club as backup. A Black Card gives an escape valve for Marino rush hour and works back home on breaks.</p>
    </div>
  </div>
  <div class="card" style="margin-top:14px">
    <h3>🧾 The Reddit consensus, distilled</h3>
    <ul>
      <li><b>Co-op is the product, and it delivers</b> — but the 2025 market made first placements harder than the boom years; expect to hustle for co-op #1.</li>
      <li><b>Worth-it math:</b> full pay is widely questioned ("only worth it if u have good aid"); with aid or strong co-op earnings, sentiment flips positive.</li>
      <li><b>The culture is transactional by design:</b> friends leave for co-op mid-year; "there is a lot of fluidity in the student body… you need to weigh that."</li>
      <li><b>Housing is the operational gripe:</b> forced triples, a lottery students call rigged, co-op move-out logistics, and $1,500–1,800/room off campus.</li>
      <li><b>Admissions gamesmanship is openly discussed</b> — even the student paper flags that NU.in/Global Scholars admits aren't in the published 5.6%.</li>
    </ul>
    <p class="src">Sentiment from archived r/NEU threads via the Pullpush archive — real posts, anecdotes not statistics.</p>
  </div>`
    },
    {
      id: 'proscons', nav: 'Pros & Cons', kicker: 'The balance sheet', title: 'Pros & cons',
      lead: 'Compiled from the Common Data Set, employment reports, reviews, and archived r/NEU threads.',
      html: `
  <div class="cards g2">
    <div class="pc pros">
      <h3>Pros</h3>
      <ul>
        <li>The co-op program<small>#1-ranked; graduate with 12–18 months of real experience and 60% odds your co-op employer hires you</small></li>
        <li>Best outcomes on this list<small>~$92.5K median earnings vs ~$24K median federal debt; 99% business placement</small></li>
        <li>Boston location<small>Between Fenway and the MFA, with two T lines through campus</small></li>
        <li>Co-op economics<small>No tuition during co-op semesters + $20–33/hr wages meaningfully offset costs</small></li>
        <li>96.9% retention<small>Students who get in overwhelmingly stay — the model works for those who chose it</small></li>
        <li>100% of need met for first-years<small>Average package ≈ $60K for aided families</small></li>
        <li>Global options<small>NU.in/Oakland/London campuses, 100+ study-abroad pathways</small></li>
      </ul>
    </div>
    <div class="pc cons">
      <h3>Cons</h3>
      <ul>
        <li>Brutal admissions<small>5.6% published; realistically ED (43%) or the NU.in side door are the viable paths</small></li>
        <li>$94K sticker, thin merit<small>~13% get merit averaging just $16K; aid-less full pay is hard to justify even on Reddit</small></li>
        <li>4.5–5 year timeline<small>The co-op rhythm stretches family logistics and delays the degree</small></li>
        <li>Transactional culture<small>Pre-professional to its core; friend groups churn with co-op cycles</small></li>
        <li>Housing crunch<small>Forced triples, lottery complaints, co-op move-out fees, expensive off-campus market</small></li>
        <li>Rankings gamesmanship reputation<small>The published admit rate excludes thousands of pathway admits — know what offer you're actually getting</small></li>
        <li>No big-game sports scene<small>Hockey is great, but there's no football Saturday culture</small></li>
      </ul>
    </div>
  </div>`
    },
    {
      id: 'criticisms', nav: 'Criticisms', kicker: 'Straight talk', title: 'Criticisms & feedback, in detail',
      lead: 'What to probe on a Northeastern tour.',
      html: `
  <div class="cards g2">
    <div class="card">
      <h3>🎲 The admissions game</h3>
      <p>Northeastern's rise from ~#100 to top-50 tracked a deliberate strategy: massive application volume, test-optional early, and pathway programs whose admits don't hit the published rate. The student paper itself flags this. Practical takeaway: <b>treat an NU.in offer as its own decision</b> — first-semester-abroad logistics, credits, and costs deserve scrutiny before celebrating.</p>
    </div>
    <div class="card">
      <h3>🧳 Co-op reality check</h3>
      <p>Co-op placement is advised, not guaranteed — students apply and interview competitively, and 2025 threads note first co-ops took more applications than in boom years. Clinical/health co-ops can pay under $20/hr while business/CS pay $30+. Ask the tour guide how their first co-op search actually went.</p>
    </div>
    <div class="card">
      <h3>🛏️ Housing &amp; logistics</h3>
      <p>Over-enrollment has produced forced triples; the lottery draws the same fire as BU's; and co-op timing can force mid-year move-outs into paid summer housing. Off-campus rooms in Mission Hill/Fenway run $1,500–1,800. Budget and plan for year-by-year housing turbulence.</p>
    </div>
    <div class="card">
      <h3>🧭 Culture fit is the real question</h3>
      <p>Students who want the classic four-year campus arc — stable friend group, big games, springtime quad — report the co-op churn lonely. Students who want a running start on a career call it the best decision they made. This one's a personality test more than a stats comparison.</p>
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
        <dt>Visitor Center</dt><dd>West Village F, 40 Leon St, Boston, MA 02115</dd>
        <dt>Parking</dt><dd>West Village Garage (30 Leon St) — validated/complimentary for admissions visitors; overflow at Columbus Garage (795 Columbus Ave)</dd>
        <dt>By T</dt><dd>Green Line E to "Northeastern" (Huntington Ave) or Orange Line/commuter rail to Ruggles, which borders campus</dd>
        <dt>By car</dt><dd>~300–315 miles, 5–5.5 hr from the northern Philadelphia suburbs; longer through NYC traffic</dd>
      </dl>
      <div class="mapbtns">
        <a class="btn" href="https://maps.google.com/?q=Northeastern+Visitor+Center,+40+Leon+St,+Boston,+MA" rel="noopener">Open in Google Maps</a>
        <a class="btn alt" href="https://admissions.northeastern.edu/visit/" rel="noopener">Book a tour</a>
      </div>
    </div>
    <div class="card">
      <h3>🏙️ Don't-miss campus stops</h3>
      <ul>
        <li><b>Centennial Common</b> — the green heart of the surprisingly leafy campus</li>
        <li><b>The husky statue</b> — rub the nose for luck (Ely/Krentzman quad)</li>
        <li><b>Curry Student Center &amp; Snell Library</b></li>
        <li><b>ISEC + the pedestrian bridge</b> — the striking engineering complex over the rail corridor</li>
        <li><b>Marino Center</b> — walk the rec facilities</li>
        <li><b>Matthews Arena</b> — the world's oldest hockey arena, home of Beanpot banners</li>
      </ul>
    </div>
  </div>
  <div class="note">💡 <b>Good tour questions for a business kid:</b> How competitive was your first business co-op search, honestly? What percent of D'Amore-McKim students get a finance co-op in Boston vs. NYC? How do combined majors (Business + CS) handle co-op timing? What does the 4-year/2-co-op plan sacrifice vs. the 5-year/3-co-op plan?</div>`
    },
    {
      id: 'nearby', nav: 'Nearby', kicker: 'Around town', title: 'Boston & nearby',
      lead: "Northeastern's neighborhood spans Fenway, the Museum district, and the South End — walkable to nearly everything a visit day needs.",
      html: `
  <div class="cards g3">
    <div class="card"><h3>🖼️ Museum of Fine Arts</h3><p>Literally across Huntington Ave from campus — free for Northeastern students; even a one-hour visit is worth it.</p></div>
    <div class="card"><h3>⚾ Fenway Park</h3><p>0.7 miles — ballpark tours daily, and game nights electrify the whole neighborhood.</p></div>
    <div class="card"><h3>🛍️ Newbury Street</h3><p>A mile away: Boston's shopping street for a post-tour stroll.</p></div>
    <div class="card"><h3>🍜 Time Out Market</h3><p>Food hall at 401 Park Dr — the easy family-lunch pick between campus stops.</p></div>
    <div class="card"><h3>📚 Copley Square</h3><p>Boston Public Library and Trinity Church, 1.3 miles — pair with Newbury St.</p></div>
    <div class="card"><h3>🚴 Southwest Corridor Park</h3><p>The linear park/bike path along the Orange Line — the campus's green escape route.</p></div>
  </div>`
    },
    {
      id: 'timeline', nav: 'Timeline', kicker: 'Planning ahead', title: 'Timeline for a rising high-school junior',
      lead: 'Applying in fall 2027 for fall 2028 entry. At a 5.6% published rate, strategy matters more here than anywhere on the list.',
      html: `
  <ul class="tl">
    <li><span class="when">Now — summer 2026</span><b>Visit &amp; gut-check the co-op model</b><span>The 5-year rhythm and churn culture are the real decision. If the visit doesn't excite him about co-ops specifically, this school's premium isn't worth it.</span></li>
    <li><span class="when">Fall 2026 (junior year)</span><b>Maximum rigor + PSAT</b><span>87% of enrolled students had a 4.0 — the GPA bar is the highest on this list, and NEU actually values test scores ("very important").</span></li>
    <li><span class="when">Spring 2027</span><b>SAT/ACT — aim 1450+</b><span>Unlike the test-optional-in-practice schools, a strong score genuinely moves the needle here. Run the NPC too.</span></li>
    <li><span class="when">Summer 2027</span><b>The ED question</b><span>ED admits at ~43% vs ~5% overall — the biggest early-decision edge anywhere. Binding, so only if it's the clear #1 and aid math works.</span></li>
    <li><span class="when">Nov 1, 2027</span><b>ED I / EA deadline</b><span>EA is non-restrictive — a sane default if not committing. FAFSA/CSS due Nov 15 (ED) or later.</span></li>
    <li><span class="when">Jan 1, 2028</span><b>ED II / Regular Decision</b><span>If an offer comes via NU.in or Global Scholars, evaluate it as its own program — semester-abroad logistics and all.</span></li>
    <li><span class="when">May 1, 2028</span><b>Decision day</b><span>Compare offers with 5-year total-cost math: co-op wages and tuition-free work semesters genuinely change the spreadsheet.</span></li>
  </ul>`
    },
    {
      id: 'sources', nav: 'Sources', kicker: 'Fine print', title: 'Sources & notes',
      lead: 'Data compiled July 2026. Figures change annually — verify with official Northeastern pages.',
      html: `
  <div class="card">
    <ul style="font-size:13.5px">
      <li><a href="https://uds.northeastern.edu/wp-content/uploads/2026/03/CDS-2024-25.pdf" rel="noopener">Northeastern Common Data Set 2024–25</a> — admissions, demographics, aid, Greek life, retention</li>
      <li><a href="https://admissions.northeastern.edu/application-information/admissions-deadlines-decisions/" rel="noopener">Admissions deadlines</a> and <a href="https://admissions.northeastern.edu/visit/" rel="noopener">visit pages</a>; Huntington News (Class of 2029 admit rate and pathway-admit reporting)</li>
      <li><a href="https://damore-mckim.northeastern.edu/" rel="noopener">D'Amore-McKim</a> — undergraduate employment report (Class of 2023/latest), co-op wage report by concentration, program structure</li>
      <li><a href="https://www.usnews.com/best-colleges/northeastern-university-2199" rel="noopener">U.S. News</a> (#46, #1 co-ops) · Poets&amp;Quants (#20 undergrad business) · <a href="https://collegescorecard.ed.gov/" rel="noopener">College Scorecard</a> (earnings/debt)</li>
      <li><a href="https://recreation.northeastern.edu/" rel="noopener">Campus Recreation</a> (Marino/SquashBusters) · Planet Fitness Back Bay from planetfitness.com</li>
      <li>Student-voice quotes: archived r/NEU threads via the Pullpush archive (2025) — real posts; anecdotes, not statistics</li>
    </ul>
  </div>`
    }
  ]
};
