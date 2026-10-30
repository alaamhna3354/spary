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
];
const MAKES = [
  {id:'toyota', name:'تويوتا', logo:'v12-assets/brand-logos/toyota.webp', models:[{id:'prius',name:'بريوس',alt:['prius','بريس']},{id:'corolla',name:'كورولا',alt:['corolla','كرولا']},{id:'camry',name:'كامري',alt:['camry']}]},
  {id:'hyundai', name:'هيونداي', logo:'v12-assets/brand-logos/hyundai.webp', models:[{id:'avante',name:'أفانتي',alt:['افانتي','النترا','إلنترا','avante','elantra']},{id:'sonata',name:'سوناتا',alt:['sonata','سوناتا هايبرد']},{id:'tucson',name:'توسان',alt:['tucson']}]},
  {id:'kia', name:'كيا', logo:'v12-assets/brand-logos/kia.webp', models:[{id:'cerato',name:'سيراتو',alt:['cerato','k3']},{id:'optima',name:'أوبتيما',alt:['اوبتيما','optima','k5']},{id:'rio',name:'ريو',alt:['rio']}]},
  {id:'nissan', name:'نيسان', logo:'v12-assets/brand-logos/nissan.webp', models:[{id:'sunny',name:'صني',alt:['sunny']},{id:'patrol',name:'باترول',alt:['patrol']},{id:'xtrail',name:'إكس تريل',alt:['x-trail','xtrail']}]},
  {id:'ford', name:'فورد', logo:'v12-assets/brand-logos/ford.webp', models:[{id:'fusion',name:'فيوجن',alt:['fusion']}]},
  {id:'chevrolet', name:'شيفروليه', logo:'v12-assets/brand-logos/chevrolet.webp', models:[{id:'cruze',name:'كروز',alt:['cruze']},{id:'malibu',name:'ماليبو',alt:['malibu']},{id:'tahoe',name:'تاهو',alt:['tahoe']}]},
  {id:'mercedes', name:'مرسيدس', logo:'v12-assets/brand-logos/mercedes.webp', models:[{id:'cclass',name:'C-Class',alt:['c-class','مرسيدس c']},{id:'eclass',name:'E-Class',alt:['e-class','مرسيدس e']},{id:'gle',name:'GLE',alt:['gle']}]},
  {id:'bmw', name:'بي إم دبليو', logo:'v12-assets/brand-logos/bmw.webp', models:[{id:'series3',name:'الفئة الثالثة',alt:['3 series','series 3','بي ام دبليو 3']},{id:'series5',name:'الفئة الخامسة',alt:['5 series','series 5','بي ام دبليو 5']},{id:'x5',name:'X5',alt:['x5']}]},
  {id:'mitsubishi', name:'ميتسوبيشي', logo:'v12-assets/brand-logos/mitsubishi.webp', models:[{id:'lancer',name:'لانسر',alt:['lancer']}]},
  {id:'honda', name:'هوندا', logo:'v12-assets/brand-logos/honda.webp', models:[{id:'civic',name:'سيفيك',alt:['civic']},{id:'accord',name:'أكورد',alt:['accord']},{id:'crv',name:'CR-V',alt:['cr-v','crv']}]},
  {id:'mazda', name:'مازدا', logo:'v12-assets/brand-logos/mazda.webp', models:[{id:'mazda3',name:'مازدا 3',alt:['mazda 3']},{id:'mazda6',name:'مازدا 6',alt:['mazda 6']},{id:'cx5',name:'CX-5',alt:['cx-5','cx5']}]},
  {id:'land-rover', name:'لاند روفر', logo:'v12-assets/brand-logos/land-rover.webp', models:[{id:'range-rover',name:'رينج روفر',alt:['range rover']},{id:'discovery',name:'ديسكفري',alt:['discovery']},{id:'defender',name:'ديفندر',alt:['defender']}]},
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
];
const SVC_TYPES = ['ونش وسحب سيارات','سطحة بين المحافظات','كراج ميكانيك','كهربائي سيارات','تكييف','بنشر وإطارات وبلانص','بطاريات وتشغيل على الطريق','سمكرة ودهان','زجاج وتظليل','غسيل وتلميع','تنظيف داخلي','فحص قبل الشراء','برمجة مفاتيح','كاميرات وأنظمة صوت','تغيير زيت متنقّل','تأمين','معاملات ترخيص','تأجير سيارات','شراء سيارات حوادث','عُدد صناعية'];
const SVCS = [
  {id:1, name:'ونش أبو خليل', type:'ونش وسحب سيارات', gov:'عمّان', area:'طبربور', km:2.1, icon:'truck', bg:'night', info:'سحب داخل عمّان على مدار الساعة.', text:'نوصل خلال 30 دقيقة داخل عمّان الشرقية. السحب للكراج أو للبيت.'},
  {id:2, name:'بنشر الوحدات 24 ساعة', type:'بنشر وإطارات وبلانص', gov:'عمّان', area:'الوحدات', km:4.8, icon:'wrench', bg:'shop', info:'تبديل كوشوك، ترصيص، بلانص.', text:'مفتوح 24 ساعة. خدمة متنقّلة للبيت بأجرة إضافية.'},
  {id:3, name:'غسيل وتلميع النخبة', type:'غسيل وتلميع', gov:'عمّان', area:'خلدا', km:6.3, icon:'car', bg:'tile', info:'غسيل خارجي وداخلي وتلميع.', text:'مواعيد من 8 الصبح لـ 10 المسا.'},
  {id:4, name:'كراج المهندس للهايبرد', type:'كراج ميكانيك', gov:'الزرقاء', area:'الزرقاء الجديدة', km:15.2, icon:'wrench', bg:'concrete', info:'فحص وصيانة سيارات الهايبرد.', text:'فحص بطارية الهايبرد بالجهاز. صيانة بريوس وسوناتا وفيوجن.'},
  {id:5, name:'كهربائي أبو رامي', type:'كهربائي سيارات', gov:'مادبا', area:'وسط البلد', km:29.5, icon:'alert', bg:'wood', info:'كهرباء وكمبيوتر سيارات.', text:'فحص كمبيوتر وتصليح دينمو وسلف.'},
  {id:6, name:'سطحة الشمال', type:'سطحة بين المحافظات', gov:'إربد', area:'إربد', km:72, icon:'truck', bg:'card', info:'نقل سيارات بين المحافظات.', text:'من إربد لكل المحافظات، ومن وإلى العقبة بحجز مسبق.'},
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
  MAKES.forEach(m => { if (t.includes(norm(m.name))) r.mk = m.id; m.models.forEach(md => [md.name, ...md.alt].forEach(al => { if (t.includes(' ' + norm(al) + ' ')){ r.mk = m.id; r.md = md.id; } })); });
  const y = text.match(/\b(19[89]\d|20[0-2]\d)\b/); if (y) r.year = +y[1];
  const o = text.match(/\b[A-Z0-9]{4,6}-[A-Z0-9]{3,6}\b/i); if (o) r.oem = o[0].toUpperCase();
  return r;
}

