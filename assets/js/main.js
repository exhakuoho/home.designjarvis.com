/* =====================================================================
   DesignJarvis · 互動腳本
   ---------------------------------------------------------------------
   修改產品 → PRODUCTS 陣列   |   修改案例 → CASES 陣列
   修改流程 → FLOW 陣列        |   中英文 → 每個元素的 data-en 屬性
   ===================================================================== */
(function(){
'use strict';

/* ---------------- 線性 SVG 圖示庫 ---------------- */
const ICONS = {
  lamp:'<path d="M8 14c0-5 1.8-9 4-9s4 4 4 9z"/><path d="M9.5 14h5"/><path d="M12 14v5"/><path d="M9.5 21h5"/><path d="M12 5V3"/>',
  home:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  factory:'<path d="M3 21V11l5 3.2V11l5 3.2V9l6 3.6V21z"/><path d="M7 21v-3"/><path d="M12 21v-3"/><path d="M17 21v-3"/>',
  eco:'<path d="M12 21c0-6 1.5-10 8-12 0 7-3 11-8 12z"/><path d="M12 21c0-4-1-7-5-9"/>',
  lab:'<path d="M9 3h6"/><path d="M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3"/><path d="M7.5 15h9"/>',
  flex:'<rect x="3" y="7" width="13" height="10" rx="2"/><path d="M16 10h4M16 14h4"/><path d="M7 11v2M11 11v2"/>',
  building:'<path d="M4 21V6l8-3 8 3v15"/><path d="M9 9h0M13 9h0M9 13h0M13 13h0M9 17h0M13 17h0" stroke-linecap="round"/><path d="M4 21h16"/>',
  chip:'<rect x="7" y="7" width="10" height="10" rx="1.5"/><rect x="10" y="10" width="4" height="4"/><path d="M10 7V4.5M14 7V4.5M10 17v2.5M14 17v2.5M7 10H4.5M7 14H4.5M17 10h2.5M17 14h2.5"/>',
  wifi:'<path d="M4.5 11.5a11 11 0 0 1 15 0"/><path d="M7.5 14.5a7 7 0 0 1 9 0"/><circle cx="12" cy="18" r="1"/>',
  chat:'<path d="M4 5h16v10H9l-4 4z"/><path d="M8 9h8M8 12h5"/>',
  scan:'<path d="M4 8V5h3M20 8V5h-3M4 16v3h3M20 16v3h-3"/><path d="M7 12h10"/><circle cx="12" cy="12" r="2.5"/>',
  draft:'<path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7" /><circle cx="9" cy="11" r="0"/>',
  layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
  data:'<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/><path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>',
  refresh:'<path d="M20 11a8 8 0 1 0-1.6 5.5"/><path d="M20 5v5h-5"/>'
};
function svg(name){return '<svg viewBox="0 0 24 24" aria-hidden="true">'+(ICONS[name]||'')+'</svg>';}

/* ---------------- 產品資料（集中管理） ---------------- */
const PRODUCTS = [
  {icon:'lamp', name:'Swirl Lamp', url:'https://swirl-lamp.designjarvis.com/',
   tag:'智慧藝術燈', tagEn:'Smart Art Lamp',
   desc:'一盞為你而亮的智慧藝術燈，結合高質感造型、情境燈光、漸進式色彩切換與智慧家居控制，讓照明成為空間情緒的一部分。',
   descEn:'A sculptural smart lamp that pairs refined form with scene lighting, gradual colour transitions and smart-home control — turning light into part of a room\u2019s mood.',
   btn:'進入 Swirl Lamp', btnEn:'Enter Swirl Lamp'},
  {icon:'home', name:'Smart Home', url:'https://smarthome.designjarvis.com/',
   tag:'智慧家庭與場域整合', tagEn:'Smart Home & Space',
   desc:'為住宅、套房、辦公室與商業空間打造智慧化生活體驗，整合燈光、家電、感測器、情境控制與智慧家居系統。',
   descEn:'Intelligent living for homes, suites, offices and commercial spaces — uniting lighting, appliances, sensors, scenes and smart-home systems.',
   btn:'進入 Smart Home', btnEn:'Enter Smart Home'},
  {icon:'factory', name:'Factory Jarvis', url:'https://factoryjarvis.designjarvis.com/',
   tag:'智慧工廠資料平台', tagEn:'Smart Factory Platform',
   desc:'協助製造場域建立設備資料入口，整合機台狀態、能源資訊、製程紀錄與管理看板，讓工廠從經驗管理走向資料管理。',
   descEn:'A data gateway for manufacturing — unifying machine status, energy data, process logs and dashboards to move factories from intuition to data-driven management.',
   btn:'進入 Factory Jarvis', btnEn:'Enter Factory Jarvis'},
  {icon:'eco', name:'EcoTraker', url:'https://ecotraker.designjarvis.com/',
   tag:'能源與碳排追蹤', tagEn:'Energy & Carbon Tracking',
   desc:'將能源使用、環境數據與碳排資訊轉換為可視化資料，協助企業建立 ESG、LCA 與永續管理的基礎數據入口。',
   descEn:'Turns energy use, environmental data and carbon information into visual insight — the data foundation for ESG, LCA and sustainability management.',
   btn:'進入 EcoTraker', btnEn:'Enter EcoTraker'},
  {icon:'lab', name:'406LAB', url:'https://406lab.designjarvis.com/',
   tag:'研發實驗室與技術展示', tagEn:'R&D Lab & Showcase',
   desc:'406LAB 是 DesignJarvis 的研發展示基地，聚焦 AIoT、智慧硬體、機構設計、原型製作、實驗系統與創新專案展示。',
   descEn:'406LAB is DesignJarvis\u2019 R&D base — focused on AIoT, smart hardware, mechanism design, prototyping, experimental systems and innovation showcases.',
   btn:'進入 406LAB', btnEn:'Enter 406LAB'},
  {icon:'flex', name:'FlexPro', url:'https://flexpro.designjarvis.com/',
   tag:'外掛式監測模組', tagEn:'Plug-in Monitoring Module',
   desc:'以設備用電監測為資料入口，協助工廠將機台能耗轉換為產品成本、製程碳排、報價依據、毛利分析與 LCA 基礎資料。',
   descEn:'A power-monitoring data gateway that converts machine energy use into product cost, process carbon, quoting basis, margin analysis and LCA data.',
   btn:'進入 FlexPro', btnEn:'Enter FlexPro'}
];

/* ---------------- 案例資料（集中管理 / 未來替換圖片即可） ---------------- */
const CASES = [
  {img:'assets/images/case-smart-home.jpg', prod:'Smart Home',
   type:'智慧場域', typeEn:'Smart Space',
   name:'智慧住宅情境控制', nameEn:'Smart Residential Scene Control',
   desc:'整合燈光、家電、感測器與情境模式，打造可遠端控制的智慧生活空間。',
   descEn:'Lighting, appliances, sensors and scene modes integrated into a remotely controlled smart living space.'},
  {img:'assets/images/case-swirl-lamp.jpg', prod:'Swirl Lamp',
   type:'智慧硬體', typeEn:'Smart Hardware',
   name:'Swirl Lamp 智慧藝術燈展示', nameEn:'Swirl Lamp Art-Lighting Showcase',
   desc:'結合造型設計、漸進式燈光與智慧家居協議，讓燈具成為空間氛圍核心。',
   descEn:'Sculptural design, gradual lighting and smart-home protocols make the lamp the core of a room\u2019s atmosphere.'},
  {img:'assets/images/case-factory-jarvis.jpg', prod:'Factory Jarvis',
   type:'智慧工廠', typeEn:'Smart Factory',
   name:'工廠設備資料監測', nameEn:'Factory Equipment Data Monitoring',
   desc:'將機台運作、能源消耗與製程資料轉換為可視化管理資訊。',
   descEn:'Machine operation, energy consumption and process data turned into visual management insight.'},
  {img:'assets/images/case-flexpro.jpg', prod:'FlexPro',
   type:'智慧硬體', typeEn:'Smart Hardware',
   name:'FlexPro 外掛式監測模組', nameEn:'FlexPro Plug-in Monitoring Module',
   desc:'不大改既有設備，即可建立產品級能源成本、碳排與毛利分析資料入口。',
   descEn:'Without reworking existing equipment, it opens a data gateway for product-level energy cost, carbon and margin analysis.'},
  {img:'assets/images/case-406lab.jpg', prod:'406LAB',
   type:'研發展示', typeEn:'R&D Showcase',
   name:'研發原型與 AIoT 展示系統', nameEn:'R&D Prototype & AIoT Demo System',
   desc:'從機構、電控、感測器到展示頁，打造可展示、可測試的智慧硬體原型。',
   descEn:'From mechanism and control to sensors and showcase pages — testable, demonstrable smart-hardware prototypes.'}
];

/* ---------------- 系統整合流程 ---------------- */
const FLOW = [
  {icon:'chat',   name:'需求討論', nameEn:'Discovery',     desc:'釐清場域、產品目標與使用情境。', descEn:'Clarify space, product goals and use scenarios.'},
  {icon:'scan',   name:'場域分析', nameEn:'Site Analysis', desc:'盤點環境、設備與資料節點。',       descEn:'Audit the environment, equipment and data points.'},
  {icon:'draft',  name:'硬體設計', nameEn:'Hardware Design',desc:'造型、機構、電控與感測整合。',     descEn:'Form, mechanism, control and sensing integration.'},
  {icon:'layers', name:'系統整合', nameEn:'Integration',   desc:'連網、控制與 IoT 平台串接。',     descEn:'Connectivity, control and IoT platform wiring.'},
  {icon:'data',   name:'資料平台', nameEn:'Data Platform',  desc:'資料可視化與管理看板建置。',       descEn:'Data visualisation and management dashboards.'},
  {icon:'refresh',name:'持續優化', nameEn:'Optimisation',   desc:'依資料回饋持續調校與擴充。',       descEn:'Continuous tuning and expansion from data feedback.'}
];

const $=(s,c)=>(c||document).querySelector(s);
const $$=(s,c)=>Array.from((c||document).querySelectorAll(s));
let LANG = localStorage.getItem('dj-lang') || 'zh';

/* ---------------- 渲染：產品卡 ---------------- */
function renderProducts(){
  const grid=$('#prodGrid'); if(!grid) return;
  grid.innerHTML = PRODUCTS.map(p=>`
    <a class="prod-card glass reveal" href="${p.url}" target="_blank" rel="noopener"
       aria-label="${LANG==='en'?p.btnEn:p.btn}">
      <div class="pc-top">
        <div class="prod-icon">${svg(p.icon)}</div>
        <span class="pc-tag">${LANG==='en'?p.tagEn:p.tag}</span>
      </div>
      <h3>${p.name}</h3>
      <p class="pc-desc">${LANG==='en'?p.descEn:p.desc}</p>
      <span class="btn-text">${LANG==='en'?p.btnEn:p.btn} <span class="arr">→</span></span>
    </a>`).join('');
}

/* ---------------- 渲染：案例卡 ---------------- */
function renderCases(){
  const grid=$('#caseGrid'); if(!grid) return;
  grid.innerHTML = CASES.map(c=>`
    <article class="case-card glass reveal">
      <div class="case-media">
        <div class="case-ph">${svg('scan')}<span>${LANG==='en'?'Image placeholder':'案例圖片'}</span></div>
        <img src="${c.img}" alt="${(LANG==='en'?c.nameEn:c.name)} \u2014 ${c.prod}"
             loading="lazy" onerror="this.style.display='none'">
        <span class="case-type">${LANG==='en'?c.typeEn:c.type}</span>
      </div>
      <div class="case-body">
        <span class="case-prod">${c.prod}</span>
        <h3>${LANG==='en'?c.nameEn:c.name}</h3>
        <p>${LANG==='en'?c.descEn:c.desc}</p>
        <span class="btn-text">${LANG==='en'?'View case':'查看案例'} <span class="arr">→</span></span>
      </div>
    </article>`).join('');
}

/* ---------------- 渲染：流程 ---------------- */
function renderFlow(){
  const track=$('#flowTrack'); if(!track) return;
  track.innerHTML = '<div class="flow-line"><span class="fill"></span></div>' + FLOW.map((f,i)=>`
    <div class="flow-step">
      <div class="flow-dot">${svg(f.icon)}<span class="num">${String(i+1).padStart(2,'0')}</span></div>
      <h4>${LANG==='en'?f.nameEn:f.name}</h4>
      <p>${LANG==='en'?f.descEn:f.desc}</p>
    </div>`).join('');
}

/* ---------------- i18n（靜態文字） ---------------- */
function initI18n(){ $$('[data-en]').forEach(el=>{ if(!el.dataset.zhhtml) el.dataset.zhhtml=el.innerHTML; }); }
function applyLang(lang){
  LANG=lang; localStorage.setItem('dj-lang',lang);
  document.documentElement.lang = lang==='en'?'en':'zh-Hant';
  $$('[data-en]').forEach(el=>{ el.innerHTML = lang==='en'? el.dataset.en : el.dataset.zhhtml; });
  $$('.lang-toggle button').forEach(b=>b.classList.toggle('active', b.dataset.lang===lang));
  renderProducts(); renderCases(); renderFlow();
  observeReveals(); // re-observe freshly rendered cards
}

/* ---------------- 進場動畫 ---------------- */
let revealObs;
function observeReveals(){
  if(!revealObs){
    revealObs=new IntersectionObserver((es)=>{
      es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); revealObs.unobserve(e.target);} });
    },{threshold:.12, rootMargin:'0px 0px -8% 0px'});
  }
  $$('.reveal:not(.in)').forEach(el=>revealObs.observe(el));
}

