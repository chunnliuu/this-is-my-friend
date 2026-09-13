/* ===========================================================
   《这是我的朋友》音频系统
   - AUDIO   : 编号 → 文件 / 音量 / 是否循环
   - CUES    : 什么时候播、什么时候停（锚在场景名或台词上）
   - GameAudio : 播放引擎
   音频文件统一放在  audio/  文件夹
   =========================================================== */

const AUDIO_DIR = 'audio/';

const AUDIO = {
  // ---------- 标题 ----------
  0: {f:'snow_dream.mp3',                                                loop:1, vol:.55, n:'开始界面BGM'},

  // ---------- 序章 ----------
  11:{f:'Erik Satie - Gymnopedies 3.mp3',                                 loop:1, vol:.55, n:'序章BGM'},
  1: {f:'103563__greencouch__thailand-jungle-cicade.mp3',                 loop:1, vol:.30, n:'蝉鸣'},
  2: {f:'52741__eric5335__town-amb-summer-day.mp3',                       loop:1, vol:.30, n:'黄昏树'},
  3: {f:'dragon-studio-glass-breaking-504033.mp3',                        loop:0, vol:.70, n:'玻璃碎'},
  4: {f:'freesound_community-horror-ambience-17601.mp3',                  loop:1, vol:.45, n:'恐怖氛围'},
  // ---------- 第一章 ----------
  12:{f:'konstantinpazuzustudio-gymnopedie-no-1-satie-496376.mp3',        loop:1, vol:.50, n:'第一章BGM'},
  5: {f:'universfield-school-bell-199584.mp3',                            loop:0, vol:.50, n:'下课铃'},
  6: {f:'473616__jimmygian__huge-university-indoor-hallway-ambience.mp3', loop:1, vol:.30, n:'楼道底噪'},
  7: {f:'445209__180242__rubbing-skin.mp3',                               loop:1, vol:.25, n:'红花油涂抹'},
  8: {f:'universfield-school-bell-199584.mp3',                            loop:0, vol:.50, n:'上课铃'},
  9: {f:'13226__incarnadine__living-minute-classroom-before-the-teacher-arrives.mp3',
                                                                          loop:1, vol:.18, n:'教室底噪'},
  35:{f:'tanweraman-flesh-growing-horror-392360.mp3',                     loop:1, vol:.65, noSync:1, n:'木须破肉（仅动画期间循环，不参与重算）'},
  // ---------- 第二章 ----------
  13:{f:'gregorquendel-debussy-arabesque-no-1-l-66-180628.mp3',           loop:1, vol:.45, n:'第二章BGM'},
  14:{f:'419181__14gpanskahonc_petr__14-man-fast-walking-dirt.mp3',       loop:0, vol:.50, n:'快步走'},
  15:{f:'844809__funkelfang__large-shopping-mall-atrium-crowd-ambience.mp3',
                                                                          loop:1, vol:.25, n:'医院人声'},
  16:{f:'244325__philip_daniels__knock_on_door.mp3',                      loop:0, vol:.60, n:'敲门'},
  17:{f:'678569__klankbeeld__field-summer-car-1927pm-220621_0422.mp3',    loop:1, vol:.28, n:'白水家门前'},
  18:{f:'257046__jagadamba__running.mp3',                                 loop:0, vol:.55, n:'奔跑'},
  19:{f:'832027__djgriffin__shadows-piano.mp3',                           loop:1, vol:.45, n:'病房BGM'},
  20:{f:'15419__pagancow__dorm-door-opening.mp3',                         loop:0, vol:.55, n:'开门'},
  21:{f:'233201__basoap__growing-bulbous-nose.mp3',                       loop:0, vol:.60, n:'木须生长'},
  22:{f:'483159__f-r-a-g-i-l-e__childrens-toys-laughing.mp3',             loop:1, vol:.35, n:'小孩笑'},
  23:{f:'429981__beeproductive__child-crying.mp3',                        loop:1, vol:.35, n:'小孩哭'},
  24:{f:'593799__kevp888__211021_1712_fr_windyforest.mp3',                loop:1, vol:.28, n:'风·林'},
  25:{f:'680728__mnop-8__crows.mp3',                                      loop:0, vol:.55, n:'乌鸦'},
  26:{f:'u_cn78t2855u-cang-lon-ta-lai-cang-hoai-niem-nhung-thu-a-qua-210213.mp3',
                                                                          loop:1, vol:.45, n:'怀旧BGM'},
  27:{f:'465558__carrieedick__cello-drone.mp3',                           loop:1, vol:.40, n:'大提琴'},
  // ---------- 第三章 ----------
  28:{f:'811341__sadiquecat__pouch-walking.mp3',                          loop:1, vol:.40, n:'走路'},
  29:{f:'361923__helenavelikaja__slow-breathing-woman.mp3',               loop:1, vol:1.0, n:'缓慢呼吸（已提升50dB）'},
  30:{f:'dragon-studio-glass-breaking-504033.mp3',                        loop:0, vol:.75, n:'砸玻璃'},
  31:{f:'dragon-studio-underwater-explosion-386175.mp3',                  loop:0, vol:.65, n:'水下爆破'},
  32:{f:'dragon-studio-underwater-ambience-376890.mp3',                   loop:1, vol:.25, n:'下沉'},
  33:{f:'xgtg-nostalgia-a-sweet-amp-memorable-loopable-piano-song-by-gtg-319605.mp3',
                                                                          loop:1, vol:.50, n:'结尾钢琴·原版'},
  34:{f:'universfield-wet-splat-impact-567197.mp3',                       loop:0, vol:.60, n:'噗嗤'},
  '33p':{f:'33_processed_slow.mp3', loop:1, vol:.50, n:'结尾钢琴·慢糊'},
  '33b':{f:'xgtg-nostalgia-a-sweet-amp-memorable-loopable-piano-song-by-gtg-319605.mp3',
                                    loop:1, vol:.55, n:'结尾钢琴·清晰'},
  '33c':{f:'33_ending_ritard.mp3',  loop:0, vol:.55, n:'结尾钢琴·减速至停'},
  // 无编号
  'paper':{f:'82379__gynation__paper-flip-3.mp3', loop:0, vol:.50, n:'日历翻页'},
  'type' :{f:'tap_paper.mp3',                     loop:0, vol:.10, n:'打字音'},
};

