window.SCHOOLS = window.SCHOOLS || {};
window.SCHOOLS['tufts'] = {
  id: 'tufts', name: 'Tufts University', short: 'Tufts', city: 'Medford/Somerville, MA',
  colors: { sc: '#2A5DA8', scDark: '#1d4076' },
  locChip: '📍 Medford/Somerville, MA · ~5½ hr drive from the northern Philadelphia suburbs',
  heroTitle: 'Tufts University<br><span class="gold">Jumbos</span> at a glance',
  heroSub: "An elite mid-sized research university on a hilltop five miles from downtown Boston — collaborative, a little quirky, and academically intense. One big caveat for a business-minded student: Tufts has no undergraduate business school; the path is economics plus entrepreneurship.",
  heroStats: [
    { b: '10.5%', s: 'acceptance rate (Class of 2029 · ~33,400 applications)' },
    { b: 'Top 40', s: 'U.S. News National Universities' },
    { b: '7,126', s: 'undergrads · ~13,600 total students' },
    { b: '≈$95K', s: 'total sticker cost/yr (before aid) · 100% of need met, no merit aid' }
  ],
  visitCard: '<b>Visiting?</b> Admissions is at <b>Bendetson Hall, 169 Holland St side of the Medford/Somerville campus</b> — check tour details when booking · the Green Line "Medford/Tufts" T stop (opened 2022) is at the campus edge.',
  contact: {
    maps: 'https://maps.google.com/?q=Bendetson+Hall,+Tufts+University,+Medford,+MA',
    mapsLabel: 'Bendetson Hall, Medford/Somerville campus',
    tel: '+16176273170', telLabel: '617-627-3170 (admissions)',
    email: 'admissions.inquiry@tufts.edu',
    tourUrl: 'https://admissions.tufts.edu/visit/',
    siteUrl: 'https://www.tufts.edu', siteLabel: 'tufts.edu'
  },
  card: {
    type: 'Private',
    blurb: 'Elite hilltop campus near Boston — econ + entrepreneurship instead of a b-school, D3 sports, 100% need met but zero merit aid.',
    accept: '10.5%', rank: 'Top 40', cost: '≈$95K', sat: '1480–1540',
    undergrads: '7,126', biz: 'No b-school (Econ + Derby Ctr)', placed: '94% grad rate',
    grad4: '94% (6-yr)', greek: 'Small', sports: 'D3 NESCAC',
    drive: '~5½ hr', deadlines: 'ED1 Nov 4 · RD Jan 6'
  },
  sections: [
    {
      id: 'overview', nav: 'Overview', kicker: 'Overview', title: 'Quick facts',
      lead: "Tufts is the smallest and most selective school on this list — a 7,100-undergrad research university on \"the Hill\" straddling Medford and Somerville, with Boston 20 minutes away on the Green Line extension that now stops at campus.",
      html: `
  <div class="cards g4">
    <div class="tile"><b>1852</b><span>founded on Walnut Hill — the highest point in the area</span></div>
    <div class="tile"><b>95.5%</b><span>freshman retention rate</span></div>
    <div class="tile"><b>94%</b><span>graduate within 6 years — highest on this list</span></div>
    <div class="tile"><b>~11:1</b><span>student–faculty ratio; small-college class feel</span></div>
    <div class="tile"><b>2022</b><span>the Green Line "Medford/Tufts" T stop opened at campus — Boston without a car</span></div>
    <div class="tile"><b>85%</b><span>of enrolled students were top-10% of their high school class</span></div>
    <div class="tile"><b>12.6%</b><span>international undergrads · students from all 50 states</span></div>
    <div class="tile"><b>D3</b><span>NESCAC athletics — a different sports culture than the D1 schools here</span></div>
  </div>
  <div class="cards g2">
    <div class="card">
      <h3>🐘 Jumbo lore (the best mascot story in college sports)</h3>
      <ul>
        <li><b>Jumbo was a real elephant</b> — P.T. Barnum's world-famous circus star. Barnum was an original Tufts trustee and donated the stuffed hide in 1889.</li>
        <li>The hide burned in a 1975 fire; the ashes were scooped into a <b>peanut butter jar</b> that still lives in the athletic director's office. Athletes rub the jar for luck.</li>
        <li>Tufts is the only major U.S. university whose mascot is a specific, historical animal.</li>
      </ul>
    </div>
    <div class="card">
      <h3>⭐ Notable alumni</h3>
      <ul>
        <li><b>Pierre Omidyar</b> — founder of eBay (CS, 1988)</li>
        <li><b>Meredith Vieira</b> — broadcast journalist</li>
        <li><b>Hank Azaria</b> — actor (The Simpsons)</li>
        <li><b>Tracy Chapman</b> — singer-songwriter</li>
        <li>Multiple U.S. ambassadors and diplomats — the Fletcher School's influence runs deep</li>
      </ul>
    </div>
  </div>`
    },
    {
      id: 'admissions', nav: 'Admissions', kicker: 'Admissions', title: 'Getting in',
      lead: "Tufts admits about 1 in 10 — the second-hardest admit on this list after Northeastern's headline rate, and arguably the hardest in substance: enrolled SAT middle-50% is 1480–1540 and 85% were top-tenth of their class. There's no Early Action — the early path is binding Early Decision, which fills roughly half the class.",
      html: `
  <div class="cards g4">
    <div class="tile"><b>10.5%</b><span>acceptance rate, Class of 2029 (11.5% Fall 2024 per CDS)</span></div>
    <div class="tile"><b>1480–1540</b><span>SAT middle 50% of enrolled students (38% submitted)</span></div>
    <div class="tile"><b>33–35</b><span>ACT middle 50%</span></div>
    <div class="tile"><b>85%</b><span>of enrolled students ranked top tenth of their HS class</span></div>
    <div class="tile"><b>95.5%</b><span>freshman retention</span></div>
    <div class="tile"><b>94%</b><span>6-year graduation rate</span></div>
    <div class="tile"><b>Nov 4</b><span>ED I deadline (notify mid-Dec) — no Early Action offered</span></div>
    <div class="tile"><b>Jan 6</b><span>ED II and Regular Decision deadline (notify by Apr 1)</span></div>
  </div>
  <div class="cards g2">
    <div class="card">
      <h3>📋 How Tufts reads applications</h3>
      <p>"Very important" (CDS): rigor, class rank, GPA, <b>essay</b>, recommendations, and <b>character/personal qualities</b> — the most holistic list on this tour. Test scores are only "considered" (test-optional pilot). Tufts' quirky supplemental essays are famous; they genuinely matter here.</p>
      <div class="chips"><span class="chip">Rigor</span><span class="chip">GPA &amp; rank</span><span class="chip">Essays</span><span class="chip">Character</span></div>
    </div>
    <div class="card">
      <h3>🎭 "Tufts syndrome"</h3>
      <p>The admissions-lore term for yield protection — rejecting over-qualified applicants presumed to be using a school as a backup — was literally named after Tufts. Whether it still operates is debated, but the practical advice stands: <b>demonstrated fit matters</b>. Write the supplements like you mean them, and if Tufts is truly #1, ED says it loudest (about half the class enrolls via ED).</p>
    </div>
  </div>`
    },
    {
      id: 'costs', nav: 'Costs & Aid', kicker: 'Costs & Aid', title: 'What it really costs',
      lead: "Tufts is a ≈$95K/yr sticker school with a simple aid philosophy: 100% of demonstrated financial need met, and zero merit scholarships. If the net price calculator says full pay, that's the real price — there's no merit discount to chase.",
      html: `
  <div class="cards g4">
    <div class="tile"><b>≈$95K</b><span>total annual cost of attendance before aid (2025–26; verify current figures)</span></div>
    <div class="tile"><b>100%</b><span>of demonstrated need met for admitted students</span></div>
    <div class="tile"><b>$0</b><span>merit aid — all Tufts aid is need-based, by policy</span></div>
    <div class="tile"><b>≈$83K</b><span>median earnings 10 years after entry (College Scorecard)</span></div>
  </div>
  <div class="cards g2">
    <div class="card">
      <h3>🎓 The aid math</h3>
      <ul>
        <li>Aid is need-only: run the net price calculator early — the answer decides whether Tufts belongs on the list</li>
        <li>For families who qualify, packages are strong and loans modest; median federal debt at graduation is low (roughly $20K)</li>
        <li>For full-pay families, four years ≈ $380K+ — versus roughly half that at Delaware or UMass out-of-state</li>
      </ul>
    </div>
    <div class="card">
      <h3>⚖️ Value verdict</h3>
      <ul>
        <li>The outcomes (94% graduation, elite grad-school and consulting placement) justify the brand for need-aided families</li>
        <li>Without aid — and without a business major — a full-pay business-minded student is paying an Ivy-adjacent price for an economics degree; be honest about whether that's the goal</li>
        <li>Figures here are approximate where marked ≈ — Tufts' cost page has current exact numbers</li>
      </ul>
    </div>
  </div>`
    },
    {
      id: 'business', nav: 'Business', kicker: 'Business (sort of)', title: 'No business school — here\'s the actual path',
      lead: "Unique on this list: Tufts has no undergraduate business school, no finance major, no BBA. A business-minded Jumbo majors in Economics (or Quantitative Economics), adds the entrepreneurship minor at the Derby Entrepreneurship Center, and competes for the same consulting/finance jobs on brand strength.",
      html: `
  <div class="cards g2">
    <div class="card">
      <h3>📈 The de-facto business track</h3>
      <ul>
        <li><b>Economics</b> is one of Tufts' most popular majors; <b>Quantitative Economics</b> adds the math/stats rigor banks and consultancies want</li>
        <li>The <b>Derby Entrepreneurship Center</b> (Tufts Gordon Institute) runs the entrepreneurship minor — one of the largest minors on campus — with venture competitions and founder mentorship</li>
        <li>International Relations (a Tufts crown jewel) + econ is a classic combo for global business/policy careers</li>
        <li>Consulting firms and banks do recruit Tufts econ grads — via brand and alumni network rather than a b-school pipeline</li>
      </ul>
    </div>
    <div class="card">
      <h3>⚖️ Honest fit check for a business kid</h3>
      <ul>
        <li>No AACSB curriculum, no accounting major, no direct-admit business cohort — compare that against Lerner/Questrom/Isenberg's structured paths</li>
        <li>If he wants marketing/management/accounting coursework specifically, Tufts is the wrong tool</li>
        <li>If he wants a liberal-arts education that can still lead to finance/consulting — and the aid works — it's a legitimate premium path</li>
        <li>Ask on tour: where did last year's econ majors land, and how does Derby Center support undergrad ventures?</li>
      </ul>
    </div>
  </div>`
    },
    {
      id: 'outcomes', nav: 'Outcomes', kicker: 'After graduation', title: 'Outcomes',
      lead: "Tufts doesn't publish a business-school-style salary report, but the university-level numbers are elite.",
      html: `
  <div class="cards g4">
    <div class="tile"><b>94%</b><span>6-year graduation rate — best on this list</span></div>
    <div class="tile"><b>95.5%</b><span>retention — students stay</span></div>
    <div class="tile"><b>≈$83K</b><span>median earnings 10 years after entry (College Scorecard)</span></div>
    <div class="tile"><b>~$20K</b><span>typical median federal debt — low, thanks to need-based-only aid</span></div>
  </div>
  <div class="cards g2">
    <div class="card">
      <h3>💼 Where Jumbos go</h3>
      <ul>
        <li>Consulting, finance, tech, health/biotech, government/diplomacy, and top-tier grad programs — the distribution of an elite liberal-arts research school</li>
        <li>Boston's job market plus a dense NYC/DC alumni network carry recruiting</li>
        <li>Econ majors specifically: analyst roles at banks/consultancies are attainable but self-driven — no Feld-Center-style placement machine</li>
      </ul>
    </div>
    <div class="card">
      <h3>🎓 Grad school gravity</h3>
      <ul>
        <li>A large share of Tufts grads head to top law/med/PhD programs; the Fletcher School (international affairs) sits on campus</li>
        <li>For a student even slightly grad-school-inclined, Tufts' academic intensity is the pitch</li>
      </ul>
    </div>
  </div>`
    },
    {
      id: 'studentlife', nav: 'Student Life', kicker: "Who's on campus", title: 'Student body & campus life',
      lead: "Official demographics from Tufts' Fall 2024 Common Data Set. The culture: intellectual, collaborative, a little offbeat — a campus where the quidditch team and the consulting club draw from the same dorm.",
      html: `
  <div class="chart">
    <h3>Undergraduate demographics</h3>
    <div class="sub">7,061 degree-seeking undergrads, Fall 2024 (Common Data Set). Tufts reports non-binary students separately (~2%).</div>
    <div class="crow tight">
      <div class="lbl"><span>Gender</span><span class="tot">55.3% women · 42.6% men · 2.1% another gender</span></div>
      <div class="bar-h" role="img" aria-label="Gender: 55.3 percent women, 42.6 percent men, 2.1 percent another gender">
        <div class="seg s1" style="width:55.3%" data-tip="Women — 3,940 (55.3%)"><i>Women 55.3%</i></div>
        <div class="seg s2" style="width:42.6%" data-tip="Men — 3,032 (42.6%)"><i>Men 42.6%</i></div>
        <div class="seg s3" style="width:2.1%" data-tip="Another gender — 152 (2.1%)"><i></i></div>
      </div>
    </div>
    <div class="crow tight" style="margin-top:20px">
      <div class="lbl"><span>White</span><span class="tot">40.6%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:100%;flex:none" data-tip="White — 2,869 (40.6%)"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Asian</span><span class="tot">16.8%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:41.4%;flex:none" data-tip="Asian — 1,189 (16.8%)"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>International</span><span class="tot">12.6%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:31%;flex:none" data-tip="International — 887 (12.6%)"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Hispanic / Latino</span><span class="tot">10.1%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:24.9%;flex:none" data-tip="Hispanic/Latino — 714 (10.1%)"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Two or more races</span><span class="tot">7.8%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:19.2%;flex:none" data-tip="Two or more races — 550 (7.8%)"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Black / African American</span><span class="tot">6.1%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:15%;flex:none" data-tip="Black — 428 (6.1%)"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Unknown</span><span class="tot">5.8%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:14.3%;flex:none" data-tip="Unknown — 413 (5.8%)"><i></i></div></div>
    </div>
    <p class="src">Bars scaled to the largest group.</p>
  </div>
  <div class="cards g2" style="margin-top:16px">
    <div class="card">
      <h3>🎉 Party scene: reputation vs. reality</h3>
      <p>Quiet by state-school standards. Weekend socializing happens in dorms, off-campus houses, and Boston itself; nobody picks Tufts for the ragers. Students describe a "work hard, hang out medium" culture where clubs and identity groups anchor social life more than parties.</p>
    </div>
    <div class="card">
      <h3>🏛️ Greek life: small</h3>
      <p>A minority pursuit at Tufts — a handful of chapters, no Greek-dominated social scene, and periodic campus debates about whether Greek life belongs at all. Functionally the opposite of Delaware's scene.</p>
    </div>
    <div class="card">
      <h3>🥍 Jumbos sports: Division III</h3>
      <p>Tufts plays in the <b>NESCAC</b> (with Amherst, Williams, Bowdoin) — genuinely excellent D3 athletics: men's lacrosse national championships, powerhouse sailing, strong track and soccer. But there are no athletic scholarships, no packed stadiums, no ESPN Saturdays. If big-game energy matters to him, this is the list's quietest campus.</p>
    </div>
    <div class="card">
      <h3>💪 For a gym regular (PF member's guide)</h3>
      <p>The <b>Steve Tisch Sports &amp; Fitness Center</b> (fitness floors, pool, courts) is included for students — solid for a school this size, though not a mega-rec-center like BU's FitRec or Delaware's Little Bob.</p>
      <p style="margin-top:10px"><b>Planet Fitness:</b> clubs in the Medford (Wellington Circle area) and Somerville corridors are a ~10-minute drive — check the PF app for the current nearest. A Black Card remains useful here.</p>
    </div>
  </div>`
    },
    {
      id: 'proscons', nav: 'Pros & Cons', kicker: 'The balance sheet', title: 'Pros & cons',
      lead: 'Compiled from the Common Data Set, reviews, and admissions coverage.',
      html: `
  <div class="cards g2">
    <div class="pc pros">
      <h3>Pros</h3>
      <ul>
        <li>Elite academics, human scale<small>7,100 undergrads, 94% graduation, top-10% peers — Ivy-adjacent classroom without Ivy anonymity</small></li>
        <li>Boston on the T<small>The 2022 Medford/Tufts Green Line stop put downtown 20 minutes from the quad</small></li>
        <li>100% of need met<small>Strong need-based aid with low typical debt</small></li>
        <li>Collaborative, quirky culture<small>Intellectual without cutthroat; the anti-stress-culture pick among elite schools</small></li>
        <li>Beautiful hilltop campus<small>Classic New England quad with Boston skyline views</small></li>
        <li>International Relations powerhouse<small>The Fletcher School halo benefits undergrads</small></li>
        <li>Grad-school springboard<small>Outstanding law/med/PhD placement</small></li>
      </ul>
    </div>
    <div class="pc cons">
      <h3>Cons</h3>
      <ul>
        <li>No business school<small>No finance/accounting/marketing majors, no AACSB degree — the dealbreaker question for this list</small></li>
        <li>≈$95K with zero merit aid<small>Full-pay families get no discount lever at all</small></li>
        <li>Hard to get in<small>10.5%, essay-heavy, and ED-dominated — with "Tufts syndrome" lore for lukewarm applicants</small></li>
        <li>Quiet sports/social scene<small>D3, small Greek life, no game-day culture</small></li>
        <li>Housing crunch upperclass years<small>Juniors often move off campus into a tight Medford/Somerville rental market</small></li>
        <li>Grade pressure<small>Elite-school workload; "collaborative" doesn't mean easy</small></li>
      </ul>
    </div>
  </div>`
    },
    {
      id: 'criticisms', nav: 'Criticisms', kicker: 'Straight talk', title: 'Criticisms & feedback, in detail',
      lead: 'What to probe on a Tufts tour.',
      html: `
  <div class="cards g2">
    <div class="card">
      <h3>🏢 The missing b-school</h3>
      <p>For this family's purpose, the biggest criticism is structural: a student who wants to study <em>business</em> — not economics — has no major to enroll in. Everything else about Tufts can be wonderful and still not fit the goal. Visit after one of the b-school campuses and compare gut reactions.</p>
    </div>
    <div class="card">
      <h3>💸 Full-pay math</h3>
      <p>No merit aid means the NPC result is final. Tufts at full pay costs roughly double Delaware-with-merit for a business-bound student — the four-year delta approaches $200K. That buys brand and network; whether it buys more <em>business career</em> is genuinely debatable.</p>
    </div>
    <div class="card">
      <h3>🏠 Junior-year housing</h3>
      <p>Tufts guarantees housing for the first two years; upperclassmen face a competitive lottery and an expensive Medford/Somerville rental market. Ask current students what juniors actually pay per room off campus.</p>
    </div>
    <div class="card">
      <h3>🎓 Yield-protection lore</h3>
      <p>"Tufts syndrome" may be more meme than policy today, but the underlying truth stands: Tufts wants students who want Tufts. A generic application with recycled essays underperforms here more than anywhere else on this list.</p>
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
        <dt>Admissions</dt><dd>Bendetson Hall, Medford/Somerville campus — book via the visit portal; campus visitor parking details come with the reservation</dd>
        <dt>By T</dt><dd>Green Line E to <b>Medford/Tufts</b> (the 2022 extension terminus) — right at the campus edge; Davis Square (Red Line) is a 15-min walk on the other side</dd>
        <dt>By car</dt><dd>~5½ hr from the northern Philadelphia suburbs; same I-95/I-84/I-90 corridor as the Boston schools — pair Tufts with BU/Northeastern in one trip</dd>
      </dl>
      <div class="mapbtns">
        <a class="btn" href="https://maps.google.com/?q=Bendetson+Hall,+Tufts+University,+Medford,+MA" rel="noopener">Open in Google Maps</a>
        <a class="btn alt" href="https://admissions.tufts.edu/visit/" rel="noopener">Book a tour</a>
      </div>
    </div>
    <div class="card">
      <h3>🏛️ Don't-miss campus stops</h3>
      <ul>
        <li><b>The Hill &amp; the Prez Lawn</b> — the quad with Boston skyline views</li>
        <li><b>The Jumbo statue</b> — and ask a guide about the peanut butter jar</li>
        <li><b>Tisch Library roof</b> — the famous skyline overlook</li>
        <li><b>Derby Entrepreneurship Center</b> — the closest thing to a business stop</li>
        <li><b>The painted cannon</b> — student groups repaint it nightly under cover of darkness</li>
      </ul>
    </div>
  </div>
  <div class="note">💡 <b>Good tour questions:</b> Where did last year's economics majors land jobs? How active is consulting/banking recruiting on campus? Can undergrads take Fletcher School courses? What does the entrepreneurship minor's capstone actually produce?</div>`
    },
    {
      id: 'nearby', nav: 'Nearby', kicker: 'Around town', title: 'Medford, Somerville & nearby',
      lead: "Tufts sits between two of Greater Boston's best small-city neighborhoods.",
      html: `
  <div class="cards g3">
    <div class="card"><h3>🎸 Davis Square</h3><p>Somerville's beloved square, a 15-minute walk: restaurants, music venues, indie theater (the Somerville), and the Red Line downtown.</p></div>
    <div class="card"><h3>🛍️ Assembly Row</h3><p>Outlet shopping, riverfront dining, and an Orange Line stop — 10 minutes by car.</p></div>
    <div class="card"><h3>🌊 Mystic River paths</h3><p>Running/biking greenways along the Mystic — the campus's outdoor escape.</p></div>
    <div class="card"><h3>🏙️ Downtown Boston</h3><p>~20 minutes on the Green Line from the campus-edge station — the whole city is the weekend.</p></div>
    <div class="card"><h3>🍩 Somerville food scene</h3><p>Union Square and Ball Square (bagels worth the line) punch far above their weight.</p></div>
    <div class="card"><h3>🎓 College cluster</h3><p>Harvard Square is 10 minutes away; pairing tours of Tufts + the Boston schools in one trip is easy.</p></div>
  </div>`
    },
    {
      id: 'timeline', nav: 'Timeline', kicker: 'Planning ahead', title: 'Timeline for a rising high-school junior',
      lead: 'Applying in fall 2027 for fall 2028 entry — noting Tufts has no Early Action, only binding ED.',
      html: `
  <ul class="tl">
    <li><span class="when">Now — summer 2026</span><b>Fit-check first</b><span>Decide the threshold question early: is an econ-not-business path acceptable? If not, save the application slot.</span></li>
    <li><span class="when">Fall 2026 (junior year)</span><b>Maximum rigor</b><span>85% of enrolled Jumbos were top-tenth; the transcript bar is the highest on this list alongside Northeastern.</span></li>
    <li><span class="when">Spring 2027</span><b>SAT/ACT + net price calculator</b><span>1480+ is the submit threshold. The NPC verdict is final — no merit aid exists to change it.</span></li>
    <li><span class="when">Summer 2027</span><b>The supplements</b><span>Tufts' quirky essays are "very important" and reward genuine voice — start early, be specific about why Tufts.</span></li>
    <li><span class="when">Nov 4, 2027</span><b>ED I deadline (binding)</b><span>Half the class enrolls ED — this is the only early lever, and it's a commitment. Only if clearly #1 and the aid math works.</span></li>
    <li><span class="when">Jan 6, 2028</span><b>ED II / Regular Decision</b><span>RD decisions by April 1.</span></li>
    <li><span class="when">May 1, 2028</span><b>Decision day</b><span>Compare against the b-school offers with the career goal, not the prestige, as the tiebreaker.</span></li>
  </ul>`
    },
    {
      id: 'sources', nav: 'Sources', kicker: 'Fine print', title: 'Sources & notes',
      lead: 'Data compiled July 2026. Figures marked ≈ are approximate — verify with official Tufts pages.',
      html: `
  <div class="card">
    <ul style="font-size:13.5px">
      <li><a href="https://provost.tufts.edu/institutionalresearch/wp-content/uploads/sites/5/CDS_2024-2025-1.pdf" rel="noopener">Tufts Common Data Set 2024–25</a> — admissions, enrollment, demographics, deadlines, retention/graduation</li>
      <li><a href="https://www.tuftsdaily.com/article/2025/03/tufts-accepts-105-of-applicants-to-the-class-of-2029" rel="noopener">The Tufts Daily</a> and <a href="https://now.tufts.edu/2025/03/24/meet-admitted-undergraduate-class-2029" rel="noopener">Tufts Now</a> — Class of 2029 acceptance rate and profile</li>
      <li><a href="https://admissions.tufts.edu/" rel="noopener">Tufts Admissions</a> — visit logistics, aid policy (100% need met, no merit), test-optional pilot</li>
      <li><a href="https://tuftsgordoninstitute.tufts.edu/" rel="noopener">Derby Entrepreneurship Center / Tufts Gordon Institute</a> — entrepreneurship minor</li>
      <li><a href="https://www.usnews.com/best-colleges/tufts-university-2219" rel="noopener">U.S. News</a> · <a href="https://collegescorecard.ed.gov/" rel="noopener">College Scorecard</a> (≈ earnings/debt figures)</li>
      <li>Cost-of-attendance and some student-life details are approximate (marked ≈) — the research capture for Tufts was lighter on those; confirm on tufts.edu before decisions</li>
    </ul>
  </div>`
    }
  ]
};