/* ---------------- 流程點亮 ---------------- */
function initFlowReveal(){
  const track=$('#flowTrack'); if(!track) return;
  const obs=new IntersectionObserver((es)=>{
    es.forEach(e=>{
      if(!e.isIntersecting) return;
      const steps=$$('.flow-step',track);
      const fill=$('.flow-line .fill',track);
      const mob=window.matchMedia('(max-width:760px)').matches;
      if(fill){ if(mob){fill.style.height='100%';} else {fill.style.width='100%';} }
      steps.forEach((s,i)=>setTimeout(()=>s.classList.add('on'), 180*i+200));
      obs.disconnect();
    });
  },{threshold:.35});
  obs.observe(track);
}

/* ---------------- 導覽列 ---------------- */
function initNav(){
  const nav=$('#nav');
  const onScroll=()=>nav.classList.toggle('scrolled', window.scrollY>40);
  onScroll(); window.addEventListener('scroll',onScroll,{passive:true});
  const burger=$('#hamburger');
  burger.addEventListener('click',()=>document.body.classList.toggle('nav-open'));
  $$('.nav-links a').forEach(a=>a.addEventListener('click',()=>document.body.classList.remove('nav-open')));
  $$('.lang-toggle button').forEach(b=>b.addEventListener('click',()=>applyLang(b.dataset.lang)));
}

