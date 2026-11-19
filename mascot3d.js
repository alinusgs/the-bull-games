(function(){
const TAU=Math.PI*2;
function shade(hex,k){let n=parseInt(hex.slice(1),16),r=Math.max(0,Math.min(255,((n>>16)&255)*k)),g=Math.max(0,Math.min(255,((n>>8)&255)*k)),b=Math.max(0,Math.min(255,(n&255)*k));return`rgb(${r|0},${g|0},${b|0})`}
class Bull3D{
 constructor(el,o={}){this.el=el;this.o=o;this.c=el.appendChild(document.createElement('canvas'));this.ctx=this.c.getContext('2d');this.t=0;this.back=!!o.back;this.wave=!!o.wave;this.run=!!o.run;this.resize=()=>{const d=Math.min(devicePixelRatio||1,2),w=Math.max(1,el.clientWidth),h=Math.max(1,el.clientHeight);this.c.width=w*d;this.c.height=h*d;this.c.style.width=w+'px';this.c.style.height=h+'px'};addEventListener('resize',this.resize);this.resize();this.loop=this.loop.bind(this);requestAnimationFrame(this.loop)}
 p(x,y,z){const w=this.c.clientWidth,h=this.c.clientHeight,scale=(this.o.scale||.62)*Math.min(w,h)/300,cam=9;z+=cam;const f=cam/z;return{x:w/2+x*scale*f,y:h*.78-y*scale*f,s:scale*f}}
 ellipse(x,y,z,rx,ry,c){const q=this.p(x,y,z),ctx=this.ctx;ctx.fillStyle=c;ctx.beginPath();ctx.ellipse(q.x,q.y,rx*q.s,ry*q.s,0,0,TAU);ctx.fill()}
 line(a,b,c,w){const p=this.p(...a),q=this.p(...b);this.ctx.strokeStyle=c;this.ctx.lineWidth=w*Math.min(p.s,q.s);this.ctx.lineCap='round';this.ctx.beginPath();this.ctx.moveTo(p.x,p.y);this.ctx.lineTo(q.x,q.y);this.ctx.stroke()}
 draw(){const ctx=this.ctx,w=this.c.clientWidth,h=this.c.clientHeight;ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,this.c.width,this.c.height);ctx.scale(this.c.width/w,this.c.height/h);ctx.fillStyle='rgba(0,0,0,.18)';ctx.beginPath();ctx.ellipse(w/2,h*.91,w*.2,h*.035,0,0,TAU);ctx.fill();const R=this.back?Math.PI:0;const arm=Math.sin(this.t*4)*.5;const leg=Math.sin(this.t*10)*.4;
 const part=(x,y,z,rx,ry,col)=>this.ellipse(x,y,z,rx,ry,col);
 part(0,2.65,0,1.0,1.35,'#b9bb83');part(0,4.35,0,1.03,1.03,'#b86225');part(0,4.02,.8,.64,.48,'#8c5548');part(-.42,4.7,.78,.21,.25,'#f3eee6');part(.42,4.7,.78,.21,.25,'#f3eee6');part(-.42,4.7,.94,.09,.11,'#171310');part(.42,4.7,.94,.09,.11,'#171310');part(0,5.15,.1,.68,.4,'#e2d0b0');part(0,3.77,.6,.43,.56,'#e2d0b0');part(-.72,4.55,0,.44,.21,'#b86225');part(.72,4.55,0,.44,.21,'#b86225');part(-.43,1.08,0,.31,.75,'#4b4c24');part(.43,1.08,0,.31,.75,'#4b4c24');part(-.43,.43,.18,.44,.27,'#5b3c25');part(.43,.43,.18,.44,.27,'#5b3c25');part(-.94,2.65,0,.27,.72,'#b86225');part(.94,2.65,0,.27,.72,'#b86225');part(-.98,2.0,0,.3,.3,'#b86225');part(.98,2.0,0,.3,.3,'#b86225');
 this.line([-.85,3.25,.25],[0,3.45,.65],'#30241d',3);this.line([0,3.45,.65],[.85,3.25,.25],'#30241d',3);part(0,3.12,.82,.18,.25,'#aeb0ad');
 const ay=this.wave?2.9:2.6;this.line([.9,ay,0],[1.1,ay+.45,.1],'#b86225',18);this.line([1.1,ay+.45,.1],[1.15,ay+.8,.12],'#b86225',18);if(this.wave)this.line([1.15,ay+.8,.12],[1.0,ay+1.05,.15],'#b86225',16);
 if(this.run){this.line([-.43,1.15,0],[-.43+Math.sin(this.t*10)*.16,.35,.05],'#4b4c24',12);this.line([.43,1.15,0],[.43-Math.sin(this.t*10)*.16,.35,.05],'#4b4c24',12)}
 ctx.strokeStyle='#9a6734';ctx.lineWidth=16*(this.o.scale||.62);ctx.lineCap='round';for(const s of[-1,1]){ctx.beginPath();ctx.moveTo(w/2+s*55,h*.28);ctx.quadraticCurveTo(w/2+s*95,h*.21,w/2+s*76,h*.12);ctx.stroke()}
 if(!this.back){ctx.fillStyle='#2d211c';ctx.font=`700 ${Math.max(10,14*(this.o.scale||.62))}px system-ui`;ctx.textAlign='center';ctx.fillText('THE БЫК',w/2,h*.96)} }
 loop(){this.t+=.016;this.draw();requestAnimationFrame(this.loop)}
}
window.TheBykMascot={mountMascot3D:(el,o={})=>new Bull3D(el,o)};
})();
