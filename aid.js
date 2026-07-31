/* College Pilot — Aid Estimator.
   Renders the "money first" section on index.html: pick an income bracket
   (and a divorced-parent toggle) to see rough net-cost ranges, cheapest first.
   Pure logic (DATA, BRACKETS, rank) is exposed on window.CollegePilotAid so
   tests/aid.test.js can exercise it without a DOM. The DOM half no-ops
   harmlessly when the estimator's elements aren't present on the page. */
(function(){
  'use strict';
  var BRACKETS=['Under $30K','$30–48K','$48–75K','$75–110K','Over $110K'];
  // Planning ranges [$K low, $K high] per bracket, per year incl. housing, before loans.
  var DATA=[
    {id:'pitt',name:'Pitt (in-state)',css:false,est:[[12,20],[15,23],[20,28],[28,35],[33,38]],
     why:'PA resident tuition + FAFSA-only + rolling merit for early applicants — the affordability anchor of the list (official avg net $23K at $48–75K income). Direct-admit business.'},
    {id:'pennstate',name:'Penn State (in-state)',css:false,est:[[17,25],[18,26],[23,30],[28,35],[34,40]],
     why:'PA resident tuition but famously thin need aid — even low-income families average ~$20K net. FAFSA-only; PA grant stacks.'},
    {id:'tufts',name:'Tufts',css:true,est:[[3,12],[6,16],[12,26],[25,45],[90,95]],
     why:'Meets 100% of need, zero merit aid — cheapest at low counted income, full sticker at high income.'},
    {id:'bu',name:'Boston University',css:true,est:[[5,15],[9,20],[16,32],[28,48],[62,94]],
     why:'affordableBU meets 100% of need (loan-free if Pell-eligible); merit is rare (~4% of students).'},
    {id:'northeastern',name:'Northeastern',css:true,est:[[8,18],[12,24],[18,34],[30,50],[62,94]],
     why:'Meets 100% of first-year need; paid co-ops (~$20–25K per rotation) offset costs on top.'},
    {id:'fordham',name:'Fordham',css:true,est:[[16,28],[20,32],[27,40],[38,52],[52,72]],
     why:'Big discounts (avg need grant ≈$42K) + merit, but does not meet full need — and the PA grant does not travel to NY.'},
    {id:'umass',name:'UMass Amherst',css:false,est:[[26,36],[29,39],[33,43],[38,48],[44,54]],
     why:'Does not meet full need OOS; merit review is automatic and the PA grant travels to MA. One of the lower out-of-state public stickers.'},
    {id:'delaware',name:'Delaware',css:false,est:[[30,40],[32,42],[36,47],[42,52],[48,58]],
     why:'Does not meet full need OOS; automatic merit ($8.5–15K) is the lever, and the PA grant travels to DE.'},
    {id:'southcarolina',name:'South Carolina',css:false,est:[[28,42],[30,44],[34,47],[40,50],[44,53]],
     why:'Lowest OOS tuition of the new five + generous stat-based merit (McNair/Carolina) = a real value case. #1 undergrad international business (Darla Moore). PA grant does not travel to SC.'},
    {id:'indiana',name:'Indiana (Kelley)',css:false,est:[[30,44],[32,46],[36,49],[42,54],[47,58]],
     why:'Elite direct-admit business (Kelley) + the most generous automatic OOS merit here — a strong applicant can land in the mid-$40Ks. FAFSA-only; PA grant does not travel to IN.'},
    {id:'ohiostate',name:'Ohio State',css:false,est:[[30,42],[32,44],[37,48],[43,53],[47,57]],
     why:'Top public business school (Fisher) + real OOS merit, and Ohio is a PA State Grant reciprocal state — the grant actually travels here (rare for OOS).'},
    {id:'michiganstate',name:'Michigan State',css:false,est:[[36,48],[38,50],[42,53],[47,57],[52,60]],
     why:'#1 supply chain (Broad) and the surest admit (~85%), but the priciest OOS sticker of the new five and thinner merit than Indiana/USC. PA grant does not travel to MI.'},
    {id:'rutgers',name:'Rutgers',css:false,est:[[40,52],[42,54],[45,55],[49,57],[52,58]],
     why:'Closest to home and the highest earnings on the list, but notoriously thin out-of-state aid — expect a high net. FAFSA-only; PA grant does not travel to NJ.'}
  ];

  /* Pure: cheapest-first ranking for a given bracket index. Stable sort —
     every input row appears exactly once in the output. */
  function rank(bracketIndex){
    return DATA.slice().sort(function(a,b){
      return (a.est[bracketIndex][0]+a.est[bracketIndex][1])-(b.est[bracketIndex][0]+b.est[bracketIndex][1]);
    });
  }

  window.CollegePilotAid={DATA:DATA,BRACKETS:BRACKETS,rank:rank};

  var chipsEl=document.getElementById('aidBrackets'), rowsEl=document.getElementById('aidRows'), divBtn=document.getElementById('aidDiv');
  if(!chipsEl||!rowsEl||!divBtn) return;

  var bi=2, divorced=false;
  var S=window.SCHOOLS||{};

  BRACKETS.forEach(function(b,i){
    var btn=document.createElement('button');
    btn.textContent=b;
    btn.addEventListener('click',function(){bi=i;render();});
    chipsEl.appendChild(btn);
  });
  divBtn.addEventListener('click',function(){divorced=!divorced;divBtn.setAttribute('aria-pressed',String(divorced));render();});

  function render(){
    [].forEach.call(chipsEl.children,function(c,i){c.classList.toggle('on',i===bi);});
    divBtn.classList.toggle('on',divorced);
    var rows=rank(bi);
    rowsEl.innerHTML=rows.map(function(s,rankIdx){
      var e=s.est[bi], color=(S[s.id]&&S[s.id].colors.sc)||'#00539F';
      var badge=s.css?'<span class="badge c">CSS · BOTH PARENTS</span>':'<span class="badge f">FAFSA · ONE PARENT</span>';
      var extra='';
      if(divorced){
        extra=s.css
          ?'<small class="why"><b>Divorced-parent note:</b> both households’ income and assets count here — if the other parent earns well, expect the top of this range or above (bracket = combined income).</small>'
          :'<small class="why"><b>Divorced-parent note:</b> only the parent the student lives with counts — the other parent’s income is invisible to this school’s aid formula.</small>';
      }
      return '<div class="aidRow"><div class="dot" style="background:'+color+'"></div>'+
        '<div class="nm">'+(rankIdx===0?'🏆 ':'')+s.name+' '+badge+
        '<small class="why">'+s.why+'</small>'+extra+'</div>'+
        '<div class="amt"><b>$'+e[0]+'K–'+e[1]+'K</b><small>est. net / yr</small></div></div>';
    }).join('');
  }
  render();
})();
