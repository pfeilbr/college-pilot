window.SCHOOLS = window.SCHOOLS || {};
window.SCHOOLS['indiana'] = {
  id: 'indiana', name: 'Indiana University Bloomington', short: 'Indiana', city: 'Bloomington, IN',
  colors: { sc: '#990000', scDark: '#6B0000' },
  locChip: '📍 Bloomington, Indiana · ~10 hr from the northern Philadelphia suburbs (fly to Indianapolis)',
  heroTitle: 'Indiana University Bloomington<br><span class="gold">Hoosiers</span> at a glance',
  heroSub: "The business-school play. Kelley is one of the best undergraduate business programs in the country, with direct admission for qualifying freshmen and a Wall-Street-to-Big-4 placement machine — wrapped in a classic, beautiful Big Ten college town. Generous automatic out-of-state merit takes real money off the sticker.",
  heroStats: [
    { b: '78.2%', s: 'acceptance rate (College Scorecard, latest)' },
    { b: '37,806', s: 'undergrads — full Big Ten scale' },
    { b: '$41,891', s: 'out-of-state tuition/yr (in-state is $12,144)' },
    { b: '1170–1400', s: 'SAT middle 50% (Kelley Direct Admit runs higher)' }
  ],
  visitCard: '<b>Visiting?</b> Tours run from admissions (Bryan House / Welcome Center area) — book at admissions.indiana.edu. For a business kid, request a <b>Kelley School</b> information session on the same trip; the Kelley building (Hodge Hall) is the reason you\'re here.',
  contact: {
    maps: 'https://maps.google.com/?q=Indiana+University+Bloomington+Visitor+Information+Center,+Bloomington,+IN',
    mapsLabel: 'IU Bloomington · Visitor Center',
    tel: '+18128550661', telLabel: '812-855-0661 (admissions)',
    email: 'iub-admissions@indiana.edu',
    tourUrl: 'https://admissions.indiana.edu/visit/index.html',
    siteUrl: 'https://www.indiana.edu', siteLabel: 'indiana.edu'
  },
  card: {
    type: 'Public flagship (OOS)',
    blurb: 'Kelley is the reason: a top-tier direct-admit business school with elite placement, inside a gorgeous Big Ten college town. Generous automatic OOS merit.',
    accept: '78.2%', rank: 'Kelley: top public biz', cost: '$59K OOS est.', sat: '1170–1400',
    undergrads: '37,806', biz: 'Kelley (direct admit, elite)', placed: 'excellent (Wall St / Big 4 pipeline)',
    grad4: '80.2% (6-yr)', greek: '~17%', sports: 'Big Ten · Assembly Hall',
    drive: '~10 hr (fly)', deadlines: 'EA Nov 1 · Kelley Direct Admit needs early apply'
  },
  sections: [
    {
      id: 'overview', nav: 'Overview', kicker: 'Overview', title: 'Quick facts',
      lead: "Indiana is a classic Big Ten flagship — limestone buildings, a wooded campus regularly called one of the prettiest in the country, and a college town (Bloomington) built around it. But the headline for a business student is singular: the Kelley School of Business, a national top-tier undergraduate program with direct admission and a recruiting pipeline that punches with the privates.",
      html: `
  <div class="cards g4">
    <div class="tile"><b>1820</b><span>founded — one of the oldest public universities in the Midwest</span></div>
    <div class="tile"><b>Kelley</b><span>a top-ranked undergraduate business school — the whole reason to look this far</span></div>
    <div class="tile"><b>91%</b><span>freshman retention · 80.2% graduate within 6 years</span></div>
    <div class="tile"><b>Prettiest</b><span>the limestone-and-woods campus is a perennial "most beautiful" pick</span></div>
    <div class="tile"><b>Jacobs</b><span>the Jacobs School of Music is world-class — a rare cultural bonus</span></div>
    <div class="tile"><b>OOS merit</b><span>automatic, stat-based scholarships for out-of-state students (real money)</span></div>
    <div class="tile"><b>Big Ten</b><span>Assembly Hall basketball is hallowed ground</span></div>
    <div class="tile"><b>~10 hr</b><span>far — plan to fly into Indianapolis (~1 hr from campus)</span></div>
  </div>
  <div class="cards g2">
    <div class="card">
      <h3>🌳 Hoosier lore</h3>
      <ul>
        <li>"Hoosier" is Indiana's demonym — origin genuinely unknown, which locals find funny.</li>
        <li>The <b>Little 500</b> bike race (the movie <em>Breaking Away</em>) is the spring social event of the year.</li>
        <li>The <b>Sample Gates</b> are the iconic campus entrance; the Old Crescent's limestone is the postcard.</li>
        <li>IU basketball's five national titles make Assembly Hall one of the sport's cathedrals.</li>
      </ul>
    </div>
    <div class="card">
      <h3>⭐ Notable alumni</h3>
      <ul>
        <li>A dense Kelley bench across Wall Street banking, consulting, and Fortune 500 finance/marketing</li>
        <li><b>Mark Cuban</b> — entrepreneur/investor (Kelley)</li>
        <li><b>Jared Fogle-era aside:</b> IU's real business network is its recruiting muscle, not any one name</li>
        <li>Cook Group / Indiana life-sciences leadership; a strong media and music alumni base (Jacobs)</li>
      </ul>
    </div>
  </div>`
    },
    {
      id: 'admissions', nav: 'Admissions', kicker: 'Admissions', title: 'Getting in',
      lead: "IU admits ~78% university-wide — a genuine likely for a solid applicant. The catch that matters here is Kelley: Direct Admission to the business school has its own, higher bar (roughly top-of-class GPA and strong test scores), and you want to earn it out of high school rather than gamble on standard admission later.",
      html: `
  <div class="cards g4">
    <div class="tile"><b>78.2%</b><span>university acceptance rate (Scorecard latest)</span></div>
    <div class="tile"><b>1170–1400</b><span>university SAT middle 50%; Kelley Direct Admits run higher</span></div>
    <div class="tile"><b>91%</b><span>freshman retention</span></div>
    <div class="tile"><b>Nov 1</b><span>Early Action — the deadline for best scholarship + Direct Admit consideration</span></div>
    <div class="tile"><b>Direct Admit</b><span>Kelley admits qualified freshmen straight in — apply early and aim high</span></div>
    <div class="tile"><b>Standard Admit</b><span>others enter pre-business and apply to Kelley after a gateway — competitive</span></div>
    <div class="tile"><b>Test-optional</b><span>in recent cycles, but scores help Direct Admit and merit</span></div>
    <div class="tile"><b>Auto merit</b><span>OOS scholarships awarded largely on stats — no separate contest for the base awards</span></div>
  </div>
  <div class="cards g2">
    <div class="card">
      <h3>📋 How IU reads applications</h3>
      <p>University admission is transcript-led and forgiving for a strong student — this is a comfortable likely. Apply <b>Early Action by Nov 1</b> to be in the running for the automatic out-of-state scholarships, which are awarded largely on GPA and test scores.</p>
    </div>
    <div class="card">
      <h3>🏫 The Kelley Direct Admit gate</h3>
      <p>This is the one to plan around. <b>Direct Admission to Kelley</b> from high school requires meeting published GPA/test thresholds — roughly a top-decile transcript and strong scores. Miss it and you enter as a pre-business student and must apply into Kelley after completing gateway courses at a set GPA — doable, but not guaranteed. The strategy: aim for Direct Admit and apply early.</p>
    </div>
  </div>`
    },
    {
      id: 'costs', nav: 'Costs & Aid', kicker: 'Costs & Aid', title: 'What it costs out-of-state',
      lead: "The OOS sticker is near $59K, but Indiana is unusually generous with automatic, stat-based scholarships for out-of-state students — often $11K–$16K/yr — which can pull the net into the mid-$40Ks or lower for a strong applicant. FAFSA-only rules apply, but note the PA State Grant does not travel to Indiana.",
      html: `
  <div class="chart">
    <h3>Estimated cost of attendance (out-of-state, latest reported)</h3>
    <div class="sub">Per year on campus — built from College Scorecard tuition + housing figures. In-state tuition is far lower ($12,144) — these numbers are the OOS reality for a PA family, before merit.</div>
    <div class="crow">
      <div class="lbl"><span>Indiana (out-of-state)</span><span class="tot">~$59,475</span></div>
      <div class="bar-h" role="img" aria-label="Indiana out-of-state: tuition about $41,891, housing and food about $13,984, books and other remainder, total about $59,475">
        <div class="seg s1" style="width:70.4%" data-tip="Tuition &amp; fees — ~$41,891 (out-of-state)"><i>~$41,891</i></div>
        <div class="seg s2" style="width:23.5%" data-tip="Housing &amp; food — ~$13,984"><i>~$13,984</i></div>
        <div class="seg s3" style="width:6.1%" data-tip="Books, travel &amp; personal — remainder"><i></i></div>
      </div>
    </div>
    <div class="legend">
      <span><b style="background:var(--mark-1)"></b>Tuition &amp; fees (OOS)</span>
      <span><b style="background:var(--mark-2)"></b>Housing &amp; food</span>
      <span><b style="background:var(--ink-3)"></b>Books, travel &amp; personal</span>
    </div>
    <p class="src">Official average net price by income (mostly in-state students): &lt;$30K → $6.3K · $30–48K → $7.6K · $48–75K → $12.2K · $75–110K → $20.2K · $110K+ → $25.1K. Out-of-state runs higher — but automatic OOS merit is the biggest lever on this list.</p>
  </div>
  <div class="cards g2" style="margin-top:16px">
    <div class="card">
      <h3>🎓 Aid &amp; merit</h3>
      <ul>
        <li><b>FAFSA-only</b> — one-parent income counts; the right structure for this family</li>
        <li><b>Best automatic OOS merit here:</b> stat-based awards (often $11K–$16K/yr) come with admission, no separate essay contest for the base scholarships</li>
        <li>Kelley and honors students can layer additional awards on top</li>
        <li><b>PA State Grant does NOT travel</b> to Indiana — a real minus vs. Ohio State</li>
      </ul>
    </div>
    <div class="card">
      <h3>💵 Debt &amp; payoff</h3>
      <ul>
        <li>Median debt: <b>$19,509</b> — the lowest of the five new schools, and among the lowest on the whole list</li>
        <li>Median earnings 10 years after entry: <b>$63,742</b> (all majors; Kelley business runs well above it)</li>
        <li>Bottom line: for a Direct-Admit-caliber student, merit can make an elite business school land near OOS-public prices — the standout value-for-brand play here</li>
      </ul>
    </div>
  </div>`
    },
    {
      id: 'business', nav: 'Business', kicker: 'Business', title: 'Kelley School of Business',
      lead: "Kelley is the point. It's consistently one of the top undergraduate business programs in the country — public or private — with direct admission, a famously structured professional-development machine, and recruiting that reaches Wall Street, the Big 4, and top consulting. For a business-focused kid, no other school on this list has a bigger academic draw at a public price.",
      html: `
  <div class="cards g4">
    <div class="tile"><b>Top-tier</b><span>Kelley's undergraduate program ranks among the best in the nation, public or private</span></div>
    <div class="tile"><b>Direct admit</b><span>qualified freshmen start in Kelley — no post-enrollment gamble</span></div>
    <div class="tile"><b>Workshops</b><span>the Investment Banking Workshop, Consulting Workshop, and Full-Time Academies are elite career accelerators</span></div>
    <div class="tile"><b>Placement</b><span>a genuine Wall-Street-and-Big-4 pipeline — rare for a public</span></div>
  </div>
  <div class="cards g2">
    <div class="card">
      <h3>🏢 What stands out</h3>
      <ul>
        <li>Kelley's structured "Academies" and Workshops (Investment Banking, Consulting, Capital Markets) prep students for competitive recruiting at a level most publics can't match</li>
        <li>Strong across finance, accounting, marketing, supply chain, and business analytics — with deep, active alumni in every lane</li>
        <li>The Compass professional-development sequence is required and taken seriously — outcomes are the culture</li>
        <li>Recruiters treat Kelley like a target school; on-campus recruiting is dense and national</li>
      </ul>
    </div>
    <div class="card">
      <h3>⚖️ Honest caveats</h3>
      <ul>
        <li>The prize is Direct Admit — standard-admit students face a competitive internal gate into Kelley</li>
        <li>It's far from home (~10 hr / a flight) — the trade for the brand and the merit</li>
        <li>Verify current Kelley placement rate, median starting salary, and Wall Street/consulting counts on the visit</li>
      </ul>
    </div>
  </div>`
    },
    {
      id: 'outcomes', nav: 'Outcomes', kicker: 'After graduation', title: 'Hiring & outcomes',
      lead: "Low debt, strong graduation numbers, and a business school whose outcomes rival private targets — the ROI case is the strongest of the five new schools if he lands Direct Admit and merit.",
      html: `
  <div class="cards g4">
    <div class="tile"><b>$63,742</b><span>median 10-yr earnings, all majors (Scorecard)</span></div>
    <div class="tile"><b>80.2%</b><span>graduation rate · 91% retention</span></div>
    <div class="tile"><b>$19,509</b><span>median debt — the lowest of the new five</span></div>
    <div class="tile"><b>Target school</b><span>Kelley is recruited like a private for banking, consulting, and Big 4</span></div>
  </div>
  <div class="cards g2">
    <div class="card">
      <h3>💼 Where Kelley grads land</h3>
      <ul>
        <li>Investment banking and capital markets (Chicago and NYC), management consulting, and Big 4 accounting/advisory</li>
        <li>Fortune 500 finance, marketing, and supply-chain rotational programs across the Midwest and coasts</li>
        <li>The Kelley alumni network is one of business education's most active — a durable long-term asset</li>
      </ul>
    </div>
    <div class="card">
      <h3>🎓 Worth asking on tour</h3>
      <ul>
        <li>Kelley's current placement rate and median starting salary by major</li>
        <li>How many students land IB/consulting roles, and how the Workshops feed them</li>
        <li>The exact Direct Admit thresholds and what standard-admit students must do to get into Kelley later</li>
      </ul>
    </div>
  </div>`
    },
    {
      id: 'studentlife', nav: 'Student Life', kicker: "Who's on campus", title: 'Student body & campus life',
      lead: "Official demographics from College Scorecard. The vibe: a big, spirited, good-looking Big Ten campus with a strong Greek presence and a genuine music-and-arts culture layered on top.",
      html: `
  <div class="chart">
    <h3>Undergraduate demographics</h3>
    <div class="sub">37,806 undergrads, Bloomington campus (College Scorecard, latest).</div>
    <div class="crow tight">
      <div class="lbl"><span>Gender</span><span class="tot">49.9% women · 50.1% men</span></div>
      <div class="bar-h" role="img" aria-label="Gender: 49.9 percent women, 50.1 percent men">
        <div class="seg s1" style="width:49.9%" data-tip="Women — 49.9%"><i>Women 49.9%</i></div>
        <div class="seg s2" style="width:50.1%" data-tip="Men — 50.1%"><i>Men 50.1%</i></div>
      </div>
    </div>
    <div class="crow tight" style="margin-top:20px">
      <div class="lbl"><span>White</span><span class="tot">65.3%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:100%;flex:none" data-tip="White — 65.3%"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Asian</span><span class="tot">10.8%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:16.5%;flex:none" data-tip="Asian — 10.8%"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Hispanic / Latino</span><span class="tot">8.6%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:13.2%;flex:none" data-tip="Hispanic/Latino — 8.6%"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Two or more races</span><span class="tot">5.6%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:8.6%;flex:none" data-tip="Two or more — 5.6%"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>International</span><span class="tot">4.5%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:6.9%;flex:none" data-tip="International — 4.5%"><i></i></div></div>
    </div>
    <div class="crow tight">
      <div class="lbl"><span>Black / African American</span><span class="tot">4.4%</span></div>
      <div class="bar-h thin"><div class="seg s1" style="width:6.7%;flex:none" data-tip="Black — 4.4%"><i></i></div></div>
    </div>
    <p class="src">Bars scaled to the largest group.</p>
  </div>
  <div class="cards g2" style="margin-top:16px">
    <div class="card">
      <h3>🎉 Party scene: reputation vs. reality</h3>
      <p>Lively — IU has a real Greek and house-party culture, capped by Little 500 weekend. It's a social school. As at any Big Ten flagship, the scale means the non-party paths (honors, Kelley's grind, Jacobs concerts, 750+ clubs) are just as available.</p>
    </div>
    <div class="card">
      <h3>🏛️ Greek life: sizable</h3>
      <p>Roughly a sixth-to-a-fifth of students go Greek — a bigger presence than Pitt or Ohio State, and a real organizing force in the social scene. Easy to join, easy to skip, but more central here than at some peers.</p>
    </div>
    <div class="card">
      <h3>🏀 Hoosiers sports</h3>
      <p><b>Assembly Hall</b> basketball is the soul of IU — one of the sport's true cathedrals. Football is the weaker draw, but the Big Ten atmosphere, Little 500, and the candy-striped-warmups mythology give the spirit real texture.</p>
    </div>
    <div class="card">
      <h3>💪 For a gym regular (PF member's guide)</h3>
      <p>The <b>Student Recreational Sports Center (SRSC)</b> and Wildermuth cover weights, cardio, courts, and pools, included for students. Bloomington is a small city, so Planet Fitness options exist but are fewer than in Columbus or Boston — the campus facilities are the main show.</p>
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
        <li>Kelley is the best business draw on the list<small>Top-tier, direct-admit, recruited like a private — an elite program at a public price</small></li>
        <li>Best automatic OOS merit here<small>Stat-based awards can pull the net into the mid-$40Ks or lower for a strong applicant</small></li>
        <li>Lowest debt of the new five<small>$19,509 median — value that survives graduation</small></li>
        <li>Comfortable likely for admission<small>~78% university acceptance — the Kelley Direct Admit gate is the only real hurdle</small></li>
        <li>Gorgeous Big Ten college town<small>Consistently rated one of the prettiest campuses in the country</small></li>
        <li>Culture bonus<small>The Jacobs School of Music makes the arts scene unusually rich</small></li>
      </ul>
    </div>
    <div class="pc cons">
      <h3>Cons</h3>
      <ul>
        <li>Far from home<small>~10 hours / a flight to Indianapolis — the biggest practical cost</small></li>
        <li>PA State Grant doesn't travel<small>Unlike Ohio State, no PA grant portability to Indiana</small></li>
        <li>Kelley Direct Admit is a real bar<small>Miss it and you're in a competitive internal gate to reach the business school</small></li>
        <li>Big Greek presence<small>More socially central than at some peers — great or meh depending on taste</small></li>
        <li>Football spirit is thin<small>Basketball is the religion; if he wants Penn State-style football Saturdays, Ohio State fits better</small></li>
      </ul>
    </div>
  </div>`
    },
    {
      id: 'criticisms', nav: 'Criticisms', kicker: 'Straight talk', title: 'Criticisms & feedback, in detail',
      lead: 'What to probe on an Indiana tour.',
      html: `
  <div class="cards g2">
    <div class="card">
      <h3>🎯 It lives and dies on Direct Admit</h3>
      <p>The whole Kelley value proposition assumes he gets in — ideally as a Direct Admit from high school. Confirm the current thresholds, and have a candid plan for the standard-admit gateway (required courses + GPA) in case Direct Admit doesn't come through.</p>
    </div>
    <div class="card">
      <h3>🗺️ The distance is not trivial</h3>
      <p>Ten hours or a flight means fewer trips home, weather-dependent travel, and a real logistics cost over four years. Weigh it honestly against in-state Pitt/PSU — the Kelley brand and merit have to justify the gap.</p>
    </div>
    <div class="card">
      <h3>💸 Merit isn't guaranteed until it's in writing</h3>
      <p>IU's automatic awards are among the most predictable on this list, but they still depend on his final stats. Run the net price calculator and apply Early Action to see the actual number before ranking.</p>
    </div>
    <div class="card">
      <h3>🏙️ Bloomington is small</h3>
      <p>A great college town, but a town — not a Columbus or a Boston. Internship-during-the-semester options are thinner; the recruiting strength is about companies coming to Kelley, not a city outside the gates. Fine for most; worth naming.</p>
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
        <dt>Admissions</dt><dd>Book the campus tour at admissions.indiana.edu — and separately request a <b>Kelley</b> session; the business school runs its own info sessions</dd>
        <dt>By air</dt><dd>Fly into Indianapolis (IND), ~1 hr drive to Bloomington — plan an overnight</dd>
        <dt>Plan</dt><dd>Campus tour + Sample Gates + Hodge Hall (Kelley) + a Little-500-era stroll = the ideal visit</dd>
      </dl>
      <div class="mapbtns">
        <a class="btn" href="https://maps.google.com/?q=Indiana+University+Bloomington" rel="noopener">Open in Google Maps</a>
        <a class="btn alt" href="https://admissions.indiana.edu/visit/index.html" rel="noopener">Book a tour</a>
      </div>
    </div>
    <div class="card">
      <h3>🏛️ Don't-miss campus stops</h3>
      <ul>
        <li><b>Sample Gates</b> — the iconic limestone entrance</li>
        <li><b>Hodge Hall</b> — the Kelley School's home; the reason for the trip</li>
        <li><b>The Old Crescent</b> — the historic limestone core</li>
        <li><b>Assembly Hall</b> — basketball's cathedral</li>
        <li><b>Jacobs School of Music</b> — catch a (often free) student concert</li>
        <li><b>The Arboretum &amp; Dunn Meadow</b> — the green heart of a pretty campus</li>
      </ul>
    </div>
  </div>
  <div class="note">💡 <b>Good tour questions for a business kid:</b> What are the current Kelley Direct Admit GPA/test thresholds? What OOS merit would my stats earn? What's Kelley's placement rate and IB/consulting count? How does the standard-admit path into Kelley work if I don't get Direct Admit?</div>`
    },
    {
      id: 'nearby', nav: 'Nearby', kicker: 'Around town', title: 'Bloomington',
      lead: "Bloomington is a beloved small college town — walkable, food-rich for its size, and surrounded by Indiana's wooded hill country.",
      html: `
  <div class="cards g3">
    <div class="card"><h3>🍜 Kirkwood Avenue</h3><p>The main student drag off the Sample Gates — restaurants, cafés, and a famously good Tibetan/Himalayan food scene.</p></div>
    <div class="card"><h3>🎶 Jacobs concerts</h3><p>World-class student recitals and opera, often free — a genuine perk of the music school.</p></div>
    <div class="card"><h3>🚲 Little 500</h3><p>The spring bike race and its week of events — the social peak of the IU year.</p></div>
    <div class="card"><h3>🌲 Lake Monroe &amp; Brown County</h3><p>Indiana's largest lake and a state park of wooded hills, minutes away — the outdoorsy counterweight.</p></div>
    <div class="card"><h3>🍦 The Chocolate Moose</h3><p>A Bloomington institution for ice cream and lemon shake-ups.</p></div>
    <div class="card"><h3>✈️ Indianapolis</h3><p>An hour north — the nearest airport and big-city day trip (Colts, Pacers, museums).</p></div>
  </div>`
    },
    {
      id: 'timeline', nav: 'Timeline', kicker: 'Planning ahead', title: 'Timeline for a rising high-school junior',
      lead: 'Applying in fall 2027 for fall 2028 entry — and everything hinges on Kelley Direct Admit + Early Action.',
      html: `
  <ul class="tl">
    <li><span class="when">Now — summer 2026</span><b>Plan an Indianapolis trip</b><span>Fly in and drive down — see if the campus and Bloomington click, and sit in on a Kelley session.</span></li>
    <li><span class="when">Fall 2026 (junior year)</span><b>GPA is everything</b><span>Kelley Direct Admit and IU's automatic OOS merit both key off GPA + test scores — this is the year to lock in a top transcript.</span></li>
    <li><span class="when">Spring 2027</span><b>SAT for Direct Admit</b><span>Push the SAT into the range Kelley Direct Admit rewards; confirm the current thresholds directly with Kelley.</span></li>
    <li><span class="when">By Nov 1, 2027</span><b>Apply Early Action</b><span>EA is the deadline for best merit and Direct Admit consideration — apply early, request Kelley, file FAFSA.</span></li>
    <li><span class="when">Winter 2027–28</span><b>Compare the real number</b><span>Stack IU's (usually strong) merit offer against Pitt/PSU in-state and the other OOS publics — net, not sticker.</span></li>
    <li><span class="when">Spring 2028</span><b>Decide</b><span>If Direct Admit + merit land, Kelley at a mid-$40Ks net is one of the best value-for-brand plays on the list. Reply by May 1.</span></li>
  </ul>`
    },
    {
      id: 'sources', nav: 'Sources', kicker: 'Fine print', title: 'Sources & notes',
      lead: "Stats pulled deterministically from official federal data via the repo's fetch script; editorial content compiled July 2026. Verify details — especially Kelley Direct Admit thresholds and merit — with official Indiana pages.",
      html: `
  <div class="card">
    <ul style="font-size:13.5px">
      <li><b>College Scorecard (U.S. Dept. of Education)</b> — acceptance rate, SAT band, enrollment, demographics, costs, net price by income, debt, earnings; refreshed via <code>scripts/fetch_school_data.py</code> → <code>data/generated/scorecard.json</code></li>
      <li><a href="https://admissions.indiana.edu/" rel="noopener">IU Bloomington Admissions</a> — deadlines, automatic OOS scholarships, visit booking</li>
      <li><a href="https://kelley.iu.edu/programs/undergraduate/index.html" rel="noopener">Kelley School of Business</a> — Direct Admit standards, Workshops, placement reports</li>
      <li>PA State Grant does not extend to Indiana (not a reciprocal state) — confirm at pheaa.org</li>
      <li>Reddit sentiment mining for r/IndianaUniversity is queued — culture notes here are reputation-level, not quote-level</li>
    </ul>
  </div>`
    }
  ]
};