/* ---------------- HERO CANVAS：樹狀分枝 + 全幅網格背景 ---------------- */
function initHero(){
  const cv=$('#heroCanvas'); if(!cv) return;
  const hero=$('#hero'); const ctx=cv.getContext('2d');
  let W,H,dpr,mesh,field,labels=[],lblEls=[];
  const C={brown:'#BB9577',brown2:'#C09A7A',gray:'#5F5F5F',gold:'#D6C15A',gold3:'#EFE6A0'};
  const NODES=[
    {fx:.72,fy:.20,label:'智慧場域',labelEn:'Smart Space',ic:'home'},
    {fx:.58,fy:.42,label:'智慧硬體',labelEn:'Smart Hardware',ic:'chip',b:1.5},
    {fx:.86,fy:.56,label:'資料連網',labelEn:'Connectivity',ic:'wifi'}
  ];
  let pulses=[0,.33,.66], meshPulse={};
  let tx=0,ty=0,mx=0,my=0;

  function resize(){
    dpr=Math.min(2,window.devicePixelRatio||1);
    const r=hero.getBoundingClientRect(); W=r.width; H=r.height;
    cv.width=W*dpr; cv.height=H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
    mesh=[]; const n=Math.round(Math.min(54,W/26));
    for(let i=0;i<n;i++) mesh.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.16,vy:(Math.random()-.5)*.16});
    field=[]; for(let i=0;i<60;i++) field.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.2+.2,
      vx:(Math.random()-.5)*.1,vy:(Math.random()-.5)*.1,o:Math.random()*.4+.1});
    // labels DOM
    NODES.forEach((n,i)=>{ if(!lblEls[i]){const e=document.createElement('div');e.className='hero-node-label';hero.appendChild(e);lblEls[i]=e;} });
  }

  hero.addEventListener('mousemove',e=>{const r=hero.getBoundingClientRect();
    tx=((e.clientX-r.left)/r.width-.5); ty=((e.clientY-r.top)/r.height-.5);});
  hero.addEventListener('mouseleave',()=>{tx=0;ty=0;});

  function drawIcon(k,cx,cy,s){
    ctx.save();ctx.translate(cx,cy);ctx.strokeStyle='#fff';ctx.fillStyle='#fff';
    ctx.lineWidth=Math.max(1.6,s*.085);ctx.lineJoin='round';ctx.lineCap='round';
    if(k==='home'){ctx.beginPath();ctx.moveTo(-s*.7,-s*.05);ctx.lineTo(0,-s*.62);ctx.lineTo(s*.7,-s*.05);ctx.stroke();
      ctx.beginPath();ctx.moveTo(-s*.46,-s*.14);ctx.lineTo(-s*.46,s*.56);ctx.lineTo(s*.46,s*.56);ctx.lineTo(s*.46,-s*.14);ctx.stroke();
      ctx.beginPath();ctx.moveTo(-s*.12,s*.56);ctx.lineTo(-s*.12,s*.16);ctx.lineTo(s*.12,s*.16);ctx.lineTo(s*.12,s*.56);ctx.stroke();}
    else if(k==='chip'){ctx.strokeRect(-s*.42,-s*.42,s*.84,s*.84);ctx.strokeRect(-s*.16,-s*.16,s*.32,s*.32);
      for(let i=-1;i<=1;i++){const o=i*s*.28;
        ctx.beginPath();ctx.moveTo(o,-s*.42);ctx.lineTo(o,-s*.62);ctx.stroke();
        ctx.beginPath();ctx.moveTo(o,s*.42);ctx.lineTo(o,s*.62);ctx.stroke();
        ctx.beginPath();ctx.moveTo(-s*.42,o);ctx.lineTo(-s*.62,o);ctx.stroke();
        ctx.beginPath();ctx.moveTo(s*.42,o);ctx.lineTo(s*.62,o);ctx.stroke();}}
    else if(k==='wifi'){for(let i=1;i<=3;i++){ctx.beginPath();ctx.arc(0,s*.34,s*.22*i,Math.PI*1.15,Math.PI*1.85);ctx.stroke();}
      ctx.beginPath();ctx.arc(0,s*.34,s*.07,0,7);ctx.fill();}
    ctx.restore();
  }

  function frame(){
    mx+=(tx-mx)*.06; my+=(ty-my)*.06;
    ctx.clearRect(0,0,W,H);
    const small = W<760;
    // ambient brown glow on right
    const g=ctx.createRadialGradient(W*.72,H*.42,40,W*.72,H*.42,W*.62);
    g.addColorStop(0,'rgba(187,149,119,.12)');g.addColorStop(1,'rgba(5,5,5,0)');
    ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    const px=mx*16,py=my*16;
    // mesh
    for(let i=0;i<mesh.length;i++){const a=mesh[i];a.x+=a.vx;a.y+=a.vy;
      if(a.x<0)a.x=W;if(a.x>W)a.x=0;if(a.y<0)a.y=H;if(a.y>H)a.y=0;
      for(let j=i+1;j<mesh.length;j++){const b=mesh[j];const dx=a.x-b.x,dy=a.y-b.y;const d=dx*dx+dy*dy;
        if(d<150*150){const al=.16*(1-Math.sqrt(d)/150);
          ctx.beginPath();ctx.moveTo(a.x+px,a.y+py);ctx.lineTo(b.x+px,b.y+py);
          ctx.strokeStyle='rgba(110,110,110,'+al+')';ctx.lineWidth=1;ctx.stroke();}}}
    for(const a of mesh){ctx.beginPath();ctx.arc(a.x+px,a.y+py,1.3,0,7);ctx.fillStyle='rgba(150,150,150,.45)';ctx.fill();}
    // drifting particles
    for(const p of field){p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,7);ctx.fillStyle='rgba(187,149,119,'+p.o*.45+')';ctx.fill();}

    // ---- tree constellation (foreground) ----
    const tpx=mx*30, tpy=my*30;
    const base={x:W*.71+tpx*.4, y:H*.95+tpy*.2};
    const R = Math.max(22, Math.min(38, Math.min(W,H)*0.048));
    const pts = NODES.map(n=>({x:n.fx*W+tpx, y:n.fy*H+tpy}));
    NODES.forEach((n,i)=>{
      const nx=pts[i].x, ny=pts[i].y;
      // branch
      const mxp=(base.x+nx)/2, myp=(base.y+ny)/2-50;
      ctx.beginPath();ctx.moveTo(base.x,base.y);ctx.quadraticCurveTo(mxp,myp,nx,ny);
      ctx.strokeStyle='rgba(95,95,95,'+(small?.35:.55)+')';ctx.lineWidth=2.2;ctx.stroke();
      // gold pulse
      pulses[i]=(pulses[i]+.0042)%1;const t=pulses[i];
      const bx=(1-t)*(1-t)*base.x+2*(1-t)*t*mxp+t*t*nx;
      const by=(1-t)*(1-t)*base.y+2*(1-t)*t*myp+t*t*ny;
      ctx.beginPath();ctx.arc(bx,by,2.4,0,7);ctx.fillStyle=C.gold;ctx.shadowColor=C.gold;ctx.shadowBlur=12;ctx.fill();ctx.shadowBlur=0;
    });
    if(!small){
      NODES.forEach((n,i)=>{
        const nx=pts[i].x, ny=pts[i].y;
        const b=n.b||1;
        const grd=ctx.createRadialGradient(nx-R*.3,ny-R*.3,2,nx,ny,R);
        grd.addColorStop(0,'rgba(201,162,130,'+Math.min(1,.98*b)+')');grd.addColorStop(1,'rgba(184,142,109,'+Math.min(1,.52*b)+')');
        ctx.beginPath();ctx.arc(nx,ny,R,0,7);ctx.fillStyle=grd;ctx.shadowColor='rgba(187,149,119,'+Math.min(1,.55*b)+')';ctx.shadowBlur=26*b;ctx.fill();ctx.shadowBlur=0;
        ctx.beginPath();ctx.arc(nx,ny,R,0,7);ctx.strokeStyle='rgba(239,230,160,.4)';ctx.lineWidth=1;ctx.stroke();
        drawIcon(n.ic,nx,ny,R*.52);
        const lab=lblEls[i]; if(lab){lab.innerHTML='<b>'+(LANG==='en'?n.labelEn:n.label)+'</b>';
          lab.style.left=nx+'px';lab.style.top=(ny+R+18)+'px';lab.style.opacity=1;}
      });
      // ---- 底部太陽：漫射光圈 ----
      const sunR = Math.max(58, Math.min(W,H)*0.12);
      // 漫射外暈
      const halo=ctx.createRadialGradient(base.x,base.y,2,base.x,base.y,sunR*2.0);
      halo.addColorStop(0,'rgba(239,230,160,.5)');
      halo.addColorStop(.22,'rgba(214,193,90,.26)');
      halo.addColorStop(.55,'rgba(187,149,119,.10)');
      halo.addColorStop(1,'rgba(187,149,119,0)');
      ctx.fillStyle=halo;ctx.beginPath();ctx.arc(base.x,base.y,sunR*2.0,0,7);ctx.fill();
      // 漫射細圈
      for(let i=1;i<=3;i++){ctx.beginPath();ctx.arc(base.x,base.y,sunR*(.55+i*.34),0,7);
        ctx.strokeStyle='rgba(214,193,90,'+(.13-i*.03)+')';ctx.lineWidth=1;ctx.stroke();}
      // 核心
      const core=ctx.createRadialGradient(base.x,base.y,1,base.x,base.y,sunR*.46);
      core.addColorStop(0,'#FCF6DC');core.addColorStop(.45,'#EFE6A0');core.addColorStop(1,'rgba(214,193,90,.18)');
      ctx.fillStyle=core;ctx.shadowColor='rgba(214,193,90,.8)';ctx.shadowBlur=46;
      ctx.beginPath();ctx.arc(base.x,base.y,sunR*.46,0,7);ctx.fill();ctx.shadowBlur=0;
    } else { lblEls.forEach(l=>l&&(l.style.opacity=0)); }
    requestAnimationFrame(frame);
  }
  resize(); window.addEventListener('resize',resize); frame();
}

