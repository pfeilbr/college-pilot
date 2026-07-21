window.SCHOOLS = window.SCHOOLS || {};
window.SCHOOLS['villanova'] = {
  id: 'villanova', name: 'Villanova University', short: 'Villanova', city: 'Villanova, PA',
  colors: { sc: '#00205B', scDark: '#001640' },
  locChip: '📍 The Main Line, suburban Philadelphia · ~45 min from the northern Philadelphia suburbs',
  heroTitle: 'Villanova University<br><span class="gold">Wildcats</span> at a glance',
  heroSub: "The hometown heavyweight: an Augustinian Catholic university on Philadelphia's Main Line with a top-tier undergraduate business school, championship basketball culture — and the highest graduate earnings of any school on this list.",
  heroStats: [
    { b: '27%', s: 'acceptance rate (College Scorecard, latest)' },
    { b: '$100,423', s: 'median earnings 10 years after entry — #1 on this list' },
    { b: '6,938', s: 'undergrads — the small-school option among the nine' },
    { b: '$84,793', s: 'total sticker cost/yr — but see the aid picture below' }
  ],
  visitCard: '<b>Visiting?</b> Book through the admission visit portal (tours meet at the Admission office — your confirmation gives the building and parking). Bonus: the <b>SEPTA Villanova station is literally on campus</b> (Paoli/Thorndale line) — the closest tour of the nine.',
  contact: {
    maps: 'https://maps.google.com/?q=Villanova+University,+800+Lancaster+Ave,+Villanova,+PA+19085',
    mapsLabel: '800 Lancaster Ave, Villanova, PA',
    tel: '+16105194000', telLabel: '610-519-4000 (admission)',
    email: 'gotovu@villanova.edu',
    tourUrl: 'https://www1.villanova.edu/university/undergraduate-admission/visit.html',
    siteUrl: 'https://www.villanova.edu', siteLabel: 'villanova.edu'
  },
  card: {
    type: 'Private (Catholic)',
    blurb: 'Main Line campus 45 min from home, elite VSB business school, championship hoops — and $100K median earnings at 10 years.',
    accept: '27%', rank: 'Top 60 national', cost: '$84.8K', sat: '1395–1510',
    undergrads: '6,938', biz: 'VSB (AACSB, direct admit)', placed: '~97–98%',
    grad4: '92% (6-yr)', greek: 'Moderate', sports: 'D1 Big East hoops',
    drive: '~45 min', deadlines: 'ED/EA Nov 1 · RD Jan 15'
  },
  sections: [
    {
      id: 'overview', nav: 'Overview', kicker: 'Overview', title: 'Quick facts',
      lead: "Villanova is the closest school on this list — a leafy Augustinian Catholic campus on Lancaster Avenue with its own SEPTA rail stop, 6,900 undergrads, and a community culture (\"Nova Nation\") that even its critics concede is real.",
      html: `
  <div class="cards g4">
    <div class="tile"><b>1842</b><span>founded by the Order of St. Augustine</span></div>
    <div class="tile"><b>95.1%</b><span>freshman retention · 91.9% graduation rate — elite numbers</span></div>
    <div class="tile"><b>$100K</b><span>median earnings 10 years after entry (College Scorecard) — highest of the nine</span></div>
    <div class="tile"><b>~11:1</b><span>student–faculty ratio; mid-size classes</span></div>
    <div class="tile"><b>3</b><span>NCAA basketball national titles — 1985, 2016, 2018</span></div>
    <div class="tile"><b>45 min</b><span>from home — the only school reachable for a casual second visit</span></div>
    <div class="tile"><b>On-campus</b><span>SEPTA regional rail station (Paoli/Thorndale line) → Center City ~25 min</span></div>
    <div class="tile"><b>$25,874</b><span>median debt at graduation — modest against those earnings</span></div>
  </div>
  <div class="cards g2">
    <div class="card">
      <h3>🐱 Wildcat lore</h3>
      <ul>
        <li><b>The 2016 buzzer-beater</b> — Kris Jenkins' championship three is replayed on every tour; 2018 made it back-to-back-ish under Jay Wright.</li>
        <li><b>The "Oreo"</b> — the black-and-white sculpture at the campus crossroads is the standard meeting spot.</li>
        <li>St. Thomas of Villanova Church's twin spires define the Main Line skyline.</li>
        <li>Augustinian motto: <em>Veritas, Unitas, Caritas</em> — truth, unity, love; service culture runs deep (the St. Thomas of Villanova Day of Service is huge).</li>
      </ul>
    </div>
    <div class="card">
      <h3>⭐ Notable alumni</h3>
      <ul>
        <li><b>Jalen Brunson &amp; Kyle Lowry</b> — NBA stars from the basketball dynasty years</li>
        <li><b>Jim Croce</b> — singer-songwriter ("Time in a Bottle")</li>
        <li><b>Howie Long</b> — NFL Hall of Famer and broadcaster</li>
        <li><b>Maria Bello</b> — actress</li>
        <li>A dense Philadelphia-region business and law alumni network</li>
      </ul>
    </div>
  </div>`
    },
    {
      id: 'admissions', nav: 'Admissions', kicker: 'Admissions', title: 'Getting in',
      lead: "Villanova admits roughly 1 in 4 — the third-hardest admit on this list — with an enrolled SAT band of about 1395–1510 (College Scorecard). It offers ED, non-binding EA, and RD; the business school is a direct-admit choice on the application and runs more competitive than the university overall.",
      html: `
  <div class="cards g4">
    <div class="tile"><b>27%</b><span>acceptance rate (Scorecard latest; ED runs meaningfully higher)</span></div>
    <div class="tile"><b>1395–1510</b><span>SAT middle 50% (Scorecard); test-optional in recent cycles</span></div>
    <div class="tile"><b>95.1%</b><span>freshman retention</span></div>
    <div class="tile"><b>91.9%</b><span>graduate within 6 years</span></div>
    <div class="tile"><b>Nov 1</b><span>Early Decision I and Early Action deadlines</span></div>
    <div class="tile"><b>Jan 15</b><span>Regular Decision (ED II typically mid-Jan) — verify current dates</span></div>
    <div class="tile"><b>Direct</b><span>apply straight into VSB (business) on the Common App</span></div>
    <div class="tile"><b>A-range</b><span>competitive profile: strong A/A- transcript with rigor is the realistic bar</span></div>
  </div>
  <div class="cards g2">
    <div class="card">
      <h3>📋 How Villanova reads applications</h3>
      <p>Holistic and essay-attentive, with course rigor and GPA leading. Test-optional has continued in recent cycles — submit around 1400+ (verify the current policy each cycle). Applying ED signals commitment and historically improves odds meaningfully; EA is the sane default for a strong-interest-but-not-certain applicant.</p>
    </div>
    <div class="card">
      <h3>🏫 Applying to VSB</h3>
      <p>The Villanova School of Business is a <b>direct-admit choice on the application</b> and draws the strongest applicant pool at the university — treat its effective bar as tougher than the 27% headline. Internal transfers into VSB later are possible but competitive and space-limited; apply direct if business is the plan (same lesson as Isenberg and Questrom).</p>
    </div>
  </div>`
    },
    {
      id: 'costs', nav: 'Costs & Aid', kicker: 'Costs & Aid', title: 'What it really costs',
      lead: "An $84.8K sticker — but the official net-price data tells a friendlier story at moderate incomes: families in the $48–75K bracket actually paid about $21K/yr on average after aid. Villanova uses the CSS Profile (both parents' finances typically count) and stacks real merit on top.",
      html: `
  <div class="chart">
    <h3>Sticker cost of attendance (latest reported)</h3>
    <div class="sub">Per year, on campus, before aid — College Scorecard / official figures. One rate for everyone.</div>
    <div class="crow">
      <div class="lbl"><span>Villanova</span><span class="tot">$84,793</span></div>
      <div class="bar-h" role="img" aria-label="Villanova: tuition and fees about $67,776, housing and food about $17,694, total about $84,793 with expenses">
        <div class="seg s1" style="width:77.5%" data-tip="Tuition &amp; fees — ~$67,776"><i>~$67,776</i></div>
        <div class="seg s2" style="width:20.2%" data-tip="Housing &amp; food — ~$17,694"><i>~$17,694</i></div>
        <div class="seg s3" style="width:2.3%" data-tip="Books &amp; personal — remainder"><i></i></div>
      </div>
    </div>
    <div class="legend">
      <span><b style="background:var(--mark-1)"></b>Tuition &amp; fees</span>
      <span><b style="background:var(--mark-2)"></b>Housing &amp; food</span>
      <span><b style="background:var(--ink-3)"></b>Books &amp; personal</span>
    </div>
    <p class="src">Actual average net price by income (official Scorecard data): &lt;$30K → $17.8K · $30–48K → $16.5K · $48–75K → <b>$20.9K</b> · $75–110K → $33.4K · $110K+ → $58.7K per year.</p>
  </div>
  <div class="cards g2" style="margin-top:16px">
    <div class="card">
      <h3>🎓 Aid &amp; merit</h3>
      <ul>
        <li><b>CSS Profile school</b> — institutional aid typically counts <b>both parents'</b> finances (noncustodial waivers are case-by-case)</li>
        <li>Need aid is genuinely strong at low/moderate incomes (see the official net prices above)</li>
        <li>Merit exists and stacks: the <b>Presidential Scholarship</b> (full ride, highly selective) headlines; smaller awards follow admission review</li>
        <li><b>PA State Grant works here</b> — it's a Pennsylvania school; no portability issue at all</li>
      </ul>
    </div>
    <div class="card">
      <h3>💵 Debt &amp; payoff — the headline</h3>
      <ul>
        <li>Median debt at graduation: <b>$25,874</b> — ordinary</li>
        <li>Median earnings 10 years after entry: <b>$100,423</b> — extraordinary; the best debt-to-earnings ratio of the nine schools</li>
        <li>Commuting is a real cost lever nobody else on this list offers: living at home could cut ~$18K/yr, though freshman residency is the norm</li>
      </ul>
    </div>
  </div>`
    },
    {
      id: 'business', nav: 'Business', kicker: 'Business', title: 'Villanova School of Business (VSB)',
      lead: "VSB is a consensus top-tier undergraduate business school — AACSB-accredited, regularly top-10/15 in Poets&Quants-style rankings — with co-major flexibility, a strong finance/accounting core, and a Philadelphia–NYC recruiting corridor. For a business-minded student it's the most credentialed program within an hour of home.",
      html: `
  <div class="cards g4">
    <div class="tile"><b>Top tier</b><span>consistently ranked among the best undergrad business schools nationally</span></div>
    <div class="tile"><b>Direct</b><span>admit as a freshman; business core starts year one</span></div>
    <div class="tile"><b>~97–98%</b><span>typical VSB placement within 6 months (verify current class report)</span></div>
    <div class="tile"><b>$100K</b><span>whole-university median 10-yr earnings — VSB is a big reason why</span></div>
  </div>
  <div class="cards g2">
    <div class="card">
      <h3>🏦 What stands out</h3>
      <ul>
        <li>Majors across finance, accounting, marketing, management, MIS, economics, business analytics, and real estate — with easy co-majors/minors</li>
        <li>An applied-finance lab and student-managed investment funds give the hands-on layer</li>
        <li>Recruiting: Big 4, Philadelphia/NYC banking (Vanguard is practically a neighbor), and the tight "Nova Nation" alumni network — famous for answering the phone</li>
        <li>The Augustinian core curriculum rides under the business degree — smaller than Fordham's Jesuit core but real</li>
      </ul>
    </div>
    <div class="card">
      <h3>⚖️ Honest caveats</h3>
      <ul>
        <li>VSB's effective admit bar is the highest of any direct-admit business program on this list except Questrom — the 27% headline understates it</li>
        <li>Culture is polished and pre-professional; students who found Delaware's energy fun may find Nova buttoned-up</li>
        <li>Verify current VSB-specific placement/salary stats on the visit — the university publishes class outcome reports</li>
      </ul>
    </div>
  </div>`
    },
    {
      id: 'outcomes', nav: 'Outcomes', kicker: 'After graduation', title: 'Hiring & outcomes',
      lead: "Villanova's outcome profile is the quiet star of this entire comparison.",
      html: `
  <div class="cards g4">
    <div class="tile"><b>$100,423</b><span>median earnings 10 years after entry — #1 of the nine schools</span></div>
    <div class="tile"><b>91.9%</b><span>graduation rate · 95.1% retention</span></div>
    <div class="tile"><b>$25,874</b><span>median debt — a ~4:1 earnings-to-debt ratio</span></div>
    <div class="tile"><b>~97%+</b><span>typical university placement within 6 months</span></div>
  </div>
  <div class="cards g2">
    <div class="card">
      <h3>💼 Where grads land</h3>
      <ul>
        <li>Finance and accounting into Philadelphia/NYC: Vanguard, the Big 4, the bulge brackets, and regional banking</li>
        <li>Engineering and nursing (both strong) lift the earnings median alongside VSB</li>
        <li>The alumni network's loyalty is the recurring theme in every review of Nova recruiting</li>
      </ul>
    </div>
    <div class="card">
      <h3>📊 The comparison that matters</h3>
      <p>Against the Boston privates: similar sticker, similar aid model (CSS), <b>higher measured earnings</b>, and a campus 45 minutes from home instead of 5½ hours. Against Delaware/PSU/Pitt: roughly double the net cost at higher incomes, for a measurably stronger brand and network. That's the actual trade on the table.</p>
    </div>
  </div>`
    },
    {
      id: 'studentlife', nav: 'Student Life', kicker: "Who's on campus", title: 'Student body & campus life',
      lead: "Official demographics from College Scorecard. The culture: tight-knit, spirited, service-oriented — and the standing critique is homogeneity (\"Vanillanova\").",
      html: `
  <div class="chart">
    <h3>Undergraduate demographics</h3>
    <div class="sub">6,938 undergrads (College Scorecard, latest).</div>
    <div class="crow tight">
      <div class="lbl"><span>Gender</span><span class="tot">53.8% women · 46.2% men</span></div>
      <div class="bar-h" role="img" aria-label="Gender: 53.8 percent women, 46.2 percent men">
        <div class="seg s1" style="width:53.8%" data-tip="Women — 53.8%"><i>Women 53.8%</i></div>
        <div class="seg s2" style="width:46.2%" data-tip="Men — 46.2%"><i>Men 46.2%</i></div>
      </div>
    </div>
    <div class="crow tight" style="margin-top:20px">
      <div class="lbl"><span>White</span><span class="tot">67.7%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:100%;flex:none" data-tip="White — 67.7%"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Hispanic / Latino</span><span class="tot">11.3%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:16.7%;flex:none" data-tip="Hispanic/Latino — 11.3%"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Asian</span><span class="tot">6.7%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:9.9%;flex:none" data-tip="Asian — 6.7%"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Black / African American</span><span class="tot">6.5%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:9.6%;flex:none" data-tip="Black — 6.5%"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Two or more races</span><span class="tot">4.1%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:6.1%;flex:none" data-tip="Two or more — 4.1%"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>International</span><span class="tot">1.8%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:2.7%;flex:none" data-tip="International — 1.8%"><i></i></div></div>
    </div>
    <p class="src">Bars scaled to the largest group. The least international campus of the nine — the "Vanillanova" nickname exists for a reason, and the university openly works on it.</p>
  </div>
  <div class="cards g2" style="margin-top:16px">
    <div class="card">
      <h3>🎉 Party scene: reputation vs. reality</h3>
      <p>Moderate and mostly off-campus — Main Line borough rules keep on-campus tame, so the scene lives in nearby apartments/houses and Philly outings. Basketball season is the social calendar's spine. Nobody picks Nova for ragers; nobody starves socially either.</p>
    </div>
    <div class="card">
      <h3>🏀 Wildcats sports = Big East basketball</h3>
      <p>Football is FCS-quiet, but <b>basketball is elite</b>: three national titles, Finneran Pavilion on campus plus big games at the Wells Fargo Center, and a March Madness culture the whole region joins. THE best sports-spirit-per-square-foot on this list after Penn State.</p>
    </div>
    <div class="card">
      <h3>🏛️ Greek life: present, not dominant</h3>
      <p>A meaningful minority join (roughly a quarter historically — verify current numbers on tour); rush is deferred to spring. Service organizations and intramurals carry as much social weight as Greek letters here.</p>
    </div>
    <div class="card">
      <h3>💪 For a gym regular (PF member's guide)</h3>
      <p>Campus fitness lives in the Davis Center complex (included for students). And the Main Line/King of Prussia corridor has multiple <b>Planet Fitness</b> clubs within a 10–15 minute drive — plus his current home club stays in range. The only school on the list where "keep everything exactly as-is" works.</p>
    </div>
  </div>`
    },
    {
      id: 'proscons', nav: 'Pros & Cons', kicker: 'The balance sheet', title: 'Pros & cons',
      lead: 'Compiled from official Scorecard data and the school\'s public reputation record.',
      html: `
  <div class="cards g2">
    <div class="pc pros">
      <h3>Pros</h3>
      <ul>
        <li>Best measured outcomes on the list<small>$100K median 10-yr earnings; 92% graduation; elite retention</small></li>
        <li>Top-tier direct-admit business school<small>VSB's brand + the Nova alumni network in Philly/NYC finance</small></li>
        <li>45 minutes from home<small>Easy second visits, easy holidays, easy emergencies — and commuting is a real cost option</small></li>
        <li>Strong aid at moderate incomes<small>Actual net ≈$21K/yr in the $48–75K bracket (official data)</small></li>
        <li>Real school spirit without a mega-campus<small>Championship basketball culture at a 7,000-undergrad school</small></li>
        <li>SEPTA on campus<small>Center City in ~25 min; the region is the campus</small></li>
        <li>PA State Grant applies<small>No portability question — it's a PA school</small></li>
      </ul>
    </div>
    <div class="pc cons">
      <h3>Cons</h3>
      <ul>
        <li>Homogeneity<small>68% white, 1.8% international — the least diverse campus of the nine ("Vanillanova")</small></li>
        <li>High-income families pay ~$59K+<small>The aid curve is steep above $110K; merit is competitive, not automatic</small></li>
        <li>Preppy, polished culture<small>Wealth is visible; students who want gritty or quirky may chafe</small></li>
        <li>Close to home cuts both ways<small>45 minutes can feel like not-really-leaving for a kid who wants distance</small></li>
        <li>VSB bar is high<small>The direct-admit pool is stronger than the university's 27% suggests</small></li>
        <li>Suburban quiet<small>The Main Line is lovely and sedate; Philly requires the train</small></li>
      </ul>
    </div>
  </div>`
    },
    {
      id: 'criticisms', nav: 'Criticisms', kicker: 'Straight talk', title: 'Criticisms & feedback, in detail',
      lead: 'What to probe on a Villanova tour.',
      html: `
  <div class="cards g2">
    <div class="card">
      <h3>🍦 The "Vanillanova" question</h3>
      <p>The nickname covers both demographics (the Scorecard numbers above) and vibe (affluent, polished, uniform). Ask student guides — especially any from public high schools — how socioeconomic mix actually feels day-to-day, and what the university's diversity initiatives have changed.</p>
    </div>
    <div class="card">
      <h3>💸 The aid cliff</h3>
      <p>The official net-price curve is generous through ~$75K income and steep after ~$110K. For a divorced-parent family, the CSS both-parents math decides which side of that curve applies — run Villanova's NPC with combined finances before assuming the $21K story.</p>
    </div>
    <div class="card">
      <h3>🏠 Housing &amp; the junior scramble</h3>
      <p>Housing has historically been guaranteed for underclassmen with many juniors moving off campus into the Main Line apartment market — pricier than a college town. Ask current students what off-campus actually costs and how the new dorm construction has changed the lottery.</p>
    </div>
    <div class="card">
      <h3>📚 Catholic identity — feature or friction?</h3>
      <p>Augustinian values shape the core curriculum, service expectations, and campus norms (including residence policies). Families vary on whether that's a selling point or a constraint — worth an honest conversation after the tour rather than during it.</p>
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
        <dt>Campus</dt><dd>800 Lancaster Ave, Villanova, PA 19085 — book via the visit portal; your confirmation names the check-in building and parking lot</dd>
        <dt>By car</dt><dd>~45 min from the northern Philadelphia suburbs (Blue Route/I-476 to Villanova exits)</dd>
        <dt>By train</dt><dd>SEPTA Paoli/Thorndale line — the Villanova station is ON campus; there's also a Norristown High Speed Line stop</dd>
        <dt>Pro move</dt><dd>This is the easy one — do a casual unofficial walk-through first, then the formal tour later if it survives the first cut</dd>
      </dl>
      <div class="mapbtns">
        <a class="btn" href="https://maps.google.com/?q=Villanova+University,+800+Lancaster+Ave,+Villanova,+PA" rel="noopener">Open in Google Maps</a>
        <a class="btn alt" href="https://www1.villanova.edu/university/undergraduate-admission/visit.html" rel="noopener">Book a tour</a>
      </div>
    </div>
    <div class="card">
      <h3>⛪ Don't-miss campus stops</h3>
      <ul>
        <li><b>St. Thomas of Villanova Church</b> — the twin-spire icon</li>
        <li><b>The Oreo</b> — the sculpture where everyone meets</li>
        <li><b>Bartley Hall</b> — VSB's home; ask to see the finance lab</li>
        <li><b>Finneran Pavilion</b> — the basketball cathedral</li>
        <li><b>The Quad and Mendel Field</b> — the campus's green heart</li>
      </ul>
    </div>
  </div>
  <div class="note">💡 <b>Good tour questions for a business kid:</b> What are VSB's latest placement rate and median salary? How does the freshman business core work, and how easy are co-majors? What share of VSB internships come through alumni? How competitive is internal transfer into VSB for non-VSB admits?</div>`
    },
    {
      id: 'nearby', nav: 'Nearby', kicker: 'Around town', title: 'The Main Line & nearby',
      lead: "Villanova sits in the middle of Philadelphia's classic suburban corridor.",
      html: `
  <div class="cards g3">
    <div class="card"><h3>🏙️ Center City Philly</h3><p>~25 minutes on SEPTA from the on-campus station — internships, restaurants, and every weekend option.</p></div>
    <div class="card"><h3>🛍️ King of Prussia</h3><p>One of America's biggest malls, 15 minutes away — also a major internship/employer corridor.</p></div>
    <div class="card"><h3>☕ Wayne &amp; Bryn Mawr</h3><p>The Main Line's walkable downtowns — cafés, restaurants, and the collegiate strip shared with Haverford/Bryn Mawr students.</p></div>
    <div class="card"><h3>🌳 Valley Forge</h3><p>National park trails 15 minutes west for runs and Sunday walks.</p></div>
    <div class="card"><h3>🏀 Wells Fargo Center</h3><p>Big Nova games move to South Philly — a Sixers/Flyers arena as a second home court.</p></div>
    <div class="card"><h3>🏠 Home</h3><p>45 minutes. Laundry privileges negotiable.</p></div>
  </div>`
    },
    {
      id: 'timeline', nav: 'Timeline', kicker: 'Planning ahead', title: 'Timeline for a rising high-school junior',
      lead: 'Applying in fall 2027 for fall 2028 entry.',
      html: `
  <ul class="tl">
    <li><span class="when">Now — summer 2026</span><b>Do the casual visit first</b><span>It's 45 minutes away — walk campus on a Saturday before spending a formal visit slot.</span></li>
    <li><span class="when">Fall 2026 (junior year)</span><b>Rigor + PSAT</b><span>The realistic VSB bar: strong A-range transcript. Aim the SAT at 1400+.</span></li>
    <li><span class="when">Spring 2027</span><b>SAT + run the NPC both ways</b><span>Custodial-only vs. combined-parent CSS math decides whether Nova is a $21K school or a $59K school for this family.</span></li>
    <li><span class="when">Summer 2027</span><b>Essays + the ED question</b><span>ED helps at Nova. Only commit if the NPC (combined finances) works and it beats the in-state options by enough.</span></li>
    <li><span class="when">Nov 1, 2027</span><b>ED I / EA deadline</b><span>Apply direct to VSB. EA is the keep-options-open play.</span></li>
    <li><span class="when">Jan 15, 2028</span><b>Regular Decision</b><span>ED II typically available mid-January if an early school declines.</span></li>
    <li><span class="when">May 1, 2028</span><b>Decision day</b><span>Weigh the real aid letter against Pitt/PSU in-state math and the Boston offers.</span></li>
  </ul>`
    },
    {
      id: 'sources', nav: 'Sources', kicker: 'Fine print', title: 'Sources & notes',
      lead: 'Stats pulled deterministically from official federal data (see the repo\'s fetch script); editorial content compiled July 2026. Verify details with official Villanova pages.',
      html: `
  <div class="card">
    <ul style="font-size:13.5px">
      <li><b>College Scorecard (U.S. Dept. of Education)</b> — acceptance rate, SAT band, enrollment, demographics, costs, net price by income, debt, earnings; refreshed via <code>scripts/fetch_school_data.py</code> → <code>data/generated/scorecard.json</code></li>
      <li><a href="https://www1.villanova.edu/university/undergraduate-admission.html" rel="noopener">Villanova Undergraduate Admission</a> — deadlines, visit portal, test policy (verify each cycle)</li>
      <li><a href="https://www1.villanova.edu/university/business.html" rel="noopener">Villanova School of Business</a> — programs and outcome reports</li>
      <li>This guide is lighter on student-forum sentiment than the original six — Reddit mining for r/villanova is queued; treat culture notes as reputation-level, not quote-level</li>
    </ul>
  </div>`
    }
  ]
};
