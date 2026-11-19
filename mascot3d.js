(function(){
  function mat(T,c,rough=.8,metal=0){return new T.MeshStandardMaterial({color:c,roughness:rough,metalness:metal});}
  function mesh(T,g,m){return new T.Mesh(g,m);}
  function createMascotModel(T,opts={}){
    const G=new T.Group();
    const skin=mat(T,0xb45a20), skin2=mat(T,0x8f4318), muzzle=mat(T,0x8b5140), shirt=mat(T,0xb9bb82), pants=mat(T,0x4b4d23), shoe=mat(T,0x553b25), hair=mat(T,0xe4d3b4), horn=mat(T,0x8f5d2e), dark=mat(T,0x2a211a), metal=mat(T,0x9da0a0,.35,.75), white=mat(T,0xf5efe6), black=mat(T,0x171411), red=mat(T,0x6e1914);
    const body=mesh(T,new T.CapsuleGeometry(1.02,1.55,10,18),shirt);body.scale.set(1.05,1,0.72);body.position.y=2.55;G.add(body);
    const neck=mesh(T,new T.CylinderGeometry(.55,.65,.5,18),skin);neck.position.y=3.55;G.add(neck);
    const head=mesh(T,new T.SphereGeometry(1.05,24,18),skin);head.scale.set(1,1.08,.92);head.position.set(0,4.55,-.08);G.add(head);
    const snout=mesh(T,new T.SphereGeometry(.62,24,16),muzzle);snout.scale.set(1.12,.72,.65);snout.position.set(0,4.15,-.88);G.add(snout);
    [-.22,.22].forEach(x=>{const n=mesh(T,new T.SphereGeometry(.12,16,12),dark);n.scale.z=.6;n.position.set(x,4.22,-1.42);G.add(n);});
    [-.36,.36].forEach(x=>{const e=mesh(T,new T.SphereGeometry(.28,16,12),skin2);e.scale.set(1.4,.55,.8);e.position.set(x,4.55,-.15);e.rotation.z=x>0?-.12:.12;G.add(e);});
    [-.52,.52].forEach(x=>{const eye=mesh(T,new T.SphereGeometry(.19,20,14),white);eye.position.set(x,4.75,-.9);G.add(eye);const p=mesh(T,new T.SphereGeometry(.09,16,12),black);p.position.set(x,4.75,-1.06);G.add(p);});
    [-.45,.45].forEach(x=>{const b=mesh(T,new T.SphereGeometry(.18,16,12),dark);b.scale.set(1.7,.45,.65);b.position.set(x,5.08,-.86);b.rotation.z=x>0?-.1:.1;G.add(b);});
    for(let i=0;i<7;i++){const h=mesh(T,new T.SphereGeometry(.25,16,12),hair);h.scale.set(1.5,.8,.8);h.position.set((i-3)*.23,5.28+Math.sin(i)*.08,-.25);h.rotation.z=(i-3)*.1;G.add(h);}
    const beard=mesh(T,new T.SphereGeometry(.48,20,14),hair);beard.scale.set(.8,.85,.55);beard.position.set(0,3.78,-.67);G.add(beard);
    [-1,1].forEach(s=>{const h=mesh(T,new T.ConeGeometry(.2,.95,16),horn);h.position.set(s*.88,5.05,-.02);h.rotation.z=s<0?-1.05:1.05;h.rotation.x=.15;G.add(h);});
    const armL=new T.Group(),armR=new T.Group();
    [[armL,-1],[armR,1]].forEach(([a,s])=>{const upper=mesh(T,new T.CapsuleGeometry(.27,.85,8,12),skin);upper.position.set(s*.98,2.75,0);upper.rotation.z=s*.32;a.add(upper);const fore=mesh(T,new T.CapsuleGeometry(.25,.72,8,12),skin);fore.position.set(s*1.1,2.05,-.02);fore.rotation.z=s*-.15;a.add(fore);G.add(a);});
    armR.position.set(0,0,0);
    const handL=mesh(T,new T.SphereGeometry(.3,16,12),skin);handL.position.set(-1.08,1.7,-.02);G.add(handL);
    const handR=mesh(T,new T.SphereGeometry(.3,16,12),skin);handR.position.set(1.08,1.7,-.02);G.add(handR);
    G.userData.legs=[];
    const pants=mesh(T,new T.CapsuleGeometry(1.0,.95,8,14),pants);pants.scale.set(1.12,1,.75);pants.position.y=1.1;G.add(pants);
    [-.43,.43].forEach(x=>{const leg=mesh(T,new T.CapsuleGeometry(.36,.72,8,12),pants);leg.position.set(x,.35,0);G.add(leg);G.userData.legs.push(leg);const boot=mesh(T,new T.SphereGeometry(.45,18,12),shoe);boot.scale.set(1.2,.55,1.35);boot.position.set(x,-.05,-.18);G.add(boot);});
    const belt=mesh(T,new T.CylinderGeometry(1.08,1.08,.16,32),dark);belt.scale.z=.72;belt.rotation.x=Math.PI/2;belt.position.y=1.72;G.add(belt);
    const buckle=mesh(T,new T.BoxGeometry(.32,.26,.1),metal);buckle.position.set(0,1.72,-.78);G.add(buckle);
    const chain=mesh(T,new T.TorusGeometry(.48,.035,8,28,Math.PI),dark);chain.rotation.x=Math.PI/2;chain.position.set(0,3.75,-.72);G.add(chain);
    const tag=mesh(T,new T.BoxGeometry(.32,.42,.06),metal);tag.position.set(0,3.45,-1.03);tag.rotation.z=.12;G.add(tag);
    const watch=mesh(T,new T.CylinderGeometry(.2,.2,.08,20),metal);watch.rotation.z=Math.PI/2;watch.position.set(1.25,1.95,-.05);G.add(watch);
    const glass=new T.Group();
    const bowl=mesh(T,new T.CylinderGeometry(.34,.22,.5,20,true),new T.MeshStandardMaterial({color:0xd8d8d8,transparent:true,opacity:.35,roughness:.1,metalness:.1,side:T.DoubleSide}));bowl.position.y=.45;glass.add(bowl);
    const wine=mesh(T,new T.CylinderGeometry(.24,.2,.22,20),red);wine.position.y=.34;glass.add(wine);
    const stem=mesh(T,new T.CylinderGeometry(.025,.025,.55,8),white);stem.position.y=.05;glass.add(stem);
    const foot=mesh(T,new T.CylinderGeometry(.18,.18,.035,16),white);foot.position.y=-.23;glass.add(foot);
    glass.position.set(-1.38,1.55,-.1);glass.rotation.z=-.08;G.add(glass);
    G.userData={armL,armR,glass,front: true};
    if(opts.back){G.rotation.y=Math.PI;G.userData.front=false;}
    if(opts.scale)G.scale.setScalar(opts.scale);
    return G;
  }
  function mountMascot3D(el,opts={}){
    const T=window.THREE;
    const canvas=document.createElement('canvas');canvas.className='mascot-canvas';el.innerHTML='';el.appendChild(canvas);
    const r=new T.WebGLRenderer({canvas,alpha:true,antialias:true});r.setPixelRatio(Math.min(devicePixelRatio,2));
    const s=new T.Scene();const c=new T.PerspectiveCamera(30,1,.1,100);c.position.set(0,4.2,13);c.lookAt(0,2.5,0);
    s.add(new T.HemisphereLight(0xfff3df,0x24170f,2.2));const key=new T.DirectionalLight(0xffffff,2.5);key.position.set(4,8,8);key.castShadow=true;s.add(key);const fill=new T.DirectionalLight(0xe8a070,1.2);fill.position.set(-5,4,2);s.add(fill);
    const g=createMascotModel(T,{scale:opts.scale||1});g.position.y=opts.y||-1.15;s.add(g);
    let t=0;function resize(){const w=el.clientWidth||300,h=el.clientHeight||300;r.setSize(w,h,false);c.aspect=w/h;c.updateProjectionMatrix();}addEventListener('resize',resize);resize();
    function loop(){t+=.016;if(opts.wave){g.userData.armL.rotation.z=Math.sin(t*3)*.55;g.userData.armL.rotation.x=-.15+Math.sin(t*3)*.12;}else{g.userData.armL.rotation.z=0;g.userData.armL.rotation.x=0;}if(opts.idle){g.position.y=(opts.y||-1.15)+Math.sin(t*1.5)*.05;g.rotation.z=Math.sin(t*.8)*.015;}r.render(s,c);requestAnimationFrame(loop);}loop();return {scene:s,camera:c,renderer:r,model:g};
  }
  window.TheBykMascot={createMascotModel,mountMascot3D};
})();
