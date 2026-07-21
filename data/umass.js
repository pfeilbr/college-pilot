window.SCHOOLS = window.SCHOOLS || {};
window.SCHOOLS['umass'] = {
  id: 'umass', name: 'UMass Amherst', short: 'UMass', city: 'Amherst, MA',
  colors: { sc: '#881C1C', scDark: '#5c1212' },
  locChip: '📍 Amherst, MA · ~4½ hr drive from the northern Philadelphia suburbs',
  heroTitle: 'UMass Amherst<br><span class="gold">Minutemen</span> at a glance',
  heroSub: "Massachusetts' flagship: a big, spirited public in a classic college town, with a top-30-public ranking, the #1 campus dining in America nine years running, and — crucially for a business student — Isenberg, a nationally respected AACSB business school that admits freshmen directly by major.",
  heroStats: [
    { b: '~60%', s: 'acceptance rate (Fall 2025 · 53,117 applications) — Isenberg itself: 37%' },
    { b: '#64', s: 'U.S. News National Universities (2026) · #29 Top Public' },
    { b: '24,019', s: 'undergrads · 31,318 total students' },
    { b: '$61,625', s: 'out-of-state total cost/yr (2025–26, before aid)' }
  ],
  visitCard: '<b>Visiting?</b> Tours start at <b>Undergraduate Admissions, Mather Building, 37 Mather Drive</b> · park at the Campus Center Parking Garage ($1.85/hr, ParkMobile app) · while there, eat at a dining commons — it really is the #1 campus food in America.',
  contact: {
    maps: 'https://maps.google.com/?q=UMass+Amherst+Admissions,+37+Mather+Dr,+Amherst,+MA+01003',
    mapsLabel: '37 Mather Dr · Campus Center Garage',
    tel: '+14135450222', telLabel: '413-545-0222 (admissions)',
    email: 'mail@admissions.umass.edu',
    tourUrl: 'https://www.umass.edu/admissions/visit',
    siteUrl: 'https://www.umass.edu', siteLabel: 'umass.edu'
  },
  card: {
    type: 'Public flagship',
    blurb: "Spirited flagship with Isenberg's direct-admit business school, #1 campus dining, D1 sports — and a fading \"ZooMass\" rep.",
    accept: '~60% (37% Isenberg)', rank: '#64 · #29 public', cost: '$61.6K OOS', sat: '1330–1480',
    undergrads: '24,019', biz: 'Isenberg (AACSB, direct admit)', placed: '96% (Isenberg)',
    grad4: '81% (6-yr)', greek: '8% M · 7% W', sports: 'D1 FBS · MAC · hockey champs',
    drive: '~4½ hr', deadlines: 'EA Nov 5 · RD Jan 15'
  },
  sections: [
    {
      id: 'overview', nav: 'Overview', kicker: 'Overview', title: 'Quick facts',
      lead: "UMass Amherst anchors the Five College Consortium in the Pioneer Valley of western Massachusetts — a genuine college region where free buses link UMass with Amherst, Smith, Mount Holyoke, and Hampshire colleges, and students can cross-register at all five.",
      html: `
  <div class="cards g4">
    <div class="tile"><b>1863</b><span>founded as Massachusetts Agricultural College — the state flagship</span></div>
    <div class="tile"><b>17:1</b><span>student–faculty ratio · 67% of class sections under 30</span></div>
    <div class="tile"><b>#1</b><span>Princeton Review Best Campus Food — nine consecutive years</span></div>
    <div class="tile"><b>#29</b><span>U.S. News Top Public Schools — 11 straight years in the top 30</span></div>
    <div class="tile"><b>92.3%</b><span>freshman retention · 81% graduate within 6 years</span></div>
    <div class="tile"><b>5</b><span>colleges in the consortium — cross-register at Amherst, Smith, Mt. Holyoke, Hampshire</span></div>
    <div class="tile"><b>26</b><span>stories of the W.E.B. Du Bois Library — the tallest library in the U.S.</span></div>
    <div class="tile"><b>2021</b><span>NCAA Division I men's hockey national champions</span></div>
  </div>
  <div class="cards g2">
    <div class="card">
      <h3>🔔 Minuteman lore</h3>
      <ul>
        <li><b>Sam the Minuteman</b> became the mascot in 1972; teams are the Minutemen and Minutewomen.</li>
        <li><b>"ZooMass"</b> dates to the mid-1970s party era — students today treat it as a retro joke more than a reality (see Student Life).</li>
        <li>The <b>W.E.B. Du Bois Papers</b> — 175+ linear feet of the civil-rights pioneer's letters and manuscripts — live on the library's 25th floor, fully digitized.</li>
        <li>UMass Dining is the <b>largest collegiate dining program in the country</b> — and the top-rated one.</li>
      </ul>
    </div>
    <div class="card">
      <h3>⭐ Notable alumni</h3>
      <ul>
        <li><b>Jack Welch</b> — legendary GE CEO (BS chemical engineering, 1957)</li>
        <li><b>Julius "Dr. J" Erving</b> — NBA legend (UMass basketball, 1968–71)</li>
        <li><b>Briana Scurry</b> — World Cup &amp; Olympic champion goalkeeper ('95)</li>
        <li><b>Taj Mahal</b> — blues great (Stockbridge School, '63)</li>
        <li><b>Bill Pullman</b> — actor (MFA 1980) · <b>Cale Makar</b> — NHL star (hockey, 2015–19)</li>
      </ul>
    </div>
  </div>`
    },
    {
      id: 'admissions', nav: 'Admissions', kicker: 'Admissions', title: 'Getting in',
      lead: "UMass admits about 60% overall — but you apply directly to a major, and Isenberg (business) runs its own gate at roughly 37% with a much stronger profile (avg SAT 1375, GPA 4.15). Out-of-state applicants actually fared slightly better than in-state in Fall 2025.",
      html: `
  <div class="cards g4">
    <div class="tile"><b>~60%</b><span>overall acceptance rate, Fall 2025 (31,813 of 53,117)</span></div>
    <div class="tile"><b>37%</b><span>Isenberg (business) acceptance rate — the number that matters here</span></div>
    <div class="tile"><b>1330–1480</b><span>SAT middle 50% (median 1410); 25% submitted</span></div>
    <div class="tile"><b>4.05</b><span>average HS GPA (weighted) — 60% of the class had a 4.0</span></div>
    <div class="tile"><b>92.3%</b><span>freshman retention rate</span></div>
    <div class="tile"><b>81%</b><span>graduate within 6 years</span></div>
    <div class="tile"><b>Nov 5</b><span>Early Action deadline (non-binding) · decision by late January</span></div>
    <div class="tile"><b>Jan 15</b><span>Regular Decision deadline · no Early Decision offered</span></div>
  </div>
  <div class="cards g2">
    <div class="card">
      <h3>📋 How UMass reads applications</h3>
      <p>"Very important": rigor and GPA. Test scores are optional and merely "considered"; state residency is officially <b>not considered</b> — and Fall 2025 out-of-state applicants were admitted at 63.5% vs 57.8% in-state. Common App, $90 fee (waivable). Required prep: 4 English, 4 math, 3 lab science, 2 language, 2 electives, history/social studies.</p>
      <div class="chips"><span class="chip">Course rigor</span><span class="chip">GPA</span></div>
    </div>
    <div class="card">
      <h3>🚪 Admission is BY MAJOR — this matters</h3>
      <p>You're admitted to a specific major, and <b>Isenberg's front door is the realistic way in</b>: the internal-transfer route into the BBA was closed to non-Isenberg students for several years and only reopens (competitively, space-limited) in late 2027 — requiring a 3.0+ GPA, B or better in calculus and accounting, and <b>straight A's in both for finance hopefuls</b>. Apply to Isenberg directly; don't plan on transferring in later.</p>
    </div>
  </div>`
    },
    {
      id: 'costs', nav: 'Costs & Aid', kicker: 'Costs & Aid', title: 'What it costs from Pennsylvania',
      lead: "Like Delaware, UMass charges PA students the out-of-state rate (no reciprocity — the New England regional discount doesn't cover PA). The sticker lands about $4K/yr below UD's, with the same lever: merit and aid bring it down.",
      html: `
  <div class="chart">
    <h3>Sticker cost of attendance, 2025–26</h3>
    <div class="sub">Per year, on campus, before aid — official Common Data Set figures. Isenberg adds a $1,350/yr school fee (Honors College: $600).</div>
    <div class="crow">
      <div class="lbl"><span>Out-of-state (PA resident)</span><span class="tot">$61,625</span></div>
      <div class="bar-h" role="img" aria-label="Out-of-state: tuition and fees $42,259, housing and food $16,726, books and other $2,640, total $61,625">
        <div class="seg s1" style="width:68.6%" data-tip="Tuition &amp; fees — $42,259"><i>$42,259</i></div>
        <div class="seg s2" style="width:27.1%" data-tip="Housing &amp; food — $16,726"><i>$16,726</i></div>
        <div class="seg s3" style="width:4.3%" data-tip="Books, travel &amp; personal — $2,640"><i></i></div>
      </div>
    </div>
    <div class="crow">
      <div class="lbl"><span>In-state (for comparison)</span><span class="tot">$38,353</span></div>
      <div class="bar-h" role="img" aria-label="In-state: tuition and fees $18,987, housing and food $16,726, books and other $2,640, total $38,353">
        <div class="seg s1" style="width:30.8%;flex:none" data-tip="Tuition &amp; fees — $18,987"><i>$18,987</i></div>
        <div class="seg s2" style="width:27.1%;flex:none" data-tip="Housing &amp; food — $16,726"><i>$16,726</i></div>
        <div class="seg s3" style="width:4.3%;flex:none" data-tip="Books, travel &amp; personal — $2,640"><i></i></div>
      </div>
    </div>
    <div class="legend">
      <span><b style="background:var(--mark-1)"></b>Tuition &amp; fees</span>
      <span><b style="background:var(--mark-2)"></b>Housing &amp; food</span>
      <span><b style="background:var(--ink-3)"></b>Books, travel &amp; personal ($2,640)</span>
    </div>
    <p class="src">Bars drawn to the same dollar scale. About $4K/yr cheaper than Delaware OOS at sticker.</p>
  </div>
  <div class="cards g2" style="margin-top:16px">
    <div class="card">
      <h3>🎓 Aid &amp; merit</h3>
      <ul>
        <li>Average need-based grant for aided first-years: <b>$18,559</b> (average package $24,457)</li>
        <li>~73% of students receive some grant/scholarship aid (avg ≈ $13,800)</li>
        <li>Out-of-state merit (Chancellor's/Dean's-type awards) is automatic-review with admission — historically up to ~$8–16K/yr for strong OOS profiles; verify current tiers with admissions</li>
        <li>Realistic OOS net with mid-tier merit: <b>~$46–54K/yr</b> — usually the cheapest Massachusetts option on this list</li>
      </ul>
    </div>
    <div class="card">
      <h3>💵 The value case</h3>
      <ul>
        <li>Isenberg outcomes (96% placement, ~$69–71K average salary) at a public-school price is the headline value play among the five new schools</li>
        <li>Housing required/guaranteed only freshman year; Amherst off-campus rents run well below Boston's</li>
        <li>The $1,350/yr Isenberg fee and OOS travel costs (4½ hr drive) belong in the spreadsheet</li>
      </ul>
      <div class="rq">"I was an out-of-state student from NJ and I felt like it was worth every penny — I loved every minute of my time at UMass."<b>— r/umass (archived thread)</b></div>
    </div>
  </div>`
    },
    {
      id: 'business', nav: 'Business', kicker: 'Business', title: 'Isenberg School of Management',
      lead: "Isenberg is a top-30-public AACSB business school with direct admission by major, a famous sport-management program, and a striking Bjarke Ingels-designed Business Innovation Hub. It runs its own admissions gate (37%, avg SAT 1375) — meaningfully harder than UMass overall.",
      html: `
  <div class="cards g4">
    <div class="tile"><b>96%</b><span>of job-seeking Class of 2024 grads placed within 6 months</span></div>
    <div class="tile"><b>$70,957</b><span>average starting salary, Class of 2025 (median ≈ $68K)</span></div>
    <div class="tile"><b>$75,746</b><span>average for finance majors — Isenberg's highest-paying track</span></div>
    <div class="tile"><b>75%</b><span>of students complete 2–3+ internships before graduating</span></div>
  </div>
  <div class="cards g2">
    <div class="card">
      <h3>🏢 What stands out</h3>
      <ul>
        <li><b>Direct admit by major</b> — finance, accounting, marketing, operations &amp; information management, management, plus the famous <b>Sport Management</b> program (a national pioneer) and Hospitality &amp; Tourism</li>
        <li>The <b>Business Innovation Hub</b> (2019) — the copper "domino" building by Bjarke Ingels Group is the campus's architectural showpiece</li>
        <li>Isenberg RAP dorms put first-year business students together in Southwest</li>
        <li>Top employers: Fidelity, PwC, TJX, EY, Deloitte, Wayfair, Dell, Marriott, Citigroup, Amazon, JPMorgan Chase — 23% of grads go into financial services</li>
      </ul>
    </div>
    <div class="card">
      <h3>⚠️ Know the transfer rules</h3>
      <ul>
        <li>Internal transfer into the BBA was <b>closed</b> to non-Isenberg students for cohorts entering Fall 2022+; it reopens (competitive, space-limited) only in late 2027</li>
        <li>Requirements when open: 3.0+ GPA to be reviewed, B+ in calculus and accounting — and <b>finance applicants need an A in both</b></li>
        <li>Translation: apply to Isenberg on the Common App, or pick a different school — "get in and switch later" is not a plan here</li>
        <li>Sport Management &amp; Hospitality remain open to internal applicants</li>
      </ul>
      <div class="rq">"Isenberg is a fantastic business school for a state school."<b>— r/umass (archived thread) — the local consensus, delivered with the qualifier</b></div>
    </div>
  </div>`
    },
    {
      id: 'outcomes', nav: 'Outcomes', kicker: 'After graduation', title: 'Hiring rates & outcomes',
      lead: "Isenberg publishes its own outcomes; the numbers land between Delaware's Lerner and BU's Questrom — at the lowest cost of the three.",
      html: `
  <div class="cards g4">
    <div class="tile"><b>96%</b><span>Isenberg Class of 2024 placement within 6 months</span></div>
    <div class="tile"><b>$70,957</b><span>average starting salary (C2025) · 9% got bonuses avg $7,529</span></div>
    <div class="tile"><b>84%</b><span>completed at least one business internship</span></div>
    <div class="tile"><b>16%</b><span>go straight to grad school</span></div>
  </div>
  <div class="cards g2">
    <div class="card">
      <h3>💼 Where Isenberg grads land</h3>
      <ul>
        <li>Financial services leads (23%): Fidelity, State Street, JPMorgan, Citigroup</li>
        <li>Big 4 accounting (PwC, EY, Deloitte, RSM) recruit on campus; Boston is the primary market</li>
        <li>Finance majors average <b>$75,746</b> — the school's top-paying major; sport management trades salary for the industry's best alumni network</li>
      </ul>
    </div>
    <div class="card">
      <h3>📊 Cost-per-outcome check</h3>
      <ul>
        <li>Isenberg ≈ $70,957 average salary on a ~$62K OOS sticker vs. Questrom ≈ $87,926 on ~$94K — the payback math favors UMass for most families unless BU need-aid changes the equation</li>
        <li>Whole-university earnings and debt figures are respectable for a public flagship; the Isenberg premium within UMass is real</li>
      </ul>
    </div>
  </div>`
    },
    {
      id: 'studentlife', nav: 'Student Life', kicker: "Who's on campus", title: 'Student body & campus life',
      lead: "Official demographics from the Fall 2025 Common Data Set, plus the \"ZooMass\" question answered by actual students. Note the gender split — UMass is the most gender-balanced school on this list.",
      html: `
  <div class="chart">
    <h3>Undergraduate demographics</h3>
    <div class="sub">23,750 degree-seeking undergrads, Fall 2025 (Common Data Set). 23% out-of-state (plus 8% international).</div>
    <div class="crow tight">
      <div class="lbl"><span>Gender</span><span class="tot">52.1% women · 47.9% men</span></div>
      <div class="bar-h" role="img" aria-label="Gender: 52.1 percent women, 47.9 percent men">
        <div class="seg s1" style="width:52.1%" data-tip="Women — 12,523 (52.1%)"><i>Women 52.1%</i></div>
        <div class="seg s2" style="width:47.9%" data-tip="Men — 11,496 (47.9%)"><i>Men 47.9%</i></div>
      </div>
    </div>
    <div class="crow tight" style="margin-top:20px">
      <div class="lbl"><span>White</span><span class="tot">55.9%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:100%;flex:none" data-tip="White — 13,285 (55.9%)"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Asian</span><span class="tot">14.4%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:25.8%;flex:none" data-tip="Asian — 3,423 (14.4%)"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Hispanic / Latino</span><span class="tot">9.5%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:17%;flex:none" data-tip="Hispanic/Latino — 2,267 (9.5%)"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>International</span><span class="tot">7.8%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:14%;flex:none" data-tip="International — 1,850 (7.8%)"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Two or more races</span><span class="tot">5.0%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:8.9%;flex:none" data-tip="Two or more races — 1,183 (5.0%)"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Black / African American</span><span class="tot">4.6%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:8.2%;flex:none" data-tip="Black — 1,081 (4.6%)"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Unknown / other</span><span class="tot">2.7%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:4.8%;flex:none" data-tip="Unknown/other — 648 (2.7%)"><i></i></div></div>
    </div>
    <p class="src">Bars scaled to the largest group. 97% of first-years live on campus; 58% of all undergrads do.</p>
  </div>
  <div class="cards g2" style="margin-top:16px">
    <div class="card">
      <h3>🎉 "ZooMass": reputation vs. reality</h3>
      <p>The party rep peaked decades ago (Princeton Review #9 in 2005; the 2014 "Blarney Blowout" made national news). Today's students mostly roll their eyes at it — admissions got harder, enforcement got tighter, and Southwest's towers are the only place the old energy concentrates.</p>
      <div class="rq">"It's not really ZooMass anymore like it was in the 2000s… UMass Amherst is a world-class school." … "ZooMass is too fun a term to ever die. But it is no more representative than Dartmouth's Keggy the Keg."<b>— r/umass (archived threads)</b></div>
    </div>
    <div class="card">
      <h3>🏛️ Greek life: modest</h3>
      <p><b>8% of men and 7% of women</b> join Greek chapters — present, but a fraction of Delaware's scene and nowhere near dominant. Social life centers on the residential areas (each with its own personality), 300+ clubs, and the Five College social orbit.</p>
    </div>
    <div class="card">
      <h3>🏒 Minutemen sports</h3>
      <p><b>21 varsity D1 teams</b>, now in the <b>MAC</b> (joined 2025–26 as a full member — FBS football included) with hockey staying in Hockey East, where UMass won the <b>2021 national championship</b>. McGuirk Stadium seats 17,000; the Mullins Center hosts hoops and hockey. Real game-day energy, especially for hockey and basketball.</p>
    </div>
    <div class="card">
      <h3>💪 For a gym regular (PF member's guide)</h3>
      <p>The <b>Recreation Center</b> (2009, $50M): 120,000 sq ft with a ~24,000 sq ft weights/cardio floor, suspended track, and group-fitness studios — <b>included for undergrads</b> during the academic year (~2,500 students/day). Boyden Gym and two pools add capacity.</p>
      <p style="margin-top:10px"><b>Planet Fitness:</b> 367 Russell St (Hampshire Mall), Hadley — about 3 miles down Route 9, an 8–10 min drive or a PVTA bus ride. Black Card keeps its value here for off-peak lifting.</p>
    </div>
  </div>
  <div class="card" style="margin-top:14px">
    <h3>🧾 The Reddit consensus, distilled</h3>
    <ul>
      <li><b>ZooMass is mostly dead</b> — "only a party school when compared to other New England schools"; the academic reputation now leads.</li>
      <li><b>Dorms are tribal:</b> Southwest towers = dense, loud, "1 washer per 600-person floor" complaints, but where Isenberg RAP students land; Central = quieter and green; Van Meter praised as a top freshman dorm.</li>
      <li><b>The dining hype is real</b> — students confirm it, with the caveat that the retail cafés are pricier than the famous dining commons.</li>
      <li><b>OOS worth-it skews positive</b> — "worth every penny" appears more here than at any other school on this list, helped by the lower sticker.</li>
      <li><b>Isenberg respect with a qualifier:</b> "a fantastic business school for a state school."</li>
    </ul>
    <p class="src">Sentiment from archived r/umass threads via the Pullpush archive — real posts, anecdotes not statistics.</p>
  </div>`
    },
    {
      id: 'proscons', nav: 'Pros & Cons', kicker: 'The balance sheet', title: 'Pros & cons',
      lead: 'Compiled from the Common Data Set, Isenberg outcomes, reviews, and archived r/umass threads.',
      html: `
  <div class="cards g2">
    <div class="pc pros">
      <h3>Pros</h3>
      <ul>
        <li>Isenberg value<small>AACSB direct-admit business school, 96% placement, ~$71K average salary — at the lowest sticker of the Massachusetts options</small></li>
        <li>#1 campus dining, nine years running<small>Largest and best-rated college dining program in America — it shows up in daily quality of life</small></li>
        <li>Top-30 public on the rise<small>#29 U.S. News public; the "ZooMass" era predates today's applicants</small></li>
        <li>Five College Consortium<small>Cross-register at Amherst, Smith, Mt. Holyoke, Hampshire — free buses between campuses</small></li>
        <li>Real sports scene<small>D1 FBS football (MAC), 2021 hockey national champs, Mullins Center energy</small></li>
        <li>Genuine college town<small>Amherst + Northampton + the Pioneer Valley — a classic setting</small></li>
        <li>Closest Massachusetts option<small>~4½ hr drive — the shortest haul of the New England schools</small></li>
        <li>OOS-friendly admissions<small>Out-of-state applicants admitted at a slightly higher rate than in-state</small></li>
      </ul>
    </div>
    <div class="pc cons">
      <h3>Cons</h3>
      <ul>
        <li>Isenberg's closed side door<small>Miss direct admission and there's no realistic transfer path until at least 2027–28 — the application has to land the first time</small></li>
        <li>Big-school mechanics<small>17:1 ratio, 229 sections of 100+ students, advising at scale</small></li>
        <li>Southwest housing density<small>5,500 students in the towers; laundry, noise, and elevator complaints are constant</small></li>
        <li>Western Mass isolation<small>Boston is 90 minutes away; the Pioneer Valley is the whole world on weeknights</small></li>
        <li>Weather<small>Real New England winters, and the campus is big enough that walks matter</small></li>
        <li>Lingering rep lag<small>Employers and neighbors still crack ZooMass jokes the data no longer supports</small></li>
      </ul>
    </div>
  </div>`
    },
    {
      id: 'criticisms', nav: 'Criticisms', kicker: 'Straight talk', title: 'Criticisms & feedback, in detail',
      lead: 'What to probe on a UMass tour.',
      html: `
  <div class="cards g2">
    <div class="card">
      <h3>🚪 The Isenberg gate</h3>
      <p>The single biggest risk in a UMass plan: Isenberg admission is separate and harder (37%, avg SAT 1375 / GPA 4.15), and the internal-transfer route has been shut for years. If the direct application misses, the fallback majors (economics in the College of Social &amp; Behavioral Sciences, or Sport Management/Hospitality) change the plan materially. Ask admissions how Isenberg-deferred applicants are handled.</p>
    </div>
    <div class="card">
      <h3>🏢 Southwest towers</h3>
      <p>Half the freshman experience debate is about one neighborhood: Southwest houses ~5,500 students in high-rises — dense, social, loud, and where Isenberg's RAP floors live. Students who want quiet pick Central or Northeast. Walk both areas on the visit; the difference is immediate.</p>
    </div>
    <div class="card">
      <h3>📏 Scale effects</h3>
      <p>Intro lectures run large (229 sections of 100+), advising is stretched, and bureaucracy is a recurring gripe — standard big-flagship trade-offs, softened inside Isenberg's cohort but real in gen-eds.</p>
    </div>
    <div class="card">
      <h3>🗺️ Location trade-off</h3>
      <p>The Pioneer Valley is beautiful and self-contained — and 90 minutes from Boston's internships. Isenberg's Boston pipeline works (employers recruit on campus), but a student who wants city internships during the semester will feel the distance that BU/Northeastern students don't.</p>
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
        <dt>Admissions</dt><dd>Mather Building, 37 Mather Drive, Amherst, MA 01003 · 413-545-0222</dd>
        <dt>Parking</dt><dd>Campus Center Parking Garage — $1.85/hr via ParkMobile app or pay stations</dd>
        <dt>By car</dt><dd>~255 miles, 4½ hr from the northern Philadelphia suburbs (I-287 → I-84 → I-91) — the closest New England school on the list</dd>
        <dt>Eat on campus</dt><dd>Seriously — book a dining commons visit (Worcester Commons is the flagship); it's the #1-rated campus food in America</dd>
      </dl>
      <div class="mapbtns">
        <a class="btn" href="https://maps.google.com/?q=UMass+Amherst+Admissions,+37+Mather+Dr,+Amherst,+MA" rel="noopener">Open in Google Maps</a>
        <a class="btn alt" href="https://www.umass.edu/admissions/visit" rel="noopener">Book a tour</a>
      </div>
    </div>
    <div class="card">
      <h3>🏛️ Don't-miss campus stops</h3>
      <ul>
        <li><b>W.E.B. Du Bois Library</b> — 26 stories, the tallest library in the U.S.; Du Bois Papers on the 25th floor</li>
        <li><b>Isenberg Business Innovation Hub</b> — the Bjarke Ingels copper "domino" building</li>
        <li><b>The Campus Pond</b> — the classic photo stop at the center of campus</li>
        <li><b>Worcester Commons</b> — see (and taste) the #1 dining hall</li>
        <li><b>Southwest vs. Central residential areas</b> — walk both before ranking dorms</li>
        <li><b>Mullins Center &amp; McGuirk Stadium</b> — the D1 venues</li>
      </ul>
    </div>
  </div>
  <div class="note">💡 <b>Good tour questions for a business kid:</b> What happens to strong applicants who miss Isenberg direct admission — deferral to another major, or denial? How do Isenberg RAP dorm floors work? What share of finance majors land Boston internships, and how does recruiting reach Amherst?</div>`
    },
    {
      id: 'nearby', nav: 'Nearby', kicker: 'Around town', title: 'Amherst & the Pioneer Valley',
      lead: "A genuine college region: five campuses, two great small downtowns, and farmland views in every direction.",
      html: `
  <div class="cards g3">
    <div class="card"><h3>🍕 Downtown Amherst</h3><p>A mile south: Antonio's Pizza (the late-night institution), Amherst Coffee, Amherst Books, and the town common.</p></div>
    <div class="card"><h3>🍩 Atkins Farms</h3><p>Country market in South Amherst famous for hand-made apple cider donuts — the classic family-visit stop (open daily).</p></div>
    <div class="card"><h3>⛰️ Mount Sugarloaf</h3><p>15 minutes north: drive-up summit with the postcard view of the Connecticut River valley and the UMass skyline.</p></div>
    <div class="card"><h3>🎭 Northampton</h3><p>8 miles west via Route 9: the valley's artsy downtown — Thornes Marketplace, restaurants, and Smith College's campus.</p></div>
    <div class="card"><h3>📜 Emily Dickinson Museum</h3><p>The poet's Homestead and Evergreens on Main St, Amherst — a quick, worthwhile literary stop.</p></div>
    <div class="card"><h3>🚌 The Five Colleges</h3><p>Free PVTA buses link UMass with Amherst, Smith, Mount Holyoke, and Hampshire — students cross-register and cross-socialize.</p></div>
  </div>`
    },
    {
      id: 'timeline', nav: 'Timeline', kicker: 'Planning ahead', title: 'Timeline for a rising high-school junior',
      lead: 'Applying in fall 2027 for fall 2028 entry — with the Isenberg direct-admit gate as the strategic centerpiece.',
      html: `
  <ul class="tl">
    <li><span class="when">Now — summer 2026</span><b>Visit &amp; walk the dorm areas</b><span>See the Isenberg Hub and both Southwest and Central. Confirm the course plan hits UMass's required 4 math years.</span></li>
    <li><span class="when">Fall 2026 (junior year)</span><b>PSAT + grades</b><span>Isenberg's admitted profile (4.15 GPA, 1375 SAT) is the real target, not the university-wide 60%.</span></li>
    <li><span class="when">Spring 2027</span><b>First SAT/ACT</b><span>Test-optional, but a 1380+ score strengthens the Isenberg application and OOS merit review.</span></li>
    <li><span class="when">Summer 2027</span><b>Common App + major choice</b><span>Apply directly to an Isenberg major (or Business Undeclared-equivalent isn't offered here — pick the actual major). Have a fallback major answer ready.</span></li>
    <li><span class="when">Nov 5, 2027</span><b>Early Action deadline</b><span>Non-binding, decision by late January — no reason not to apply EA.</span></li>
    <li><span class="when">Jan–Apr 2028</span><b>Compare offers</b><span>RD closes Jan 15. Weigh Isenberg-with-merit against Delaware-with-merit — the two value plays on the list.</span></li>
    <li><span class="when">May 1, 2028</span><b>Decision day</b><span>National reply deadline; freshman housing (guaranteed) sign-up follows.</span></li>
  </ul>`
    },
    {
      id: 'sources', nav: 'Sources', kicker: 'Fine print', title: 'Sources & notes',
      lead: 'Data compiled July 2026. Figures change annually — verify with official UMass pages.',
      html: `
  <div class="card">
    <ul style="font-size:13.5px">
      <li><a href="https://www.umass.edu/uair/data/common-data-set" rel="noopener">UMass Amherst Common Data Set 2025–26</a> — admissions, enrollment, demographics, costs, Greek life, class sizes</li>
      <li><a href="https://www.isenberg.umass.edu/career-success/outcomes/undergrad" rel="noopener">Isenberg undergraduate outcomes</a>, <a href="https://www.isenberg.umass.edu/programs/undergraduate/on-campus/admissions/current-umass-students/bba" rel="noopener">internal BBA transfer rules</a>, and the <a href="https://poetsandquantsforundergrads.com/school-profile/university-massachusetts-amherst-isenberg-school-management/" rel="noopener">Poets&amp;Quants profile</a></li>
      <li><a href="https://www.umass.edu/news/article/umass-amherst-places-top-30-among-public-universities-us-news-world-report-2026" rel="noopener">UMass News</a> — U.S. News 2026 (#64 / #29 public) and the <a href="https://www.umass.edu/news/article/umass-amherst-dining-earns-best-campus-food-ranking-ninth-consecutive-year" rel="noopener">ninth-straight #1 dining ranking</a></li>
      <li><a href="https://www.umass.edu/admissions/visit" rel="noopener">UMass Admissions visit pages</a> (Mather Building, Campus Center Garage) · <a href="https://www.umass.edu/recwell/" rel="noopener">RecWell</a> (Recreation Center) · Planet Fitness Hadley from planetfitness.com</li>
      <li>Athletics: umass.edu news (MAC move, 2025), NCAA/Wikipedia (2021 hockey title, venue capacities)</li>
      <li>Student-voice quotes: archived r/umass threads via the Pullpush archive — real posts; anecdotes, not statistics</li>
    </ul>
  </div>`
    }
  ]
};
