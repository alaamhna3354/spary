'use strict';
// Illustrative campaigns for the customer preview. Production placement and dates
// are controlled by the administration (srs-approved.md ADS-1 / ADS-2).
const HOME_ADS = [
  {title:'قطع الهايبرد،<br>من أهلها.',plain:'قطع الهايبرد من أهلها',copy:'الحسيني لقطع الهايبرد · الزرقاء',cta:'استكشف القطع',image:'featured-hybrid-battery.webp',merchant:'husseini'},
  {title:'تفاصيل صغيرة.<br>فرق كبير.',plain:'قطع من أبو سليم',copy:'أبو سليم · قطع لسيارتك الكورية',cta:'شوف قطع المتجر',image:'offer-placeholder.webp',merchant:'saleem'},
  {title:'ضو جديد.<br>نظرة أوضح.',plain:'مصابيح من النشامى لقطع الكوري',copy:'النشامى لقطع الكوري · عمّان',cta:'استكشف المصابيح',image:'offer-headlight.webp',merchant:'nash'}
];
let homeAdIndex = 0;
function advertisingBanner(){return `<section class="home-ads" aria-label="بانرات إعلانية" aria-roledescription="عارض شرائح"><div class="ad-stage">${HOME_ADS.map((ad,i)=>`<article class="ad-slide ad-slide-${i}" data-ad-slide="${i}" role="group" aria-roledescription="شريحة" aria-label="${i+1} من ${HOME_ADS.length}" ${i!==homeAdIndex?'hidden':''}><button class="ad-link" data-action="ad-open" data-id="${i}" aria-label="إعلان: ${ad.plain} — ${ad.cta}"><div class="ad-copy"><span class="ad-badge">إعلان</span><h2>${ad.title}</h2><p>${ad.copy}</p><span class="ad-cta">${ad.cta} ${ic('chev',14)}</span></div><div class="ad-art"><img src="assets/${ad.image}" alt="" ${i?'loading="lazy"':'fetchpriority="high"'}></div></button></article>`).join('')}</div><div class="ad-controls"><button data-action="ad-prev" class="ad-arrow" aria-label="الإعلان السابق">${ic('back',17)}</button><div class="ad-dots" role="group" aria-label="اختر إعلانًا">${HOME_ADS.map((ad,i)=>`<button data-action="ad-dot" data-id="${i}" aria-label="الإعلان ${i+1}: ${ad.plain}" ${i===homeAdIndex?'aria-current="true"':''}><span></span></button>`).join('')}</div><span id="ad-position" class="ad-position" aria-live="polite">${homeAdIndex+1} / ${HOME_ADS.length}</span><button data-action="ad-next" class="ad-arrow" aria-label="الإعلان التالي">${ic('chev',17)}</button></div></section>`;}
let adMotion=[];
function changeHomeAd(index){const prev=homeAdIndex,dir=Math.sign(index-prev)||1;homeAdIndex=(index+HOME_ADS.length)%HOME_ADS.length;adMotion.forEach(end=>end());adMotion=[];const slides=[...document.querySelectorAll('[data-ad-slide]')];slides.forEach((slide,i)=>slide.hidden=i!==homeAdIndex);if(slides[prev]&&slides[prev]!==slides[homeAdIndex]&&slides[prev].animate&&!matchMedia('(prefers-reduced-motion: reduce)').matches)slideAd(slides[prev],slides[homeAdIndex],dir);document.querySelectorAll('[data-action="ad-dot"]').forEach((dot,i)=>{if(i===homeAdIndex)dot.setAttribute('aria-current','true');else dot.removeAttribute('aria-current');});const position=document.querySelector('#ad-position');if(position)position.textContent=`${homeAdIndex+1} / ${HOME_ADS.length}`;if(document.querySelector('.home-ads.auto')&&Date.now()>=adPausedUntil)queueAd();}
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
function roadsideCard(){return `<div class="hivis"><div class="hivis-head"><span class="hivis-eyebrow">${ic('truck',15)}خدمات الطريق والسيارة</span><h2>وقفت؟ <em>إلها حل.</em></h2><p>ونش، بنشر، أو تشغيل بطارية. تواصل مباشرة مع صاحب الخدمة.</p></div><div class="hivis-types">${ROAD_TYPES.map(([n,i,type])=>`<button data-action="service-type" data-value="${type}"><span class="hivis-ico">${ic(i,22)}</span><b>${n}</b><small>${type}</small></button>`).join('')}</div><div class="hivis-more"><span>وكمان كراج، تكييف، غسيل ومفاتيح…</span><button data-action="services">كل الخدمات${ic('chev',14)}</button></div><div class="hivis-road" aria-hidden="true"><i class="hivis-truck">${TOW_SVG}</i></div></div>`;}
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

// Round of 2026-10-31 (owner's list): category bento, featured stores, tow truck, offer quantity and share,
// advert autoplay, and the services page in the brand.
const pieces=n=>n===1?'قطعة واحدة':n===2?'قطعتين':n<=10?`${n} قطع`:`${n} قطعة`;
const SHARE_ICON='<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg>';
function shareOffer(id){
  const l=L.find(x=>x.id===id),text=`${nm(l.n).name} بـ ${price(lp(l))} د.أ بدل ${price(l.price)}، عرض على Spary حتى ${l.offer.ends}.`;
  if(navigator.share){navigator.share({title:'عرض على Spary',text}).catch(()=>{});return;}
  if(navigator.clipboard)navigator.clipboard.writeText(text).then(()=>toast('نسخنا تفاصيل العرض، الصقها وين ما بدّك.'),()=>toast(text));else toast(text);
}

// A side-view tow truck for the road under the roadside card: signal body, amber beacon, hook and spinning wheels.
const TOW_SVG='<svg class="tow" viewBox="0 0 80 44" aria-hidden="true"><path class="tow-boom" d="M17 21 7 8"/><path class="tow-hook" d="M7 8v6.5a2.6 2.6 0 1 1-2.6-2.6"/><rect class="tow-body" x="10" y="20" width="36" height="9" rx="2.5"/><path class="tow-body" d="M46 29V15a3 3 0 0 1 3-3h10.5a4 4 0 0 1 3.5 2.1l5.7 10.2a3 3 0 0 1 .3 1.4V29z"/><path class="tow-win" d="M51 15h8.6l4.7 8.4H51z"/><rect class="tow-beacon" x="51" y="8.5" width="9" height="3.2" rx="1.6"/><rect class="tow-chassis" x="8" y="28" width="64" height="4" rx="2"/><g class="tow-wheel"><circle cx="21" cy="34" r="7"/><path d="M21 28.6v10.8M15.6 34h10.8"/><circle class="tow-hub" cx="21" cy="34" r="2.2"/></g><g class="tow-wheel"><circle cx="60" cy="34" r="7"/><path d="M60 28.6v10.8M54.6 34h10.8"/><circle class="tow-hub" cx="60" cy="34" r="2.2"/></g></svg>';