/* ---------------- 全站互動式星座背景 ---------------- */
function initStarfield(){
  const cv=document.getElementById('starfield'); if(!cv) return;
  const ctx=cv.getContext('2d');
  let W,H,dpr,stars=[];
  const mouse={x:-9999,y:-9999};
  function resize(){
    dpr=Math.min(2,window.devicePixelRatio||1);
    W=window.innerWidth; H=window.innerHeight;
    cv.width=W*dpr; cv.height=H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
    const n=Math.max(40, Math.min(150, Math.round(W*H/13000)));
    stars=[]; for(let i=0;i<n;i++) stars.push({
      x:Math.random()*W, y:Math.random()*H,
      vx:(Math.random()-.5)*.13, vy:(Math.random()-.5)*.13,
      r:Math.random()*1.2+.4, tw:Math.random()*6.28
    });
  }
  window.addEventListener('mousemove',e=>{mouse.x=e.clientX;mouse.y=e.clientY;},{passive:true});
  window.addEventListener('mouseout',()=>{mouse.x=-9999;mouse.y=-9999;});
  window.addEventListener('touchmove',e=>{if(e.touches[0]){mouse.x=e.touches[0].clientX;mouse.y=e.touches[0].clientY;}},{passive:true});
  const LINK=130, MOUSE=200;
  function frame(){
    ctx.clearRect(0,0,W,H);
    for(const s of stars){
      s.x+=s.vx; s.y+=s.vy;
      if(s.x<-20)s.x=W+20; if(s.x>W+20)s.x=-20; if(s.y<-20)s.y=H+20; if(s.y>H+20)s.y=-20;
      const dx=mouse.x-s.x, dy=mouse.y-s.y, dm=Math.hypot(dx,dy);
      if(dm<MOUSE && dm>0.5){const f=(1-dm/MOUSE)*0.5; s.x+=dx/dm*f; s.y+=dy/dm*f;}
    }
    // star-to-star links
    for(let i=0;i<stars.length;i++){const a=stars[i];
      for(let j=i+1;j<stars.length;j++){const b=stars[j];
        const dx=a.x-b.x,dy=a.y-b.y; if(Math.abs(dx)>LINK||Math.abs(dy)>LINK)continue;
        const d=Math.hypot(dx,dy);
        if(d<LINK){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);
          ctx.strokeStyle='rgba(125,118,108,'+(.11*(1-d/LINK))+')';ctx.lineWidth=1;ctx.stroke();}}
      // star-to-cursor links (互動)
      const mx=mouse.x-a.x,my=mouse.y-a.y,dmm=Math.hypot(mx,my);
      if(dmm<MOUSE){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(mouse.x,mouse.y);
        ctx.strokeStyle='rgba(214,193,90,'+(.30*(1-dmm/MOUSE))+')';ctx.lineWidth=1;ctx.stroke();}
    }
    // stars
    for(const s of stars){
      const mx=mouse.x-s.x,my=mouse.y-s.y,dmm=Math.hypot(mx,my);
      const near=dmm<MOUSE?(1-dmm/MOUSE):0;
      const tw=0.55+0.45*Math.sin(s.tw+=0.018);
      ctx.beginPath();ctx.arc(s.x,s.y,s.r*(1+near*0.9),0,7);
      if(near>0.04){ctx.fillStyle='rgba(214,193,90,'+(0.3*tw+near*0.55)+')';
        ctx.shadowColor='rgba(214,193,90,.6)';ctx.shadowBlur=near*8;}
      else{ctx.fillStyle='rgba(172,162,150,'+(0.32*tw)+')';ctx.shadowBlur=0;}
      ctx.fill();ctx.shadowBlur=0;
    }
    requestAnimationFrame(frame);
  }
  resize(); window.addEventListener('resize',resize); frame();
}

/* ---------------- 啟動 ---------------- */
document.addEventListener('DOMContentLoaded',()=>{
  initI18n();
  renderProducts(); renderCases(); renderFlow();
  initNav(); initStarfield(); initHero(); initFlowReveal();
  observeReveals();
  applyLang(LANG); // 套用儲存的語言（會重繪卡片並重觀察）
});

})();
