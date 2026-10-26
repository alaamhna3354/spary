'use strict';
// Illustrative campaigns for the customer preview. Production placement and dates
// are controlled by the administration (srs-approved.md ADS-1 / ADS-2).
const HOME_ADS = [
  {title:'قطع الهايبرد،<br>من أهلها.',plain:'قطع الهايبرد من أهلها',copy:'الحسيني لقطع الهايبرد · الزرقاء',cta:'استكشف القطع',image:'featured-hybrid-battery.webp',merchant:'husseini'},
  {title:'تفاصيل صغيرة.<br>فرق كبير.',plain:'قطع من أبو سليم',copy:'أبو سليم · قطع لسيارتك الكورية',cta:'شوف قطع المتجر',image:'offer-placeholder.webp',merchant:'saleem'},
  {title:'ضو جديد.<br>نظرة أوضح.',plain:'مصابيح من النشامى لقطع الكوري',copy:'النشامى لقطع الكوري · عمّان',cta:'استكشف المصابيح',image:'offer-headlight.webp',merchant:'nash'}
];
let homeAdIndex = 0;
function advertisingBanner(){return `<section class="home-ads" aria-label="بانرات إعلانية" aria-roledescription="عارض شرائح"><div class="ad-stage">${HOME_ADS.map((ad,i)=>`<article class="ad-slide ad-slide-${i}" data-ad-slide="${i}" role="group" aria-roledescription="شريحة" aria-label="${i+1} من ${HOME_ADS.length}" ${i!==homeAdIndex?'hidden':''}><button class="ad-link" data-action="ad-open" data-id="${i}" aria-label="إعلان: ${ad.plain} — ${ad.cta}"><div class="ad-copy"><span class="ad-badge">إعلان</span><h2>${ad.title}</h2><p>${ad.copy}</p><span class="ad-cta">${ad.cta} ${ic('chev',14)}</span></div><div class="ad-art"><img src="v12-assets/${ad.image}" alt="" ${i?'loading="lazy"':'fetchpriority="high"'}></div></button></article>`).join('')}</div><div class="ad-controls"><button data-action="ad-prev" class="ad-arrow" aria-label="الإعلان السابق">${ic('back',17)}</button><div class="ad-dots" role="group" aria-label="اختر إعلانًا">${HOME_ADS.map((ad,i)=>`<button data-action="ad-dot" data-id="${i}" aria-label="الإعلان ${i+1}: ${ad.plain}" ${i===homeAdIndex?'aria-current="true"':''}><span></span></button>`).join('')}</div><span id="ad-position" class="ad-position" aria-live="polite">${homeAdIndex+1} / ${HOME_ADS.length}</span><button data-action="ad-next" class="ad-arrow" aria-label="الإعلان التالي">${ic('chev',17)}</button></div></section>`;}
let adMotion=[];
function changeHomeAd(index){const prev=homeAdIndex,dir=Math.sign(index-prev)||1;homeAdIndex=(index+HOME_ADS.length)%HOME_ADS.length;adMotion.forEach(end=>end());adMotion=[];const slides=[...document.querySelectorAll('[data-ad-slide]')];slides.forEach((slide,i)=>slide.hidden=i!==homeAdIndex);if(slides[prev]&&slides[prev]!==slides[homeAdIndex]&&slides[prev].animate&&!matchMedia('(prefers-reduced-motion: reduce)').matches)slideAd(slides[prev],slides[homeAdIndex],dir);document.querySelectorAll('[data-action="ad-dot"]').forEach((dot,i)=>{if(i===homeAdIndex)dot.setAttribute('aria-current','true');else dot.removeAttribute('aria-current');});const position=document.querySelector('#ad-position');if(position)position.textContent=`${homeAdIndex+1} / ${HOME_ADS.length}`;}
// RTL: the next advert enters from the left, the way a finger drags it in, while the current one
// slides out to the right underneath; the product art settles a beat later.
function slideAd(old,next,dir){
  const ease='cubic-bezier(.22,.9,.3,1)';
  old.hidden=false;old.classList.add('ad-leaving');
  const anims=[
    old.animate([{transform:'none',opacity:1},{transform:`translateX(${dir*40}%) scale(.94)`,opacity:0}],{duration:380,easing:ease}),
    next.animate([{transform:`translateX(${-dir*42}%)`,opacity:.3},{transform:'none',opacity:1}],{duration:460,easing:ease}),
    next.querySelector('.ad-art')?.animate([{transform:'translateY(12px) scale(.82) rotate(-9deg)'},{transform:'none'}],{duration:620,easing:'cubic-bezier(.2,.9,.3,1.35)'}),
    next.querySelector('.ad-copy')?.animate([{transform:`translateX(${-dir*18}px)`,opacity:0},{transform:'none',opacity:1}],{duration:440,delay:80,easing:ease,fill:'backwards'})
  ].filter(Boolean);
  let done=false;
  const end=()=>{if(done)return;done=true;anims.forEach(a=>a.cancel());old.classList.remove('ad-leaving');old.hidden=old.dataset.adSlide!=homeAdIndex;};
  anims[0].onfinish=end;setTimeout(end,700); // still settles when the browser throttles animation frames
  adMotion.push(end);
}
// Trust strip (ORD-3, DLV-3): when it first scrolls into view, the route line draws between the three
// promises and each icon moves once in its own way. With reduced motion it simply shows.
// A plain position check on scroll (not IntersectionObserver) so the strip never stays hidden while on screen.
let trustShown=false; // once per visit: repaints (adding to the cart) do not replay it
function revealTrust(){
  const strip=$('.trust'),sc=$('#screen');if(!strip||trustShown||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const show=()=>{const r=strip.getBoundingClientRect(),dock=$('#dock')?.getBoundingClientRect(),limit=dock&&dock.top>0?dock.top:innerHeight;if(r.top+r.height*.6<limit&&r.bottom>0){trustShown=true;strip.classList.add('in');sc?.removeEventListener('scroll',show);}};
  strip.classList.add('armed');
  sc?.addEventListener('scroll',show,{passive:true});
  setTimeout(show,250);
}
// Services (SVC-1/3/4/5/7): a hi-vis roadside card in the safety-vest colour, barrier stripes on top and a road
// at its foot; the service types are dark tiles, then providers in the chosen governorate with a WhatsApp button.
// Services are adverts only: contact, no booking or payment (SVC-1/5). No distance is claimed (SVC-4, SRCH-11).
const ROAD_TYPES=[['ونش','truck','ونش وسحب سيارات'],['بنشر','wrench','بنشر وإطارات وبلانص'],['بطارية','battery','بطاريات وتشغيل على الطريق'],['كهربائي','bolt','كهربائي سيارات']];
function roadsideCard(){return `<div class="hivis"><div class="hivis-head"><span class="hivis-eyebrow">${ic('truck',15)}خدمات الطريق والسيارة</span><h2>وقفت؟ <em>إلها حل.</em></h2><p>ونش، بنشر، أو تشغيل بطارية. تواصل مباشرة مع صاحب الخدمة.</p></div><div class="hivis-types">${ROAD_TYPES.map(([n,i,type])=>`<button data-action="service-type" data-value="${type}"><span class="hivis-ico">${ic(i,22)}</span><b>${n}</b><small>${type}</small></button>`).join('')}</div><div class="hivis-more"><span>وكمان كراج، تكييف، غسيل ومفاتيح…</span><button data-action="services">كل الخدمات${ic('chev',14)}</button></div><div class="hivis-road" aria-hidden="true"><i class="hivis-truck">${ic('truck',24)}</i></div></div>`;}
// Nearby providers as a route (owner: the list still looked classic and off-brand). The road at the foot of the
// roadside card carries on downward as the brand's dashed "connection" line; each provider is a stop on it with its
// service icon in a signal circle, then its type, name, area, short description, WhatsApp and details (SVC-3/5).
function nearbyProviders(near){return `<div class="nearby route-panel"><div class="nearby-head"><h3 class="nearby-title">${ic('pin',16)}بالقرب منك في <b>${S.gov}</b></h3><button class="nearby-change" data-action="location">غيّر المحافظة</button></div>${near.length?`<ol class="route">${near.map(s=>`<li class="stop"><span class="stop-pin" aria-hidden="true">${ic(s.icon,20)}</span><div class="stop-body"><button class="svc-main" data-action="service" data-id="${s.id}" aria-label="${s.name}، ${s.type}، ${s.area}"><span class="svc-type">${s.type}</span><b>${s.name}</b><span class="svc-area">${ic('pin',13)}${s.area}، ${s.gov}</span><span class="svc-info">${s.info}</span></button><div class="svc-actions"><button class="svc-wa" data-action="whatsapp" data-id="${s.id}" aria-label="تواصل مع ${s.name} عبر واتساب">${WHATSAPP_ICON}راسله على واتساب</button><button class="svc-more" data-action="service" data-id="${s.id}" aria-label="تفاصيل ${s.name}">التفاصيل${ic('chev',14)}</button></div></div></li>`).join('')}</ol>`:'<p class="route-empty">لا خدمات معروضة في المحافظة المختارة. جرّب تغيير المحافظة.</p>'}</div>`;}
let routeShown=false;
function revealRoute(){
  const panel=$('.route-panel'),sc=$('#screen');if(!panel||routeShown||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const show=()=>{const r=panel.getBoundingClientRect(),dock=$('#dock')?.getBoundingClientRect(),limit=dock&&dock.top>0?dock.top:innerHeight;if(r.top+140<limit&&r.bottom>0){routeShown=true;panel.classList.add('in');sc?.removeEventListener('scroll',show);}};
  panel.classList.add('armed');
  sc?.addEventListener('scroll',show,{passive:true});
  setTimeout(show,250);
}
// The road comes alive once when the card reaches the eye: the lane marks run and the tow truck pulls in.
let roadShown=false;
function revealRoad(){
  const card=$('.hivis'),sc=$('#screen');if(!card||roadShown||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const show=()=>{const r=card.getBoundingClientRect(),dock=$('#dock')?.getBoundingClientRect(),limit=dock&&dock.top>0?dock.top:innerHeight;if(r.bottom-20<limit&&r.bottom>0){roadShown=true;card.classList.add('in');sc?.removeEventListener('scroll',show);}};
  card.classList.add('armed');
  sc?.addEventListener('scroll',show,{passive:true});
  setTimeout(show,250);
}

// Page end (brief item 8: a light identity ending): two route lines meet at the mark — every part has its
// connection — then the line itself. It draws once when it comes into view, above the fixed navigation.
function homeSign(){return `<footer class="home-sign"><div class="sign-route" aria-hidden="true"><i></i><span class="sign-mark">${mark(34)}</span><i></i></div><p class="sign-line">كل قطعة. <em>إلها وصلة.</em></p><span class="sign-word">SPARY / THE CONNECTION</span></footer>`;}
let signShown=false;
function revealSign(){
  const sign=$('.home-sign'),sc=$('#screen');if(!sign||signShown||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const show=()=>{const r=sign.getBoundingClientRect(),dock=$('#dock')?.getBoundingClientRect(),limit=dock&&dock.top>0?dock.top:innerHeight;if(r.top+70<limit&&r.bottom>0){signShown=true;sign.classList.add('in');sc?.removeEventListener('scroll',show);}};
  sign.classList.add('armed');
  sc?.addEventListener('scroll',show,{passive:true});
  setTimeout(show,250);
}

// Navigation: the Spary disc is a wheel. It spins once on the first visit and again whenever it is tapped.
let navSpun=false;
function spinHomeDisc(){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;setTimeout(()=>{const d=$('.nav-home .home-disc');if(!d)return;d.classList.remove('spin');void d.offsetWidth;d.classList.add('spin');},60);}
document.addEventListener('click',e=>{if(e.target.closest('.nav-home'))spinHomeDisc();});

// Offers stage (OFR-1/2/3, CAT-2/6): a dark showroom with its own heading, the limited-time line and «كل العروض».
// Each card keeps the approved data only: photo, condition and authenticity as two words, name, car, offer price
// with the old price struck, the saving derived from both, the end date (no countdown), merchant and rating.
// Other pages keep the shared card().
function dealsHead(){return `<div class="deals-head"><div class="deals-top"><span class="deals-pill">${ic('clock',14)}عروض لفترة محدودة</span><button class="deals-all" data-action="offers">كل العروض${ic('chev',15)}</button></div><h2 id="deals-title">عروض <em>سارية</em></h2><p>نفس القطعة، بسعر أخف. تاريخ الانتهاء على كل قطعة.</p></div>`;}
// The cards glide in once when the stage reaches the eye (same position check as the trust strip).
let dealsShown=false;
function revealDeals(){
  const stage=$('.deals'),sc=$('#screen');if(!stage||dealsShown||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const show=()=>{const r=stage.getBoundingClientRect(),dock=$('#dock')?.getBoundingClientRect(),limit=dock&&dock.top>0?dock.top:innerHeight;if(r.top+160<limit&&r.bottom>0){dealsShown=true;stage.classList.add('in');sc?.removeEventListener('scroll',show);}};
  stage.classList.add('armed');
  sc?.addEventListener('scroll',show,{passive:true});
  setTimeout(show,250);
}
function offerCard(l,i=0){
  const t=TR[l.tr],now=lp(l),added=S.cart.includes(l.id);
  return `<article class="deal" style="--i:${i}"><button class="deal-open" data-action="product" data-id="${l.id}" aria-label="عرض ${nm(l.n).name} من ${t.name}، بسعر العرض ${price(now)} دينار بدل ${price(l.price)}، حتى ${l.offer.ends}"><span class="deal-sticker" aria-hidden="true"><b>${l.offer.pct}%</b><small>خصم</small></span><div class="deal-media"><img src="${photo(l)}" alt="${nm(l.n).name}" loading="lazy"><div class="deal-tags"><span>${l.cond==='new'?'جديدة':'مستعملة'}</span><span>${l.auth==='agency'?'قطعة وكالة':'قطعة تاجر'}</span>${l.special?'<span>شحن خاص</span>':''}</div></div><div class="deal-body"><h3>${productName(l)}</h3><span class="deal-fit">${ic('car',14)}${l.cars}</span><div class="deal-price"><div class="now"><small>سعر العرض</small><b>${price(now)}<i>د.أ</i></b></div><div class="was"><small>قبل العرض</small><s>${price(l.price)}</s></div></div><div class="deal-meta"><span class="deal-ends">${ic('clock',13)}حتى ${l.offer.ends}</span><span class="deal-save">وفّر ${price(l.price-now)} د.أ</span></div><div class="deal-shop">${ic('store',13)}<span>${t.name}</span><b>${ic('star',11)}${t.rating}</b></div></div></button><button class="deal-add ${added?'added':''}" data-action="add" data-id="${l.id}" aria-label="${added?'القطعة في السلة':'أضف '+nm(l.n).name+' للسلة'}">${ic(added?'check':'cart',17)}${added?'في السلة':'أضف للسلة'}</button></article>`;
}
// Manual controls avoid interrupting reading. Native horizontal swipes are also
// supported without preventing normal vertical page scrolling.
let bannerStart=null;
document.addEventListener('pointerdown',e=>{if(e.target.closest('.ad-stage'))bannerStart={x:e.clientX,y:e.clientY};});
document.addEventListener('pointerup',e=>{if(!bannerStart)return;const dx=e.clientX-bannerStart.x,dy=e.clientY-bannerStart.y;bannerStart=null;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.5&&e.target.closest('.ad-stage')){changeHomeAd(homeAdIndex+(dx>0?1:-1));window.sparySuppressAdClick=true;setTimeout(()=>window.sparySuppressAdClick=false,250);}});
document.addEventListener('pointercancel',()=>bannerStart=null);

function recognizedName(text){if(!text.trim())return "";const result=parse(text);return result.part?`<span>نبحث عن:</span> <strong>${esc(nm(result.part).name)}</strong>`:"";}

// «جرّب» chips: the tapped word travels into the field, then fills it and shows what the search understood.
function flyExample(chip,val){
  const input=$('#q'),box=input.closest('.search-input'),row=chip.closest('.examples');
  const fill=()=>{S.q=val;input.value=val;$('#recognized-name').innerHTML=recognizedName(val);input.focus();box.classList.remove('just-filled');void box.offsetWidth;box.classList.add('just-filled');};
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||!chip.animate)return fill();
  const from=chip.getBoundingClientRect(),to=input.getBoundingClientRect(),base=row.getBoundingClientRect();
  const ghost=chip.cloneNode(true);ghost.removeAttribute('data-action');ghost.className='ex-ghost';ghost.setAttribute('aria-hidden','true');ghost.tabIndex=-1;
  Object.assign(ghost.style,{left:from.left-base.left+'px',top:from.top-base.top+'px',width:from.width+'px',height:from.height+'px'});
  row.append(ghost);chip.classList.add('ex-sent');
  const dx=to.right-6-from.right,dy=to.top+to.height/2-(from.top+from.height/2);
  let done=false;const finish=()=>{if(done)return;done=true;ghost.remove();chip.classList.remove('ex-sent');fill();};
  ghost.animate([{transform:'none',opacity:1},{transform:`translate(${dx*.6}px,${dy*.7}px) scale(1.06)`,opacity:1,offset:.55},{transform:`translate(${dx}px,${dy}px) scale(.92)`,opacity:0}],{duration:460,easing:'cubic-bezier(.45,0,.2,1)'}).onfinish=finish;
  setTimeout(finish,560); // the field fills even when the browser throttles animation frames
}

// Car picker (SRCH-4): make, model and year are chosen in one bottom sheet, step after step,
// from large options instead of the system list. Changing an earlier step clears the later ones, as before.
const CAR_STEPS=[['make','الصانع'],['model','الموديل'],['year','السنة']];
const CAR_TITLES={make:'اختَر الصانع',model:'اختَر الموديل',year:'اختَر سنة الصنع'};
function carPickerBody(step){
  const mk=makeOf(S.mk),md=modelOf(S.mk,S.md),value={make:mk?.name,model:md?.name,year:S.yr},open={make:true,model:!!S.mk,year:!!S.md};
  const chain=CAR_STEPS.map(([id,label],i)=>{const shown=value[id]&&id!==step;return `<button type="button" class="pick-step ${id===step?'now':shown?'done':''}" data-action="car-pick" data-value="${id}" ${open[id]?'':'disabled'} ${id===step?'aria-current="step"':''}><span>${shown?ic('check',12):i+1}</span>${shown?value[id]:label}</button>`;}).join('<i class="pick-link" aria-hidden="true"></i>');
  const opts=step==='make'?MAKES.map(m=>({v:m.id,t:m.name,mono:m.name[0],sel:S.mk===m.id})):step==='model'?(mk?.models||[]).map(m=>({v:m.id,t:m.name,sub:mk.name,sel:S.md===m.id})):Array.from({length:19},(_,i)=>2026-i).map(y=>({v:y,t:y,sel:+S.yr===y}));
  return `<div class="car-picker"><nav class="pick-chain" aria-label="خطوات اختيار السيارة">${chain}</nav><div class="pick-grid pick-${step}">${opts.map((o,i)=>`<button type="button" class="pick-option" style="--i:${i}" data-action="car-choose" data-step="${step}" data-value="${o.v}" aria-pressed="${o.sel}">${o.mono?`<span class="pick-mono" aria-hidden="true">${o.mono}</span>`:''}${o.sub?`<small>${o.sub}</small>`:''}<b>${o.t}</b>${o.sel?`<span class="pick-tick" aria-hidden="true">${ic('check',12)}</span>`:''}</button>`).join('')}</div></div>`;
}
function openCarPicker(step){
  const d=$('#sheet'),first=!d.open;
  sheet(CAR_TITLES[step],carPickerBody(step));d.classList.add('car-sheet'); // sheet() clears it for every other sheet
  if(first)d.addEventListener('close',()=>{if(document.activeElement===document.body)($('#car-form .car-step.now')||$('#car-form .car-go'))?.focus();},{once:true});
  (d.querySelector('.pick-option[aria-pressed=true]')||d.querySelector('.pick-option'))?.focus();
}
function chooseCar(step,val){
  if(step==='make'){if(S.mk!==val){S.md='';S.yr='';}S.mk=val;}
  if(step==='model'){if(S.md!==val)S.yr='';S.md=val;}
  if(step==='year')S.yr=val;
  if(S.tab==='car'&&$('#search-panel'))$('#search-panel').innerHTML=searchPanel();
  const next=step==='make'&&!S.md?'model':step==='model'&&!S.yr?'year':null;
  if(next)return openCarPicker(next);
  closeSheet();$('#car-form .car-go')?.focus();
}

// Search demo (NAM-1/3, SRCH-1/3): once per visit the empty name field types a popular
// name or an OEM number and shows what the search understands, inside the field.
// Decorative only (aria-hidden); it stops on any touch or focus and never runs with reduced motion.
const SEARCH_DEMO=['إشكمان','دينمو','58101-3XA30'];
let searchDemoDone=false;
function demoMeaning(text){const r=parse(text);if(r.part)return nm(r.part).name;const l=r.oem&&L.find(x=>x.oem===r.oem);return l?productName(l):'رقم OEM';}
function startSearchDemo(){
  if(searchDemoDone||S.tab!=='name'||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const box=document.querySelector('#name-form .search-input'),input=document.querySelector('#q'),card=box&&box.closest('.unified-search');
  if(!box||!input||input.value)return;
  searchDemoDone=true;
  const layer=document.createElement('span');layer.className='search-demo';layer.setAttribute('aria-hidden','true');
  layer.innerHTML='<span class="demo-typed"></span><span class="demo-caret"></span><span class="demo-meaning"></span>';
  layer.style.left=input.offsetLeft+'px';layer.style.width=input.offsetWidth+'px';
  box.append(layer);box.classList.add('demoing');
  const typed=layer.querySelector('.demo-typed'),meaning=layer.querySelector('.demo-meaning'),timers=[];
  let stopped=false,t=900;
  const events=[[card,'pointerdown'],[card,'keydown'],[input,'focus'],[input,'input']];
  const stop=()=>{if(stopped)return;stopped=true;timers.forEach(clearTimeout);layer.remove();box.classList.remove('demoing');events.forEach(([el,type])=>el.removeEventListener(type,stop));};
  const at=(ms,fn)=>timers.push(setTimeout(()=>{if(!stopped&&layer.isConnected&&document.activeElement!==input)fn();else stop();},ms));
  events.forEach(([el,type])=>el.addEventListener(type,stop));
  SEARCH_DEMO.forEach(word=>{
    const chars=[...word];
    at(t,()=>{typed.dir=/^[0-9A-Z]/.test(word)?'ltr':'rtl';typed.textContent=word;meaning.textContent=demoMeaning(word);if(typed.offsetWidth+meaning.offsetWidth+14>layer.clientWidth)meaning.textContent='رقم OEM';typed.textContent='';});
    chars.forEach((_,i)=>at(t+=80,()=>typed.textContent=chars.slice(0,i+1).join('')));
    at(t+=300,()=>layer.classList.add('understood'));
    at(t+=1800,()=>layer.classList.remove('understood'));
    chars.forEach((_,i)=>at(t+=i?32:320,()=>typed.textContent=chars.slice(0,chars.length-i-1).join('')));
    t+=300;
  });
  at(t,stop);
}
