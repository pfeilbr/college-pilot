window.SCHOOLS = window.SCHOOLS || {};
window.SCHOOLS['ohiostate'] = {
  id: 'ohiostate', name: 'Ohio State University', short: 'Ohio State', city: 'Columbus, OH',
  colors: { sc: '#BB0000', scDark: '#8E0000' },
  locChip: '📍 Columbus, Ohio · ~6½ hr from the northern Philadelphia suburbs',
  heroTitle: 'Ohio State University<br><span class="gold">Buckeyes</span> at a glance',
  heroSub: "If Penn State is the model, Ohio State is the same idea at maximum scale: a giant Big Ten flagship in a booming state capital, football Saturdays in a 100,000-seat Horseshoe, and Fisher — one of the best public business schools in the country. Pennsylvania's state grant even travels here.",
  heroStats: [
    { b: '60.6%', s: 'acceptance rate (College Scorecard, latest)' },
    { b: '45,638', s: 'undergrads — the biggest campus on this list' },
    { b: '$40,022', s: 'out-of-state tuition/yr (in-state is $13,244)' },
    { b: '1310–1480', s: 'SAT middle 50% — a notch above Penn State' }
  ],
  visitCard: '<b>Visiting?</b> Tours leave from the <b>Student Academic Services Building, 281 W Lane Ave</b>, and fill up — book early through admissions.osu.edu. Save time for the <b>Oval</b> and, in season, a look inside <b>Ohio Stadium</b>. Columbus is a real city — pair the visit with the Short North.',
  contact: {
    maps: 'https://maps.google.com/?q=Ohio+State+University+Welcome+Center,+281+W+Lane+Ave,+Columbus,+OH+43210',
    mapsLabel: '281 W Lane Ave · Columbus',
    tel: '+16142923980', telLabel: '614-292-3980 (admissions)',
    email: 'askabuckeye@osu.edu',
    tourUrl: 'https://admissions.osu.edu/visit/',
    siteUrl: 'https://www.osu.edu', siteLabel: 'osu.edu'
  },
  card: {
    type: 'Public flagship (OOS)',
    blurb: 'Penn State\'s bigger Midwestern twin: Big Ten football, a booming state-capital economy, and Fisher — a top public business school. PA grant travels here.',
    accept: '60.6%', rank: 'Top 20 public', cost: '$58K OOS est.', sat: '1310–1480',
    undergrads: '45,638', biz: 'Fisher (AACSB, top public)', placed: 'strong (Columbus HQ economy)',
    grad4: '87.7% (6-yr)', greek: '~11%', sports: 'Big Ten · the Horseshoe',
    drive: '~6½ hr', deadlines: 'EA Nov 1 · RD Feb 1'
  },
  sections: [
    {
      id: 'overview', nav: 'Overview', kicker: 'Overview', title: 'Quick facts',
      lead: "Ohio State is a public flagship at a scale even Penn State doesn't match — 45,000+ undergrads on a single campus in Columbus, one of the fastest-growing cities in the country (Intel, JPMorgan Chase's largest campus, Nationwide, Battelle). For a business student who loves the Penn State vibe, this is that vibe plus a bigger internship economy across the street.",
      html: `
  <div class="cards g4">
    <div class="tile"><b>1870</b><span>founded as Ohio's land-grant university</span></div>
    <div class="tile"><b>45,638</b><span>undergrads — plan for scale in every direction</span></div>
    <div class="tile"><b>94%</b><span>freshman retention · 87.7% graduate within 6 years</span></div>
    <div class="tile"><b>#1 city</b><span>Columbus: a fast-growing state capital with a huge white-collar hiring base</span></div>
    <div class="tile"><b>~$7B+</b><span>endowment — research-heavyweight resources</span></div>
    <div class="tile"><b>200+</b><span>majors · 1,400+ student organizations</span></div>
    <div class="tile"><b>Big Ten</b><span>Ohio Stadium ("the Horseshoe") seats 100,000+</span></div>
    <div class="tile"><b>PA grant</b><span>Ohio is a PA State Grant reciprocal state — it travels here (rare for OOS)</span></div>
  </div>
  <div class="cards g2">
    <div class="card">
      <h3>🌰 Buckeye lore</h3>
      <ul>
        <li>A "buckeye" is a nut — mildly poisonous, oddly beloved; the chocolate-and-peanut-butter candy is a tailgate staple.</li>
        <li><b>Brutus Buckeye</b> is the mascot; "O-H!" earns an "I-O!" back anywhere in the world.</li>
        <li>Script Ohio, dotted by a sousaphone player, is one of college football's signature traditions.</li>
        <li>Insiders write it <b>"The Ohio State University"</b> — the "The" is a whole thing.</li>
      </ul>
    </div>
    <div class="card">
      <h3>⭐ Notable alumni</h3>
      <ul>
        <li><b>Les Wexner</b> — founder of L Brands (Victoria's Secret / Bath &amp; Body Works)</li>
        <li><b>Bob Evans, Wendy's-era leadership</b> — Columbus food-business roots run deep</li>
        <li>A deep bench of Fortune 500 finance and marketing leaders across the Midwest</li>
        <li><b>Jack Nicklaus</b> — golf legend (and the Memorial Tournament host)</li>
      </ul>
    </div>
  </div>`
    },
    {
      id: 'admissions', nav: 'Admissions', kicker: 'Admissions', title: 'Getting in',
      lead: "Ohio State admits ~61% with an enrolled SAT band of 1310–1480 — a touch stronger than Penn State's pool, and stronger than most of the other new publics here. Apply Early Action by Nov 1: it's non-binding, it's when scholarship review happens, and it's how you get into the honors and business tracks.",
      html: `
  <div class="cards g4">
    <div class="tile"><b>60.6%</b><span>acceptance rate (Scorecard latest)</span></div>
    <div class="tile"><b>1310–1480</b><span>SAT middle 50%; test-optional in recent cycles</span></div>
    <div class="tile"><b>94%</b><span>freshman retention</span></div>
    <div class="tile"><b>87.7%</b><span>graduate within 6 years</span></div>
    <div class="tile"><b>Nov 1</b><span>Early Action deadline — non-binding, and the one that matters for scholarships</span></div>
    <div class="tile"><b>Feb 1</b><span>Regular deadline</span></div>
    <div class="tile"><b>Holistic</b><span>rigor + GPA lead; essays and activities considered</span></div>
    <div class="tile"><b>Honors/Scholars</b><span>separate application layers for smaller communities inside the giant</span></div>
  </div>
  <div class="cards g2">
    <div class="card">
      <h3>📋 How Ohio State reads applications</h3>
      <p>Transcript-first holistic review at scale. The lever is <b>applying Early Action by Nov 1</b> — that's when the university considers merit scholarships and honors admission, and OOS students who apply late leave money and access on the table. Target the 1350+/A-range zone to be competitive for merit as an out-of-state applicant.</p>
    </div>
    <div class="card">
      <h3>🏫 Applying to Fisher (business)</h3>
      <p>Business is a competitive path within the university. Strong applicants can gain <b>direct admission to Fisher</b>; others enter as pre-business and complete a set of gateway courses to advance. Apply EA, flag business as your intended major, and consider the honors and scholars programs — they're how you make a 45,000-student campus feel small.</p>
    </div>
  </div>`
    },
    {
      id: 'costs', nav: 'Costs & Aid', kicker: 'Costs & Aid', title: 'What it costs out-of-state',
      lead: "As an out-of-state public, Ohio State's sticker lands near $58K — but two things soften it: OSU offers real out-of-state merit (the Maximus, Trustees, and Provost awards), and Ohio is one of the few states where the Pennsylvania State Grant is portable. FAFSA-only aid rules apply.",
      html: `
  <div class="chart">
    <h3>Estimated cost of attendance (out-of-state, latest reported)</h3>
    <div class="sub">Per year on campus — built from College Scorecard tuition + housing figures. In-state tuition is far lower ($13,244) — these numbers are the OOS reality for a PA family.</div>
    <div class="crow">
      <div class="lbl"><span>Ohio State (out-of-state)</span><span class="tot">~$58,460</span></div>
      <div class="bar-h" role="img" aria-label="Ohio State out-of-state: tuition about $40,022, housing and food about $14,738, books and other remainder, total about $58,460">
        <div class="seg s1" style="width:68.5%" data-tip="Tuition &amp; fees — ~$40,022 (out-of-state)"><i>~$40,022</i></div>
        <div class="seg s2" style="width:25.2%" data-tip="Housing &amp; food — ~$14,738"><i>~$14,738</i></div>
        <div class="seg s3" style="width:6.3%" data-tip="Books, travel &amp; personal — remainder"><i></i></div>
      </div>
    </div>
    <div class="legend">
      <span><b style="background:var(--mark-1)"></b>Tuition &amp; fees (OOS)</span>
      <span><b style="background:var(--mark-2)"></b>Housing &amp; food</span>
      <span><b style="background:var(--ink-3)"></b>Books, travel &amp; personal</span>
    </div>
    <p class="src">Official average net price by income (mostly in-state students): &lt;$30K → $4.9K · $30–48K → $5.8K · $48–75K → $9.8K · $75–110K → $20.5K · $110K+ → $27.4K. Out-of-state runs higher — merit is the lever.</p>
  </div>
  <div class="cards g2" style="margin-top:16px">
    <div class="card">
      <h3>🎓 Aid &amp; merit</h3>
      <ul>
        <li><b>FAFSA-only</b> — one-parent income counts; the right structure for this family</li>
        <li><b>Out-of-state merit is real:</b> stacked scholarships (Maximus / Trustees / Provost tiers) reward strong stats regardless of income</li>
        <li><b>PA State Grant travels</b> — Ohio is a reciprocal state, a genuine edge over Rutgers/Indiana/South Carolina</li>
        <li>No need-met pledge for OOS — merit plus the PA grant is the plan</li>
      </ul>
    </div>
    <div class="card">
      <h3>💵 Debt &amp; payoff</h3>
      <ul>
        <li>Median debt: <b>$19,976</b> — among the lowest on this list</li>
        <li>Median earnings 10 years after entry: <b>$60,409</b> (all majors; Fisher business runs well above it)</li>
        <li>Bottom line: with merit + PA grant, a strong applicant can pull the net toward the low-$40Ks — competitive with the OOS publics despite a big sticker</li>
      </ul>
    </div>
  </div>`
    },
    {
      id: 'business', nav: 'Business', kicker: 'Business', title: 'Fisher College of Business',
      lead: "Fisher is one of the strongest public undergraduate business schools in the country — AACSB-accredited, deeply resourced, and plugged into a Columbus economy stuffed with Fortune 500 headquarters. For a business kid, it's the marquee reason to look past the distance.",
      html: `
  <div class="cards g4">
    <div class="tile"><b>Top public</b><span>Fisher's undergraduate program ranks among the best public business schools nationally</span></div>
    <div class="tile"><b>AACSB</b><span>majors across finance, accounting, marketing, logistics/supply chain, business analytics, and more</span></div>
    <div class="tile"><b>HQ economy</b><span>JPMorgan Chase (its largest campus), Nationwide, Cardinal Health, L Brands, Huntington — all hiring in town</span></div>
    <div class="tile"><b>Honors cohort</b><span>Fisher Honors and living-learning communities shrink the scale for business students</span></div>
  </div>
  <div class="cards g2">
    <div class="card">
      <h3>🏢 What stands out</h3>
      <ul>
        <li>Enormous recruiting pull — the corporate base in Columbus means real school-year and summer internships, not just distant applications</li>
        <li>Strong finance, logistics/supply chain, and marketing programs with deep alumni networks across the Midwest and beyond</li>
        <li>Business analytics and a well-run career-management office; consulting and Big 4 accounting recruit on campus</li>
        <li>Scale = choice: more majors, minors, clubs, and case competitions than most schools can field</li>
      </ul>
    </div>
    <div class="card">
      <h3>⚖️ Honest caveats</h3>
      <ul>
        <li>Direct admission to Fisher is competitive — a pre-business path exists but it's a gate, so aim high on stats</li>
        <li>Midwest/Columbus is the placement center of gravity; NYC finance is doable but not the default pipeline</li>
        <li>Verify Fisher's current placement rate and median starting salary on the visit</li>
      </ul>
    </div>
  </div>`
    },
    {
      id: 'outcomes', nav: 'Outcomes', kicker: 'After graduation', title: 'Hiring & outcomes',
      lead: "Strong retention and graduation numbers, low debt, and a business-school pipeline into a headquarters-dense city — the ROI case is real if the merit comes through.",
      html: `
  <div class="cards g4">
    <div class="tile"><b>$60,409</b><span>median 10-yr earnings, all majors (Scorecard)</span></div>
    <div class="tile"><b>87.7%</b><span>graduation rate · 94% retention</span></div>
    <div class="tile"><b>$19,976</b><span>median debt — among the lowest here</span></div>
    <div class="tile"><b>HQ pipeline</b><span>a Fortune 500 city hiring business students year-round</span></div>
  </div>
  <div class="cards g2">
    <div class="card">
      <h3>💼 Where business grads land</h3>
      <ul>
        <li>Columbus finance and insurance (JPMorgan Chase, Nationwide, Huntington), Big 4 accounting, and national consulting</li>
        <li>Retail/brand management (L Brands lineage, Abercrombie, Cardinal Health) — Columbus is a marketing town</li>
        <li>The Buckeye alumni network is one of the largest in the country — an underrated long-term asset</li>
      </ul>
    </div>
    <div class="card">
      <h3>🎓 Worth asking on tour</h3>
      <ul>
        <li>Fisher's current placement rate and median starting salary by major</li>
        <li>How direct admission vs. the pre-business gateway actually works</li>
        <li>What OOS merit a student with his stats would realistically be offered</li>
      </ul>
    </div>
  </div>`
    },
    {
      id: 'studentlife', nav: 'Student Life', kicker: "Who's on campus", title: 'Student body & campus life',
      lead: "Official demographics from College Scorecard. The vibe: enormous, spirited, and unapologetically Big Ten — a Penn State-scale game-day culture with a real city attached.",
      html: `
  <div class="chart">
    <h3>Undergraduate demographics</h3>
    <div class="sub">45,638 undergrads, Columbus campus (College Scorecard, latest).</div>
    <div class="crow tight">
      <div class="lbl"><span>Gender</span><span class="tot">50.5% women · 49.5% men</span></div>
      <div class="bar-h" role="img" aria-label="Gender: 50.5 percent women, 49.5 percent men">
        <div class="seg s1" style="width:50.5%" data-tip="Women — 50.5%"><i>Women 50.5%</i></div>
        <div class="seg s2" style="width:49.5%" data-tip="Men — 49.5%"><i>Men 49.5%</i></div>
      </div>
    </div>
    <div class="crow tight" style="margin-top:20px">
      <div class="lbl"><span>White</span><span class="tot">59.8%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:100%;flex:none" data-tip="White — 59.8%"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Asian</span><span class="tot">10.8%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:18.1%;flex:none" data-tip="Asian — 10.8%"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Black / African American</span><span class="tot">7.9%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:13.2%;flex:none" data-tip="Black — 7.9%"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>International</span><span class="tot">7.6%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:12.7%;flex:none" data-tip="International — 7.6%"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Hispanic / Latino</span><span class="tot">5.8%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:9.7%;flex:none" data-tip="Hispanic/Latino — 5.8%"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Two or more races</span><span class="tot">4.9%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:8.2%;flex:none" data-tip="Two or more — 4.9%"><i></i></div></div>
    </div>
    <p class="src">Bars scaled to the largest group.</p>
  </div>
  <div class="cards g2" style="margin-top:16px">
    <div class="card">
      <h3>🎉 Party scene: reputation vs. reality</h3>
      <p>Big — this is a major football school and the scene around campus (the "Oval"-adjacent bars, High Street) is lively, especially on game weekends. As at Penn State, it's entirely avoidable: the sheer number of clubs, honors communities, and the city itself give non-party students plenty of their own people.</p>
    </div>
    <div class="card">
      <h3>🏛️ Greek life: present, not required</h3>
      <p>Roughly a tenth of students go Greek — a visible scene but far from mandatory on a campus this large. Most social life organizes around dorm communities, majors, clubs, and Columbus.</p>
    </div>
    <div class="card">
      <h3>🏈 Buckeyes sports</h3>
      <p><b>Ohio Stadium</b> — the 100,000-seat Horseshoe — is the closest thing on this list to Penn State's White Out. Football is a religion; basketball, hockey, and a broad varsity program fill the rest of the year. If game-day spirit is what he loves about Penn State, this is the purest match.</p>
    </div>
    <div class="card">
      <h3>💪 For a gym regular (PF member's guide)</h3>
      <p>The <b>RPAC</b> is one of the largest college rec centers in the country — multiple gyms, pools, courts, and a huge weight/cardio floor, included for students. It genuinely rivals the destination gyms at BU and UMass. Planet Fitness clubs also dot Columbus for the Black Card.</p>
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
        <li>The Penn State experience, bigger<small>100,000-seat stadium, Big Ten spirit, a giant flagship — if he loves PSU, this is the same DNA</small></li>
        <li>Fisher is a top public business school<small>Marquee academics + a Fortune 500 city hiring students year-round</small></li>
        <li>PA State Grant travels here<small>Ohio is reciprocal — a real cost edge the other new publics can't match</small></li>
        <li>Genuine out-of-state merit<small>Stacked scholarships reward strong stats regardless of income</small></li>
        <li>Low debt, strong graduation numbers<small>$19,976 median debt, 88% grad rate, 94% retention</small></li>
        <li>Booming Columbus economy<small>Intel, JPMorgan Chase's largest campus, Nationwide — internships across the street</small></li>
      </ul>
    </div>
    <div class="pc cons">
      <h3>Cons</h3>
      <ul>
        <li>Distance<small>~6½ hours — a plane or a long haul; not a weekend-home school</small></li>
        <li>Sheer scale<small>45,000+ undergrads means big lectures and bureaucracy — honors/scholars communities are how you cope</small></li>
        <li>Business admission is a gate<small>Direct admit to Fisher is competitive; the pre-business path is real but not guaranteed</small></li>
        <li>Midwest placement gravity<small>NYC finance is doable but not the default lane</small></li>
        <li>OOS sticker is high<small>~$58K before merit — the plan only works if the scholarships land</small></li>
      </ul>
    </div>
  </div>`
    },
    {
      id: 'criticisms', nav: 'Criticisms', kicker: 'Straight talk', title: 'Criticisms & feedback, in detail',
      lead: 'What to probe on an Ohio State tour.',
      html: `
  <div class="cards g2">
    <div class="card">
      <h3>🧮 Scale is the whole story</h3>
      <p>At 45,000 undergrads, intro courses are large and advising can feel industrial. The honest fix is structural: apply to honors/scholars programs and Fisher's cohort communities on day one — students who do report a small-college experience inside the giant; students who don't can feel lost.</p>
    </div>
    <div class="card">
      <h3>💸 The OOS merit gamble</h3>
      <p>The affordability case leans on scholarships that aren't guaranteed. Run the net price calculator and, ideally, apply Early Action to see the real offer before ranking Ohio State against cheaper in-state Pitt/PSU. The PA grant helps, but it's a few thousand dollars, not the whole gap.</p>
    </div>
    <div class="card">
      <h3>🏫 Getting into business</h3>
      <p>Fisher's competitiveness means a business intent doesn't guarantee a business seat. Ask exactly how direct admission works for his stats, and what the pre-business gateway requires if he starts outside Fisher.</p>
    </div>
    <div class="card">
      <h3>🏈 Football town trade-offs</h3>
      <p>Game weekends dominate the fall calendar — crowds, traffic, and a party gravity around campus. Most love it; if he doesn't, the counterweight (clubs, honors housing, Columbus arts) is large but you have to seek it out.</p>
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
        <dt>Admissions</dt><dd>Tours from the Student Academic Services Building, 281 W Lane Ave — book at admissions.osu.edu; they fill up, so reserve weeks ahead</dd>
        <dt>By car / air</dt><dd>~6½ hr drive, or fly into Columbus (CMH) — either way, plan an overnight, not a day trip</dd>
        <dt>Plan</dt><dd>Campus tour + the Oval + Ohio Stadium (in season) + the Short North for dinner = a full, honest visit day</dd>
      </dl>
      <div class="mapbtns">
        <a class="btn" href="https://maps.google.com/?q=Ohio+State+University,+Columbus,+OH" rel="noopener">Open in Google Maps</a>
        <a class="btn alt" href="https://admissions.osu.edu/visit/" rel="noopener">Book a tour</a>
      </div>
    </div>
    <div class="card">
      <h3>🏛️ Don't-miss campus stops</h3>
      <ul>
        <li><b>The Oval</b> — the classic green heart of campus</li>
        <li><b>Ohio Stadium</b> — the Horseshoe; peek inside if you can</li>
        <li><b>Thompson Library</b> — the renovated landmark with a top-floor view</li>
        <li><b>Fisher College of Business</b> — its own quad on the north side</li>
        <li><b>RPAC</b> — the massive rec center</li>
        <li><b>The Short North</b> — the arts-and-food district just off campus</li>
      </ul>
    </div>
  </div>
  <div class="note">💡 <b>Good tour questions for a business kid:</b> How does direct admission to Fisher work for my stats? What OOS merit would I realistically be offered? Does the PA State Grant stack on top? What share of Fisher students land internships at Columbus HQs during the year?</div>`
    },
    {
      id: 'nearby', nav: 'Nearby', kicker: 'Around town', title: 'Columbus',
      lead: "Columbus is a genuine, fast-growing city — a real advantage over college towns when it comes to food, internships, and things to do.",
      html: `
  <div class="cards g3">
    <div class="card"><h3>🎨 The Short North</h3><p>Gallery-and-restaurant district connecting campus to downtown — the go-to for a nice dinner.</p></div>
    <div class="card"><h3>🍜 North Market</h3><p>Historic food hall downtown — everything from Jeni's ice cream (a Columbus original) to global street food.</p></div>
    <div class="card"><h3>🏙️ Downtown &amp; the Scioto Mile</h3><p>Riverfront parks and a walkable, revitalized downtown — bigger-city amenities than most flagships.</p></div>
    <div class="card"><h3>🦁 Columbus Zoo</h3><p>One of the best-rated zoos in the country, a short drive out.</p></div>
    <div class="card"><h3>🏈 The tailgates</h3><p>Fall Saturdays around the Horseshoe are a spectacle worth seeing once even as a visitor.</p></div>
    <div class="card"><h3>💼 The HQ corridor</h3><p>Chase, Nationwide, and the new Intel plants ring the metro — the internship map in one city.</p></div>
  </div>`
    },
    {
      id: 'timeline', nav: 'Timeline', kicker: 'Planning ahead', title: 'Timeline for a rising high-school junior',
      lead: 'Applying in fall 2027 for fall 2028 entry — and Early Action is the move that unlocks money and business admission.',
      html: `
  <ul class="tl">
    <li><span class="when">Now — summer 2026</span><b>Plan a Columbus visit</b><span>Too far for a day trip — build an overnight around the tour, a football-season peek, and the Short North to feel the city.</span></li>
    <li><span class="when">Fall 2026 (junior year)</span><b>GPA + PSAT</b><span>Target the 1350+ zone — OOS merit at Ohio State rewards strong stats, and Fisher direct admit needs them.</span></li>
    <li><span class="when">Spring 2027</span><b>SAT + honors research</b><span>Look into Fisher Honors, University Honors, and the Scholars programs — they're how a 45,000-student campus becomes livable.</span></li>
    <li><span class="when">By Nov 1, 2027</span><b>Apply Early Action</b><span>Non-binding, but it's the scholarship and honors deadline — apply EA, flag business, and file the FAFSA + PA State Grant.</span></li>
    <li><span class="when">Winter 2027–28</span><b>Compare the real offer</b><span>Stack OSU's merit + PA grant against Pitt/PSU in-state and the other OOS publics — the net, not the sticker.</span></li>
    <li><span class="when">Spring 2028</span><b>Decide</b><span>If Fisher + Big Ten spirit wins and the merit lands near the low-$40Ks, it's a serious contender. National reply deadline May 1.</span></li>
  </ul>`
    },
    {
      id: 'sources', nav: 'Sources', kicker: 'Fine print', title: 'Sources & notes',
      lead: "Stats pulled deterministically from official federal data via the repo's fetch script; editorial content compiled July 2026. Verify details with official Ohio State pages.",
      html: `
  <div class="card">
    <ul style="font-size:13.5px">
      <li><b>College Scorecard (U.S. Dept. of Education)</b> — acceptance rate, SAT band, enrollment, demographics, costs, net price by income, debt, earnings; refreshed via <code>scripts/fetch_school_data.py</code> → <code>data/generated/scorecard.json</code></li>
      <li><a href="https://admissions.osu.edu/" rel="noopener">Ohio State Undergraduate Admissions</a> — deadlines, scholarships, visit booking</li>
      <li><a href="https://fisher.osu.edu/undergraduate" rel="noopener">Fisher College of Business</a> — majors, admission path, outcomes</li>
      <li>PA State Grant reciprocity per PHEAA (Ohio is a reciprocal state) — confirm current-year terms at pheaa.org before relying on it</li>
      <li>Reddit sentiment mining for r/OSU is queued — culture notes here are reputation-level, not quote-level</li>
    </ul>
  </div>`
    }
  ]
};