/* -----------------------------------------------------------
   触发表
   bg      : 匹配 &场景名（包含即可）
   text    : 匹配台词/旁白（包含即可）
   chapter : 匹配章节标题
   play    : 一次性播放
   start   : 开始循环
   stop    : 停止（淡出）
   ----------------------------------------------------------- */
const CUES = [
  // ===== 序章 =====
  {chapter:'序',        start:[11]},
  {bg:'街道冰棒',        start:[1]},
  {bg:'黄昏树',          stop:[1], start:[2]},
  {text:'等……',         stop:[1,2,11]},
  // 倒下那段换成了静音视频，音效沿用原来的：玻璃碎 + 恐怖氛围
  {video:'倒下视频',     play:[3], start:[4]},

  // ===== 第一章 =====
  {chapter:'第一章',     start:[12], stop:[4]},
  {text:'终于下课了',      play:[5]},
  {bg:'楼道图',          stop:[9], start:[6]},
  {text:'你喷一喷吧',     stop:[6]},
  {text:'上课了',         play:[8]},
  {text:'什么鬼',        start:[9]},
  {text:'好痒……好痒',    stop:[12]},
  {muxu:1,              start:[35], stop:[9]},

  // ===== 第二章 =====
  {chapter:'第二章',     start:[13]},
  {bg:'医院前台',        play:[14]},
  {text:'姐姐，你好',     start:[15]},
  {text:'白水，你去哪里了', stop:[15]},
  {bg:'白水家门前',       start:[17]},
  {text:'白水！白水',     play:[16]},
  {text:'再去一次医院吧',  stop:[13,17], play:[18]},
  {text:'这是哪里……窗外', start:[19]},
  {bg:'病房2',           play:[20]},
  {text:'我怎么了',       play:[21]},
  {text:'我想问点什么',    play:[21]},
  {bg:'病房3',           play:[20]},
  {bg:'病房4',           play:[20]},
  {bg:'登记簿显示',       play:['paper']},
  {text:'而且好痛',       start:[22,23]},
  {text:'有人在窗外吗',    stop:[22,23]},
  {text:'我吃力地坐起身',  start:[24]},
  {text:'远处的废屋',     stop:[24]},
  {bg:'病房9',           play:[20]},
  {text:'你妈妈知道你平安', play:[20]},
  {text:'你是被那个孩子选中的', play:[25]},
  {text:'你想不想见白水',  stop:[19]},
  {text:'你想好了吗',     start:[26]},
  {bg:'图画1',           start:[27]},
  {bg:'病房14',           stop:[27]},
  {text:'那现在',         stop:[26]},

  // ===== 第三章 =====
  {bg:'病房图2',         play:[20]},
  {text:'王叔带我走向废屋', start:[26]},
  {bg:'走路',            start:[28]},
  {text:'这么大的一个空间', stop:[28]},
  {text:'我一个人走进了房间', stop:[26]},
  {bg:'模糊',            start:[29]},
  {text:'我要怎么救下你',  stop:[29]},
  {bg:'模糊2',           start:[29]},
  {text:'你会死去吗',     stop:[29]},
  {bg:'砸玻璃',          play:[30,31]},
  {bg:'下沉',            start:[32]},
  {text:'白水？',         stop:[32]},
  {bg:'两个人水里',       start:[33]},
  {text:'我要做什么',     stop:[33], play:[34]},
  {bg:'抱2',             start:['33p'], delay:1500},   // 噗嗤之后静默 1.5 秒
  {text:'我好高兴',       stop:['33p'], start:['33b']},
  {text:'眼睛都闭上了',    stop:['33b'], play:['33c']},
];

