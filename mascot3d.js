(function(){
'use strict';
const TAU=Math.PI*2;
function v3(x,y,z){return{x,y,z}};function add(a,b){return{x:a.x+b.x,y:a.y+b.y,z:a.z+b.z}};function sub(a,b){return{x:a.x-b.x,y:a.y-b.y,z:a.z-b.z}};function mul(a,s){return{x:a.x*s,y:a.y*s,z:a.z*s}};function cross(a,b){return{x:a.y*b.z-a.z*b.y,y:a.z*b.x-a.x*b.z,z:a.x*b.y-a.y*b.x}};function norm(a){let l=Math.hypot(a.x,a.y,a.z)||1;return{x:a.x/l,y:a.y/l,z:a.z/l}};
function rot(p,r){let x=p.x,y=p.y,z=p.z;let cx=Math.cos(r.x),sx=Math.sin(r.x),cy=Math.cos(r.y),sy=Math.sin(r.y),cz=Math.cos(r.z),sz=Math.sin(r.z);let y1=y*cx-z*sx,z1=y*sx+z*cx;let x2=x*cy+z1*sy,z2=-x*sy+z1*cy;return{x:x2*cz-y1*sz,y:x2*sz+y1*cz,z:z2};}
function trans(p,t,r,s){let q={x:p.x*s.x,y:p.y*s.y,z:p.z*s.z};q=rot(q,r);return add(q,t)}
function sphere(rx,ry,rz,seg=12,rings=8){let vs=[],ts=[];for(let j=0;j<=rings;j++){let ph=j/rings*Math.PI;for(let i=0;i<=seg;i++){let th=i/seg*TAU;vs.push(v3(Math.sin(ph)*Math.cos(th)*rx,Math.cos(ph)*ry,Math.sin(ph)*Math.sin(th)*rz));}}for(let j=0;j<rings;j++)for(let i=0;i<seg;i++){let a=j*(seg+1)+i,b=a+1,c=a+seg+1,d=c+1;ts.push([a,c,b],[b,c,d]);}return{vs,ts};}
function cyl(r,h,seg=12,topR=r){let vs=[],ts=[];for(let j=0;j<2;j++){let rr=j?topR:r,y=j?h/2:-h/2;for(let i=0;i<seg;i++){let th=i/seg*TAU;vs.push(v3(Math.cos(th)*rr,y,Math.sin(th)*rr));}}for(let i=0;i<seg;i++){let n=(i+1)%seg;ts.push([i,n,seg+i],[n,seg+n,seg+i]);}return{vs,ts};}
function cone(r1,r2,h,seg=12){return cyl(r1,h,seg,r2)}
function box(w,h,d){let x=w/2,y=h/2,z=d/2;let vs=[v3(-x,-y,-z),v3(x,-y,-z),v3(x,y,-z),v3(-x,y,-z),v3(-x,-y,z),v3(x,-y,z),v3(x,y,z),v3(-x,y,z)];let ts=[[0,1,2],[0,2,3],[4,6,5],[4,7,6],[0,4,5],[0,5,1],[1,5,6],[1,6,2],[2,6,7],[2,7,3],[4,0,3],[4,3,7]];return{vs,ts}}
function torus(R,r,seg=16,minor=6){let vs=[],ts=[];for(let j=0;j<=minor;j++){let p=j/minor*TAU;for(let i=0;i<seg;i++){let t=i/seg*TAU;let rr=R+r*Math.cos(p);vs.push(v3(rr*Math.cos(t),r*Math.sin(p),rr*Math.sin(t)));}}for(let j=0;j<minor;j++)for(let i=0;i<seg;i++){let n=(i+1)%seg,a=j*seg+i,b=j*seg+n,c=(j+1)*seg+i,d=(j+1)*seg+n;ts.push([a,c,b],[b,c,d]);}return{vs,ts}}
class Part{constructor(g,mat,pos,scale,rot0){this.g=g;this.mat=mat;this.pos=pos||v3(0,0,0);this.scale=scale||v3(1,1,1);this.rot=rot0||v3(0,0,0);this.children=[];this.parent=null}add(c){c.parent=this;this.children.push(c);return c}}
const C={fur:'#a95318',fur2:'#8e4314',horn:'#b98a58',hair:'#eadcc7',hair2:'#c7b39a',shirt:'#c7c69b',pants:'#667044',belt:'#5a3c22',metal:'#b8b6ad',boot:'#6a4228',eye:'#fffdf5',iris:'#6b3c19',black:'#2a1712',nose:'#6f3b2a',wine:'#6e1517',glass:'rgba(220,240,245,.30)',skin:'#d57b32'};
function mat(c){return c}
function makeModel(){let root=new Part(null,null,v3(0,0,0),v3(1,1,1),v3(0,0,0));root.height=4.8;root.parts={};
 const torso=root.add(new Part(sphere(1.25,1.35,.68,16,10),C.shirt,v3(0,2.35,0),v3(1,1,1)));root.parts.torso=torso;
 const neck=root.add(new Part(cyl(.42,.55,12),C.fur,v3(0,3.48,0),v3(1,1,1))); 
 const head=root.add(new Part(sphere(1.18,1.18,.92,16,12),C.fur,v3(0,4.25,.02),v3(1,1,1)));root.parts.head=head;
 const muzzle=head.add(new Part(sphere(.72,.48,.55,14,8),C.nose,v3(0,-.18,.73),v3(1,1,1)));root.parts.muzzle=muzzle;
 const nost1=muzzle.add(new Part(sphere(.13,.09,.07,10,6),C.black,v3(-.26,.04,.48),v3(1,1,1)));const nost2=muzzle.add(new Part(sphere(.13,.09,.07,10,6),C.black,v3(.26,.04,.48),v3(1,1,1)));
 for(const sx of [-.42,.42]){const e=head.add(new Part(sphere(.24,.27,.15,10,7),C.eye,v3(sx,.22,.77)));e.add(new Part(sphere(.11,.13,.08,10,7),C.iris,v3(0,0,.09)));e.add(new Part(sphere(.035,.045,.025,8,5),C.black,v3(0,.01,.16)));}
 for(const sx of [-.45,.45]) head.add(new Part(sphere(.46,.18,.16,10,6),C.fur2,v3(sx,.5,.25),v3(1,.7,1),v3(0,0,sx<0?-.15:.15)));
 for(const sx of [-1.0,1.0]) root.add(new Part(sphere(.55,.32,.16,10,6),C.fur,v3(sx,4.32,0),v3(1,1,1),v3(0,0,sx<0?.15:-.15)));
 // horns as linked tapered capsules
 for(const sx of [-1,1]){let horn=root.parts['horn'+sx] = root.add(new Part(null,C.horn,v3(sx*1.0,4.8,0),v3(1,1,1),v3(0,0,0)));let pts=[v3(0,0,0),v3(sx*.18,.42,0),v3(sx*.46,.66,.02),v3(sx*.72,.48,.02),v3(sx*.88,.05,.02)];for(let i=0;i<pts.length-1;i++){let a=pts[i],b=pts[i+1],mid=mul(add(a,b),.5),d=sub(b,a),len=Math.hypot(d.x,d.y,d.z);let p=horn.add(new Part(cone(.22-i*.03,.19-i*.03,len,10),C.horn,mid));p.rot.z=-Math.atan2(d.x,d.y);}}
 // hair tufts
 for(let i=0;i<7;i++){let x=(i-3)*.25;root.add(new Part(cone(.22,.06,.55,8),i%2?C.hair:C.hair2,v3(x,5.28-.1*Math.abs(x),.02),v3(1,1,1),v3(0,0,(i-3)*.12)));}
 // beard
 root.add(new Part(sphere(.52,.55,.38,12,8),C.hair2,v3(0,3.35,.62),v3(1,1,1)));
 // arms
 for(const sx of [-1,1]){let upper=root.add(new Part(cyl(.34,1.55,12),C.fur,v3(sx*1.12,2.45,0),v3(1,1,1),v3(0,0,sx*.18)));let hand=upper.add(new Part(sphere(.39,.35,.34,12,8),C.fur,v3(0,-.95,.02)));root.parts[sx<0?'armL':'armR']=upper;}
 // pants
 root.add(new Part(sphere(.7,.9,.58,14,9),C.pants,v3(-.48,1.05,0),v3(1,.95,1)));root.add(new Part(sphere(.7,.9,.58,14,9),C.pants,v3(.48,1.05,0),v3(1,.95,1)));
 root.add(new Part(torus(1.0,.08,20,6),C.belt,v3(0,1.82,0),v3(1,.55,.78),v3(Math.PI/2,0,0)));
 root.add(new Part(box(.34,.34,.12),C.metal,v3(0,1.82,.75),v3(1,1,1)));
 for(const sx of [-.48,.48]){let leg=root.add(new Part(cyl(.43,1.0,12),C.pants,v3(sx,.42,0),v3(1,1,1)));let boot=leg.add(new Part(sphere(.48,.25,.72,12,7),C.boot,v3(0,-.62,.18),v3(1,1,1)));root.parts[sx<0?'legL':'legR']=leg;}
 // watch
 root.parts.armR.add(new Part(cyl(.22,.13,12),C.metal,v3(0,-.42,.34),v3(1,1,1),v3(Math.PI/2,0,0)));
 // pendant
 root.add(new Part(cyl(.16,.05,12),C.metal,v3(0,3.0,.78),v3(1,1,1),v3(Math.PI/2,0,0)));
 // wine glass in left hand
 const glass=root.add(new Part(null,C.glass,v3(-1.25,1.8,.65)));glass.add(new Part(cyl(.18,.75,12),C.glass,v3(0,.25,0),v3(1,1,1)));glass.add(new Part(sphere(.34,.3,.34,12,8),C.wine,v3(0,.7,0)));glass.add(new Part(cyl(.03,.7,8),C.glass,v3(0,-.45,0)));glass.add(new Part(cyl(.24,.025,12),C.glass,v3(0,-.8,0)));
 return root;
}
function drawModel(canvas,opts={}){const ctx=canvas.getContext('2d');let model=makeModel(),mode=opts.mode||'front',t0=performance.now();function resize(){const d=Math.min(devicePixelRatio||1,2),w=canvas.clientWidth||180,h=canvas.clientHeight||230;canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0)}resize();addEventListener('resize',resize);function loop(t){const time=(t-t0)/1000;ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);let yaw=mode==='back'?Math.PI:(opts.yaw||0);let wave=opts.wave?Math.sin(time*5)*.45:0;let run=opts.run?Math.sin(time*12):0;render(ctx,model,{yaw,wave,run,scale:opts.scale||1,canvas});requestAnimationFrame(loop)}requestAnimationFrame(loop);return model}
function render(ctx,root,o){let W=ctx.canvas.clientWidth,H=ctx.canvas.clientHeight;let tris=[];function walk(p,parentPos,parentRot,parentScale){let pos=trans(p.pos,parentPos,parentRot,parentScale),rotv={x:p.rot.x+parentRot.x,y:p.rot.y+parentRot.y,z:p.rot.z+parentRot.z},scale=v3(p.scale.x*parentScale.x,p.scale.y*parentScale.y,p.scale.z*parentScale.z);if(p===root){pos=v3(0,0,0);rotv=v3(0,0,0);scale=v3(1,1,1)}if(p===root.parts.armL)rotv.z+=o.wave*.8;if(p===root.parts.armR)rotv.z-=o.wave*.15;if(p===root.parts.legL)rotv.x+=o.run*.45;if(p===root.parts.legR)rotv.x-=o.run*.45;if(p.g){for(const tri of p.g.ts){let a=trans(p.g.vs[tri[0]],pos,rotv,scale),b=trans(p.g.vs[tri[1]],pos,rotv,scale),c=trans(p.g.vs[tri[2]],pos,rotv,scale);let n=norm(cross(sub(b,a),sub(c,a)));let light=Math.max(.18,n.z*.75+n.y*.35+n.x*.15);tris.push({a,b,c,mat:p.mat,z:(a.z+b.z+c.z)/3,light});}}for(const c of p.children)walk(c,pos,rotv,scale)}walk(root,v3(0,0,0),v3(0,0,0),v3(1,1,1));tris.sort((a,b)=>a.z-b.z);let focal=Math.min(W,H)*.78*o.scale;function P(p){let z=p.z+7.5;return{x:W/2+p.x*focal/z,y:H*.82-p.y*focal/z}}for(const q of tris){let A=P(q.a),B=P(q.b),C2=P(q.c);ctx.beginPath();ctx.moveTo(A.x,A.y);ctx.lineTo(B.x,B.y);ctx.lineTo(C2.x,C2.y);ctx.closePath();let col=q.mat;if(col.startsWith('#')){let n=parseInt(col.slice(1),16),r=n>>16&255,g=n>>8&255,b=n&255;let f=q.light;col=`rgb(${Math.round(r*f)},${Math.round(g*f)},${Math.round(b*f)})`;}ctx.fillStyle=col;ctx.fill();}}
window.Mascot3D={mount:drawModel};
})();
