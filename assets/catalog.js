const P = {
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  cart:'<path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6"/><circle cx="10" cy="20.5" r="1.2"/><circle cx="17" cy="20.5" r="1.2"/>',
  back:'<path d="M9 5l7 7-7 7"/>', chev:'<path d="M15 5l-7 7 7 7"/>', down:'<path d="m6 9 6 6 6-6"/>',
  home:'<path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z"/>',
  tag:'<path d="M3 12V4h8l9 9-8 8z"/><circle cx="7.5" cy="8.5" r="1.3"/>',
  wrench:'<path d="M15 4a5 5 0 0 0-4.6 6.9L4 17.3V20h2.7l6.4-6.4A5 5 0 0 0 20 9l-3 1-2-2 1-3z"/>',
  box:'<path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z"/><path d="M3 7.5 12 12l9-4.5M12 12v9"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  star:'<path fill="currentColor" stroke="none" d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>',
  phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  truck:'<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  filter:'<path d="M4 6h16M7 12h10M10 18h4"/>', sort:'<path d="M7 4v16M4 7l3-3 3 3M17 20V4M14 17l3 3 3-3"/>',
  check:'<path d="m5 12 5 5 9-10"/>', x:'<path d="M6 6l12 12M18 6 6 18"/>', upload:'<path d="M12 16V4M7 9l5-5 5 5M4 20h16"/>',
  chat:'<path d="M4 20l1.3-4A8 8 0 1 1 8 19z"/><path d="M9 10.5c.5 2 2 3.5 4.5 4.5"/>',
  pin:'<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  alert:'<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/>', info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  store:'<path d="M4 9l1.5-5h13L20 9M4 9v11h16V9M4 9h16M9 20v-6h6v6"/>', clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>',
  help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7M12 17h.01"/>',
  car:'<path d="M4 15v-3l2-5h12l2 5v3"/><path d="M3 15h18v3H3z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/>',
  vin:'<path d="M4 5v14M7 5v14M10 5v14M14 5v14M16 5v14M20 5v14"/>', swap:'<path d="M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7"/>',
  shield:'<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/>', logout:'<path d="M14 4h5v16h-5M10 8l-4 4 4 4M6 12h10"/>',
  trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>', ret:'<path d="M9 14 4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/>',
  doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/>', heavy:'<path d="M8 8a4 4 0 1 1 8 0M5 9h14l2 12H3z"/>',
  plus:'<path d="M12 5v14M5 12h14"/>', supply:'<path d="M3 7h13v10H3zM16 10h3l2 3v4h-5"/><path d="M7 11h5"/>',
};
const ic = (n, s=22, extra='') => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${P[n]||''}</svg>`;

/* ---------- photo-like placeholders: phone shots of real parts on a bench ---------- */
const BG = { concrete:['#9A9B96','#62645F'], wood:['#A47C52','#5E4429'], card:['#CDB287','#95784D'], shop:['#61707A','#36414A'], tile:['#DAD8D1','#A9A69E'], night:['#3B4650','#1C232A'] };
const SH = {
  pads:'<path d="M105 105q95-42 190 0v52q-95-30-190 0z" fill="url(#m)"/><path d="M118 168q82-34 164 0v44q-82-24-164 0z" fill="#2b2b2b"/><path d="M105 157q95-30 190 0" stroke="#c9ccce" stroke-width="3" fill="none"/>',
  exhaust:'<rect x="40" y="146" width="96" height="18" rx="9" fill="url(#m)"/><rect x="118" y="112" width="176" height="86" rx="43" fill="url(#m)"/><rect x="286" y="140" width="84" height="16" rx="8" fill="#5b5f62"/><path d="M140 125h130" stroke="#d6d9db" stroke-width="3" opacity=".6"/>',
  headlight:'<path d="M80 112q130-46 242 8l-22 92q-116 22-208-10z" fill="#1d2226"/><circle cx="165" cy="160" r="36" fill="#dfe7ec" opacity=".85"/><circle cx="250" cy="156" r="27" fill="#cfd8de" opacity=".8"/><path d="M95 205q100 18 200 0" stroke="#e58b2a" stroke-width="7"/>',
  alt:'<circle cx="208" cy="152" r="82" fill="url(#m)"/><circle cx="208" cy="152" r="46" fill="#3e4245"/><path d="M168 152h80M208 112v80M180 124l56 56M236 124l-56 56" stroke="#7d8286" stroke-width="5"/><circle cx="110" cy="152" r="22" fill="#2a2d30"/>',
  radiator:'<rect x="66" y="78" width="268" height="152" rx="6" fill="#2d3134"/><g stroke="#8a9095" stroke-width="2">' + Array.from({length:30},(_,i)=>`<path d="M${76+i*8.5} 86v136"/>`).join('') + '</g><rect x="60" y="70" width="18" height="168" rx="4" fill="#575c60"/><rect x="322" y="70" width="18" height="168" rx="4" fill="#575c60"/>',
  bumper:'<path d="M36 138q164-64 328 0v54q-164 42-328 0z" fill="#26292b"/><path d="M110 176h180" stroke="#4a4e51" stroke-width="10" stroke-linecap="round"/>',
  hybatt:'<rect x="72" y="98" width="256" height="126" rx="8" fill="url(#m)"/><rect x="72" y="98" width="256" height="26" rx="8" fill="#3b4044"/><rect x="104" y="84" width="22" height="16" fill="#b94a2c"/><rect x="274" y="84" width="22" height="16" fill="#222"/><rect x="150" y="150" width="100" height="34" rx="4" fill="#e6e9eb" opacity=".8"/>',
  mirror:'<path d="M120 90h170q30 0 30 30v72q0 30-30 30H152q-42 0-52-42z" fill="#1f2326"/><path d="M134 104h150q20 0 20 20v62q0 20-20 20H160q-30 0-38-32z" fill="#a9bac4" opacity=".8"/>',
  filter:'<rect x="150" y="82" width="100" height="150" rx="14" fill="#0f4b8a"/><g stroke="#2c6db0" stroke-width="4">' + Array.from({length:9},(_,i)=>`<path d="M${158+i*10.5} 96v122"/>`).join('') + '</g><rect x="146" y="74" width="108" height="22" rx="8" fill="#55595c"/>',
  shock:'<rect x="186" y="34" width="28" height="228" rx="12" fill="url(#m)"/><path d="M168 70l64 16-64 16 64 16-64 16 64 16-64 16 64 16" stroke="#c0392b" stroke-width="7" fill="none" stroke-linejoin="round"/>',
  compressor:'<rect x="112" y="108" width="190" height="104" rx="42" fill="url(#m)"/><circle cx="108" cy="160" r="40" fill="#2d3033"/><circle cx="108" cy="160" r="14" fill="#7a7f83"/>',
  store:'<rect x="0" y="0" width="400" height="300" fill="#2b3238" opacity=".35"/><g>' + Array.from({length:4},(_,r)=>`<rect x="20" y="${30+r*66}" width="360" height="6" fill="#d8d2c4"/>` + Array.from({length:7},(_,c)=>`<rect x="${28+c*51}" y="${6+r*66}" width="42" height="${18+((r*7+c)%3)*4}" fill="${['#c96b2c','#2f5d8a','#d9b44a','#6c7a84','#a23b2a'][(r+c)%5]}" opacity=".9"/>`).join('')).join('') + '</g>',
};
const _img = {};
function img(kind, bg='concrete', seed=1){
  const k = kind+bg+seed; if (_img[k]) return _img[k];
  const [a,b] = BG[bg]||BG.concrete, rot = ((seed*37)%13)-6;
  const shape = SH[kind] ? `<g transform="rotate(${rot} 200 150)">${SH[kind]}</g>` :
    `<g transform="translate(130,80) scale(5.8)" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity=".92">${P[kind]||P.wrench}</g>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><radialGradient id="g" cx="${40+seed*7%30}%" cy="35%" r="85%"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></radialGradient><linearGradient id="m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9aa0a4"/><stop offset=".45" stop-color="#5c6165"/><stop offset="1" stop-color="#2c2f32"/></linearGradient><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="${seed}"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .32 0"/></filter></defs><rect width="400" height="300" fill="url(#g)"/><rect width="400" height="300" filter="url(#n)"/><ellipse cx="200" cy="246" rx="150" ry="20" fill="#000" opacity=".22"/>${shape}<rect width="400" height="300" fill="url(#g)" opacity=".08"/></svg>`;
  return _img[k] = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

/* ---------- reference data (examples for the prototype) ---------- */
const GOVS = ['عمّان','الزرقاء','إربد','البلقاء','مادبا','الكرك','المفرق','جرش','عجلون','الطفيلة','معان','العقبة'];
const NAMES = [
  {id:'pads_f', name:'فحمات الفرامل الأمامية', alt:['فحمات بريك','تيل فرامل','بريك قدام','فحمات'], img:'pads'},
  {id:'pads_r', name:'فحمات الفرامل الخلفية', alt:['فحمات بريك خلفي','تيل فرامل خلفي','فحمات'], img:'pads'},
  {id:'exhaust', name:'العادم', alt:['إشكمان','اشكمان','شكمان','اكزوز'], img:'exhaust'},
  {id:'alt', name:'مولّد الكهرباء', alt:['دينمو','دينامو'], img:'alt'},
  {id:'shock', name:'ممتصّ الصدمات الأمامي', alt:['مساعد','مساعدات','مساعد قدام'], img:'shock'},
  {id:'radiator', name:'مشعّ التبريد', alt:['رديتر','راديتر'], img:'radiator'},
  {id:'headlight', name:'المصباح الأمامي', alt:['ضو','ضو قدام','فانوس','ضوء أمامي'], img:'headlight'},
  {id:'bumper', name:'الصدّام الأمامي', alt:['دعامية','صدام'], img:'bumper'},
  {id:'hybatt', name:'بطارية الهايبرد', alt:['بطارية هايبرد','هايبرد'], img:'hybatt'},
  {id:'mirror', name:'المرآة الجانبية', alt:['مراية','مرايه'], img:'mirror'},
  {id:'filter', name:'فلتر الزيت', alt:['فلتر زيت'], img:'filter'},
  {id:'compressor', name:'ضاغط المكيّف', alt:['كمبروسر','كمبريسور'], img:'compressor'},
  {id:'engine_oil', name:'زيت المحرك', alt:['زيت محرك','زيت مكينة','زيت مكينه','زيت موتور'], img:'drop'},
  {id:'dashcam', name:'كاميرا السيارة', alt:['داش كام','كاميرا داش','كاميرا تسجيل'], img:'cam'},
  {id:'seat_cover', name:'غطاء المقعد', alt:['كفر كرسي','كفرات كراسي','غطا كرسي','لبيسة كرسي'], img:'seat'},
];
const MAKES = [
  {id:'hyundai', name:'هيونداي', alt:['hyundai','هونداي'], pop:true, models:[{id:'avante',name:'أفانتي',alt:['افانتي','النترا','إلنترا','avante','elantra']},{id:'sonata',name:'سوناتا',alt:['sonata','سوناتا هايبرد']},{id:'tucson',name:'توسان',alt:['tucson']},{id:'accent',name:'أكسنت',alt:['accent']},{id:'santafe',name:'سانتا في',alt:['santa fe']},{id:'i10',name:'آي 10',alt:['i10']}]},
  {id:'kia', name:'كيا', alt:['kia'], pop:true, models:[{id:'cerato',name:'سيراتو',alt:['cerato','k3']},{id:'optima',name:'أوبتيما',alt:['اوبتيما','optima','k5']},{id:'rio',name:'ريو',alt:['rio']},{id:'sportage',name:'سبورتاج',alt:['sportage']},{id:'sorento',name:'سورينتو',alt:['sorento']},{id:'picanto',name:'بيكانتو',alt:['picanto']}]},
  {id:'toyota', name:'تويوتا', alt:['toyota'], pop:true, models:[{id:'corolla',name:'كورولا',alt:['corolla','كرولا'],pop:true},{id:'camry',name:'كامري',alt:['camry'],pop:true},{id:'prius',name:'بريوس',alt:['prius','بريس'],pop:true},{id:'yaris',name:'يارس',alt:['yaris'],pop:true},{id:'landcruiser',name:'لاند كروزر',alt:['land cruiser','لاندكروزر'],pop:true},{id:'hilux',name:'هايلكس',alt:['hilux','هايلوكس'],pop:true},{id:'prado',name:'برادو',alt:['prado']},{id:'rav4',name:'راف فور',alt:['rav4','راف 4']},{id:'fortuner',name:'فورتشنر',alt:['fortuner']},{id:'avalon',name:'أفالون',alt:['avalon']},{id:'crown',name:'كراون',alt:['crown']},{id:'chr',name:'سي إتش آر',alt:['c-hr','chr']},{id:'rush',name:'راش',alt:['rush']},{id:'previa',name:'بريفيا',alt:['previa']},{id:'sequoia',name:'سيكويا',alt:['sequoia']},{id:'tundra',name:'تندرا',alt:['tundra']},{id:'tacoma',name:'تاكوما',alt:['tacoma']},{id:'4runner',name:'فور رنر',alt:['4runner']},{id:'highlander',name:'هايلاندر',alt:['highlander']},{id:'sienna',name:'سيينا',alt:['sienna']},{id:'supra',name:'سوبرا',alt:['supra']},{id:'gt86',name:'جي تي 86',alt:['gt86','86']},{id:'echo',name:'إيكو',alt:['echo']},{id:'starlet',name:'ستارلت',alt:['starlet']},{id:'celica',name:'سيليكا',alt:['celica']},{id:'corona',name:'كورونا',alt:['corona']},{id:'cressida',name:'كريسيدا',alt:['cressida']},{id:'fjcruiser',name:'إف جي كروزر',alt:['fj cruiser']},{id:'venza',name:'فينزا',alt:['venza']},{id:'avanza',name:'أفانزا',alt:['avanza']},{id:'innova',name:'إينوفا',alt:['innova']},{id:'hiace',name:'هايس',alt:['hiace']},{id:'coaster',name:'كوستر',alt:['coaster']},{id:'dyna',name:'داينا',alt:['dyna']},{id:'markii',name:'مارك 2',alt:['mark ii','mark 2']},{id:'matrix',name:'ماتريكس',alt:['matrix']},{id:'aurion',name:'أوريون',alt:['aurion']},{id:'vios',name:'فيوس',alt:['vios']},{id:'etios',name:'إيتيوس',alt:['etios']},{id:'raize',name:'رايز',alt:['raize']},{id:'veloz',name:'فيلوز',alt:['veloz']},{id:'bz4x',name:'بي زد 4 إكس',alt:['bz4x']},{id:'granvia',name:'غرانفيا',alt:['granvia']},{id:'alphard',name:'ألفارد',alt:['alphard']},{id:'vellfire',name:'فيلفاير',alt:['vellfire']},{id:'harrier',name:'هارير',alt:['harrier']},{id:'wish',name:'ويش',alt:['wish']},{id:'ipsum',name:'إبسوم',alt:['ipsum']},{id:'corollacross',name:'كورولا كروس',alt:['corolla cross']},{id:'yariscross',name:'يارس كروس',alt:['yaris cross']},{id:'mirai',name:'ميراي',alt:['mirai']},{id:'belta',name:'بيلتا',alt:['belta']},{id:'probox',name:'بروبوكس',alt:['probox']},{id:'noah',name:'نوا',alt:['noah']},{id:'voxy',name:'فوكسي',alt:['voxy']},{id:'estima',name:'إستيما',alt:['estima']},{id:'avensis',name:'أفنسيس',alt:['avensis']},{id:'auris',name:'أوريس',alt:['auris']},{id:'verso',name:'فيرسو',alt:['verso']},{id:'urbancruiser',name:'أوربان كروزر',alt:['urban cruiser']},{id:'mr2',name:'إم آر 2',alt:['mr2']},{id:'paseo',name:'باسيو',alt:['paseo']},{id:'tercel',name:'تيرسل',alt:['tercel']},{id:'carina',name:'كارينا',alt:['carina']},{id:'chaser',name:'تشيسر',alt:['chaser']},{id:'aygo',name:'أيغو',alt:['aygo']}]},
  {id:'ford', name:'فورد', alt:['ford'], pop:true, models:[{id:'fusion',name:'فيوجن',alt:['fusion']},{id:'focus',name:'فوكس',alt:['focus']},{id:'explorer',name:'إكسبلورر',alt:['explorer']},{id:'f150',name:'إف 150',alt:['f150','f-150']},{id:'ranger',name:'رينجر',alt:['ranger']}]},
  {id:'mitsubishi', name:'ميتسوبيشي', alt:['mitsubishi','متسوبيشي'], pop:true, models:[{id:'lancer',name:'لانسر',alt:['lancer']},{id:'pajero',name:'باجيرو',alt:['pajero']},{id:'outlander',name:'أوتلاندر',alt:['outlander']},{id:'l200',name:'إل 200',alt:['l200']},{id:'attrage',name:'أترج',alt:['attrage']}]},
  {id:'nissan', name:'نيسان', alt:['nissan'], pop:true, models:[{id:'sunny',name:'صني',alt:['sunny']},{id:'altima',name:'ألتيما',alt:['altima']},{id:'patrol',name:'باترول',alt:['patrol']},{id:'xtrail',name:'إكس تريل',alt:['x-trail','xtrail']},{id:'sentra',name:'سنترا',alt:['sentra']}]},
  {id:'mercedes', name:'مرسيدس', alt:['mercedes','benz','مرسيدس بنز'],pop:true, models:[{id:'cclass',name:'سي كلاس',alt:['c class','c200']},{id:'eclass',name:'إي كلاس',alt:['e class','e200']},{id:'sclass',name:'إس كلاس',alt:['s class']},{id:'glc',name:'جي إل سي',alt:['glc']},{id:'gle',name:'جي إل إي',alt:['gle']}]},
  {id:'bmw', name:'بي إم دبليو', alt:['bmw','بي ام'],pop:true, models:[{id:'s3',name:'الفئة الثالثة',alt:['3 series','320i']},{id:'s5',name:'الفئة الخامسة',alt:['5 series','520i']},{id:'s7',name:'الفئة السابعة',alt:['7 series']},{id:'x3',name:'إكس 3',alt:['x3']},{id:'x5',name:'إكس 5',alt:['x5']}]},
  {id:'volkswagen', name:'فولكس فاجن', alt:['volkswagen','vw','فولكس'], models:[{id:'golf',name:'غولف',alt:['golf','جولف']},{id:'passat',name:'باسات',alt:['passat']},{id:'jetta',name:'جيتا',alt:['jetta']},{id:'tiguan',name:'تيغوان',alt:['tiguan']},{id:'touareg',name:'طوارق',alt:['touareg']}]},
  {id:'honda', name:'هوندا', alt:['honda'], models:[{id:'civic',name:'سيفيك',alt:['civic']},{id:'accord',name:'أكورد',alt:['accord']},{id:'crv',name:'سي آر في',alt:['cr-v','crv']},{id:'pilot',name:'بايلوت',alt:['pilot']}]},
  {id:'mazda', name:'مازدا', alt:['mazda'], models:[{id:'m3',name:'مازدا 3',alt:['mazda 3']},{id:'m6',name:'مازدا 6',alt:['mazda 6']},{id:'cx5',name:'سي إكس 5',alt:['cx-5','cx5']},{id:'cx9',name:'سي إكس 9',alt:['cx-9','cx9']}]},
  {id:'chevrolet', name:'شيفروليه', alt:['chevrolet','شفروليه','شيفي'], models:[{id:'cruze',name:'كروز',alt:['cruze']},{id:'malibu',name:'ماليبو',alt:['malibu']},{id:'tahoe',name:'تاهو',alt:['tahoe']},{id:'captiva',name:'كابتيفا',alt:['captiva']},{id:'silverado',name:'سيلفرادو',alt:['silverado']}]},
  {id:'lexus', name:'لكزس', alt:['lexus','لكسس'],mono:'L', models:[{id:'es',name:'إي إس',alt:['es350']},{id:'ls',name:'إل إس',alt:['ls500']},{id:'rx',name:'آر إكس',alt:['rx350']},{id:'lx',name:'إل إكس',alt:['lx570']},{id:'is',name:'آي إس',alt:['is300']}]},
  {id:'suzuki', name:'سوزوكي', alt:['suzuki'], models:[{id:'swift',name:'سويفت',alt:['swift']},{id:'vitara',name:'فيتارا',alt:['vitara']},{id:'jimny',name:'جيمني',alt:['jimny']},{id:'ciaz',name:'سياز',alt:['ciaz']}]},
  {id:'isuzu', name:'إيسوزو', alt:['isuzu','ايسوزو'],mono:'I', models:[{id:'dmax',name:'دي ماكس',alt:['d-max','dmax']},{id:'mux',name:'إم يو إكس',alt:['mu-x']},{id:'npr',name:'إن بي آر',alt:['npr']}]},
  {id:'peugeot', name:'بيجو', alt:['peugeot'], models:[{id:'p208',name:'208',alt:['peugeot 208']},{id:'p301',name:'301',alt:['peugeot 301']},{id:'p3008',name:'3008',alt:['peugeot 3008']},{id:'p508',name:'508',alt:['peugeot 508']}]},
  {id:'renault', name:'رينو', alt:['renault'], models:[{id:'megane',name:'ميغان',alt:['megane','ميجان']},{id:'logan',name:'لوغان',alt:['logan']},{id:'duster',name:'داستر',alt:['duster']},{id:'koleos',name:'كوليوس',alt:['koleos']}]},
  {id:'audi', name:'أودي', alt:['audi','اودي'], models:[{id:'a4',name:'إيه 4',alt:['a4']},{id:'a6',name:'إيه 6',alt:['a6']},{id:'q5',name:'كيو 5',alt:['q5']},{id:'q7',name:'كيو 7',alt:['q7']}]},
  {id:'jeep', name:'جيب', alt:['jeep'], models:[{id:'wrangler',name:'رانجلر',alt:['wrangler']},{id:'grandcherokee',name:'غراند شيروكي',alt:['grand cherokee','جراند شيروكي']},{id:'cherokee',name:'شيروكي',alt:['cherokee']},{id:'compass',name:'كومباس',alt:['compass']}]},
  {id:'gmc', name:'جي إم سي', alt:['gmc'],mono:'GMC', models:[{id:'yukon',name:'يوكن',alt:['yukon']},{id:'sierra',name:'سييرا',alt:['sierra']},{id:'acadia',name:'أكاديا',alt:['acadia']}]},
  {id:'dodge', name:'دودج', alt:['dodge'],mono:'D', models:[{id:'charger',name:'تشارجر',alt:['charger']},{id:'challenger',name:'تشالنجر',alt:['challenger']},{id:'durango',name:'دورانجو',alt:['durango']}]},
  {id:'chrysler', name:'كرايسلر', alt:['chrysler'], models:[{id:'c300',name:'300 سي',alt:['300c']},{id:'pacifica',name:'باسيفيكا',alt:['pacifica']}]},
  {id:'cadillac', name:'كاديلاك', alt:['cadillac'], models:[{id:'escalade',name:'إسكاليد',alt:['escalade']},{id:'cts',name:'سي تي إس',alt:['cts']}]},
  {id:'landrover', name:'لاند روفر', alt:['land rover','لاندروفر'], models:[{id:'rangerover',name:'رنج روفر',alt:['range rover']},{id:'defender',name:'ديفندر',alt:['defender']},{id:'discovery',name:'ديسكفري',alt:['discovery']},{id:'evoque',name:'إيفوك',alt:['evoque']}]},
  {id:'jaguar', name:'جاكوار', alt:['jaguar','جاغوار'], models:[{id:'xf',name:'إكس إف',alt:['xf']},{id:'xj',name:'إكس جي',alt:['xj']},{id:'fpace',name:'إف بيس',alt:['f-pace']}]},
  {id:'porsche', name:'بورش', alt:['porsche'], models:[{id:'cayenne',name:'كايين',alt:['cayenne']},{id:'panamera',name:'باناميرا',alt:['panamera']},{id:'p911',name:'911',alt:['porsche 911']},{id:'macan',name:'ماكان',alt:['macan']}]},
  {id:'volvo', name:'فولفو', alt:['volvo'], models:[{id:'xc90',name:'إكس سي 90',alt:['xc90']},{id:'xc60',name:'إكس سي 60',alt:['xc60']},{id:'s60',name:'إس 60',alt:['s60']}]},
  {id:'skoda', name:'سكودا', alt:['skoda'], models:[{id:'octavia',name:'أوكتافيا',alt:['octavia']},{id:'superb',name:'سوبيرب',alt:['superb']},{id:'kodiaq',name:'كودياك',alt:['kodiaq']}]},
  {id:'seat', name:'سيات', alt:['seat'], models:[{id:'leon',name:'ليون',alt:['leon']},{id:'ibiza',name:'إيبيزا',alt:['ibiza']},{id:'ateca',name:'أتيكا',alt:['ateca']}]},
  {id:'opel', name:'أوبل', alt:['opel','اوبل'], models:[{id:'astra',name:'أسترا',alt:['astra']},{id:'corsa',name:'كورسا',alt:['corsa']},{id:'insignia',name:'إنسيغنيا',alt:['insignia']}]},
  {id:'fiat', name:'فيات', alt:['fiat'], models:[{id:'f500',name:'500',alt:['fiat 500']},{id:'tipo',name:'تيبو',alt:['tipo']},{id:'punto',name:'بونتو',alt:['punto']}]},
  {id:'citroen', name:'ستروين', alt:['citroen','سيتروين'], models:[{id:'c3',name:'سي 3',alt:['c3']},{id:'c4',name:'سي 4',alt:['c4']},{id:'c5',name:'سي 5',alt:['c5']}]},
  {id:'subaru', name:'سوبارو', alt:['subaru'], models:[{id:'impreza',name:'إمبريزا',alt:['impreza']},{id:'forester',name:'فورستر',alt:['forester']},{id:'outback',name:'أوتباك',alt:['outback']},{id:'legacy',name:'ليغاسي',alt:['legacy']}]},
  {id:'infiniti', name:'إنفينيتي', alt:['infiniti','انفنتي'], models:[{id:'q50',name:'كيو 50',alt:['q50']},{id:'qx60',name:'كيو إكس 60',alt:['qx60']},{id:'qx80',name:'كيو إكس 80',alt:['qx80']}]},
  {id:'mini', name:'ميني', alt:['mini','mini cooper'], models:[{id:'cooper',name:'كوبر',alt:['cooper']},{id:'countryman',name:'كنتريمان',alt:['countryman']}]},
  {id:'tesla', name:'تسلا', alt:['tesla'], models:[{id:'model3',name:'موديل 3',alt:['model 3']},{id:'modely',name:'موديل Y',alt:['model y']},{id:'models',name:'موديل S',alt:['model s']},{id:'modelx',name:'موديل X',alt:['model x']}]},
  {id:'byd', name:'بي واي دي', alt:['byd'],mono:'BYD', models:[{id:'atto3',name:'أتو 3',alt:['atto 3']},{id:'han',name:'هان',alt:['byd han']},{id:'seal',name:'سيل',alt:['byd seal']},{id:'dolphin',name:'دولفين',alt:['dolphin']},{id:'tang',name:'تانغ',alt:['byd tang']}]},
  {id:'geely', name:'جيلي', alt:['geely'],mono:'G', models:[{id:'coolray',name:'كولراي',alt:['coolray']},{id:'emgrand',name:'إمغراند',alt:['emgrand']},{id:'tugella',name:'توجيلا',alt:['tugella']},{id:'monjaro',name:'مونجارو',alt:['monjaro']}]},
  {id:'chery', name:'شيري', alt:['chery'],mono:'C', models:[{id:'tiggo7',name:'تيغو 7',alt:['tiggo 7']},{id:'tiggo8',name:'تيغو 8',alt:['tiggo 8']},{id:'arrizo',name:'أريزو',alt:['arrizo']}]},
  {id:'mg', name:'إم جي', alt:['mg'], models:[{id:'mg5',name:'إم جي 5',alt:['mg5','mg 5']},{id:'zs',name:'زد إس',alt:['mg zs']},{id:'hs',name:'إتش إس',alt:['mg hs']},{id:'rx5',name:'آر إكس 5',alt:['rx5']}]},
  {id:'haval', name:'هافال', alt:['haval'],mono:'H', models:[{id:'h6',name:'إتش 6',alt:['h6']},{id:'jolion',name:'جوليون',alt:['jolion']},{id:'h9',name:'إتش 9',alt:['h9']}]},
  {id:'changan', name:'شانجان', alt:['changan','شانغان'],mono:'C', models:[{id:'cs35',name:'سي إس 35',alt:['cs35']},{id:'cs75',name:'سي إس 75',alt:['cs75']},{id:'eado',name:'إيدو',alt:['eado']},{id:'alsvin',name:'ألسفين',alt:['alsvin']}]},
  {id:'jetour', name:'جيتور', alt:['jetour'],mono:'J', models:[{id:'x70',name:'إكس 70',alt:['jetour x70']},{id:'dashing',name:'داشينغ',alt:['dashing']},{id:'t2',name:'تي 2',alt:['jetour t2']}]},
  {id:'greatwall', name:'جريت وول', alt:['great wall'],mono:'GW', models:[{id:'wingle',name:'وينغل',alt:['wingle']},{id:'poer',name:'باور',alt:['poer']}]},
  {id:'ssangyong', name:'سانغ يونغ', alt:['ssangyong','سانج يونج'],mono:'S', models:[{id:'rexton',name:'ريكستون',alt:['rexton']},{id:'korando',name:'كوراندو',alt:['korando']},{id:'tivoli',name:'تيفولي',alt:['tivoli']}]},
  {id:'daihatsu', name:'دايهاتسو', alt:['daihatsu'],mono:'D', models:[{id:'terios',name:'تيريوس',alt:['terios']},{id:'sirion',name:'سيريون',alt:['sirion']}]},
  {id:'genesis', name:'جينيسيس', alt:['genesis','جنسس'],mono:'G', models:[{id:'g70',name:'جي 70',alt:['g70']},{id:'g80',name:'جي 80',alt:['g80']},{id:'gv80',name:'جي في 80',alt:['gv80']}]},
  {id:'lincoln', name:'لينكولن', alt:['lincoln'],mono:'L', models:[{id:'navigator',name:'نافيغيتور',alt:['navigator']},{id:'mkz',name:'إم كي زد',alt:['mkz']}]},
  {id:'ram', name:'رام', alt:['ram'], models:[{id:'r1500',name:'1500',alt:['ram 1500']},{id:'r2500',name:'2500',alt:['ram 2500']}]},
  {id:'alfaromeo', name:'ألفا روميو', alt:['alfa romeo','الفا روميو'], models:[{id:'giulia',name:'جوليا',alt:['giulia']},{id:'stelvio',name:'ستيلفيو',alt:['stelvio']}]},
  {id:'maserati', name:'مازيراتي', alt:['maserati'], models:[{id:'ghibli',name:'غيبلي',alt:['ghibli']},{id:'levante',name:'ليفانتي',alt:['levante']}]},
  {id:'ferrari', name:'فيراري', alt:['ferrari'], models:[{id:'roma',name:'روما',alt:['ferrari roma']},{id:'f8',name:'إف 8',alt:['f8']}]},
  {id:'lamborghini', name:'لامبورغيني', alt:['lamborghini'], models:[{id:'urus',name:'أوروس',alt:['urus']},{id:'huracan',name:'هوراكان',alt:['huracan']}]},
  {id:'bentley', name:'بنتلي', alt:['bentley'], models:[{id:'bentayga',name:'بنتايغا',alt:['bentayga']},{id:'continental',name:'كونتيننتال',alt:['continental']}]},
  {id:'rollsroyce', name:'رولز رويس', alt:['rolls royce'], models:[{id:'ghost',name:'غوست',alt:['ghost']},{id:'cullinan',name:'كولينان',alt:['cullinan']}]},
  {id:'astonmartin', name:'أستون مارتن', alt:['aston martin'], models:[{id:'db11',name:'دي بي 11',alt:['db11']},{id:'vantage',name:'فانتاج',alt:['vantage']}]},
  {id:'mclaren', name:'ماكلارين', alt:['mclaren'], models:[{id:'m720s',name:'720 إس',alt:['720s']},{id:'gt',name:'جي تي',alt:['mclaren gt']}]},
  {id:'bugatti', name:'بوغاتي', alt:['bugatti'], models:[{id:'chiron',name:'شيرون',alt:['chiron']}]},
  {id:'smart', name:'سمارت', alt:['smart'], models:[{id:'fortwo',name:'فورتو',alt:['fortwo']},{id:'s1',name:'#1',alt:['smart 1']}]},
  {id:'polestar', name:'بولستار', alt:['polestar'], models:[{id:'p2',name:'بولستار 2',alt:['polestar 2']}]},
  {id:'dacia', name:'داسيا', alt:['dacia'], models:[{id:'sandero',name:'سانديرو',alt:['sandero']},{id:'dduster',name:'داستر',alt:['dacia duster']}]},
  {id:'lada', name:'لادا', alt:['lada'], models:[{id:'niva',name:'نيفا',alt:['niva']},{id:'granta',name:'غرانتا',alt:['granta']}]},
  {id:'proton', name:'بروتون', alt:['proton'], models:[{id:'saga',name:'ساغا',alt:['saga']},{id:'persona',name:'بيرسونا',alt:['persona']}]},
  {id:'acura', name:'أكيورا', alt:['acura'], models:[{id:'mdx',name:'إم دي إكس',alt:['mdx']},{id:'rdx',name:'آر دي إكس',alt:['rdx']}]},
];
const TR = {
  nash:{name:'مركز النشامى لقطع الكوري', area:'عمّان — رأس العين', gov:'عمّان', rating:4.6, count:128, phone:'079 000 1184', free:100, km:3.2},
  saleem:{name:'قطع غيار أبو سليم', area:'عمّان — ماركا', gov:'عمّان', rating:4.8, count:212, phone:'078 000 2290', free:150, km:7.5},
  husseini:{name:'الحسيني لقطع الهايبرد', area:'الزرقاء — المنطقة الحرّة', gov:'الزرقاء', rating:4.3, count:76, phone:'077 000 3352', free:null, km:18.4},
  amana:{name:'الأمانة للقطع اليابانية', area:'سحاب — المدينة الصناعية', gov:'عمّان', rating:4.5, count:91, phone:'079 000 4417', free:120, km:13.9},
  shamal:{name:'مستودع الشمال للمستعمل', area:'إربد — شارع الثلاثين', gov:'إربد', rating:4.1, count:39, phone:'078 000 5536', free:null, km:71},
};
const W_NONE = 'بلا كفالة';
const L = [
  {id:1, n:'pads_f', g:'pads-avante', tr:'nash', cond:'new', auth:'agency', origin:'كوريا', brand:'Hyundai Mobis', oem:'58101-3XA30', mk:'hyundai', md:'avante', cars:'هيونداي أفانتي 2011–2015', price:22, war:'6 أشهر', feat:true, bg:'tile', days:9, desc:'فحمات أمامية أصلية من الوكالة، علبة مغلقة. تركب على أفانتي MD بمحرّك 1.6 و1.8.'},
  {id:2, n:'pads_f', g:'pads-avante', tr:'saleem', cond:'new', auth:'trader', origin:'كوريا', brand:'Sangsin', oem:'58101-3XA30', mk:'hyundai', md:'avante', cars:'هيونداي أفانتي 2011–2015', price:13.5, offer:{price:11, ends:'31 تشرين الأول', pct:19, days:2}, war:'3 أشهر', bg:'wood', days:4, desc:'فحمات تجارية كورية، بديل مطابق لرقم الوكالة.'},
  {id:3, n:'pads_f', g:'pads-avante', tr:'amana', cond:'new', auth:'trader', origin:'الصين', brand:'Hi-Q', oem:'58101-3XA30', mk:'hyundai', md:'avante', cars:'هيونداي أفانتي 2011–2015', price:12, war:'شهر', bg:'card', days:12, desc:'بديل اقتصادي مطابق لرقم الوكالة.'},
  {id:4, n:'pads_f', g:'pads-prius', tr:'amana', cond:'new', auth:'agency', origin:'اليابان', brand:'Toyota', oem:'04465-47070', mk:'toyota', md:'prius', cars:'تويوتا بريوس 2010–2015', price:29, war:'6 أشهر', bg:'tile', days:20, desc:'فحمات أمامية وكالة لبريوس الجيل الثالث.'},
  {id:5, n:'exhaust', g:'exhaust-prius', tr:'husseini', cond:'used', auth:'agency', origin:'اليابان', brand:'Toyota', oem:'', mk:'toyota', md:'prius', cars:'تويوتا بريوس 2010–2015', price:35, war:W_NONE, bg:'concrete', days:6, desc:'عادم خلفي مستعمل بحالة جيدة، بلا ثقوب. الكفالة: بلا كفالة. التطابق: بريوس الجيل الثالث فقط. الصور للقطعة نفسها.'},
  {id:6, n:'hybatt', g:'hybatt-prius', tr:'husseini', cond:'used', auth:'agency', origin:'اليابان', brand:'Toyota', oem:'G9280-47031', mk:'toyota', md:'prius', cars:'تويوتا بريوس 2010–2015', price:380, war:'شهر', feat:true, special:true, bg:'shop', days:3, desc:'بطارية هايبرد مستعملة، فُحصت الخلايا كلها. الكفالة: شهر من الاستلام. التطابق: بريوس 2010–2015. الصور للبطارية نفسها.'},
  {id:7, n:'hybatt', g:'hybatt-prius', tr:'amana', cond:'used', auth:'agency', origin:'اليابان', brand:'Toyota', oem:'', mk:'toyota', md:'prius', cars:'تويوتا بريوس 2010–2015', price:360, war:'أسبوعان', special:true, bg:'concrete', days:15, desc:'بطارية هايبرد مستعملة. الكفالة: أسبوعان. التطابق: بريوس الجيل الثالث. الصور للبطارية نفسها.'},
  {id:8, n:'headlight', g:'head-cerato', tr:'shamal', cond:'used', auth:'agency', origin:'كوريا', brand:'Kia', oem:'', mk:'kia', md:'cerato', cars:'كيا سيراتو 2014–2016', price:45, war:W_NONE, bg:'wood', days:5, desc:'ضو أمامي يمين مستعمل، العدسة سليمة وفيه خدش خفيف بالحامل. الكفالة: بلا كفالة. التطابق: سيراتو K3. الصور للقطعة نفسها.'},
  {id:9, n:'headlight', g:'head-cerato', tr:'nash', cond:'new', auth:'trader', origin:'تايوان', brand:'Depo', oem:'92102-A7020', mk:'kia', md:'cerato', cars:'كيا سيراتو 2014–2016', price:68, offer:{price:59, ends:'2 تشرين الثاني', pct:13, days:1}, war:'6 أشهر', bg:'tile', days:2, desc:'ضو أمامي يمين جديد تجاري، تايواني.'},
  {id:10, n:'alt', g:'alt-sonata', tr:'saleem', cond:'used', auth:'agency', origin:'كوريا', brand:'Mando', oem:'', mk:'hyundai', md:'sonata', cars:'هيونداي سوناتا 2011–2014', price:55, war:'أسبوعان', bg:'concrete', days:8, desc:'دينمو مستعمل مفحوص على الجهاز. الكفالة: أسبوعان. التطابق: سوناتا بنزين 2.4. الصور للقطعة نفسها.'},
  {id:11, n:'radiator', g:'rad-corolla', tr:'amana', cond:'new', auth:'trader', origin:'اليابان', brand:'Koyorad', oem:'16400-0T040', mk:'toyota', md:'corolla', cars:'تويوتا كورولا 2014–2018', price:48, war:'6 أشهر', bg:'card', days:11, desc:'رديتر جديد ياباني لكورولا.'},
  {id:12, n:'bumper', g:'bumper-avante', tr:'nash', cond:'new', auth:'trader', origin:'تايوان', brand:'TYG', oem:'86511-3X000', mk:'hyundai', md:'avante', cars:'هيونداي أفانتي 2011–2013', price:39, war:W_NONE, special:true, bg:'shop', days:7, desc:'دعامية أمامية جديدة بلا دهان.'},
  {id:13, n:'shock', g:'shock-avante', tr:'saleem', cond:'new', auth:'trader', origin:'اليابان', brand:'KYB', oem:'54651-3X100', mk:'hyundai', md:'avante', cars:'هيونداي أفانتي 2011–2015', price:31, offer:{price:26.5, ends:'5 تشرين الثاني', pct:15, days:3}, war:'سنة', bg:'wood', days:3, desc:'مساعد أمامي يسار ياباني.'},
  {id:14, n:'filter', g:'filter-hy', tr:'nash', cond:'new', auth:'agency', origin:'كوريا', brand:'Hyundai Mobis', oem:'26300-35505', mk:'hyundai', md:'avante', cars:'هيونداي أفانتي، سوناتا، كيا سيراتو', price:3.5, war:W_NONE, bg:'tile', days:30, desc:'فلتر زيت وكالة.'},
  {id:15, n:'compressor', g:'comp-sonata', tr:'husseini', cond:'used', auth:'agency', origin:'كوريا', brand:'Hyundai', oem:'', mk:'hyundai', md:'sonata', cars:'هيونداي سوناتا هايبرد 2011–2015', price:140, war:'شهر', bg:'night', days:10, desc:'كمبروسر مكيف كهربائي مستعمل. الكفالة: شهر. التطابق: سوناتا هايبرد فقط. الصور للقطعة نفسها.'},
  {id:16, n:'mirror', g:'mirror-camry', tr:'shamal', cond:'used', auth:'agency', origin:'اليابان', brand:'Toyota', oem:'', mk:'toyota', md:'camry', cars:'تويوتا كامري 2012–2014', price:28, war:W_NONE, bg:'concrete', days:14, desc:'مراية يسار مستعملة، الزجاج سليم والطي الكهربائي يعمل. الكفالة: بلا كفالة. الصور للقطعة نفسها.'},
  {id:17, n:'shock', g:'shock-avante', tr:'amana', cond:'new', auth:'trader', origin:'اليابان', brand:'KYB', oem:'54651-3X100', mk:'hyundai', md:'avante', cars:'هيونداي أفانتي 2011–2015', price:29, war:'سنة', bg:'card', days:6, desc:'مساعد أمامي يسار ياباني.'},
  {id:18, n:'shock', g:'shock-avante', tr:'nash', cond:'new', auth:'trader', origin:'كوريا', brand:'Mando', oem:'54651-3X100', mk:'hyundai', md:'avante', cars:'هيونداي أفانتي 2011–2015', price:33.5, war:'6 أشهر', bg:'tile', days:9, desc:'مساعد أمامي يسار كوري.'},
  {id:19, n:'engine_oil', g:'oil-5w30', tr:'saleem', cond:'new', auth:'trader', origin:'ألمانيا', brand:'Liqui Moly', oem:'LM-2318', mk:null, md:null, cars:'معظم سيارات البنزين · لزوجة 5W-30', price:18.5, war:W_NONE, bg:'tile', days:1, pic:'parts/oil-a.webp', desc:'زيت محرك تخليقي بالكامل 5W-30، عبوة 4 لتر. راجع دليل سيارتك للزوجة المطلوبة.'},
  {id:20, n:'engine_oil', g:'oil-5w40', tr:'nash', cond:'new', auth:'trader', origin:'الإمارات', brand:'Lubtrol', oem:'JSE-5W40-4L', mk:null, md:null, cars:'معظم سيارات البنزين والديزل · لزوجة 5W-40', price:14, war:W_NONE, bg:'card', days:2, pic:'parts/oil-b.webp', desc:'زيت محرك 5W-40 عالي الأداء، عبوة 4 لتر.'},
  {id:21, n:'dashcam', g:'dashcam', tr:'amana', cond:'new', auth:'trader', origin:'الصين', brand:'DashPro', oem:'DP-1080', mk:null, md:null, cars:'كل السيارات · تركيب على الزجاج الأمامي', price:45, war:'سنة', bg:'night', days:1, pic:'parts/dashcam.webp', desc:'كاميرا أمامية بدقة 1080p، تسجيل متواصل وحسّاس صدمات.'},
  {id:22, n:'seat_cover', g:'seat-bead', tr:'saleem', cond:'new', auth:'trader', origin:'كوريا', brand:'Bamboo Seat', oem:'BS-01', mk:null, md:null, cars:'مقاس عام يناسب معظم المقاعد', price:9, war:W_NONE, bg:'wood', days:3, pic:'parts/seatcover.webp', desc:'غطاء مقعد خرز خشبي، بيهوّي الظهر بالصيف.'},
];
const SVC_TYPES = ['ونش وسحب سيارات','سطحة بين المحافظات','كراج ميكانيك','كهربائي سيارات','تكييف','بنشر وإطارات وبلانص','بطاريات وتشغيل على الطريق','سمكرة ودهان','زجاج وتظليل','غسيل وتلميع','تنظيف داخلي','فحص قبل الشراء','برمجة مفاتيح','كاميرات وأنظمة صوت','تغيير زيت متنقّل','تأمين','معاملات ترخيص','تأجير سيارات','شراء سيارات حوادث','عُدد صناعية'];
// Service providers (SVC-3: photo, type, area and location, information, free text). Illustrative; the photos are
// Unsplash stock (assets/services/), the phone numbers are not real. km is the distance used for «الأقرب» (SVC-4).
const SVCS = [
  {id:1, name:'ونش أبو خليل', type:'ونش وسحب سيارات', gov:'عمّان', area:'طبربور', km:2.1, icon:'truck', photo:'tow', phone:'079 000 6101', info:'سحب داخل عمّان على مدار الساعة.', text:'نوصل خلال 30 دقيقة داخل عمّان الشرقية. السحب للكراج أو للبيت.'},
  {id:2, name:'بنشر الوحدات 24 ساعة', type:'بنشر وإطارات وبلانص', gov:'عمّان', area:'الوحدات', km:4.8, icon:'tire', photo:'tire', phone:'078 000 6102', info:'تبديل كوشوك، ترصيص، بلانص.', text:'مفتوح 24 ساعة. خدمة متنقّلة للبيت بأجرة إضافية.'},
  {id:3, name:'غسيل وتلميع النخبة', type:'غسيل وتلميع', gov:'عمّان', area:'خلدا', km:6.3, icon:'sparkle', photo:'wash', phone:'077 000 6103', info:'غسيل خارجي وداخلي وتلميع.', text:'مواعيد من 8 الصبح لـ 10 المسا.'},
  {id:4, name:'كراج المهندس للهايبرد', type:'كراج ميكانيك', gov:'الزرقاء', area:'الزرقاء الجديدة', km:15.2, icon:'wrench', photo:'garage', phone:'079 000 6104', info:'فحص وصيانة سيارات الهايبرد.', text:'فحص بطارية الهايبرد بالجهاز. صيانة بريوس وسوناتا وفيوجن.'},
  {id:5, name:'كهربائي أبو رامي', type:'كهربائي سيارات', gov:'مادبا', area:'وسط البلد', km:29.5, icon:'bolt', photo:'electric', phone:'078 000 6105', info:'كهرباء وكمبيوتر سيارات.', text:'فحص كمبيوتر وتصليح دينمو وسلف.'},
  {id:6, name:'سطحة الشمال', type:'سطحة بين المحافظات', gov:'إربد', area:'إربد', km:72, icon:'truck', photo:'flatbed', phone:'077 000 6106', info:'نقل سيارات بين المحافظات.', text:'من إربد لكل المحافظات، ومن وإلى العقبة بحجز مسبق.'},
  {id:7, name:'سطحة العاصمة', type:'سطحة بين المحافظات', gov:'عمّان', area:'طبربور', km:2.6, icon:'truck', photo:'flatbed', phone:'079 000 6107', info:'نقل سيارتك لأي محافظة على سطحة.', text:'حجز لنفس اليوم داخل عمّان والزرقاء، وللمحافظات البعيدة بحجز مسبق.'},
  {id:8, name:'بطاريات أبو العبد', type:'بطاريات وتشغيل على الطريق', gov:'عمّان', area:'ماركا', km:3.4, icon:'battery', photo:'battery', phone:'078 000 6108', info:'تشغيل على الطريق، وبطارية جديدة مكانك.', text:'نجيك وين ما وقفت، نفحص البطارية والدينمو، ونركّب الجديدة بمكانها.'},
  {id:9, name:'مفاتيح المدينة', type:'برمجة مفاتيح', gov:'عمّان', area:'جبل الحسين', km:3.9, icon:'key', photo:'keys', phone:'077 000 6109', info:'نسخ وبرمجة مفاتيح وريموت.', text:'مفاتيح كوري وياباني وألماني. برمجة بالمحل أو عند السيارة.'},
  {id:10, name:'كراج الفاروق للصيانة', type:'كراج ميكانيك', gov:'عمّان', area:'أبو علندا', km:5.6, icon:'wrench', photo:'inspect', phone:'079 000 6110', info:'ميكانيك عام وصيانة دورية.', text:'جير، محرك، تعليق. فحص قبل الصيانة وسعر واضح قبل ما نبلّش.'},
  {id:11, name:'كهرباء وكمبيوتر الصويفية', type:'كهربائي سيارات', gov:'عمّان', area:'الصويفية', km:7.1, icon:'bolt', photo:'electric', phone:'078 000 6111', info:'فحص كمبيوتر وكهرباء سيارات.', text:'قراءة أعطال بالجهاز، تمديدات، حساسات، ودينمو وسلف.'},
  {id:12, name:'زيتك عندك', type:'تغيير زيت متنقّل', gov:'عمّان', area:'تلاع العلي', km:7.4, icon:'drop', photo:'oil', phone:'077 000 6112', info:'تغيير زيت وفلاتر عند بيتك أو شغلك.', text:'بنجيك بالموعد، ومعنا الزيت والفلتر المناسب لسيارتك.'},
  {id:13, name:'فحص قبل ما تشتري', type:'فحص قبل الشراء', gov:'عمّان', area:'المقابلين', km:8.2, icon:'search', photo:'inspect', phone:'079 000 6113', info:'فحص شامل للسيارة المستعملة.', text:'شاصي، محرك، جير، كمبيوتر. تقرير مكتوب قبل ما تدفع.'},
  {id:14, name:'بنشر الجبيهة', type:'بنشر وإطارات وبلانص', gov:'عمّان', area:'الجبيهة', km:8.8, icon:'tire', photo:'tire2', phone:'078 000 6114', info:'كوشوك جديد ومستعمل وبلانص.', text:'تشكيلة كوشوك لكل المقاسات، وترصيص بالكمبيوتر.'},
];
const PERSONAS = {
  guest:{label:'ضيف — لم يسجّل الدخول', logged:false, caps:[]},
  customer:{label:'زبون فقط', logged:true, caps:[]},
  pending:{label:'زبون + طلب متجر قيد المراجعة', logged:true, caps:[{t:'store', st:'pending'}]},
  rejected:{label:'زبون + طلب متجر مرفوض', logged:true, caps:[{t:'store', st:'rejected'}]},
  trader:{label:'زبون + تاجر مقبول', logged:true, caps:[{t:'store', st:'active'}]},
  multi:{label:'زبون + تاجر + مورّد', logged:true, caps:[{t:'store', st:'active'},{t:'supplier', st:'active'}]},
  supplier:{label:'زبون + مورّد فقط', logged:true, caps:[{t:'supplier', st:'active'}]},
};
const ME = {name:'محمد العمري', phone:'079 000 4821', store:'قطع غيار الريّان', storeArea:'الزرقاء — الهاشمية', supplier:'مؤسسة الرواد للتوريد'};

/* ---------- home v4: helpers shared with the full prototype ---------- */
Object.assign(P, {
  bolt:'<path d="M13 3 5 14h6l-1 7 8-11h-6z"/>', battery:'<rect x="3" y="7" width="16" height="10" rx="2"/><path d="M21 10v4M7 10v4M11 10v4"/>',
  key:'<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 6l3 3M15 8l2 2"/>', drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
  snow:'<path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7M9 3.5l3 2 3-2M9 20.5l3-2 3 2"/>', tire:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/><path d="M12 3v5.5M12 15.5V21M3 12h5.5M15.5 12H21"/>',
  paint:'<rect x="3" y="3" width="15" height="6" rx="1.5"/><path d="M18 6h3v5h-9v3"/><rect x="10.5" y="14" width="3" height="7" rx="1"/>', glass:'<path d="M3 17 6.5 6h11L21 17z"/><path d="M8 14l3.5-4M12.5 14l3-3.5"/>',
  sparkle:'<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 17v4M17 19h4"/>', seat:'<path d="M7 3h5l1.5 9H19l1 6H9z"/><path d="M8 21h12"/>',
  cam:'<rect x="3" y="7" width="13" height="10" rx="2"/><path d="m16 11 5-3v8l-5-3"/>', locate:'<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="7.5"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22"/>',
  send:'<path d="M21 3 10 14"/><path d="M21 3l-6.5 18-4.5-7-7-4.5z"/>',
  bell:'<path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
  cash:'<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6.5 9.5h.01M17.5 14.5h.01"/>',
});
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const nm = id => NAMES.find(x => x.id === id);
const lp = l => l.offer ? l.offer.price : l.price;
const norm = s => String(s).toLowerCase().replace(/[ًٌٍَُِّْـ]/g, '').replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').replace(/\s+/g, ' ').trim();
const makeOf = id => MAKES.find(m => m.id === id);
const modelOf = (mk, md) => makeOf(mk)?.models.find(m => m.id === md);
const carName = (mk, md) => [makeOf(mk)?.name, modelOf(mk, md)?.name].filter(Boolean).join(' ');
function parse(text){
  const t = ' ' + norm(text) + ' ', r = {text, part:null, typed:null, amb:[], mk:null, md:null, year:null, oem:null};
  let best = 0, hits = [];
  NAMES.forEach(x => [x.name, ...x.alt].forEach(al => { const n = norm(al); if (n.length >= 2 && (n.length > 3 ? t.includes(n) : t.includes(' ' + n + ' '))){ if (n.length > best){ best = n.length; hits = [[x.id, al]]; } else if (n.length === best && !hits.some(h => h[0] === x.id)) hits.push([x.id, al]); } }));
  if (hits.length === 1){ r.part = hits[0][0]; r.typed = hits[0][1]; } else if (hits.length > 1){ r.amb = hits.map(h => h[0]); r.typed = hits[0][1]; }
  MAKES.forEach(m => { [m.name, ...(m.alt || [])].forEach(a => { const n = norm(a); if (n.length > 4 ? t.includes(n) : t.includes(' ' + n + ' ')) r.mk = m.id; }); m.models.forEach(md => [md.name, ...md.alt].forEach(al => { if (t.includes(' ' + norm(al) + ' ')){ r.mk = m.id; r.md = md.id; } })); });
  const y = text.match(/\b(19[89]\d|20[0-2]\d)\b/); if (y) r.year = +y[1];
  const o = text.match(/\b[A-Z0-9]{4,6}-[A-Z0-9]{3,6}\b/i); if (o) r.oem = o[0].toUpperCase();
  return r;
}

