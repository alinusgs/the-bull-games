(function(){
  function mat(T,c,rough=.72,metal=0){return new T.MeshPhongMaterial({color:c,shininess:Math.round((1-rough)*100),specular:metal?0xffffff:0x222222});}
  function mesh(T,g,m){const x=new T.Mesh(g,m);x.castShadow=true;x.receiveShadow=true;return x;}
  function tube(T,pts,r,m){return mesh(T,new T.TubeGeometry(new T.CatmullRomCurve3(pts),28,r,10,false),m);}
  function capsule(T,r,h,m){const g=new T.Group();const body=mesh(T,new T.CylinderGeometry(r,r,h,20),m);g.add(body);const a=mesh(T,new T.SphereGeometry(r,20,16),m);a.position.y=h/2;g.add(a);const b=mesh(T,new T.SphereGeometry(r,20,16),m);b.position.y=-h/2;g.add(b);return g;}
  function createMascotModel(T,opts={}){
    const G=new T.Group();
    const skin=mat(T,0xb86225,.78),skinDark=mat(T,0x8e431b,.8),muzzle=mat(T,0x8c5548,.7),shirt=mat(T,0xb9bb83,.9),pants=mat(T,0x4b4c24,.92),shoe=mat(T,0x5b3c25,.72),hair=mat(T,0xe2d0b0,.9),horn=mat(T,0x9a6734,.62),dark=mat(T,0x30241d,.7),metal=mat(T,0xaeb0ad,.28,.72),white=mat(T,0xf3eee6,.45),black=mat(T,0x171310,.5),wine=mat(T,0x65130f,.55);
    const body=capsule(T,.94,1.42,shirt);body.scale.set(1.08,.72,.76);body.position.set(0,2.65,0);G.add(body);
    const neck=mesh(T,new T.CylinderGeometry(.55,.68,.5,24),skin);neck.position.set(0,3.55,0);G.add(neck);
    const head=mesh(T,new T.SphereGeometry(1.04,32,24),skin);head.scale.set(1,.98,.92);head.position.set(0,4.48,0);G.add(head);
    const cheekL=mesh(T,new T.SphereGeometry(.42,24,18),skinDark);cheekL.scale.set(1.15,.72,.7);cheekL.position.set(-.48,4.18,.28);G.add(cheekL);
    const cheekR=mesh(T,new T.SphereGeometry(.42,24,18),skinDark);cheekR.scale.set(1.15,.72,.7);cheekR.position.set(.48,4.18,.28);G.add(cheekR);
    const snout=mesh(T,new T.SphereGeometry(.62,32,22),muzzle);snout.scale.set(1.16,.72,.7);snout.position.set(0,4.12,.88);G.add(snout);
    [-.22,.22].forEach(x=>{const n=mesh(T,new T.SphereGeometry(.13,20,16),black);n.scale.z=.7;n.position.set(x,4.18,1.42);G.add(n);});
    [-.48,.48].forEach(x=>{const ear=mesh(T,new T.SphereGeometry(.42,20,14),skin);ear.scale.set(1.35,.55,.55);ear.position.set(x,4.55,.1);ear.rotation.z=x<0?.16:-.16;G.add(ear);});
    [-.47,.47].forEach(x=>{const eye=mesh(T,new T.SphereGeometry(.2,24,18),white);eye.position.set(x,4.72,.88);G.add(eye);const p=mesh(T,new T.SphereGeometry(.095,20,16),black);p.position.set(x,4.72,1.065);G.add(p);});
    [-.46,.46].forEach(x=>{const brow=capsule(T,.075,.3,dark);brow.scale.set(1.8,.6,.6);brow.position.set(x,5.03,.84);brow.rotation.z=x<0?.1:-.1;G.add(brow);});
    const hairTop=mesh(T,new T.SphereGeometry(.58,24,18),hair);hairTop.scale.set(1.25,.7,.7);hairTop.position.set(0,5.25,.2);G.add(hairTop);
    for(let i=0;i<7;i++){const x=(i-3)*.22;const lock=mesh(T,new T.SphereGeometry(.23,18,14),hair);lock.scale.set(1.35,.8,.8);lock.position.set(x,5.3+Math.sin(i*.9)*.08,.42);lock.rotation.z=(i-3)*.09;G.add(lock);}
    const beard=mesh(T,new T.SphereGeometry(.5,24,18),hair);beard.scale.set(.82,.95,.62);beard.position.set(0,3.78,.67);G.add(beard);
    [-1,1].forEach(s=>{const pts=[new T.Vector3(s*.78,5,.0),new T.Vector3(s*1.15,5.2,.0),new T.Vector3(s*1.34,5.75,.0),new T.Vector3(s*1.12,6.18,.02)];G.add(tube(T,pts,.18,horn));});
    const armL=new T.Group(),armR=new T.Group();
    function arm(group,s){group.position.set(s*.92,3.05,0);const upper=capsule(T,.28,.78,skin);upper.position.y=-.42;upper.rotation.z=s*.18;group.add(upper);const fore=capsule(T,.25,.68,skin);fore.position.set(s*.1,-1.05,-.02);fore.rotation.z=-s*.12;group.add(fore);const hand=mesh(T,new T.SphereGeometry(.3,20,16),skin);hand.position.set(s*.12,-1.58,.05);group.add(hand);return group;}
    arm(armL,-1);arm(armR,1);G.add(armL,armR);
    const pantsBody=capsule(T,.96,.98,pants);pantsBody.scale.set(1.12,.7,.78);pantsBody.position.y=1.12;G.add(pantsBody);
    const legs=[];[-.43,.43].forEach(x=>{const leg=capsule(T,.34,.72,pants);leg.position.set(x,.38,0);G.add(leg);legs.push(leg);const boot=mesh(T,new T.SphereGeometry(.46,24,16),shoe);boot.scale.set(1.18,.55,1.38);boot.position.set(x,-.02,.16);G.add(boot);});
    const belt=mesh(T,new T.CylinderGeometry(1.08,1.08,.16,32),dark);belt.scale.z=.72;belt.rotation.x=Math.PI/2;belt.position.y=1.72;G.add(belt);
    const buckle=mesh(T,new T.BoxGeometry(.34,.28,.12),metal);buckle.position.set(0,1.72,.79);G.add(buckle);
    const chain=tube(T,[new T.Vector3(-.42,3.92,.69),new T.Vector3(0,3.68,.82),new T.Vector3(.42,3.92,.69)],.035,dark);G.add(chain);
    const tag=mesh(T,new T.BoxGeometry(.32,.42,.06),metal);tag.position.set(0,3.43,1.03);tag.rotation.z=.12;G.add(tag);
    const watch=mesh(T,new T.CylinderGeometry(.2,.2,.09,24),metal);watch.rotation.z=Math.PI/2;watch.position.set(1.19,2,.05);G.add(watch);
    const tail=tube(T,[new T.Vector3(0,1.65,-.62),new T.Vector3(0,1.35,-1.02),new T.Vector3(.08,1.05,-1.22)],.075,skinDark);G.add(tail);
    const tuft=mesh(T,new T.SphereGeometry(.18,16,12),hair);tuft.scale.set(1.1,.9,1.3);tuft.position.set(.08,1.02,-1.25);G.add(tuft);
    const glass=new T.Group();
    const glassMat=new T.MeshPhongMaterial({color:0xffffff,transparent:true,opacity:.25,shininess:100,side:T.DoubleSide});
    const bowl=mesh(T,new T.CylinderGeometry(.34,.22,.5,24,true),glassMat);bowl.position.y=.45;glass.add(bowl);const w=mesh(T,new T.CylinderGeometry(.24,.2,.22,24),wine);w.position.y=.34;glass.add(w);const stem=mesh(T,new T.CylinderGeometry(.025,.025,.55,10),white);stem.position.y=.05;glass.add(stem);const foot=mesh(T,new T.CylinderGeometry(.18,.18,.035,20),white);foot.position.y=-.23;glass.add(foot);glass.position.set(-1.35,1.55,.08);glass.rotation.z=-.08;G.add(glass);
    G.userData={armL,armR,legs,glass,front:true};
    if(opts.back){G.rotation.y=Math.PI;G.userData.front=false;}
    if(opts.scale)G.scale.setScalar(opts.scale);
    return G;
  }
  function mountMascot3D(el,opts={}){
    const T=window.THREE;if(!T||!el)return null;
    try{
      const canvas=document.createElement('canvas');canvas.className='mascot-canvas';el.innerHTML='';el.appendChild(canvas);
      const r=new T.WebGLRenderer({canvas,alpha:true,antialias:true});r.setPixelRatio(Math.min(window.devicePixelRatio||1,2));if('outputColorSpace' in r)r.outputColorSpace=T.SRGBColorSpace;
      const s=new T.Scene();const c=new T.PerspectiveCamera(28,1,.1,100);c.position.set(0,3.6,13);c.lookAt(0,2.65,0);
      s.add(new T.HemisphereLight(0xfff1dc,0x2b1910,2.3));const key=new T.DirectionalLight(0xffffff,3);key.position.set(4,9,8);s.add(key);const fill=new T.DirectionalLight(0xd68b55,1.4);fill.position.set(-5,4,3);s.add(fill);
      const g=createMascotModel(T,{scale:opts.scale||1,back:!!opts.back});g.position.y=opts.y??-1.2;s.add(g);
      let t=0;function resize(){const w=Math.max(1,el.clientWidth||300),h=Math.max(1,el.clientHeight||300);r.setSize(w,h,false);c.aspect=w/h;c.updateProjectionMatrix();}window.addEventListener('resize',resize);resize();
      function loop(){t+=.016;if(opts.wave){g.userData.armL.rotation.z=-.35+Math.sin(t*4)*.6;g.userData.armL.rotation.x=-.2+Math.sin(t*4)*.08;}else{g.userData.armL.rotation.z=0;g.userData.armL.rotation.x=0;}if(opts.run){g.userData.legs.forEach((leg,i)=>leg.rotation.x=Math.sin(t*12+(i?Math.PI:0))*.65);g.position.y=(opts.y??-1.2)+Math.abs(Math.sin(t*6))*.035;}else if(opts.idle){g.position.y=(opts.y??-1.2)+Math.sin(t*1.6)*.045;g.rotation.z=Math.sin(t*.8)*.012;}r.render(s,c);requestAnimationFrame(loop);}loop();return {scene:s,camera:c,renderer:r,model:g};
    }catch(err){el.innerHTML='<div style="height:100%;display:grid;place-items:center;color:#ff3b2f;font:700 12px Inter,sans-serif">3D mascot</div>';console.error(err);return null;}
  }
  window.TheBykMascot={createMascotModel,mountMascot3D};
})();