/* ----------------------------------------------------------- */

const GameAudio = (function(){
  /* 用 <audio> 元素实现，兼容 file:// 直接打开（fetch/WebAudio 在本地协议下会被浏览器拦截） */
  const el={};                 // id -> HTMLAudioElement
  const fading={};             // id -> intervalId
  const stopping={};           // id -> true：正在执行显式 stop，duck 不应覆盖
  let bgmVol=.7, sfxVol=.7, ducked=false, started=false;
  const FADE=1200;             // 淡入淡出毫秒

  function make(id){
    if(el[id]) return el[id];
    const a=AUDIO[id]; if(!a) return null;
    const au=new Audio(AUDIO_DIR+a.f);
    au.preload='auto'; au.loop=!!a.loop; au.volume=0;
    au.addEventListener('error',()=>console.warn('音频加载失败 #'+id+'  '+AUDIO_DIR+a.f));
    el[id]=au; return au;
  }

  function target(id){
    const a=AUDIO[id]; if(!a) return 0;
    const bus = a.loop ? (ducked?0:bgmVol) : sfxVol;
    return Math.max(0, Math.min(1, a.vol*bus));
  }

  function fadeTo(id, to, ms, then){
    const au=el[id]; if(!au) return;
    clearInterval(fading[id]);
    const from=au.volume, t0=Date.now();
    if(ms<=0){ au.volume=to; then&&then(); return; }
    fading[id]=setInterval(()=>{
      const k=Math.min(1,(Date.now()-t0)/ms);
      au.volume=Math.max(0,Math.min(1, from+(to-from)*k));
      if(k>=1){ clearInterval(fading[id]); delete fading[id]; then&&then(); }
    },40);
  }

  function play(id){
    const a=AUDIO[id]; if(!a) return;
    const au=make(id); if(!au) return;
    if(a.loop){
      if(!au.paused) { fadeTo(id, target(id), 300); return; }   // 已在播，只校准音量
      au.currentTime=0; au.volume=0;
      au.play().catch(e=>console.warn('播放被拒 #'+id, e));
      fadeTo(id, target(id), FADE);
    }else{
      // 一次性音效：允许叠放，用克隆
      const c=au.cloneNode();
      c.volume=target(id);
      c.play().catch(e=>console.warn('播放被拒 #'+id, e));
    }
  }

  function stop(id, fast){
    const au=el[id]; if(!au||au.paused) return;
    stopping[id]=true;
    fadeTo(id, 0, fast?250:FADE, ()=>{ delete stopping[id]; au.pause(); au.currentTime=0; });
  }

  function stopAll(fast){ Object.keys(el).forEach(id=>stop(id, fast!==false)); }

  function duck(on){
    ducked=on;
    // 跳过正在执行显式 stop 的轨道，避免清除其 pause 回调
    Object.keys(el).forEach(id=>{ if(AUDIO[id]&&AUDIO[id].loop&&!el[id].paused&&!stopping[id]) fadeTo(id, target(id), 800); });
  }
  function refresh(){ Object.keys(el).forEach(id=>{ if(!el[id].paused) fadeTo(id, target(id), 200); }); }
  function setBgmVol(v){ bgmVol=v; refresh(); }
  function setSfxVol(v){ sfxVol=v; refresh(); }

  /* ---- 触发判断 ---- */
  function norm(s){ return (s||'').replace(/[\s\u3000]/g,''); }
  function cue(s){
    if(!s) return;
    for(const c of CUES){
      let hit=false;
      if(c.bg      && (s.t==='bg'||s.t==='overlay') && norm(s.name).includes(norm(c.bg))) hit=true;
      if(c.chapter && s.t==='chapter' && norm(s.name).includes(norm(c.chapter)))  hit=true;
      if(c.muxu    && s.t==='muxu')                                               hit=true;
      if(c.video   && s.t==='video'   && norm(s.name).includes(norm(c.video)))    hit=true;
      if(c.text    && (s.t==='say'||s.t==='narr') && norm(s.text).includes(norm(c.text))) hit=true;
      if(!hit) continue;
      const run=()=>{
        (c.stop ||[]).forEach(id=>stop(id));
        (c.start||[]).forEach(id=>play(id));
        (c.play ||[]).forEach(id=>play(id));
      };
      c.delay ? setTimeout(run, c.delay) : run();
    }
  }

  /* ---- 打字音 ---- */
  const SKIP='，。、；：！？…—“”‘’《》（）()\n\r\t ';
  let tc=0, typePool=[], typeIdx=0;
  function initType(){
    for(let i=0;i<6;i++){ const a=new Audio(AUDIO_DIR+AUDIO['type'].f); a.preload='auto'; typePool.push(a); }
  }
  function tick(ch){
    if(!typePool.length) return;
    if(ch && SKIP.includes(ch)) return;
    if(++tc % 2 !== 0) return;
    const a=typePool[typeIdx++ % typePool.length];
    try{ a.currentTime=0; a.volume=AUDIO['type'].vol*sfxVol;
         a.playbackRate=1+(Math.random()*2-1)*0.07; a.play().catch(()=>{}); }catch(e){}
  }
  function resetType(){ tc=0; }

  function init(){
    if(started) return Promise.resolve();
    started=true; initType();
    return Promise.resolve();
  }

  /* 回退 / 跳章 / 读档后：算出这个位置应该有哪些循环音在响 */
  function resync(list, k){
    if(!list) return;
    const active=new Set();
    for(let i=0;i<=k && i<list.length;i++){
      const s=list[i]; if(!s) continue;
      for(const c of CUES){
        let hit=false;
        if(c.bg      && s.t==='bg'      && norm(s.name).includes(norm(c.bg)))       hit=true;
        if(c.chapter && s.t==='chapter' && norm(s.name).includes(norm(c.chapter)))  hit=true;
        if(c.muxu    && s.t==='muxu')                                               hit=true;
        if(c.video   && s.t==='video'   && norm(s.name).includes(norm(c.video)))    hit=true;
        if(c.text    && (s.t==='say'||s.t==='narr') && norm(s.text).includes(norm(c.text))) hit=true;
        if(!hit) continue;
        (c.stop ||[]).forEach(id=>active.delete(id));
        (c.start||[]).forEach(id=>{ if(AUDIO[id]&&AUDIO[id].loop&&!AUDIO[id].noSync) active.add(id); });
      }
    }
    // 该停的停，该起的起，已经对的不动
    Object.keys(el).forEach(id=>{
      if(AUDIO[id]&&AUDIO[id].loop&&!el[id].paused&&!active.has(id)) stop(id,true);
    });
    // 无条件重放；若元素被浏览器挂起（看似在放其实没声音），强制重启一次
    active.forEach(id=>{
      const au=el[id];
      if(au && !au.paused && au.readyState>0 && au.currentTime===0){
        try{ au.pause(); }catch(e){}
      }
      play(id);
      const a2=el[id];
      if(a2 && a2.paused){ a2.play().catch(()=>{}); }
    });
  }

  return {init,play,stop,stopAll,duck,cue,tick,resetType,resync,setBgmVol,setSfxVol,AUDIO,CUES,
          get el(){return el;}};
})();

// 挂到 window 上，供 index.html 的 if(window.GameAudio) 判断使用
window.GameAudio = GameAudio;

// 首次交互后初始化（浏览器要求用户先操作才能出声）
document.addEventListener('pointerdown', function once(){ GameAudio.init(); }, {once:true});