// Shop by category: a bento of part families. Brakes, lights and suspension lead with product cut-outs; the other six
// are real photographs (Unsplash licence, ids in HOME-HANDOFF) in one grade, as a zig-zag of wide and square tiles.
// On each photo a marker loop circles the part, the way a mechanic marks it, and draws itself when the grid is seen.
// Choosing one asks only for the make and the model, then opens that family's parts.
const CATS=[
  {id:'oils',name:'الزيوت',part:'engine_oil',parts:['engine_oil'],shot:'oils',big:true,any:true,ring:[.25,.6,.4,.72],dims:[240,166]},
  {id:'accessories',name:'الإكسسوارات',part:'dashcam',parts:['dashcam','seat_cover'],shot:'accessories',tall:true,any:true,ring:[.52,.62,.78,.36],dims:[115,166]},
  {id:'brakes',name:'الفرامل',part:'pads_f',parts:['pads_f','pads_r'],art:'assets/hero-pads.webp'},
  {id:'lights',name:'الإضاءة',part:'headlight',parts:['headlight'],art:'assets/hero-headlight.webp'},
  {id:'suspension',name:'التعليق',part:'shock',parts:['shock'],art:'assets/hero-shock.webp'},
  {id:'exhaust',name:'العادم',part:'exhaust',parts:['exhaust'],shot:'exhaust',wide:true,ring:[.47,.6,.6,.84]},
  {id:'body',name:'الهيكل والمرايا',part:'mirror',parts:['mirror','bumper'],shot:'body',ring:[.54,.3,.66,.46]},
  {id:'filters',name:'الفلاتر',part:'filter',parts:['filter'],shot:'filters',ring:[.42,.47,.84,.84]},
  {id:'cooling',name:'التبريد',part:'radiator',parts:['radiator'],shot:'cooling',wide:true,ring:[.27,.38,.32,.66]},
  {id:'ac',name:'التكييف',part:'compressor',parts:['compressor'],shot:'ac',wide:true,ring:[.5,.52,.46,.84]},
  {id:'electric',name:'الكهرباء',part:'alt',parts:['alt','hybatt'],shot:'electric',ring:[.38,.44,.6,.62]}
];
const catImg=c=>c.shot?`assets/cats/${c.shot}.webp`:c.art;
// A hand-drawn loop that overshoots its start, like a marker pen. It is redrawn for each ring's proportions (an affine
// stretch of its points) so the line keeps one weight instead of being squashed with the box.
const ringPath=a=>{const x=n=>+(n*a).toFixed(1);return `M${x(70)} 6C${x(40)} 0 ${x(6)} 14 ${x(4)} 46s${x(30)} 52 ${x(56)} 49 ${x(39)}-29 ${x(36)}-55S${x(72)} 4 ${x(48)} 8`;};
const catRing=([x,y,w,h],wide,dims)=>{const [bw,bh]=dims||[wide?240:115,104],a=w*bw/(h*bh);return `<svg class="cat-ring" viewBox="0 0 ${+(100*a).toFixed(1)} 100" style="left:${(x-w/2)*100}%;top:${(y-h/2)*100}%;width:${w*100}%;height:${h*100}%;--sw:${(220/(h*(dims?dims[1]:104))).toFixed(2)}" aria-hidden="true"><path d="${ringPath(a)}" pathLength="100"/></svg>`;};
// No tile is recommended by default (review 2026-10-31: the big bright brakes tile with «ابدأ من هون» read as advice
// for everyone). The big tile keeps the composition in the same dark as the others; the light goes to the category
// the customer opened last.
const lastCat=()=>{if(S.lastCat)return S.lastCat;try{return localStorage.getItem('spary-lastcat');}catch{return null;}};
function shopByCategory(){const last=lastCat();return `<section class="section cats" aria-labelledby="cats-title"><div class="cats-head"><span class="cats-kicker">${ic('search',14)}تسوّق حسب الفئة</span><h2 id="cats-title">شو بدّك <em>تصلّح؟</em></h2><p>اختار الفئة، وبعدين صانع سيارتك وموديلها.</p></div><div class="cats-grid">${CATS.map((c,i)=>`<button class="cat${c.big?' cat-big':''}${c.id===last?' cat-last':''}${c.art?' cat-art':''}${c.shot?' cat-pic':''}${c.wide?' cat-wide':''}${c.tall?' cat-tall':''}${c.any?' cat-hero':''}" data-action="cat-pick" data-value="${c.id}" style="--i:${i}">${c.art?`<img class="cat-photo" src="${c.art}" alt="" loading="lazy">`:`<img class="cat-shot" src="${catImg(c)}" alt="" loading="lazy">${catRing(c.ring,c.wide,c.dims)}`}<b>${c.name}</b>${c.id===last?`<small class="cat-tag">${ic('clock',11)}آخر اختيارك</small>`:''}</button>`).join('')}</div></section>`;}
// Plays a section's entrance once per visit when it reaches the eye above the navigation (same check as the trust strip).
const revealed=new Set();
function revealOnce(sel,depth){
  const el=$(sel),sc=$('#screen');if(!el||revealed.has(sel)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const show=()=>{const r=el.getBoundingClientRect(),dock=$('#dock')?.getBoundingClientRect(),limit=dock&&dock.top>0?dock.top:innerHeight;if(r.top+depth<limit&&r.bottom>0){revealed.add(sel);el.classList.add('in');sc?.removeEventListener('scroll',show);}};
  el.classList.add('armed');
  sc?.addEventListener('scroll',show,{passive:true});
  setTimeout(show,250);
}
let catFlow=null;
function openCategory(id){S.lastCat=id;try{localStorage.setItem('spary-lastcat',id);}catch{}const c=CATS.find(x=>x.id===id),car=S.logged&&myCar();if(c.any){search({amb:c.parts,text:c.name});return;}if(car){search({part:c.part,mk:car.mk,md:car.md});return;}catFlow=c;openCarPicker('make');}

// Featured stores (owner: the striped-awning cards looked silly): each store is a cover photograph of a parts shop,
// then a round seal on the edge of the cover, the store's initial ringed by turning type, sitting on the brand's dashed
// route line. Below it the name, the area, the rating and parts count as two figures, and «زور المحل».
// The covers are illustrative stock photographs (Unsplash licence); in the app each store brings its own.
// Who appears: the merchants subscribed to the featured plan (owner 2026-10-31: «هنن التجار المشتركين بباقة مميزة»).
// Featured stores, third version (review 2026-10-31: the cards were large for what they said, «محلات مختارة» and the
// seal read as an endorsement). The stores are the featured-plan subscribers, said so under the rail; each card is the
// store's own photo with its name, area and rating on it, then its free-delivery offer (DLV-11) as the useful part:
// the threshold, «100 فأكثر» including 100, and once the cart holds parts from that store, what is left, on a line
// that fills. Stores with an offer first, lowest threshold first.
const FEATURED_STORES=['nash','saleem','amana','husseini'];
const storeCartSum=id=>cartItems().filter(l=>l&&l.tr===id).reduce((n,l)=>n+lp(l),0);
function freeDeal(id,cls='fd'){
  const t=TR[id];if(!t.free)return `<div class="${cls} is-none"><span class="fd-ico">${ic('truck',16)}</span><div class="fd-copy"><b>التوصيل حسب منطقتك</b><small>ما في عرض توصيل مجاني من هالمتجر حاليًا.</small></div></div>`;
  const sum=storeCartSum(id),done=sum>=t.free,p=Math.min(1,sum/t.free);
  return `<div class="${cls}${done?' is-done':''}" style="--p:${p.toFixed(3)}"><span class="fd-ico">${ic(done?'check':'truck',16)}</span><div class="fd-copy"><b>${done?'توصيل قطعك من هالمتجر مجاني':'توصيل مجاني'}</b><small>${done?'وصلت للحدّ، والمتجر بيتحمّل التوصيل.':sum?`باقي <b class="num">${price(t.free-sum)}</b> د.أ من هالمتجر`:`عند شراء <b class="num">${t.free}</b> د.أ فأكثر من هذا المتجر`}</small></div><i class="fd-line" aria-hidden="true"><i></i></i></div>`;
}
function featuredStores(){const list=[...FEATURED_STORES].sort((a,b)=>(TR[a].free||1e9)-(TR[b].free||1e9));return `<section class="section stores" aria-labelledby="stores-title"><div class="stores-head"><span class="stores-kicker">${ic('store',14)}متاجر مميّزة</span><h2 id="stores-title">من متجر واحد، <em>وفّر التوصيل</em></h2><p>لكل متجر حدّ: لما يوصل مجموع قطعك منه للمبلغ المكتوب، بيصير توصيلها مجاني.</p></div><div class="stores-rail ms-rail">${list.map((id,i)=>{const t=TR[id];return `<article class="ms" style="--i:${i}"><span class="ms-cover"><img src="assets/stores/${id}.webp" alt="" loading="lazy"><span class="ms-tag">مميّز</span><span class="ms-id"><b>${t.name}</b><small>${ic('pin',12)}${t.area} · ${ic('star',11)}${t.rating}</small></span></span>${freeDeal(id)}<button class="ms-go" data-action="store" data-value="${id}" aria-label="تسوّق من ${t.name}">تسوّق من المتجر${ic('chev',14)}</button></article>`;}).join('')}</div><p class="ms-note">${ic('info',13)}متاجر مشتركة بالباقة المميّزة على Spary. العرض وحدّه بيحدّدهم كل متجر.</p></section>`;}
function freeTermsSheet(id){const t=TR[id];sheet('توصيل مجاني من '+t.name,`<ul class="fd-terms"><li>لما يوصل مجموع قطعك من هذا المتجر <b class="num">${t.free}</b> د.أ أو أكثر، توصيلها مجاني.</li><li>بينحسب على قطع هالمتجر بس. قطع المتاجر الثانية إلها توصيلها.</li><li>بينحسب بسعر القطعة بعد الخصم.</li><li>المتجر هو اللي بيتحمّل التوصيل، وبيقدر يعدّل العرض أو يوقفه.</li></ul>${freeDeal(id,'fd fd-wide')}`);}

// Featured parts by family (owner: «نعرض باخر الرئيسية مجموعة قطع مميزة مقسمة حسب التصنيفات»): a parts cabinet like
// the drawers behind a parts-shop counter. Each family is a drawer front with its picture, label and pull; the open
// drawer is pulled down and its tray holds up to four parts. Families with fewer than two parts get no drawer.
// «كل قطع …» opens every part of that family.
// New arrivals (owner 2026-10-31: the featured reason was weak, and outside the offers no ordinary part showed on the
// home): the cabinet now holds what merchants put up last, newest first, offers left to their own stage. It rests on
// CAT-11 (a part shows the moment it is published) and gives every merchant the same chance, paid plan or not.
let shelfCat=null;
// With a saved car the drawers hold only parts matching its make, model and year (review 2026-10-31: a hybrid battery
// for another car is noise); with no car, or nothing new for it, every new part.
let shelfCar=null;
const shelfFits=l=>!shelfCar||(l.mk===shelfCar.mk&&l.md===shelfCar.md&&matchesYear(l,shelfCar.yr));
const shelfItems=c=>L.filter(l=>c.parts.includes(l.n)&&!l.offer&&shelfFits(l)).sort((a,b)=>a.days-b.days);
const ageAr=d=>d===0?'اليوم':d===1?'مبارح':d===2?'قبل يومين':d<=10?`قبل ${d} أيام`:`قبل ${d} يوم`;
function shelfCard(l,i){const t=TR[l.tr],now=lp(l),added=S.cart.includes(l.id);return `<article class="shelf-card" style="--i:${i}"><button class="shelf-open" data-action="product" data-id="${l.id}" aria-label="${productName(l)}، ${price(now)} دينار، من ${t.name}"><span class="shelf-media"><img src="${photo(l)}" alt="" loading="lazy"><span class="shelf-tag is-new">${ic('clock',11)}${ageAr(l.days)}</span></span><b>${productName(l)}</b><span class="shelf-fit">${l.cars}</span><span class="shelf-price">${price(now)}<i>د.أ</i>${l.offer?`<s>${price(l.price)}</s>`:''}</span><span class="shelf-seller">${ic('store',12)}<span>${t.name}</span></span></button><button class="shelf-add ${added?'added':''}" data-action="add" data-id="${l.id}" aria-label="${added?'القطعة في السلة':'أضف '+productName(l)+' للسلة'}">${ic(added?'check':'plus',18)}</button></article>`;}
function shelfTray(c){const items=shelfItems(c);return `<div class="shelf-tray" id="shelf-tray" role="tabpanel" aria-labelledby="drawer-${c.id}"><div class="shelf-grid">${items.slice(0,4).map(shelfCard).join('')}</div><button class="shelf-all" data-shelf-all="${c.id}">كل قطع ${c.name}<span>${pieces(items.length)}</span>${ic('chev',15)}</button></div>`;}
function featuredShelf(){
  shelfCar=S.logged&&myCar()||null;if(shelfCar&&!CATS.some(c=>shelfItems(c).length>1))shelfCar=null;
  const cats=CATS.filter(c=>shelfItems(c).length>1).sort((a,b)=>shelfItems(a)[0].days-shelfItems(b)[0].days);if(!cats.length)return '';
  const open=cats.find(c=>c.id===shelfCat)||cats[0];shelfCat=open.id;
  return `<section class="section shelf" aria-labelledby="shelf-title"><div class="shelf-head"><span class="shelf-kicker">${ic('clock',14)}وصل جديد</span><h2 id="shelf-title">${shelfCar?'جديد <em>لسيارتك</em>':'نزل <em>جديد</em> عالرفوف'}</h2><p>${shelfCar?`آخر القطع المطابقة لبيانات ${myCarName(shelfCar)}، الأحدث أول.`:'آخر القطع اللي نزّلها التجار، الأحدث أول.'}</p></div><div class="shelf-drawers" role="tablist" aria-label="فئات القطع">${cats.map((c,i)=>`<button class="drawer" role="tab" id="drawer-${c.id}" data-shelf="${c.id}" aria-selected="${c===open}" aria-controls="shelf-tray" style="--i:${i}"><span class="drawer-thumb${c.shot?' is-photo':''}"><img src="${catImg(c)}" alt="" loading="lazy"></span><b>${c.name}</b><small>${pieces(shelfItems(c).length)}</small><i class="drawer-pull" aria-hidden="true"></i></button>`).join('')}</div>${shelfTray(open)}</section>`;
}
document.addEventListener('click',e=>{
  const all=e.target.closest('[data-shelf-all]');if(all){search({amb:CATS.find(c=>c.id===all.dataset.shelfAll).parts,...(shelfCar?{mk:shelfCar.mk,md:shelfCar.md,year:shelfCar.yr}:{})});return;}
  const d=e.target.closest('[data-shelf]');if(!d||d.dataset.shelf===shelfCat)return;
  shelfCat=d.dataset.shelf;
  document.querySelectorAll('.drawer').forEach(b=>b.setAttribute('aria-selected',b===d));
  const tray=$('#shelf-tray');if(!tray)return;
  tray.outerHTML=shelfTray(CATS.find(c=>c.id===shelfCat));
  $('#shelf-tray').classList.add('pulled');
  d.scrollIntoView({block:'nearest',inline:'nearest',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
});

// Services page hero: the same hi-vis card, with the service types as filters and the road with its truck.
const SVC_FILTERS=[['','الكل','car'],['ونش وسحب سيارات','ونش','truck'],['بنشر وإطارات وبلانص','بنشر','wrench'],['كراج ميكانيك','كراج','wrench'],['كهربائي سيارات','كهربائي','bolt'],['غسيل وتلميع','غسيل','car']];
function servicesHero(){return `<div class="hivis hivis-page"><div class="hivis-head"><span class="hivis-eyebrow">${ic('truck',15)}خدمات الطريق والسيارة</span><h2>وقفت؟ <em>إلها حل.</em></h2><p>اختار نوع الخدمة، وتواصل مباشرة مع صاحبها.</p></div><div class="svc-chips">${SVC_FILTERS.map(([v,t,i])=>`<button data-action="service-filter" data-value="${v}" aria-pressed="${S.serviceType===v}">${ic(i,16)}${t}</button>`).join('')}</div><div class="hivis-road" aria-hidden="true"><i class="hivis-truck">${TOW_SVG}</i></div></div>`;}

// Advert autoplay (owner request, «لساتو مش autoplay»): a new advert 5 seconds after the last change, always, while
// the slider is on screen; the current dot fills as the time runs. Every change, by hand or by the timer, restarts the
// count so the dot and the swap stay together. A touch or keyboard focus holds it for 8 seconds; the mouse resting on
// it does not (in the desktop preview that kept it still). With reduced motion it still advances, without the slide.
let adTimer=null,adPausedUntil=0;
function queueAd(ms=5000){clearTimeout(adTimer);adTimer=setTimeout(tickAd,ms);}
function tickAd(){
  const b=$('.home-ads');if(!b)return;
  const r=b.getBoundingClientRect();
  if(document.hidden||Date.now()<adPausedUntil||r.bottom<0||r.top>innerHeight)return queueAd(1000);
  b.classList.remove('paused');changeHomeAd(homeAdIndex+1);
}
function startAdAutoplay(){
  const box=$('.home-ads');if(!box)return clearTimeout(adTimer);
  box.classList.add('auto');
  const hold=()=>{adPausedUntil=Date.now()+8000;box.classList.add('paused');queueAd(8000);};
  box.addEventListener('pointerdown',hold);
  box.addEventListener('focusin',e=>{if(e.target.matches(':focus-visible'))hold();});
  queueAd();
}

// Every make (owner: «خلي الصانع بيحوي كل انواع السيارات»): with this many makes the make step becomes the same
// browser as the models: search in Arabic or Latin, the most requested makes as logo tiles, a letter strip, and every
// make in letter groups, each with its logo. A make without a published logo shows its Latin initials in the circle.
const makeMark=(m,cls='pick-logo')=>m.mono?`<span class="${cls} is-mono" aria-hidden="true"><em>${m.mono}</em></span>`:`<span class="${cls}" aria-hidden="true"><i style="-webkit-mask-image:url(assets/brands/${m.id}.svg);mask-image:url(assets/brands/${m.id}.svg)"></i></span>`;
function makeBrowser(){
  const first=n=>n[0].replace(/[أإآ]/,'ا');
  const groups={};[...MAKES].sort((a,b)=>a.name.localeCompare(b.name,'ar')).forEach(m=>{(groups[first(m.name)]=groups[first(m.name)]||[]).push(m);});
  const letters=Object.keys(groups);
  const item=m=>`<button type="button" class="model-item make-item" data-action="car-choose" data-step="make" data-value="${m.id}" data-search="${esc(norm(m.name+' '+(m.alt||[]).join(' ')))}" aria-pressed="${S.mk===m.id}">${makeMark(m,'make-mark')}<span>${m.name}</span>${S.mk===m.id?ic('check',14):''}</button>`;
  return `<div class="model-browser"><label class="model-search">${ic('search',18)}<input id="model-q" type="search" placeholder="ابحث: مرسيدس، BMW…" autocomplete="off" aria-label="ابحث عن صانع السيارة"></label><div class="model-pop"><span class="model-label">الأكثر طلبًا</span><div class="pick-grid pick-make">${MAKES.filter(m=>m.pop).map((m,i)=>`<button type="button" class="pick-option" style="--i:${i}" data-action="car-choose" data-step="make" data-value="${m.id}" aria-pressed="${S.mk===m.id}">${makeMark(m)}<b>${m.name}</b>${S.mk===m.id?`<span class="pick-tick" aria-hidden="true">${ic('check',12)}</span>`:''}</button>`).join('')}</div></div><nav class="model-letters" aria-label="انتقل لحرف">${letters.map(l=>`<button type="button" data-letter="${l}">${l}</button>`).join('')}</nav><div class="model-all"><span class="model-label">كل الصانعين · ${MAKES.length}</span>${letters.map(l=>`<section class="model-group" data-group="${l}"><h4>${l}</h4><div class="model-list">${groups[l].map(item).join('')}</div></section>`).join('')}<p class="model-none" hidden>ما لقينا صانع بهالاسم. جرّب اسمه بالإنجليزي.</p></div></div>`;
}

// Many models (owner: «افرض موديلات السيارة 66 موديل»): when a make has more than twelve models the model step
// becomes a browser: a search field that understands Arabic and Latin names, the most requested models as large
// cards, a letter strip to jump, and every model in letter groups with sticky headings.
function modelBrowser(mk){
  const first=n=>n[0].replace(/[أإآ]/,'ا');
  const groups={};[...mk.models].sort((a,b)=>a.name.localeCompare(b.name,'ar')).forEach(m=>{(groups[first(m.name)]=groups[first(m.name)]||[]).push(m);});
  const letters=Object.keys(groups),tick=m=>S.md===m.id?`<span class="pick-tick" aria-hidden="true">${ic('check',12)}</span>`:'';
  const item=m=>`<button type="button" class="model-item" data-action="car-choose" data-step="model" data-value="${m.id}" data-search="${esc(norm(m.name+' '+(m.alt||[]).join(' ')))}" aria-pressed="${S.md===m.id}">${m.name}${S.md===m.id?ic('check',14):''}</button>`;
  return `<div class="model-browser"><label class="model-search">${ic('search',18)}<input id="model-q" type="search" placeholder="ابحث: كورولا، Hilux…" autocomplete="off" aria-label="ابحث عن موديل ${mk.name}"></label><div class="model-pop"><span class="model-label">الأكثر طلبًا</span><div class="pick-grid pick-model">${mk.models.filter(m=>m.pop).map((m,i)=>`<button type="button" class="pick-option" style="--i:${i}" data-action="car-choose" data-step="model" data-value="${m.id}" aria-pressed="${S.md===m.id}"><small>${mk.name}</small><b>${m.name}</b>${tick(m)}</button>`).join('')}</div></div><nav class="model-letters" aria-label="انتقل لحرف">${letters.map(l=>`<button type="button" data-letter="${l}">${l}</button>`).join('')}</nav><div class="model-all"><span class="model-label">كل الموديلات · ${mk.models.length}</span>${letters.map(l=>`<section class="model-group" data-group="${l}"><h4>${l}</h4><div class="model-list">${groups[l].map(item).join('')}</div></section>`).join('')}<p class="model-none" hidden>ما لقينا موديل بهالاسم. جرّب اسمه بالإنجليزي.</p></div></div>`;
}
document.addEventListener('input',e=>{
  if(e.target.id!=='model-q')return;
  const q=norm(e.target.value.trim()),box=e.target.closest('.model-browser');let any=false;
  box.querySelectorAll('.model-item').forEach(b=>{const hit=!q||b.dataset.search.includes(q);b.hidden=!hit;any=any||hit;});
  box.querySelectorAll('.model-group').forEach(g=>{g.hidden=!g.querySelector('.model-item:not([hidden])');});
  box.querySelector('.model-pop').hidden=!!q;box.querySelector('.model-letters').hidden=!!q;box.querySelector('.model-none').hidden=any;
});
document.addEventListener('click',e=>{const b=e.target.closest('[data-letter]');if(!b)return;const g=document.querySelector(`[data-group="${b.dataset.letter}"]`);if(g)g.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});});

// My car (owner: the customer can add his car). Kept on this device for the preview; the search card gets a one-tap
// «قطع سيارتي», the home page a section of parts that fit it, and categories go straight to it.
let carMode=null;
const myCar=()=>{let c=null;try{c=JSON.parse(localStorage.getItem('spary-mycar')||'null');}catch{}return c||(S.logged&&role!=='guest'?DEMO_CAR:null);};
const myCarName=c=>[makeOf(c.mk)?.name,modelOf(c.mk,c.md)?.name,c.yr].filter(Boolean).join(' ');
const makeLogo=(mk,cls='mycar-logo')=>makeMark(makeOf(mk)||{id:mk},cls);
function openMyCar(){carMode='save';catFlow=null;openCarPicker('make');}
function saveMyCar(){const c={mk:S.mk,md:S.md,yr:S.yr};try{localStorage.setItem('spary-mycar',JSON.stringify(c));}catch{}carMode=null;closeSheet();paint(true);toast(`حفظنا سيارتك: ${myCarName(c)}`);}
function searchMyCar(){const c=myCar();if(c)search({mk:c.mk,md:c.md,year:c.yr});}
// Customers only (owner: guests see no «add my car»). The search card is the one place to add it; the garage
// section appears once a car is saved.
function myCarChip(){const c=myCar();if(!S.logged)return '';
  if(!c)return `<button class="mycar-chip is-empty" data-action="mycar-add">${ic('car',18)}<span class="mycar-text"><b>أضف سيارتك</b><small>ومنطلّعلك القطع المطابقة لبياناتها</small></span><span class="mycar-plus">${ic('plus',16)}</span></button>`;
  return `<div class="mycar-row"><button class="mycar-chip" data-action="mycar-search" aria-label="قطع سيارتي: ${myCarName(c)}">${makeLogo(c.mk)}<span class="mycar-text"><small>سيارتي</small><b>${myCarName(c)}</b></span><span class="mycar-go">قطعها${ic('chev',14)}</span></button><button class="mycar-edit" data-action="mycar-add" aria-label="غيّر سيارتك">${ic('swap',17)}</button></div>`;}

// A drawn side view of a saloon, in the signal colour, for the garage card.
const CAR_SVG='<svg class="car-art" viewBox="0 0 230 84" aria-hidden="true"><path class="car-speed" d="M4 44h22M10 54h26M2 64h18"/><path class="car-body" d="M30 64c0-11 7-16 19-18l26-4c11-13 27-21 48-21h29c17 0 29 8 41 20l17 4c9 2 14 9 14 19z"/><path class="car-glass" d="M83 42c9-10 22-15 37-15h28c13 0 23 5 31 15z"/><path class="car-line" d="M128 27v15M52 52h22M196 52h10"/><g class="car-wheel"><circle cx="72" cy="64" r="14"/><circle class="car-hub" cx="72" cy="64" r="5"/></g><g class="car-wheel"><circle cx="186" cy="64" r="14"/><circle class="car-hub" cx="186" cy="64" r="5"/></g></svg>';
function fitCard(l){const now=lp(l),added=S.cart.includes(l.id);return `<article class="fit-card"><button class="fit-open" data-action="product" data-id="${l.id}" aria-label="${nm(l.n).name}، ${price(now)} دينار"><span class="fit-media"><img src="${photo(l)}" alt="" loading="lazy"><span class="fit-badge">${ic('check',12)}مطابقة لبيانات سيارتك</span></span><b>${productName(l)}</b><span class="fit-meta">${l.cond==='new'?'جديدة':'مستعملة'} · ${TR[l.tr].name}</span><span class="fit-price">${price(now)}<i>د.أ</i>${l.offer?`<s>${price(l.price)}</s>`:''}</span></button><button class="fit-add ${added?'added':''}" data-action="add" data-id="${l.id}" aria-label="${added?'القطعة في السلة':'أضف '+nm(l.n).name+' للسلة'}">${ic(added?'check':'plus',18)}</button></article>`;}
function myCarSection(){const c=myCar();
  if(!S.logged||!c)return '';
  const fits=L.filter(l=>l.mk===c.mk&&l.md===c.md&&matchesYear(l,c.yr));
  return `<section class="section mycar-sec" aria-labelledby="mycar-title"><div class="garage">${CAR_SVG}<div class="garage-top">${makeLogo(c.mk,'garage-logo')}<button class="garage-change" data-action="mycar-add">${ic('swap',15)}غيّر</button></div><span class="garage-kicker">${ic('car',14)}سيارتك</span><h2 id="mycar-title">${myCarName(c)}</h2><p>${fits.length?`${fits.length} ${fits.length===1?'قطعة مطابقة':'قطع مطابقة'} لبياناتها هلّق، من تجّار الأردن.`:'ما في قطع معروضة لسيارتك هلّق، بس منعرضها هون أول ما تنزل.'}</p></div>${fits.length?`<div class="fit-rail">${fits.slice(0,8).map(fitCard).join('')}</div><p class="fit-note">${ic('info',14)}المطابقة حسب الصانع والموديل والسنة. تأكّد من ملاءمة القطعة مع التاجر قبل الطلب.</p><button class="fit-all" data-action="mycar-search">كل قطع سيارتي${ic('chev',15)}</button>`:''}</section>`;}

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
  const t=TR[l.tr],now=lp(l),added=S.cart.includes(l.id),o=l.offer;
  return `<article class="deal" style="--i:${i}"><button class="deal-open" data-action="product" data-id="${l.id}" aria-label="عرض ${nm(l.n).name} من ${t.name}، بسعر العرض ${price(now)} دينار بدل ${price(l.price)}، حتى ${o.ends}"><span class="deal-sticker" aria-hidden="true"><b>${o.pct}%</b><small>خصم</small></span><div class="deal-media"><img src="${photo(l)}" alt="${nm(l.n).name}" loading="lazy"><div class="deal-tags"><span>${l.cond==='new'?'جديدة':'مستعملة'}</span><span>${l.auth==='agency'?'قطعة وكالة':'قطعة تاجر'}</span>${l.special?'<span>شحن خاص</span>':''}</div></div><div class="deal-body"><h3>${productName(l)}</h3><span class="deal-fit">${ic('car',14)}${l.cars}</span><div class="deal-price"><div class="now"><small>سعر العرض</small><b>${price(now)}<i>د.أ</i></b></div><div class="was"><small>قبل العرض</small><s>${price(l.price)}</s></div></div><div class="deal-stock"><div class="deal-stock-row"><span class="deal-ends">${ic('clock',13)}العرض ساري حتى ${o.ends}</span></div></div><div class="deal-shop">${ic('store',13)}<span>${t.name}</span><b>${ic('star',11)}${t.rating}</b></div></div></button><div class="deal-cta"><button class="deal-add ${added?'added':''}" data-action="add" data-id="${l.id}" aria-label="${added?'القطعة في السلة':'أضف '+nm(l.n).name+' للسلة'}">${ic(added?'check':'cart',17)}${added?'في السلة':'أضف للسلة'}</button><button class="deal-share" data-action="share-offer" data-id="${l.id}" aria-label="شارك عرض ${nm(l.n).name}">${SHARE_ICON}</button></div></article>`;
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
  const steps=catFlow?CAR_STEPS.slice(0,2):CAR_STEPS,lead=catFlow?`<span class="pick-step done cat-lead"><span>${ic('check',12)}</span>${catFlow.name}</span><i class="pick-link" aria-hidden="true"></i>`:'';
  const chain=lead+steps.map(([id,label],i)=>{const shown=value[id]&&id!==step;return `<button type="button" class="pick-step ${id===step?'now':shown?'done':''}" data-action="car-pick" data-value="${id}" ${open[id]?'':'disabled'} ${id===step?'aria-current="step"':''}><span>${shown?ic('check',12):i+1}</span>${shown?value[id]:label}</button>`;}).join('<i class="pick-link" aria-hidden="true"></i>');
  const opts=step==='make'?MAKES.map(m=>({v:m.id,t:m.name,logo:m.id,sel:S.mk===m.id})):step==='model'?(mk?.models||[]).map(m=>({v:m.id,t:m.name,sub:mk.name,sel:S.md===m.id})):Array.from({length:19},(_,i)=>2026-i).map(y=>({v:y,t:y,sel:+S.yr===y}));
  if(step==='make'&&MAKES.length>12)return `<div class="car-picker"><nav class="pick-chain" aria-label="خطوات اختيار السيارة">${chain}</nav>${makeBrowser()}</div>`;
  if(step==='model'&&mk&&mk.models.length>12)return `<div class="car-picker"><nav class="pick-chain" aria-label="خطوات اختيار السيارة">${chain}</nav>${modelBrowser(mk)}</div>`;
  return `<div class="car-picker"><nav class="pick-chain" aria-label="خطوات اختيار السيارة">${chain}</nav><div class="pick-grid pick-${step}">${opts.map((o,i)=>`<button type="button" class="pick-option" style="--i:${i}" data-action="car-choose" data-step="${step}" data-value="${o.v}" aria-pressed="${o.sel}">${o.logo?makeMark(makeOf(o.logo)):''}${o.sub?`<small>${o.sub}</small>`:''}<b>${o.t}</b>${o.sel?`<span class="pick-tick" aria-hidden="true">${ic('check',12)}</span>`:''}</button>`).join('')}</div></div>`;
}
function openCarPicker(step){
  const d=$('#sheet'),first=!d.open;
  sheet(catFlow?`قطع ${catFlow.name}: ${CAR_TITLES[step]}`:carMode==='save'?`أضف سيارتك: ${CAR_TITLES[step]}`:CAR_TITLES[step],carPickerBody(step));d.classList.add('car-sheet'); // sheet() clears it for every other sheet
  if(first)d.addEventListener('close',()=>{catFlow=null;carMode=null;if(document.activeElement===document.body)($('#car-form .car-step.now')||$('#car-form .car-go'))?.focus();},{once:true});
  (d.querySelector('.pick-option[aria-pressed=true]')||d.querySelector('.pick-option'))?.focus();
}
function chooseCar(step,val){
  if(step==='make'){if(S.mk!==val){S.md='';S.yr='';}S.mk=val;}
  if(step==='model'){if(S.md!==val)S.yr='';S.md=val;}
  if(step==='year')S.yr=val;
  if(S.tab==='car'&&$('#search-panel'))$('#search-panel').innerHTML=searchPanel();
  if(catFlow&&step==='model'){const c=catFlow;catFlow=null;closeSheet();search({part:c.part,mk:S.mk,md:S.md});return;}
  if(carMode==='save'){if(step==='year')return saveMyCar();return openCarPicker(step==='make'?'model':'year');}
  const next=catFlow?(step==='make'?'model':null):step==='make'&&!S.md?'model':step==='model'&&!S.yr?'year':null;
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

// Three roles for the client's review (owner 2026-10-31: «العميل لازم يشوف تصميم الرئيسية بالضيف والزبون العادي والزبون
// يلي عندو متجر»). A panel outside the phone sets the role, and #as=guest|customer|merchant opens the link on one. The
// home stays one page: the guest sees it as it is; the customer adds his saved car and his order on its way (ORD-15);
// the customer with a store gets the capacity switch at the top (ACC-7) carrying his store's reply clock, and behind it
// the store's own home: orders waiting for his answer (ORD-4/5/14), the store in numbers, and the suppliers' discounts
// shown to merchants only (SUP-3/6).
const ROLES=[['guest','ضيف','user','يتصفّح ويبحث بلا تسجيل'],['customer','زبون','car','سيارته محفوظة، وطلبه بالطريق'],['merchant','زبون عنده متجر','store','يتسوّق لنفسه، ومتجره بكبسة']];
const DEMO_CAR={mk:'hyundai',md:'avante',yr:'2013'};
let role='guest';
function renderRoles(){const box=$('#roles');if(!box)return;box.innerHTML=`<span class="roles-kicker">معاينة للعميل</span><h2 class="roles-title">شوف الرئيسية <em>كـ</em></h2><div class="roles-list" role="group" aria-label="شوف الرئيسية كـ">${ROLES.map(([id,t,i,d])=>`<button type="button" data-role="${id}" aria-pressed="${role===id}"><span class="role-ico">${ic(i,18)}</span><span class="role-copy"><b>${t}</b><small>${d}</small></span></button>`).join('')}</div>`;}
function demoOrder(){const a=L.find(l=>l.id===1),b=L.find(l=>l.tr==='saleem'&&l.n!=='pads_f')||L[1];return {id:1042,items:[a.id,b.id],gov:'عمّان',total:lp(a)+lp(b),status:'shipping',demo:true};}
function setRole(r,quiet){
  role=ROLES.some(x=>x[0]===r)?r:'guest';
  Object.assign(S,{logged:role!=='guest',phone:role==='guest'?'':'0790000142',store:role==='merchant',mode:'shop',back:[],page:'home',nav:'home'});
  S.orders=S.orders.filter(o=>!o.demo);if(role==='customer')S.orders.unshift(demoOrder());
  try{history.replaceState(null,'','#as='+role);}catch{}
  renderRoles();paint();if(!quiet)toast('الرئيسية كـ'+ROLES.find(x=>x[0]===role)[1]);
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-role]');if(b)setRole(b.dataset.role);});

// The customer's order on its way (ORD-15): the brand's connection line from the merchant to the door, four stops,
// the current one lit. No delivery time is promised; payment stays on delivery (ORD-3).
const TRACK=[['معلّق','clock'],['مؤكَّد','check'],['قيد التوصيل','truck'],['تمّ التسليم','home']];
const ORDER_STATUS={pending:'معلّق · بانتظار تأكيد التجار',confirmed:'مؤكَّد',shipping:'قيد التوصيل',delivered:'تمّ التسليم'};
const countAr=(n,one,two,many)=>n===1?one:n===2?two:`${n} ${many}`;
function orderTrack(){
  if(!S.logged||S.store)return '';
  const o=S.orders.find(o=>!o.cancelled&&o.status&&o.status!=='delivered');if(!o)return '';
  const step={pending:0,confirmed:1,shipping:2}[o.status]??0,items=o.items.map(id=>L.find(l=>l.id===id)),traders=new Set(items.map(l=>l.tr)).size;
  return `<section class="track" aria-labelledby="track-title"><div class="track-top"><span class="track-kicker">${ic('box',14)}طلبك رقم <b class="num">${o.id}</b></span><span class="track-parts" aria-hidden="true">${items.slice(0,3).map(l=>`<img src="${photo(l)}" alt="">`).join('')}</span></div><h2 id="track-title">${step===2?'قطعك <em>بالطريق</em> إلك.':step===1?'طلبك <em>تأكّد</em>.':'التجار <em>عم يأكّدوا</em> قطعك.'}</h2><p>${countAr(items.length,'قطعة وحدة','قطعتين','قطع')} من ${countAr(traders,'تاجر واحد','تاجرين','تجار')} · الدفع عند الاستلام</p><ol class="track-line" style="--step:${step}">${TRACK.map(([t,i],k)=>`<li class="${k<step?'done':k===step?'now':''}"><span class="track-dot">${ic(i,14)}</span><small>${t}</small></li>`).join('')}</ol><button class="track-go" data-action="orders">تابع طلبك${ic('chev',15)}</button></section>`;
}

// Capacity switch (ACC-7): always on top of the merchant's home, one tap between buying for himself and his store.
// The store side carries the clock of the order closest to its 15-minute limit (ORD-5).
const MY_STORE='nash',STORE_PLAN={name:'الباقة المميّزة',days:23,limit:200};
const STORE_ORDERS=[{id:1043,item:1,who:'أحمد',area:'ماركا، عمّان',secs:760,state:'wait'},{id:1044,item:18,who:'رنا',area:'حي معصوم، الزرقاء',secs:530,state:'wait'}];
let storeT0=0,storeTick=null;
const leftOf=o=>Math.max(0,Math.round(o.secs-(Date.now()-storeT0)/1000));
const mmss=s=>`${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;
const nextOrder=()=>STORE_ORDERS.filter(o=>o.state==='wait').sort((a,b)=>leftOf(a)-leftOf(b))[0];
function capacitySwitch(){if(!S.store)return '';const o=nextOrder();return `<div class="capacity" role="group" aria-label="بأي صفة عم تستخدم Spary" data-mode="${S.mode}"><span class="capacity-ink" aria-hidden="true"></span><button type="button" data-action="mode" data-value="shop" aria-pressed="${S.mode==='shop'}">${ic('cart',15)}أتسوّق لنفسي</button><button type="button" data-action="mode" data-value="store" aria-pressed="${S.mode==='store'}">${ic('store',15)}متجري${o?`<span class="capacity-clock" aria-label="أقرب مهلة رد">${ic('clock',11)}<b data-clock="next">${mmss(leftOf(o))}</b></span>`:''}</button></div>`;}
function startStoreClock(){
  clearInterval(storeTick);if(!S.store)return;if(!storeT0)storeT0=Date.now();
  storeTick=setInterval(()=>{let late=false;
    STORE_ORDERS.forEach(o=>{if(o.state!=='wait')return;const s=leftOf(o);if(!s){o.state='late';late=true;}
      document.querySelectorAll(`[data-clock="${o.id}"]`).forEach(el=>el.textContent=mmss(s));
      document.querySelectorAll(`[data-ring="${o.id}"]`).forEach(el=>el.style.setProperty('--p',(s/900).toFixed(4)));});
    const n=nextOrder();document.querySelectorAll('[data-clock="next"]').forEach(el=>el.textContent=n?mmss(leftOf(n)):'');
    if(late&&S.page==='home')paint(true);},1000);
}

// The store's home, behind «متجري».
const SO_STATE={done:['check','أكّدت التوفّر. بننتظر باقي التجار، وبعدها شركة التوصيل.'],sorry:['x','اعتذرت. بلّغنا الزبون يختار تاجر بديل.'],late:['clock','انتهت مهلة الرد. بلّغنا الزبون يختار تاجر بديل.']};
function storeOrder(o){const l=L.find(x=>x.id===o.item),s=leftOf(o),wait=o.state==='wait';return `<article class="so-card is-${o.state}"><div class="so-top">${wait?`<span class="so-ring" data-ring="${o.id}" style="--p:${(s/900).toFixed(4)}"><b data-clock="${o.id}">${mmss(s)}</b><small>للرد</small></span>`:`<span class="so-ring is-end">${ic(SO_STATE[o.state][0],20)}</span>`}<div class="so-copy"><span class="so-no">طلب <span class="num">${o.id}</span> · ${o.who} · ${o.area}</span><b>${nm(l.n).name}</b><small>${l.cars}</small></div><img class="so-photo" src="${photo(l)}" alt=""></div>${wait?`<div class="so-foot"><b class="so-price"><span class="num">${price(lp(l))}</span> <small>د.أ</small></b><div class="so-acts"><button type="button" class="so-sorry" data-action="so-sorry" data-id="${o.id}">اعتذر</button><button type="button" class="so-yes" data-action="so-ok" data-id="${o.id}">${ic('check',16)}متوفرة، أكّد</button></div></div>`:`<p class="so-note">${SO_STATE[o.state][1]}</p>`}</article>`;}
const SUP_DEALS=[{n:'pads_f',sup:'الريّان لتوزيع قطع الكوري',pct:15,ends:'7 تشرين الثاني',was:11.2,tiers:[[5,9.5],[20,8.25]]},{n:'shock',sup:'الريّان لتوزيع قطع الكوري',pct:18,ends:'5 تشرين الثاني',was:25.6,tiers:[[4,21],[12,18.9]]},{n:'headlight',sup:'مستودع الأفق للقطع',pct:12,ends:'10 تشرين الثاني',was:59,tiers:[[2,52],[6,47.5]]},{n:'hybatt',sup:'هايبرد بلس للتوريد',pct:10,ends:'14 تشرين الثاني',was:680,tiers:[[1,610],[3,575]]}];
const units=n=>n===1?'حبّة':n===2?'حبّتين':n<=10?`${n} حبّات`:`${n} حبّة`;
function supDeal(d,i){return `<article class="sup-card" style="--i:${i}"><span class="sup-photo"><img src="assets/${media[d.n]}" alt="" loading="lazy"><span class="sup-pct">−${d.pct}٪</span></span><b class="sup-name">${nm(d.n).name}</b><span class="sup-from">${ic('supply',13)}${d.sup}</span><ul class="sup-tiers">${d.tiers.map(([q,p],k)=>`<li><span>من ${units(q)}</span><b><span class="num">${price(p)}</span> <small>د.أ</small></b>${k?'':`<s class="num">${price(d.was)}</s>`}</li>`).join('')}</ul><span class="sup-ends">${ic('clock',12)}الخصم لـ ${d.ends}</span><button type="button" class="sup-go" data-action="sup-order" data-id="${i}">اطلب من المورّد${ic('chev',14)}</button></article>`;}
function storeHome(){
  const t=TR[MY_STORE],offers=L.filter(l=>l.tr===MY_STORE&&l.offer).length,wait=STORE_ORDERS.filter(o=>o.state==='wait').length;
  return `<section class="st-hero"><img class="st-cover" src="assets/stores/${MY_STORE}.webp" alt=""><header class="app-header"><div class="app-logo" aria-label="Spary">${LOCKUP}</div><div class="header-actions"><button class="icon-btn" data-action="account" aria-label="حسابي">${ic('user',20)}</button></div></header>${capacitySwitch()}<div class="st-id"><span class="my-seal" aria-hidden="true"><svg viewBox="0 0 100 100"><path id="seal-mine" d="M50 50m-37 0a37 37 0 1 1 74 0a37 37 0 1 1-74 0" fill="none"/><text><textPath href="#seal-mine" textLength="229" lengthAdjust="spacing">MY STORE • SPARY • JORDAN • </textPath></text></svg><b>ن</b></span><div><span class="st-kicker">متجرك على Spary</span><h1>${t.name}</h1><p>${ic('pin',13)}${t.area} · <b>${t.rating}</b> ${ic('star',12)}</p></div></div><div class="st-plan"><span>${ic('shield',15)}${STORE_PLAN.name}</span><b>باقي <span class="num">${STORE_PLAN.days}</span> يوم</b><i style="--w:${STORE_PLAN.days/30}" aria-hidden="true"></i></div></section>
  <section class="section st-orders" aria-labelledby="st-orders-title"><div class="st-head"><div><span class="st-label">${ic('bell',14)}طلبات جديدة</span><h2 id="st-orders-title">بانتظار <em>ردّك</em></h2></div>${wait?`<span class="st-count"><b>${wait}</b>${wait===1?'طلب':'طلبين'}</span>`:''}</div><p class="st-sub">أكّد توفّر القطعة خلال 15 دقيقة من أوقات العمل. بتشوف اسم الزبون ومنطقته بس، ورقمه وعنوانه بيروحوا لشركة التوصيل.</p><div class="so-list">${STORE_ORDERS.map(storeOrder).join('')}</div></section>
  <section class="section st-pulse" aria-label="متجرك بالأرقام"><div class="st-stats"><div class="st-stat st-wide"><span>قطعك المنشورة</span><b><span class="num">${t.count}</span><small> من ${STORE_PLAN.limit}</small></b><i class="st-bar" style="--w:${t.count/STORE_PLAN.limit}" aria-hidden="true"></i></div><div class="st-stat"><span>عروضك السارية</span><b class="num">${offers}</b></div><div class="st-stat"><span>تقييم زبائنك</span><b><span class="num">${t.rating}</span> ${ic('star',15)}</b></div><div class="st-stat st-wide st-free"><span>${ic('truck',15)}توصيل مجاني من متجرك</span><b>من <span class="num">${t.free}</span> د.أ</b><em>مفعّل</em></div></div><div class="st-quick">${[['plus','أضف قطعة','st-add'],['tag','أضف عرض','st-offer'],['store','صفحة متجري','store'],['truck','التوصيل المجاني','st-free']].map(([i,txt,a])=>`<button type="button" data-action="${a}" ${a==='store'?`data-value="${MY_STORE}"`:''}><span>${ic(i,20)}</span>${txt}</button>`).join('')}</div></section>
  <section class="section sup" aria-labelledby="sup-title"><div class="st-head"><div><span class="st-label">${ic('supply',14)}للتجار بس</span><h2 id="sup-title">خصومات <em>الموردين</em></h2></div></div><p class="st-sub">اشترِ لمحلّك بسعر الجملة. السعر بينزل كل ما زادت الكمية.</p><div class="sup-rail">${SUP_DEALS.map(supDeal).join('')}</div></section>${homeSign()}`;
}

// Services page on Alaa's sections (owner 2026-10-31: «صفحة الخدمات متل ماعملها علاء… من حيث التقسيم»): the hi-vis hero
// with the search area inside it, the directory head with its count, a switch between service type and area (SVC-4
// asks for the area filter; Alaa's «الحالة» has no basis in the SRS), the chips, a card per provider with its photo,
// type, name, description and area and three actions (call, WhatsApp as SVC-5, location), then the closing note
// (SVC-1). Nearest first (SVC-4); distances show only once the customer shares his location (SRCH-11).
const SVC_KINDS=[['ونش وسحب سيارات','ونش','truck'],['سطحة بين المحافظات','سطحة','truck'],['كراج ميكانيك','كراج','wrench'],['كهربائي سيارات','كهربائي','bolt'],['تكييف','تكييف','snow'],['بنشر وإطارات وبلانص','بنشر','tire'],['بطاريات وتشغيل على الطريق','بطاريات','battery'],['سمكرة ودهان','سمكرة ودهان','paint'],['زجاج وتظليل','زجاج وتظليل','glass'],['غسيل وتلميع','غسيل','sparkle'],['تنظيف داخلي','تنظيف داخلي','seat'],['فحص قبل الشراء','فحص قبل الشراء','search'],['برمجة مفاتيح','مفاتيح','key'],['كاميرات وأنظمة صوت','صوت وكاميرات','cam'],['تغيير زيت متنقّل','زيت متنقّل','drop'],['تأمين','تأمين','shield'],['معاملات ترخيص','ترخيص','doc'],['تأجير سيارات','تأجير','car'],['شراء سيارات حوادث','سيارات حوادث','cash'],['عُدد صناعية','عُدد صناعية','wrench']];
const svcType=t=>SVC_KINDS.find(x=>x[0]===t)||[t,t,'wrench'];
let svcBy='type';
function svcCard(s,i){const [,short,icon]=svcType(s.type);return `<article class="svc-card" style="--i:${i}"><button type="button" class="svc-open" data-action="service" data-id="${s.id}" aria-label="${s.name}، ${s.type}، ${s.area}"><span class="svc-photo"><img src="assets/services/${s.photo}.webp" alt="" loading="lazy"><i class="svc-badge">${ic(icon,15)}</i>${S.gps?`<span class="svc-km"><b class="num">${s.km}</b>كم</span>`:''}</span><span class="svc-copy"><span class="svc-tag">${short}</span><b class="svc-name">${s.name}</b><span class="svc-desc">${s.info}</span><span class="svc-place">${ic('pin',13)}${s.area} · ${s.gov}</span></span></button><div class="svc-acts"><button type="button" class="svc-call" data-action="svc-call" data-id="${s.id}" aria-label="اتصل بـ${s.name}">${ic('phone',16)}اتصال</button><button type="button" class="svc-wapp" data-action="whatsapp" data-id="${s.id}" aria-label="راسل ${s.name} على واتساب">${WHATSAPP_ICON}واتساب</button><button type="button" class="svc-loc" data-action="svc-map" data-id="${s.id}" aria-label="موقع ${s.name}">${ic('pin',16)}الموقع</button></div></article>`;}
function servicesPage(){
  const inGov=SVCS.filter(s=>s.gov===S.gov).sort((a,b)=>a.km-b.km);
  const list=inGov.filter(s=>(!S.serviceType||s.type===S.serviceType)&&(!S.svcArea||s.area===S.svcArea));
  const types=[...new Set(inGov.map(s=>s.type))],areas=[...new Set(inGov.map(s=>s.area))];
  const chips=svcBy==='type'?[['','الكل','car',inGov.length],...SVC_KINDS.filter(t=>types.includes(t[0])||t[0]===S.serviceType).map(([v,t,i])=>[v,t,i,inGov.filter(s=>s.type===v).length])]:[['','كل المناطق','pin',inGov.length],...areas.map(a=>[a,a,'pin',inGov.filter(s=>s.area===a).length])];
  const cur=svcBy==='type'?S.serviceType||'':S.svcArea||'';
  return `${header('خدمات السيارة')}<div class="page-body svc-page2"><section class="hivis svc-hero"><div class="hivis-head"><span class="hivis-eyebrow">${ic('truck',15)}خدمات الطريق والسيارة</span><h2>وقفت؟ <em>إلها حل.</em></h2><p>مزوّدين حواليك، تواصل معهم مباشرة.</p></div><div class="svc-where"><button type="button" class="svc-where-main" data-action="location"><span class="svc-where-ico">${ic(S.gps?'locate':'pin',18)}</span><span class="svc-where-copy"><small>نبحث حول</small><b>${S.gps?'موقعك الحالي':S.gov}</b></span>${ic('down',14)}</button><button type="button" class="svc-gps" data-action="gps" aria-pressed="${!!S.gps}">${ic('locate',16)}${S.gps?'موقعي ✓':'موقعي'}</button></div><div class="hivis-road" aria-hidden="true"><i class="hivis-truck">${TOW_SVG}</i></div></section>
  <section class="svc-dir" aria-labelledby="svc-dir-title"><div class="svc-dir-head"><div><span class="svc-dir-kicker">${ic('wrench',14)}دليل مزوّدي الخدمة</span><h2 id="svc-dir-title">اختار <em>الأقرب</em> لسيارتك</h2></div><span class="svc-count"><b class="num">${list.length}</b>${list.length===1?'مزوّد':'مزوّد'}</span></div><div class="svc-seg" role="group" aria-label="فلترة حسب" data-by="${svcBy}"><span class="svc-seg-ink" aria-hidden="true"></span><button type="button" data-action="svc-by" data-value="type" aria-pressed="${svcBy==='type'}">نوع الخدمة</button><button type="button" data-action="svc-by" data-value="area" aria-pressed="${svcBy==='area'}">المنطقة</button></div><div class="svc-chips2">${chips.map(([v,t,i,n])=>`<button type="button" data-action="${svcBy==='type'?'service-filter':'svc-area'}" data-value="${v}" aria-pressed="${cur===v}">${ic(i,15)}${t}<small class="num">${n}</small></button>`).join('')}${svcBy==='type'?`<button type="button" class="svc-all-types" data-action="svc-types">${ic('filter',15)}كل الأنواع<small class="num">${SVC_KINDS.length}</small></button>`:''}</div>${list.length?`<div class="svc-list">${list.map(svcCard).join('')}</div>`:`<div class="svc-none">${ic('search',22)}<b>ما في مزوّد ${S.serviceType?`«${svcType(S.serviceType)[1]}» `:''}هون هلّق.</b><p>جرّب منطقة ثانية، أو كل الأنواع.</p><button type="button" class="secondary" data-action="svc-reset">اعرض كل المزوّدين</button></div>`}<p class="svc-foot">${ic('info',16)}<span>تواصل مباشرة مع صاحب الخدمة واتفق معه. Spary بتعرض الإعلان بس، بلا حجز ولا دفع.</span></p></section></div>`;
}
function svcTypesSheet(){const inGov=SVCS.filter(s=>s.gov===S.gov);sheet('كل أنواع الخدمات',`<p style="margin-bottom:14px">بـ${S.gov}. اختار النوع اللي بدّك ياه.</p><div class="svc-types-grid">${SVC_KINDS.map(([v,t,i])=>{const n=inGov.filter(s=>s.type===v).length;return `<button type="button" data-action="service-filter" data-value="${v}" aria-pressed="${S.serviceType===v}" ${n?'':'class="is-empty"'}><span>${ic(i,18)}</span><b>${t}</b><small>${n?`${n} ${n===1?'مزوّد':'مزوّدين'}`:'ما في حواليك'}</small></button>`;}).join('')}</div>`);}

// «اسأل عن القطعة» (owner 2026-10-31: the AI feature agreed with the client sits in the part's details, where the customer
// asks about that part). Not in the signed SRS; its scope waits for the owner and the client.
// The prototype answers from the listing itself, deterministically, to show the behaviour the real assistant must keep:
// it reads the part's data and the merchant's, compares the part's cars with the customer's saved car and calls that a
// match on make, model and year, never a guarantee (SRCH-5/9); it does not promise availability (ORD-4), does not
// diagnose faults, and sends anything it cannot answer from the data to the merchant.
const ASK_SUGS=['بتركب على سيارتي؟','شو يعني قطعة وكالة؟','شو بتغطّي الكفالة؟','في سعر أرخص لنفس القطعة؟','فيني أرجّعها؟','متوفرة هلّق؟'];
let askItem=null,askLog=[],askBusy=false;
const askFacts=rows=>`<dl class="msg-facts">${rows.map(([k,v])=>`<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`;
const askWarn=t=>`<p class="msg-warn">${ic('info',13)}<span>${t}</span></p>`;
const askCall=t=>`<span class="msg-phone">${ic('phone',14)}<span dir="ltr">${t.phone}</span><small>${t.name}</small></span>`;
function askAnswer(l,q){
  const t=TR[l.tr],n=norm(q),has=re=>re.test(n),car=S.logged&&myCar();
  const same=L.filter(x=>x.n===l.n&&x.id!==l.id).sort((a,b)=>lp(a)-lp(b));
  if(has(/عطل|صوت|بيصفر|بتصفر|بتطقطق|مشكله|حراره|بيهز|رجفه/))return `<p>ما بقدر أشخّص أعطال السيارة، ولا أقرّر شو القطعة اللي بتلزمك من وصف العطل.</p>${askWarn('الكراج أو التاجر بيقدروا يساعدوك تحدّد القطعة. وإذا عرفت اسمها أو رقمها، بدوّر لك عليها.')}${askCall(t)}`;
  if(has(/متوفر|موجود|متاح|كميه|بقي منها|في منها/))return `<p>التوفّر بيأكّده التاجر نفسه عند كل طلب، خلال 15 دقيقة من أوقات العمل. ما بقدر أأكّده هلّق.</p>${askWarn('إذا اعتذر التاجر، منبلّغك وبتختار تاجر بديل أو بتلغي.')}`;
  if(has(/بتركب|تركب|يركب|بيركب|مناسب|ملائم|تناسب|سيارتي|بتمشي|بتزبط/)){
    const rows=[['مسجّلة عند التاجر لـ',l.cars]];
    if(!l.mk)return `<p>هالقطعة عامة، مش لموديل محدّد. التاجر كاتب: <b>${l.cars}</b>.</p>${askWarn('تأكّد من المواصفة المطلوبة لسيارتك من دليلها أو من التاجر قبل الطلب.')}${askCall(t)}`;
    if(!car)return `<p>هاد اللي حطّه التاجر عن السيارات اللي بتركب عليها:</p>${askFacts([...rows,['رقم OEM',l.oem||'ما حطّه التاجر']])}${askWarn(S.logged?'أضف سيارتك من الرئيسية، وبقارنها لك مباشرة. وللتأكيد النهائي اتصل بالتاجر.':'قارن رقم OEM برقم قطعتك القديمة، أو اتصل بالتاجر قبل الطلب.')}${askCall(t)}`;
    const ok=l.mk===car.mk&&l.md===car.md&&matchesYear(l,car.yr);rows.push(['سيارتك المحفوظة',myCarName(car)]);
    return `<span class="msg-pill ${ok?'is-ok':'is-no'}">${ic(ok?'check':'x',13)}${ok?'مطابقة لبيانات سيارتك':'مش مطابقة لبيانات سيارتك'}</span>${askFacts(rows)}${askWarn(ok?`المطابقة حسب الصانع والموديل والسنة اللي حطّها التاجر، مش ضمان. ${l.oem?`قارن رقم OEM <b dir="ltr">${l.oem}</b> برقم قطعتك، أو `:''}اتصل بالتاجر قبل الطلب.`:'إذا متأكد إنها بتلزمك، اسأل التاجر قبل الطلب.')}${askCall(t)}`;
  }
  if(has(/ارجاع|ارجع|ارجعها|رجع|استرجاع|استبدال|بدل/))return `<p>بتقدر تطلب إرجاع القطعة خلال <b>3 أيام</b> من استلامها. شركة التوصيل بتستلمها منك، وبترجّع ثمنها.</p>${askFacts([['أجرة الإرجاع','على اللي منه الخطأ: التاجر إذا القطعة غلط منه، وإنت إذا الخطأ منك']])}${askWarn('القطعة اللي ما بتشتغل بعد التركيب أمرها بينك وبين التاجر حسب الكفالة.')}`;
  if(has(/كفال|ضمان|كفاله/))return `<p>الكفالة على هالقطعة: <b>${l.war}</b>. التاجر هو اللي بيحدّدها وبيتحمّلها.</p>${askWarn('أي خلل بعد التركيب بتراجع فيه التاجر مباشرة ضمن مدّة الكفالة.')}${askCall(t)}`;
  if(has(/oem|رقم/))return l.oem?`<p>رقم القطعة الأصلي: <b dir="ltr">${l.oem}</b>.</p>${askWarn('قارنه بالرقم المكتوب على قطعتك القديمة، أو ابحث فيه عن عروض ثانية.')}<div class="msg-acts"><button type="button" data-ask-go="oem">دوّر بنفس الرقم${ic('chev',14)}</button></div>`:`<p>التاجر ما حطّ رقم OEM لهالقطعة المستعملة، وهو اختياري للمستعمل.</p>${askWarn('اطلب الرقم من التاجر، أو صورة القطعة الفعلية.')}${askCall(t)}`;
  if(has(/ارخص|سعر|بكم|غالي|عروض|قارن|مقارنه/)){
    if(!same.length)return `<p>هالقطعة موجودة عند هالتاجر بس على Spary: <b>${price(lp(l))} د.أ</b>.</p>`;
    const best=same[0],cheaper=lp(best)<lp(l);
    const others=same.length===1?'تاجر ثاني':same.length===2?'تاجرين ثانيين':same.length+' تجار ثانيين';
    return `<p>${cheaper?`في ${others} عندهم نفس القطعة، الأرخص بينهم:`:`هاد أرخص سعر لهالقطعة على Spary. وفي ${others} عندهم ياها بسعر أعلى.`}</p>${cheaper?askFacts([['السعر',`${price(lp(best))} د.أ${best.offer?' · عرض':''}`],['التاجر',TR[best.tr].name],['الحالة',`${best.cond==='new'?'جديدة':'مستعملة'} · ${best.auth==='agency'?'قطعة وكالة':'قطعة تاجر'}`]]):''}<div class="msg-acts"><button type="button" data-ask-go="part">قارن كل التجار${ic('chev',14)}</button></div>`;
  }
  if(has(/توصيل|شحن|يوصل|بيوصل/))return `<p>أجرة التوصيل حسب منطقتك، وبتشوفها قبل ما تأكّد الطلب. والدفع عند الاستلام.</p>${t.free?askFacts([['من هالمتجر',`توصيل مجاني عند شراء ${t.free} د.أ فأكثر`]]):''}${l.special?askWarn('هالقطعة كبيرة وبتنشحن شحن خاص، بنفس أجرة الشحن العادي لمنطقتك.'):''}`;
  if(has(/وكاله|وكالة|تجاري|اصلي|تقليد|بديل|ماركه|نوعيه|جوده/))return `<p>هالقطعة <b>${l.cond==='new'?'جديدة':'مستعملة'}</b>، و<b>${l.auth==='agency'?'قطعة وكالة':'قطعة تاجر'}</b>.</p>${askFacts([['قطعة وكالة','من الشركة المصنّعة للسيارة أو مورّدها الرسمي'],['قطعة تاجر','بديل من ماركة ثانية، عادةً أرخص'],['ماركة هالقطعة',l.brand]])}${askWarn('الجديد والمستعمل صفة، والوكالة والتاجر صفة ثانية. الثنتين مكتوبات على كل قطعة.')}`;
  if(has(/منشا|صنع|بلد|وين/))return `<p>المنشأ: <b>${l.origin}</b>، والماركة: <b>${l.brand}</b>.</p>`;
  return `<p>ما لقيت جواب أكيد لهالسؤال ببيانات القطعة.</p>${askWarn('اسأل التاجر مباشرة، هو أعرف بقطعته.')}${askCall(t)}`;
}
function askCard(l){return `<section class="ask-card" aria-labelledby="ask-title"><span class="ask-kicker">${ic('sparkle',14)}مساعد Spary الذكي</span><h3 id="ask-title">عندك سؤال عن <em>هالقطعة</em>؟</h3><p>بجاوبك من بيانات القطعة والتاجر، بثواني.</p><div class="ask-chips">${ASK_SUGS.slice(0,3).map(q=>`<button type="button" data-ask="${q}">${q}</button>`).join('')}</div><button type="button" class="ask-open" data-ask="">${ic('sparkle',15)}<span>اكتب سؤالك عن القطعة…</span><i>${ic('send',16)}</i></button></section>`;}
const askMsg=m=>m.me?`<div class="msg me"><p>${esc(m.text)}</p></div>`:m.typing?`<div class="msg bot typing" aria-label="عم يكتب"><i></i><i></i><i></i></div>`:`<div class="msg bot"><span class="msg-who">${ic('sparkle',13)}مساعد Spary</span><div class="msg-body">${m.html}</div><span class="msg-src">${ic('doc',12)}من بيانات القطعة والتاجر</span></div>`;
function askRender(){const th=$('#ask-thread');if(!th)return;th.innerHTML=askLog.length?askLog.map(askMsg).join(''):`<div class="ask-hello">${ic('sparkle',22)}<b>اسألني عن ${nm(askItem.n).name}</b><small>المطابقة، الكفالة، الإرجاع، والأسعار عند التجار الثانيين.</small></div>`;const asked=askLog.filter(m=>m.me).map(m=>m.text);$('#ask-sugs').innerHTML=ASK_SUGS.filter(q=>!asked.includes(q)).slice(0,4).map(q=>`<button type="button" data-ask="${q}">${q}</button>`).join('');th.scrollTop=th.scrollHeight;}
function openAsk(q){
  const l=L.find(x=>x.id===S.item);if(!l)return;if(askItem!==l){askItem=l;askLog=[];}
  sheet('اسأل عن القطعة',`<div class="ask"><div class="ask-part"><img src="${photo(l)}" alt=""><div><b>${nm(l.n).name}</b><small>${l.cars} · ${TR[l.tr].name}</small></div></div><p class="ask-rules">${ic('info',13)}<span>بجاوب من بيانات القطعة اللي حطّها التاجر. ما بضمن الملاءمة، وما بشخّص أعطال.</span></p><div class="ask-thread" id="ask-thread" aria-live="polite"></div><div class="ask-sugs" id="ask-sugs"></div><form id="ask-form" class="ask-form"><input id="ask-q" type="text" placeholder="اكتب سؤالك…" autocomplete="off" aria-label="سؤالك عن القطعة" maxlength="160"><button type="submit" aria-label="أرسل السؤال">${ic('send',18)}</button></form></div>`);
  $('#sheet').classList.add('ask-sheet');askRender();
  if(q)askSend(q);else $('#ask-q')?.focus();
}
function askSend(q){
  q=String(q||'').trim();if(!q||askBusy||!askItem)return;askBusy=true;
  askLog.push({me:true,text:q},{typing:true});askRender();
  setTimeout(()=>{askLog.pop();askLog.push({html:askAnswer(askItem,q)});askBusy=false;askRender();},matchMedia('(prefers-reduced-motion: reduce)').matches?250:900);
}
document.addEventListener('click',e=>{
  const a=e.target.closest('[data-ask]');if(a){if($('#sheet').open&&$('#sheet').classList.contains('ask-sheet'))askSend(a.dataset.ask);else openAsk(a.dataset.ask);return;}
  const g=e.target.closest('[data-ask-go]');if(g&&askItem){const l=askItem;closeSheet();search(g.dataset.askGo==='oem'?{oem:l.oem,text:l.oem}:{part:l.n,text:nm(l.n).name});}
});
document.addEventListener('submit',e=>{if(e.target.id!=='ask-form')return;e.preventDefault();const i=$('#ask-q');askSend(i.value);i.value='';});
