#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'apps', 'claw-wars.html');
const html = fs.readFileSync(filePath, 'utf8');
const START_MARKER = 'function getCardArtSVG(card)';
const END_MARKER = '// ============================================================\n// CARD HTML RENDERING';
const startIdx = html.indexOf(START_MARKER);
if (startIdx === -1) { console.error('ERROR: Could not find start marker'); process.exit(1); }
const endIdx = html.indexOf(END_MARKER, startIdx);
if (endIdx === -1) { console.error('ERROR: Could not find end marker'); process.exit(1); }
let lineStart = html.lastIndexOf('\n', startIdx);
lineStart = lineStart === -1 ? 0 : lineStart + 1;
const before = html.slice(0, lineStart);
const after = html.slice(endIdx);

const newFunction = `function getCardArtSVG(card){
var bg=card.art?.bg||['#1a1a2e','#0d0d18'],c=card.art?.color||'#5080a0',id=card.id,lv=card.level||0,
cL=_lit(c,.35),cD=_drk(c,.4),cDD=_drk(c,.65),bgD=_drk(bg[1],.3);
var _s=(id*2654435761)>>>0;var rr=function(){_s=(_s*1664525+1013904223)>>>0;return _s/4294967296};
var ri=function(a,b){return a+((rr()*(b-a+1))|0)},rf=function(a,b){return+(a+rr()*(b-a)).toFixed(2)};
var g=function(n){return n+id},P=Math.PI,Co=Math.cos,Si=Math.sin,R=_rgba;
var E=function(x,y,rx,ry,f,o){return'<ellipse cx="'+x+'" cy="'+y+'" rx="'+rx+'" ry="'+ry+'" fill="'+f+'"'+(o?' '+o:'')+'/>'},
Ci=function(x,y,r,f,o){return'<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+f+'"'+(o?' '+o:'')+'/>'},
SL='stroke-linecap="round"',
Li=function(a,b,c2,d,s,w){return'<line x1="'+a+'" y1="'+b+'" x2="'+c2+'" y2="'+d+'" stroke="'+s+'" stroke-width="'+w+'" '+SL+'/>'},
Pa=function(d,f,s,w,o){return'<path d="'+d+'" '+(f?'fill="'+f+'"':'fill="none"')+(s?' stroke="'+s+'"':'')+(w?' stroke-width="'+w+'"':'')+(o?' '+o:'')+'/>'};
var defs='<radialGradient id="'+g('bg')+'" cx="'+ri(35,55)+'%" cy="'+ri(30,48)+'%" r="'+ri(55,75)+'%"><stop offset="0%" stop-color="'+bg[0]+'"/><stop offset="70%" stop-color="'+bg[1]+'"/><stop offset="100%" stop-color="'+bgD+'"/></radialGradient>'+
'<filter id="'+g('gl')+'"><feGaussianBlur stdDeviation="4" result="b"/><feComposite in="b" in2="b" operator="arithmetic" k1="0" k2="1.5" k3="0" k4="0"/></filter>'+
'<filter id="'+g('g2')+'"><feGaussianBlur stdDeviation="2"/></filter>'+
'<filter id="'+g('g3')+'"><feGaussianBlur stdDeviation="6" result="b"/><feComposite in="b" in2="b" operator="arithmetic" k1="0" k2="2" k3="0" k4="0"/></filter>'+
'<filter id="'+g('sh')+'"><feGaussianBlur stdDeviation="1.5"/></filter>'+
'<clipPath id="'+g('vp')+'"><rect width="120" height="100"/></clipPath>'+
'<linearGradient id="'+g('bd')+'" x1="0" y1="0" x2=".3" y2="1"><stop offset="0%" stop-color="'+cL+'"/><stop offset="40%" stop-color="'+c+'"/><stop offset="100%" stop-color="'+cD+'"/></linearGradient>'+
'<radialGradient id="'+g('br')+'" cx="40%" cy="30%" r="65%"><stop offset="0%" stop-color="'+cL+'"/><stop offset="100%" stop-color="'+cD+'"/></radialGradient>'+
'<linearGradient id="'+g('fg')+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="'+bgD+'" stop-opacity="0"/><stop offset="100%" stop-color="'+bgD+'" stop-opacity=".6"/></linearGradient>';
var v='<rect width="120" height="100" fill="url(#'+g('bg')+')"/>';
for(var i=0;i<ri(2,4);i++){var x=ri(5,90),w=ri(4,10);v+='<polygon points="'+x+',0 '+(x+w)+',0 '+(x+w*3)+',100 '+(x-w)+',100" fill="'+R(cL,rf(.03,.07))+'"/>'}
v+='<rect width="120" height="35" y="65" fill="url(#'+g('fg')+')" opacity=".4"/>';
for(i=0;i<ri(2,3);i++)v+=Pa('M'+ri(0,40)+' '+ri(3,15)+' Q'+ri(30,60)+' '+ri(0,12)+' '+ri(60,120)+' '+ri(3,15),0,R(cL,rf(.04,.1)),rf(.8,1.5),SL);
var bd='url(#'+g('bd')+')',br='url(#'+g('br')+')';
if(card.type==='monster'){
var mx=ri(50,66),my=ri(38,50),sz=Math.min(12+lv*2.5+ri(0,3),30);
v+=E(mx,my+sz*.8+5,sz*1.2,sz*.2,R('#000000',.2),'filter="url(#'+g('sh')+')"');
v+=E(mx,my,sz*1.3,sz*1.1,R(c,.12),'filter="url(#'+g('g3')+')"');
var bt=id%15,ht=((id*7+3)>>>0)%10,at=((id*13+5)>>>0)%12,tt=((id*11+7)>>>0)%8,et=((id*17+11)>>>0)%8;
var fa=((id*19+2)>>>0)%8,fb=((id*23+13)>>>0)%8;
var bx=mx+(id%3===0?-1:id%3===1?1:0)*sz*.1,by=my,bw=sz,bh=sz*.8;
if(bt===0){var p='M';for(var t=0;t<=1;t+=.04){p+=(bx-bw*1.2+t*bw*2.6).toFixed(1)+' '+(by+Si(t*P*2.5+id*.7)*bh*.55).toFixed(1)+' L'}p=p.slice(0,-2);
v+=Pa(p,0,cD,5+lv*.4,'stroke-linecap="round" opacity=".6"')+Pa(p,0,bd,3.5+lv*.3,SL)+Pa(p,0,R(cL,.22),1.5+lv*.15,SL);
}else if(bt===1){v+=Pa('M'+(bx-bw*.6)+' '+(by-bh*.1)+' Q'+(bx-bw*.3)+' '+(by-bh*.55)+' '+bx+' '+(by-bh*.5)+' Q'+(bx+bw*.3)+' '+(by-bh*.45)+' '+(bx+bw*.55)+' '+(by-bh*.15)+' Q'+(bx+bw*.6)+' '+(by+bh*.2)+' '+(bx+bw*.3)+' '+(by+bh*.35)+' L'+(bx-bw*.35)+' '+(by+bh*.35)+' Q'+(bx-bw*.65)+' '+(by+bh*.2)+' '+(bx-bw*.6)+' '+(by-bh*.1),br);
for(i=0;i<4;i++){var lx=bx-bw*.4+i*bw*.28;v+=Pa('M'+lx+' '+(by+bh*.35)+' L'+(lx+ri(-2,2))+' '+(by+bh*.65),0,bd,rf(2.5,3.5),SL)}
}else if(bt===2){v+=Pa('M'+(bx-bw*.3)+' '+(by-bh*.15)+' L'+(bx-bw*.38)+' '+(by+bh*.4)+' L'+(bx+bw*.38)+' '+(by+bh*.4)+' L'+(bx+bw*.3)+' '+(by-bh*.15)+' Z',br);
v+=Pa('M'+(bx-bw*.15)+' '+(by+bh*.4)+' L'+(bx-bw*.25)+' '+(by+bh*.85),0,bd,3.5,SL);
v+=Pa('M'+(bx+bw*.15)+' '+(by+bh*.4)+' L'+(bx+bw*.22)+' '+(by+bh*.85),0,bd,3.5,SL);
for(var s=-1;s<=1;s+=2)v+=E(bx+bw*.35*s,by-bh*.12,bw*.15,bh*.1,br);
}else if(bt===3){var bp=[];for(var a=0;a<360;a+=25){var r=a*P/180,d=bw*(.55+rr()*.3);bp.push([bx+Co(r)*d,by+Si(r)*d*.75])}
var bP='M'+bp[0][0].toFixed(1)+' '+bp[0][1].toFixed(1);for(i=1;i<bp.length;i++){bP+=' Q'+((bp[i-1][0]+bp[i][0])/2+ri(-4,4)).toFixed(1)+' '+((bp[i-1][1]+bp[i][1])/2+ri(-4,4)).toFixed(1)+' '+bp[i][0].toFixed(1)+' '+bp[i][1].toFixed(1)}
v+=Pa(bP+' Z',br,0,0,'opacity=".85"');for(i=0;i<ri(3,6);i++)v+=Ci(bx+ri(-bw*.3,bw*.3),by+ri(-bh*.2,bh*.3),rf(1.5,4),R(cL,rf(.08,.2)));
}else if(bt===4){v+=E(bx,by,bw*.75,bh*.5,br);
for(i=0;i<3;i++)for(s=-1;s<=1;s+=2){lx=bx+(bw*.2+i*bw*.2)*s;v+=Pa('M'+lx+' '+(by+bh*.4)+' L'+(lx+3*s)+' '+(by+bh*.6)+' L'+(lx+5*s)+' '+(by+bh*.85),0,cD,1.2,SL)}
}else if(bt===5){v+=Pa('M'+(bx-bw*.8)+' '+by+' Q'+(bx-bw*.4)+' '+(by-bh*.5)+' '+(bx+bw*.2)+' '+(by-bh*.4)+' Q'+(bx+bw*.6)+' '+(by-bh*.25)+' '+(bx+bw*.7)+' '+by+' Q'+(bx+bw*.6)+' '+(by+bh*.25)+' '+(bx+bw*.2)+' '+(by+bh*.4)+' Q'+(bx-bw*.4)+' '+(by+bh*.5)+' '+(bx-bw*.8)+' '+by,br);
v+=Pa('M'+(bx-bw*.8)+' '+by+' Q'+(bx-bw*1.1)+' '+(by-bh*.4)+' '+(bx-bw*1.15)+' '+(by-bh*.15)+' Q'+(bx-bw*.9)+' '+by+' '+(bx-bw*1.15)+' '+(by+bh*.15)+' Q'+(bx-bw*1.1)+' '+(by+bh*.4)+' '+(bx-bw*.8)+' '+by,R(c,.35));
}else if(bt===6){v+=Pa('M'+(bx-bw*.5)+' '+(by+bh*.1)+' Q'+bx+' '+(by-bh*.05)+' '+(bx+bw*.45)+' '+(by+bh*.05)+' L'+(bx+bw*.45)+' '+(by+bh*.35)+' L'+(bx-bw*.5)+' '+(by+bh*.35)+' Z',bd);
for(i=0;i<4;i++){lx=bx-bw*.4+i*bw*.28;v+=Pa('M'+lx+' '+(by+bh*.35)+' L'+(lx+ri(-1,1))+' '+(by+bh*.7),0,bd,2.8,SL)}
v+=Pa('M'+(bx-bw*.15)+' '+(by+bh*.1)+' L'+(bx-bw*.2)+' '+(by-bh*.35)+' L'+(bx+bw*.2)+' '+(by-bh*.35)+' L'+(bx+bw*.15)+' '+(by+bh*.1)+' Z',br);
}else if(bt===7){v+=E(bx,by,bw*.35,bh*.4,br);
for(s=-1;s<=1;s+=2){v+=Pa('M'+(bx+bw*.2*s)+' '+(by-bh*.15)+' Q'+(bx+bw*.6*s)+' '+(by-bh*.65)+' '+(bx+bw*1.1*s)+' '+(by-bh*.3)+' Q'+(bx+bw*.9*s)+' '+(by+bh*.05)+' '+(bx+bw*.65*s)+' '+(by+bh*.15)+' Q'+(bx+bw*.4*s)+' '+(by+bh*.1)+' '+(bx+bw*.2*s)+' '+(by+bh*.1),R(c,.25),R(cD,.3),.5);
v+=Li(bx+bw*.2*s,by-bh*.15,bx+bw*.85*s,by-bh*.5,R(cL,.2),.8)}
v+=Pa('M'+bx+' '+(by+bh*.4)+' Q'+(bx-bw*.3)+' '+(by+bh*.7)+' '+(bx-bw*.5)+' '+(by+bh*.85),0,bd,1.5,SL);
}else if(bt===8){v+=E(bx,by,bw*.4,bh*.45,br);
for(i=0;i<6;i++){a=(i*60+15+id*7)*P/180;var l=bw*rf(.6,.95),ex=bx+Co(a)*l,ey=by+Si(a)*l*.7;
v+=Pa('M'+(bx+Co(a)*bw*.3)+' '+(by+Si(a)*bh*.35)+' Q'+(bx+Co(a+.3)*l*.6)+' '+(by+Si(a+.3)*l*.5)+' '+ex.toFixed(1)+' '+ey.toFixed(1),0,bd,rf(1.8,3),SL)}
}else if(bt===9){v+=Ci(bx,by,bw*.3,br,'opacity=".7"')+Ci(bx,by,bw*.45,R(c,.08),'filter="url(#'+g('gl')+')"');
for(i=0;i<ri(5,8);i++){a=rr()*P*2;l=bw*rf(.5,1);v+=Pa('M'+bx+' '+by+' Q'+(bx+Co(a)*l*.5+ri(-5,5))+' '+(by+Si(a)*l*.4+ri(-5,5))+' '+(bx+Co(a)*l).toFixed(1)+' '+(by+Si(a)*l*.7).toFixed(1),0,R(c,rf(.12,.3)),rf(.6,2),SL)}
}else if(bt===10){v+=E(bx-bw*.25,by+bh*.1,bw*.35,bh*.3,bd,'transform="rotate(-15 '+(bx-bw*.25)+' '+(by+bh*.1)+')"');
v+=E(bx+bw*.1,by-bh*.05,bw*.22,bh*.2,br)+Li(bx-bw*.05,by+bh*.05,bx+bw*.05,by-bh*.02,c,2);
for(i=0;i<6;i++){lx=bx-bw*.1+(i%3)*bw*.15;s=i<3?-1:1;v+=Pa('M'+lx+' '+(by+bh*.1)+' L'+(lx+bw*.3*s)+' '+(by-bh*.1)+' L'+(lx+bw*.45*s)+' '+(by+bh*.5),0,R(c,.5),.8,SL)}
}else if(bt===11){var sp='M'+bx+' '+by;for(t=0;t<4.5;t+=.15){r=bw*.08*t;a=t*1.8+id*.5;sp+=' L'+(bx+Co(a)*r).toFixed(1)+' '+(by+Si(a)*r*.8).toFixed(1)}
v+=Pa(sp,0,bd,rf(3,5),SL)+Pa(sp,0,R(cL,.2),rf(1,2),SL)+E(bx+bw*.5,by+bh*.1,bw*.2,bh*.25,br);
}else if(bt===12){v+=Pa('M'+(bx-bw*.15)+' '+(by+bh*.6)+' L'+(bx-bw*.22)+' '+(by-bh*.7)+' Q'+bx+' '+(by-bh*.85)+' '+(bx+bw*.22)+' '+(by-bh*.7)+' L'+(bx+bw*.15)+' '+(by+bh*.6)+' Z',bd);
for(i=0;i<5;i++){var ry=by-bh*.5+i*bh*.25;v+=Pa('M'+(bx-bw*.18)+' '+ry+' Q'+bx+' '+(ry+2)+' '+(bx+bw*.18)+' '+ry,0,R(cL,.12),.5)}
}else if(bt===13){v+=Pa('M'+bx+' '+(by-bh*.15)+' Q'+(bx+bw*.9)+' '+(by-bh*.5)+' '+(bx+bw)+' '+(by+bh*.1)+' Q'+(bx+bw*.5)+' '+(by+bh*.3)+' '+bx+' '+(by+bh*.2)+' Q'+(bx-bw*.5)+' '+(by+bh*.3)+' '+(bx-bw)+' '+(by+bh*.1)+' Q'+(bx-bw*.9)+' '+(by-bh*.5)+' '+bx+' '+(by-bh*.15),br);
v+=Pa('M'+bx+' '+(by+bh*.2)+' Q'+(bx+bw*.1)+' '+(by+bh*.6)+' '+(bx-bw*.05)+' '+(by+bh*.95),0,bd,1.5,SL);
for(i=0;i<ri(4,6);i++)v+=Ci(bx+ri(-bw*.5,bw*.5),by+ri(-bh*.15,bh*.12),rf(1,3),R(cL,rf(.08,.18)));
}else{var ur=bw*.5;v+=Ci(bx,by,ur,br);
for(a=0;a<360;a+=ri(14,22)){r=a*P/180;l=ur+ri(4,12);v+=Li(bx+Co(r)*ur*.8,by+Si(r)*ur*.8,bx+Co(r)*l,by+Si(r)*l,R(c,rf(.3,.55)),rf(.5,1.2))}
v+=Ci(bx-ur*.2,by-ur*.25,ur*.25,R(cL,.2));
}
var hx=bx,hy=by,hr=sz*.22;
if(bt===0){hx=bx+bw*.9;hy=by+Si(P*2.5+id*.7)*bh*.55}else if(bt<=2||bt===6||bt===12){hy=by-bh*.55}else if(bt===5||bt===13){hx=bx+bw*.5;hy=by-bh*.15}else if(bt===7){hy=by-bh*.35}else{hx=bx+ri(-3,3);hy=by-bh*.35}
if(ht===0){v+=Pa('M'+(hx-hr)+' '+(hy+hr*.3)+' Q'+(hx-hr*1.1)+' '+(hy-hr*.6)+' '+hx+' '+(hy-hr*.8)+' Q'+(hx+hr*1.1)+' '+(hy-hr*.6)+' '+(hx+hr)+' '+(hy+hr*.3)+' Q'+(hx+hr*.4)+' '+(hy+hr*.5)+' '+hx+' '+(hy+hr*.4)+' Q'+(hx-hr*.4)+' '+(hy+hr*.5)+' '+(hx-hr)+' '+(hy+hr*.3),br);
for(s=-1;s<=1;s+=2)v+=Pa('M'+(hx+hr*.6*s)+' '+(hy-hr*.5)+' Q'+(hx+hr*1.2*s)+' '+(hy-hr*1.6)+' '+(hx+hr*.8*s)+' '+(hy-hr*1.9),0,cL,1.5,SL);
}else if(ht===1){v+=E(hx,hy,hr*1.1,hr*.8,br)+Pa('M'+(hx+hr*.8)+' '+(hy-hr*.15)+' L'+(hx+hr*1.6)+' '+(hy-hr*.25)+' L'+(hx+hr*1.5)+' '+(hy+hr*.15)+' L'+(hx+hr*.8)+' '+(hy+hr*.1),R(c,.6));
}else if(ht===2){v+=E(hx,hy,hr*.8,hr*.7,br);for(s=-1;s<=1;s+=2)v+=Pa('M'+(hx+hr*.5*s)+' '+(hy+hr*.3)+' Q'+(hx+hr*s)+' '+(hy+hr*.6)+' '+(hx+hr*.7*s)+' '+(hy+hr*1.1),0,cD,1.5,SL);
}else if(ht===3){v+=Pa('M'+(hx-hr*.9)+' '+(hy+hr*.2)+' Q'+(hx-hr*.95)+' '+(hy-hr*1.2)+' '+hx+' '+(hy-hr*1.3)+' Q'+(hx+hr*.95)+' '+(hy-hr*1.2)+' '+(hx+hr*.9)+' '+(hy+hr*.2)+' Z',br)+E(hx-hr*.15,hy-hr*.7,hr*.3,hr*.2,R(cL,.2));
}else if(ht===4){v+=Pa('M'+(hx-hr*.7)+' '+(hy+hr*.3)+' L'+(hx-hr*.5)+' '+(hy-hr*.4)+' L'+hx+' '+(hy-hr*1.2)+' L'+(hx+hr*.5)+' '+(hy-hr*.4)+' L'+(hx+hr*.7)+' '+(hy+hr*.3)+' Z',br);
}else if(ht===5){v+=E(hx,hy,hr*.85,hr,br)+Pa('M'+(hx-hr*.4)+' '+(hy+hr*.1)+' Q'+hx+' '+(hy+hr*.3)+' '+(hx+hr*.4)+' '+(hy+hr*.1),0,R(cD,.2),.6);
}else if(ht===6){v+=Pa('M'+(hx-hr)+' '+(hy+hr*.2)+' Q'+(hx-hr*.8)+' '+(hy-hr*.8)+' '+hx+' '+(hy-hr*.9)+' Q'+(hx+hr*.8)+' '+(hy-hr*.8)+' '+(hx+hr)+' '+(hy+hr*.2)+' Q'+hx+' '+(hy+hr*.5)+' '+(hx-hr)+' '+(hy+hr*.2),br);
}else if(ht===7){v+=E(hx,hy-hr*.2,hr*.8,hr*.7,br)+Pa('M'+(hx+hr*.5)+' '+(hy-hr*.1)+' L'+(hx+hr*1.4)+' '+(hy+hr*.1)+' L'+(hx+hr*.5)+' '+(hy+hr*.25),R(cDD,.7));
}else if(ht===8){v+=E(hx,hy-hr*.3,hr*.85,hr*.65,br);for(s=-1;s<=1;s+=2)v+=Pa('M'+(hx+hr*.4*s)+' '+(hy+hr*.1)+' Q'+(hx+hr*.6*s)+' '+(hy+hr*.7)+' '+(hx+hr*.3*s)+' '+(hy+hr*.9),R(c,.5));
}else{v+=E(hx,hy-hr*.2,hr*.8,hr*.7,br);for(i=0;i<ri(4,6);i++){var tx=hx+ri(-hr*.5,hr*.5);v+=Pa('M'+tx+' '+(hy+hr*.2)+' Q'+(tx+ri(-4,4))+' '+(hy+hr*.2+ri(4,8))+' '+(tx+ri(-6,6))+' '+(hy+hr*.2+ri(8,14)),0,R(c,rf(.2,.4)),rf(.6,1.3),SL)}}
if(et===0){for(s=-1;s<=1;s+=2){ex=hx+hr*.35*s;ey=hy-hr*.15;v+=Ci(ex,ey,hr*.22,R(cL,.85))+Ci(ex+s*.5,ey,hr*.13,'#0a0a12')+Ci(ex+s*.8,ey-.6,hr*.06,'#fff','opacity=".9"')}
}else if(et===1){v+=Ci(hx,hy-hr*.1,hr*.32,R(cL,.85))+Ci(hx,hy-hr*.1,hr*.2,'#0a0a12')+Ci(hx+1,hy-hr*.15,hr*.08,'#fff','opacity=".9"');
}else if(et===2){for(s=-1;s<=1;s+=2){ex=hx+hr*.45*s;ey=hy-hr*.15;v+=E(ex,ey,hr*.28,hr*.22,R(cL,.7));for(var f=0;f<4;f++){a=f*90*P/180;v+=Ci(ex+Co(a)*hr*.1,ey+Si(a)*hr*.08,hr*.06,R(cDD,.3))}}
}else if(et===3){for(s=-1;s<=1;s+=2){ex=hx+hr*.3*s;ey=hy-hr*.1;v+=E(ex,ey,hr*.18,hr*.06,cL)+E(ex,ey,hr*.25,hr*.1,R(cL,.3),'filter="url(#'+g('g2')+')"')}
}else if(et===4){for(i=0;i<ri(5,8);i++){ex=hx+ri(-hr*.7,hr*.7);ey=hy+ri(-hr*.6,hr*.3);var er=rf(.8,2.2);v+=Ci(ex,ey,er,R(cL,.75))+Ci(ex,ey,er*.6,'#0a0a12')+Ci(ex+.3,ey-.3,er*.2,'#fff','opacity=".8"')}
}else if(et===5){for(s=-1;s<=1;s+=2)v+=E(hx+hr*.3*s,hy,hr*.08,hr*.12,R(cDD,.4));
}else if(et===6){for(s=-1;s<=1;s+=2){ex=hx+hr*.7*s;ey=hy-hr*.8;v+=Pa('M'+(hx+hr*.2*s)+' '+(hy-hr*.3)+' Q'+(hx+hr*.5*s)+' '+(hy-hr*.6)+' '+ex+' '+ey,0,c,1.5)+Ci(ex,ey,hr*.2,R(cL,.85))+Ci(ex,ey,hr*.12,'#0a0a12')+Ci(ex+s*.5,ey-.5,hr*.05,'#fff','opacity=".9"')}
}else{for(s=-1;s<=1;s+=2){ex=hx+hr*.3*s;ey=hy-hr*.05;v+=Ci(ex,ey,hr*.18,R(cL,.8))+Ci(ex+s*.3,ey,hr*.1,'#0a0a12')}
v+=Ci(hx,hy-hr*.55,hr*.22,cL,'opacity=".7" filter="url(#'+g('g2')+')"')+Ci(hx,hy-hr*.55,hr*.14,'#0a0a12');
}
if(at===0){for(s=-1;s<=1;s+=2){var ax=bx+bw*.5*s,ay=by-bh*.05;v+=Pa('M'+(bx+bw*.25*s)+' '+ay+' Q'+(ax+3*s)+' '+(ay-5)+' '+ax+' '+(ay-3),0,bd,3,SL)+Pa('M'+ax+' '+(ay-3)+' Q'+(ax+5*s)+' '+(ay-12)+' '+(ax+2*s)+' '+(ay-15),bd,cD,.5)+Pa('M'+ax+' '+(ay-3)+' Q'+(ax+7*s)+' '+(ay-7)+' '+(ax+4*s)+' '+(ay-13),br,cD,.5)}
}else if(at===1){for(i=0;i<ri(4,6);i++){var sx=bx+ri(-bw*.3,bw*.3),sy=by+bh*.3,tp='M'+sx+' '+sy,ty=sy;for(s=0;s<ri(3,5);s++){ty+=ri(5,9);tp+=' Q'+(sx+ri(-7,7))+' '+(ty-ri(2,4))+' '+(sx+ri(-4,4))+' '+ty}v+=Pa(tp,0,R(c,rf(.2,.4)),rf(.8,2),SL)}
}else if(at===2){for(s=-1;s<=1;s+=2)v+=Pa('M'+(bx+bw*.15*s)+' '+(by-bh*.2)+' Q'+(bx+bw*.55*s)+' '+(by-bh*.55)+' '+(bx+bw*.7*s)+' '+(by-bh*.15)+' Q'+(bx+bw*.45*s)+' '+(by+bh*.05)+' '+(bx+bw*.15*s)+' '+by,R(c,.2),R(cL,.2),.4);
}else if(at===3){v+=Pa('M'+(bx-bw*.1)+' '+(by-bh*.3)+' L'+bx+' '+(by-bh*.7)+' L'+(bx+bw*.15)+' '+(by-bh*.25),R(c,.35));
for(s=-1;s<=1;s+=2)v+=Pa('M'+(bx+bw*.2*s)+' '+(by+bh*.15)+' Q'+(bx+bw*.5*s)+' '+(by+bh*.4)+' '+(bx+bw*.35*s)+' '+(by+bh*.55),R(c,.25));
}else if(at===4){v+=Pa('M'+(bx-bw*.3)+' '+(by+bh*.25)+' Q'+(bx-bw*.65)+' '+(by+bh*.5)+' '+(bx-bw*.8)+' '+(by+bh*.15)+' Q'+(bx-bw*.9)+' '+(by-bh*.1)+' '+(bx-bw*.75)+' '+(by-bh*.35),0,bd,2,SL);
v+=Pa('M'+(bx-bw*.75)+' '+(by-bh*.35)+' L'+(bx-bw*.85)+' '+(by-bh*.55)+' L'+(bx-bw*.7)+' '+(by-bh*.4),R(cL,.5));
}else if(at===5){for(i=0;i<ri(5,7);i++){lx=bx-bw*.4+i*bw*.16;s=i%2===0?1:-1;v+=Pa('M'+lx+' '+(by+bh*.3)+' L'+(lx+3*s)+' '+(by+bh*.5)+' L'+(lx+s)+' '+(by+bh*.75),0,R(c,.45),1,SL)}
}else if(at===6){for(i=0;i<ri(3,5);i++){var ox=bx+ri(-bw*.6,bw*.6),oy=by+ri(-bh*.5,-bh*.2),or=rf(1.5,3.5);v+=Ci(ox,oy,or,R(cL,.4),'filter="url(#'+g('g2')+')"')+Ci(ox,oy,or*.5,R(cL,.7))}
}else if(at===7){for(i=0;i<ri(4,7);i++){var wx=bx+ri(-bw*.5,bw*.5),wy=by+ri(-bh*.3,bh*.4);v+=Pa('M'+wx+' '+wy+' Q'+(wx+ri(-8,8))+' '+(wy-ri(5,12))+' '+(wx+ri(-5,5))+' '+(wy-ri(10,20)),0,R(cL,rf(.1,.25)),rf(.4,1),SL)}
}else if(at===8){for(s=-1;s<=1;s+=2)v+=Pa('M'+(bx+bw*.25*s)+' '+(by-bh*.1)+' L'+(bx+bw*.7*s)+' '+(by-bh*.5)+' L'+(bx+bw*.85*s)+' '+(by-bh*.35)+' L'+(bx+bw*.3*s)+' '+(by+bh*.05)+' Z',R(c,.35),R(cL,.25),.5);
}else if(at===9){for(s=-1;s<=1;s+=2){v+=Pa('M'+(hx+hr*.3*s)+' '+(hy-hr*.5)+' Q'+(hx+hr*1.5*s)+' '+(hy-hr*2)+' '+(hx+hr*2*s)+' '+(hy-hr*2.2),0,R(c,.4),.8,SL)+Ci(hx+hr*2*s,hy-hr*2.2,1.2,R(cL,.5))}
}else if(at===10){for(i=-2;i<=2;i++){tx=bx-bw*.6+i*2;v+=E(tx,by+bh*.2+Math.abs(i)*1.5,3,6+ri(0,3),bd,'opacity=".4" transform="rotate('+i*15+' '+tx+' '+(by+bh*.2)+')"')}
}else{for(s=-1;s<=1;s+=2)for(i=0;i<ri(2,3);i++){sx=bx+bw*(.2+i*.12)*s;sy=by-bh*(.2+i*.1);v+=Pa('M'+sx+' '+sy+' L'+(sx+3*s)+' '+(sy-ri(6,11))+' L'+(sx+s)+' '+sy,R(c,.4))}}
if(tt===0){for(i=0;i<ri(6,10);i++){x=bx+ri(-bw*.4,bw*.4);var y=by+ri(-bh*.3,bh*.3);v+=E(x,y,1.8,1.2,R(cL,rf(.06,.14)),'transform="rotate('+ri(-15,15)+' '+x+' '+y+')"')}
}else if(tt===2){for(i=0;i<ri(3,5);i++){x=bx+ri(-bw*.3,bw*.3);y=by+ri(-bh*.2,bh*.2);v+='<rect x="'+(x-3)+'" y="'+(y-2)+'" width="6" height="4" rx="1" fill="'+R(cL,rf(.06,.12))+'" transform="rotate('+ri(-20,20)+' '+x+' '+y+')"/>'}
}else if(tt===3){for(i=0;i<ri(10,16);i++){x=bx+ri(-bw*.4,bw*.4);y=by+ri(-bh*.3,bh*.3);v+=Li(x,y,x+ri(-2,2),y-ri(2,5),R(c,rf(.1,.25)),.5)}
}else if(tt===4){for(i=0;i<ri(3,5);i++){x=bx+ri(-bw*.3,bw*.3);y=by+ri(-bh*.2,bh*.2);s=ri(3,6);v+='<polygon points="'+x+','+(y-s)+' '+(x+s*.7)+','+y+' '+x+','+(y+s*.5)+' '+(x-s*.7)+','+y+'" fill="'+R(cL,rf(.05,.12))+'"/>'}
}else if(tt===5){v+=E(bx,by,bw*.5,bh*.4,R(cL,.06),'filter="url(#'+g('gl')+')"')
}else if(tt===6){for(i=0;i<ri(3,5);i++){x=bx+ri(-bw*.3,bw*.3);y=by+ri(-bh*.1,bh*.3);v+=Pa('M'+x+' '+y+' Q'+(x+ri(-3,3))+' '+(y-ri(3,7))+' '+(x+ri(-2,2))+' '+(y-ri(6,12)),0,R(c,rf(.15,.3)),rf(.8,1.5),SL)}
}else if(tt===7){for(i=0;i<ri(4,6);i++){x=bx+ri(-bw*.4,bw*.4);y=by+ri(-bh*.3,bh*.1);v+=Pa('M'+(x-2)+' '+y+' Q'+x+' '+(y-ri(5,10))+' '+(x+2)+' '+y,R(cL,rf(.08,.18)))}}
if(fa<4){if(fa===0){for(i=0;i<ri(3,5);i++){x=bx+ri(-bw*.5,bw*.5);y=by+ri(-bh*.4,bh*.3);v+='<circle cx="'+x+'" cy="'+y+'" r="'+rf(.6,1.8)+'" fill="'+cL+'" opacity="'+rf(.2,.5)+'"><animate attributeName="opacity" values="'+rf(.15,.3)+';'+rf(.4,.7)+';'+rf(.15,.3)+'" dur="'+rf(1.5,3)+'s" repeatCount="indefinite"/></circle>'}
}else if(fa===1){for(i=0;i<ri(2,4);i++){x=bx+ri(-bw*.3,bw*.3);y=by+ri(-bh*.2,bh*.2);v+=Pa('M'+x+' '+y+' L'+(x+ri(-3,3))+' '+(y+ri(-4,4))+' L'+(x+ri(-3,3))+' '+(y+ri(-4,4)),0,R(cL,rf(.15,.3)),.6)}
}else if(fa===2){for(i=0;i<ri(4,7);i++){x=ri(5,115);y=ri(5,90);v+='<rect x="'+x+'" y="'+y+'" width="'+rf(.8,2)+'" height="'+rf(.8,2)+'" fill="'+R(cL,rf(.08,.2))+'" transform="rotate('+ri(0,45)+' '+x+' '+y+')"/>'}
}else{for(i=0;i<ri(3,5);i++){x=bx+ri(-bw*.4,bw*.4);y=by-bh*.3-ri(0,5);v+=Pa('M'+(x-2)+' '+y+' Q'+x+' '+(y-ri(5,10))+' '+(x+2)+' '+y,R(cL,rf(.08,.18)))}}}
if(fb>=4){if(fb===4){for(i=0;i<ri(2,3);i++){var ap='M'+(bx+ri(-bw*.3,bw*.3))+' '+(by+ri(-bh*.3,bh*.1));for(s=0;s<3;s++)ap+=' L'+(bx+ri(-bw*.5,bw*.5))+' '+(by+ri(-bh*.5,bh*.3));v+=Pa(ap,0,R(cL,rf(.15,.35)),.5)}
}else if(fb===5){for(i=0;i<ri(3,5);i++){var dx=bx+ri(-bw*.3,bw*.3),dy=by+bh*.3;v+=Li(dx,dy,dx+ri(-1,1),dy+ri(5,12),R(c,rf(.15,.3)),rf(.6,1.2))+Ci(dx+ri(-1,1),dy+ri(7,14),rf(.5,1.2),R(c,rf(.15,.3)))}
}else if(fb===6){v+=E(hx,hy-hr*1.2,hr*.9,hr*.25,'none','stroke="'+R(cL,.3)+'" stroke-width="1"')+E(hx,hy-hr*1.2,hr*1.1,hr*.3,'none','stroke="'+R(cL,.15)+'" stroke-width=".5" filter="url(#'+g('g2')+')"');
}else{for(i=0;i<ri(2,4);i++){x=bx+ri(-bw*.25,bw*.25);y=by+ri(-bh*.15,bh*.15);v+=Pa('M'+x+' '+y+' Q'+(x+ri(3,6))+' '+(y-ri(2,5))+' '+(x+ri(1,3))+' '+(y-ri(4,8)),0,R(cL,.15),.8,SL)}}}
for(i=0;i<ri(4,7);i++)v+='<circle cx="'+ri(5,115)+'" cy="'+ri(5,90)+'" r="'+rf(.3,.8)+'" fill="'+R(cL,rf(.1,.25))+'"><animate attributeName="cy" values="'+ri(10,80)+';'+ri(5,70)+';'+ri(10,80)+'" dur="'+rf(3,6)+'s" repeatCount="indefinite"/></circle>';
for(i=0;i<ri(3,5);i++){var bx2=ri(5,115),by2=ri(15,75),br2=rf(.8,2);v+=Ci(bx2,by2,br2,R(cL,.04),'stroke="'+R(cL,rf(.08,.15))+'" stroke-width=".4"')+Ci(bx2-br2*.2,by2-br2*.3,br2*.2,R('#ffffff',.3))}
}else if(card.type==='spell'){
var sx=ri(50,66),sy=ri(38,50);
defs+='<radialGradient id="'+g('sp')+'" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="'+cL+'" stop-opacity=".6"/><stop offset="50%" stop-color="'+c+'" stop-opacity=".3"/><stop offset="100%" stop-color="'+cD+'" stop-opacity="0"/></radialGradient>';
var ce=id%20,be=((id*7+3)>>>0)%8,ae=((id*13+5)>>>0)%6,sp2='url(#'+g('sp')+')',cr=ri(12,18);
if(be===0){for(a=0;a<360;a+=ri(12,22)){r=a*P/180;l=ri(28,42);v+=Li(sx,sy,sx+Co(r)*l,sy+Si(r)*l,R(cL,rf(.06,.15)),rf(.3,1))}
}else if(be===1){var sp3='M'+sx+' '+sy;for(t=0;t<6;t+=.12){r=t*5.5;sp3+=' L'+(sx+Co(t*2)*r).toFixed(1)+' '+(sy+Si(t*2)*r).toFixed(1)}v+=Pa(sp3,0,R(c,.2),.8);
}else if(be===2){for(i=0;i<ri(5,8);i++){a=rr()*P*2;d=ri(35,50);v+=Pa('M'+(sx+Co(a)*d).toFixed(1)+' '+(sy+Si(a)*d).toFixed(1)+' Q'+(sx+Co(a+.5)*d*.4).toFixed(1)+' '+(sy+Si(a+.5)*d*.4).toFixed(1)+' '+sx+' '+sy,0,R(c,rf(.1,.2)),rf(.5,1.2))}
}else if(be===3){for(i=1;i<=4;i++)v+=Ci(sx,sy,i*9,'none','stroke="'+R(c,.25-i*.04)+'" stroke-width="'+(1.5-i*.2)+'" stroke-dasharray="'+(2+i)+' '+(1+i)+'"');
}else if(be===4){for(i=0;i<ri(12,18);i++){dx=ri(5,115);dy=ri(5,85);v+=Li(dx,dy,dx+ri(-1,1),dy+ri(3,7),R(c,rf(.08,.2)),.5)}
}else if(be===5){for(i=0;i<ri(4,6);i++){sx2=sx+ri(-20,20);v+=Pa('M'+sx2+' '+(sy+ri(15,30))+' Q'+(sx2+ri(-10,10))+' '+(sy+ri(-5,10))+' '+(sx2+ri(-8,8))+' '+(sy-ri(10,25)),0,R(c,rf(.06,.15)),rf(1,3),SL)}
}else if(be===6){for(i=0;i<ri(6,9);i++){var rx=ri(10,110),ry2=ri(10,90),sh=['M0,-3 L2,0 L0,3 L-2,0 Z','M-2,-2 L2,-2 L2,2 L-2,2 Z','M0,-3 L3,2 L-3,2 Z'][i%3];v+=Pa(sh,0,R(cL,rf(.1,.25)),.5,'transform="translate('+rx+','+ry2+') rotate('+ri(0,45)+')"')}
}else{for(i=0;i<3;i++){r=12+i*10;for(a=0;a<6;a++){var a1=(a*60+i*15)*P/180,a2=((a+1)*60+i*15)*P/180;v+=Li((sx+Co(a1)*r).toFixed(1),(sy+Si(a1)*r).toFixed(1),(sx+Co(a2)*r).toFixed(1),(sy+Si(a2)*r).toFixed(1),R(c,.12-i*.02),.5)}}}
if(ce===0){v+='<polygon points="'+sx+','+(sy-cr)+' '+(sx+cr*.4)+','+(sy-cr*.3)+' '+(sx+cr*.35)+','+(sy+cr*.5)+' '+(sx-cr*.35)+','+(sy+cr*.5)+' '+(sx-cr*.4)+','+(sy-cr*.3)+'" fill="'+sp2+'" stroke="'+R(cL,.4)+'" stroke-width=".8"/>'+Li(sx,sy-cr,sx,sy+cr*.5,R(cL,.2),.4);
}else if(ce===1){v+=Ci(sx,sy,cr,sp2,'stroke="'+R(cL,.3)+'" stroke-width=".8"')+Ci(sx-cr*.2,sy-cr*.25,cr*.3,R(cL,.2))+Ci(sx,sy,cr*.5,R(cL,.08),'filter="url(#'+g('g2')+')"');
}else if(ce===2){v+=Pa('M'+sx+' '+(sy+cr)+' Q'+(sx-cr*.6)+' '+sy+' '+(sx-cr*.3)+' '+(sy-cr*.5)+' Q'+(sx-cr*.1)+' '+(sy-cr*.2)+' '+sx+' '+(sy-cr)+' Q'+(sx+cr*.1)+' '+(sy-cr*.2)+' '+(sx+cr*.3)+' '+(sy-cr*.5)+' Q'+(sx+cr*.6)+' '+sy+' '+sx+' '+(sy+cr),sp2)+Pa('M'+sx+' '+(sy+cr*.5)+' Q'+(sx-cr*.2)+' '+sy+' '+sx+' '+(sy-cr*.5)+' Q'+(sx+cr*.2)+' '+sy+' '+sx+' '+(sy+cr*.5),R(cL,.25));
}else if(ce===3){v+=Ci(sx,sy,cr,'none','stroke="'+R(cL,.35)+'" stroke-width="1.5"')+Ci(sx,sy,cr-4,'none','stroke="'+R(c,.2)+'" stroke-width=".6" stroke-dasharray="3 2"');
for(a=0;a<360;a+=45){r=a*P/180;v+=Ci(sx+Co(r)*cr,sy+Si(r)*cr,1.5,cL,'opacity="'+rf(.3,.6)+'"')}v+=Ci(sx,sy,3,cL,'opacity=".5" filter="url(#'+g('g2')+')"');
}else if(ce===4){v+='<rect x="'+(sx-cr*.6)+'" y="'+(sy-cr*.7)+'" width="'+(cr*1.2)+'" height="'+(cr*1.4)+'" rx="1" fill="'+R(cD,.5)+'" stroke="'+R(cL,.3)+'" stroke-width=".8"/>'+Li(sx-cr*.6,sy-cr*.7,sx-cr*.6,sy+cr*.7,R(cL,.3),1.5);
for(i=1;i<=4;i++)v+=Li(sx-cr*.4,sy-cr*.5+i*cr*.25,sx+cr*.4,sy-cr*.5+i*cr*.25,R(cL,.1),.4);v+=Ci(sx,sy,cr*.25,cL,'opacity=".4" filter="url(#'+g('g2')+')"');
}else if(ce===5){v+=Pa('M'+(sx-cr*.3)+' '+(sy-cr*.2)+' L'+(sx-cr*.4)+' '+(sy+cr*.6)+' Q'+sx+' '+(sy+cr*.8)+' '+(sx+cr*.4)+' '+(sy+cr*.6)+' L'+(sx+cr*.3)+' '+(sy-cr*.2),R(c,.3),R(cL,.3),.6);
v+='<rect x="'+(sx-cr*.15)+'" y="'+(sy-cr*.55)+'" width="'+(cr*.3)+'" height="'+(cr*.4)+'" fill="'+R(cD,.4)+'" stroke="'+R(cL,.2)+'" stroke-width=".5"/>'+E(sx,sy+cr*.3,cr*.3,cr*.2,cL,'opacity=".3" filter="url(#'+g('g2')+')"');
}else if(ce===6){v+=Pa('M'+(sx-cr)+' '+sy+' Q'+sx+' '+(sy-cr*.8)+' '+(sx+cr)+' '+sy+' Q'+sx+' '+(sy+cr*.8)+' '+(sx-cr)+' '+sy,R(c,.2),R(cL,.35),.8)+Ci(sx,sy,cr*.35,R(cL,.6))+Ci(sx,sy,cr*.2,'#0a0a12')+Ci(sx+1,sy-1,cr*.07,'#fff','opacity=".9"');
}else if(ce===7){var sP='';for(i=0;i<10;i++){a=(i*36-90)*P/180;r=i%2===0?cr:cr*.4;sP+=(i===0?'M':'L')+(sx+Co(a)*r).toFixed(1)+' '+(sy+Si(a)*r).toFixed(1)}
v+=Pa(sP+' Z',sp2,R(cL,.35),.6)+Ci(sx,sy,cr*.2,cL,'opacity=".5" filter="url(#'+g('g2')+')"');
}else if(ce===8){v+=Ci(sx,sy,cr,R(c,.25),'stroke="'+R(cL,.3)+'" stroke-width=".6"')+Ci(sx+cr*.3,sy-cr*.15,cr*.75,'url(#'+g('bg')+')')+Ci(sx-cr*.15,sy-cr*.1,cr*.12,cL,'opacity=".4" filter="url(#'+g('g2')+')"');
}else if(ce===9){for(i=0;i<5;i++){r=5+i*(cr*.22);v+='<circle cx="'+sx+'" cy="'+sy+'" r="'+r+'" stroke="'+R(c,.3-i*.04)+'" fill="none" stroke-width="'+(2-i*.25)+'" stroke-dasharray="'+(3+i*2)+' '+(2+i)+'"><animateTransform attributeName="transform" type="rotate" from="'+(i%2?360:0)+' '+sx+' '+sy+'" to="'+(i%2?0:360)+' '+sx+' '+sy+'" dur="'+(2+i*.4)+'s" repeatCount="indefinite"/></circle>'}v+=Ci(sx,sy,3,R(cDD,.5));
}else if(ce===10){v+=Li(sx,sy+cr,sx,sy-cr,R(cL,.6),2)+Pa('M'+(sx-1.5)+' '+(sy-cr)+' L'+sx+' '+(sy-cr-4)+' L'+(sx+1.5)+' '+(sy-cr),R(cL,.5))+Li(sx-cr*.4,sy+cr*.3,sx+cr*.4,sy+cr*.3,R(cL,.5),1.5)+Ci(sx,sy+cr+2,2,R(c,.4));
}else if(ce===11){v+=Pa('M'+sx+' '+(sy-cr)+' L'+(sx+cr*.8)+' '+(sy-cr*.4)+' L'+(sx+cr*.7)+' '+(sy+cr*.4)+' L'+sx+' '+(sy+cr)+' L'+(sx-cr*.7)+' '+(sy+cr*.4)+' L'+(sx-cr*.8)+' '+(sy-cr*.4)+' Z',R(c,.25),R(cL,.35),1)+Ci(sx,sy,cr*.15,cL,'opacity=".4"');
}else if(ce===12){v+=Ci(sx,sy,cr,'none','stroke="'+R(cL,.35)+'" fill="'+R(c,.1)+'" stroke-width="1.2"');
for(a=0;a<360;a+=30){r=a*P/180;v+=Li(sx+Co(r)*cr*.8,sy+Si(r)*cr*.8,sx+Co(r)*cr*.95,sy+Si(r)*cr*.95,R(cL,.35),.6)}
v+=Li(sx,sy,sx+cr*.4,sy-cr*.5,R(cL,.6),1)+Li(sx,sy,sx-cr*.15,sy+cr*.6,R(cL,.4),.7)+Ci(sx,sy,1.5,cL,'opacity=".6"');
}else if(ce===13){v+=Li(sx-cr*.3,sy,sx+cr*.7,sy,R(cL,.5),1.5)+Ci(sx-cr*.3,sy,cr*.35,'none','stroke="'+R(cL,.4)+'" stroke-width="1.2"')+Li(sx+cr*.4,sy,sx+cr*.4,sy+cr*.2,R(cL,.4),1)+Li(sx+cr*.6,sy,sx+cr*.6,sy+cr*.15,R(cL,.4),1);
}else if(ce===14){v+=Li(sx,sy+cr,sx,sy-cr*.2,R(cD,.5),2.5);for(i=0;i<3;i++){ty=sy-cr*.1-i*cr*.35;tw=cr*(.7-i*.15);v+=Pa('M'+(sx-tw)+' '+(ty+cr*.2)+' Q'+sx+' '+(ty-cr*.3)+' '+(sx+tw)+' '+(ty+cr*.2),R(c,.25-i*.05))}
}else if(ce===15){v+=E(sx,sy+cr*.15,cr*.4,cr*.35,R(c,.2),'stroke="'+R(cL,.15)+'" stroke-width=".5"');
v+=Pa('M'+(sx-cr*.35)+' '+(sy+cr*.5)+' L'+(sx-cr*.3)+' '+(sy-cr*.1)+' L'+(sx-cr*.15)+' '+(sy-cr*.7)+' M'+(sx-cr*.05)+' '+(sy-cr*.15)+' L'+(sx-cr*.05)+' '+(sy-cr*.85)+' M'+(sx+cr*.05)+' '+(sy-cr*.15)+' L'+(sx+cr*.05)+' '+(sy-cr*.9)+' M'+(sx+cr*.2)+' '+(sy-cr*.1)+' L'+(sx+cr*.2)+' '+(sy-cr*.75),0,R(cL,.4),1.5,SL);
v+=Ci(sx,sy+cr*.1,cr*.15,cL,'opacity=".3" filter="url(#'+g('g2')+')"');
}else if(ce===16){v+=E(sx,sy,cr*.6,cr*.85,R(cL,.1),'stroke="'+R(cL,.35)+'" stroke-width="1.2"')+E(sx,sy,cr*.7,cr*.95,'none','stroke="'+R(c,.25)+'" stroke-width="2"')+E(sx-cr*.15,sy-cr*.2,cr*.15,cr*.3,R(cL,.15));
}else if(ce===17){for(i=0;i<3;i++){wy=sy-cr*.3+i*cr*.35;v+=Pa('M'+(sx-cr)+' '+wy+' Q'+(sx-cr*.5)+' '+(wy-cr*.3)+' '+sx+' '+wy+' Q'+(sx+cr*.5)+' '+(wy+cr*.3)+' '+(sx+cr)+' '+wy,0,R(c,.3-i*.06),1.5-i*.3)}
for(i=0;i<ri(3,5);i++)v+=Ci(sx+ri(-cr,cr),sy+ri(-cr*.5,cr*.3),rf(.4,1),R(cL,rf(.15,.3)));
}else if(ce===18){v+=Pa('M'+(sx-cr*.7)+' '+(sy+cr*.3)+' L'+(sx-cr*.6)+' '+(sy-cr*.3)+' L'+(sx-cr*.25)+' '+sy+' L'+sx+' '+(sy-cr*.6)+' L'+(sx+cr*.25)+' '+sy+' L'+(sx+cr*.6)+' '+(sy-cr*.3)+' L'+(sx+cr*.7)+' '+(sy+cr*.3)+' Z',R(c,.3),R(cL,.4),.8);
v+=Ci(sx,sy-cr*.6,2,cL,'opacity=".6"')+'<rect x="'+(sx-cr*.7)+'" y="'+(sy+cr*.2)+'" width="'+(cr*1.4)+'" height="'+(cr*.15)+'" fill="'+R(cL,.15)+'"/>';
}else{v+=Pa('M'+(sx-cr*.5)+' '+(sy+cr*.1)+' Q'+(sx-cr*.55)+' '+(sy-cr*.6)+' '+sx+' '+(sy-cr*.7)+' Q'+(sx+cr*.55)+' '+(sy-cr*.6)+' '+(sx+cr*.5)+' '+(sy+cr*.1)+' Q'+(sx+cr*.3)+' '+(sy+cr*.4)+' '+sx+' '+(sy+cr*.35)+' Q'+(sx-cr*.3)+' '+(sy+cr*.4)+' '+(sx-cr*.5)+' '+(sy+cr*.1),R(c,.25),R(cL,.3),.7);
for(s=-1;s<=1;s+=2){v+=E(sx+cr*.2*s,sy-cr*.15,cr*.15,cr*.12,R(cDD,.5))+Ci(sx+cr*.2*s,sy-cr*.15,cr*.06,cL,'opacity=".5" filter="url(#'+g('g2')+')"')}
v+=Pa('M'+(sx-cr*.25)+' '+(sy+cr*.2)+' Q'+sx+' '+(sy+cr*.35)+' '+(sx+cr*.25)+' '+(sy+cr*.2),0,R(cDD,.2),.5);}
if(ae===0){for(i=0;i<ri(5,8);i++){a=rr()*P*2;d=ri(cr+5,cr+15);v+=Ci((sx+Co(a)*d).toFixed(1),(sy+Si(a)*d).toFixed(1),rf(.5,1.5),cL,'opacity="'+rf(.2,.5)+'"')}
}else if(ae===1){for(i=0;i<ri(3,5);i++){wx=sx+ri(-cr,cr);wy=sy+ri(-cr,cr);v+=Pa('M'+wx+' '+wy+' Q'+(wx+ri(-6,6))+' '+(wy-ri(4,10))+' '+(wx+ri(-4,4))+' '+(wy-ri(8,16)),0,R(cL,rf(.08,.2)),rf(.4,1),SL)}
}else if(ae===2){var cn=[[8,8],[112,8],[8,92],[112,92]];for(i=0;i<4;i++)v+=Pa('M'+(cn[i][0]-3)+' '+cn[i][1]+' L'+cn[i][0]+' '+(cn[i][1]-3)+' L'+(cn[i][0]+3)+' '+cn[i][1]+' L'+cn[i][0]+' '+(cn[i][1]+3)+' Z',0,R(cL,rf(.12,.25)),.5);
}else if(ae===3){for(i=0;i<ri(2,4);i++){a1=rr()*P*2;a2=a1+rf(.5,1.5);var d1=cr+ri(5,15),d2=cr+ri(5,15);v+=Pa('M'+(sx+Co(a1)*d1).toFixed(1)+' '+(sy+Si(a1)*d1).toFixed(1)+' Q'+(sx+ri(-5,5))+' '+(sy+ri(-5,5))+' '+(sx+Co(a2)*d2).toFixed(1)+' '+(sy+Si(a2)*d2).toFixed(1),0,R(cL,rf(.15,.3)),.6)}
}else if(ae===4){for(i=0;i<ri(3,5);i++){var cx=sx+ri(-25,25),cy=sy+ri(-20,20),cs=ri(2,4);v+='<polygon points="'+cx+','+(cy-cs)+' '+(cx+cs*.5)+','+cy+' '+cx+','+(cy+cs*.4)+' '+(cx-cs*.5)+','+cy+'" fill="'+R(cL,rf(.1,.25))+'"/>'}
}else{for(i=0;i<ri(5,9);i++)v+=Ci(ri(8,112),ri(8,92),rf(.3,.8),cL,'opacity="'+rf(.2,.5)+'"')}
}else if(card.type==='trap'){
var tx=ri(50,66),ty=ri(38,50),dt=id%16,wt=((id*7+3)>>>0)%6,at2=((id*11+7)>>>0)%4,tr=ri(14,20);
defs+='<radialGradient id="'+g('tp')+'" cx="50%" cy="50%" r="55%"><stop offset="0%" stop-color="'+cL+'" stop-opacity=".5"/><stop offset="50%" stop-color="'+c+'" stop-opacity=".2"/><stop offset="100%" stop-color="'+cD+'" stop-opacity="0"/></radialGradient>';
if(at2===0){defs+='<radialGradient id="'+g('vi')+'" cx="50%" cy="50%" r="50%"><stop offset="40%" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity=".4"/></radialGradient>';v+='<rect width="120" height="100" fill="url(#'+g('vi')+')"/>'}
else if(at2===1){for(i=0;i<ri(3,5);i++)v+=E(ri(20,100),ri(40,85),ri(20,40),ri(3,8),R(c,rf(.04,.1)))}
else if(at2===2){for(i=0;i<ri(8,14);i++)v+=Ci(ri(5,115),ri(5,95),rf(.3,.7),cL,'opacity="'+rf(.2,.5)+'"')}
else{for(i=0;i<ri(3,5);i++){sx=ri(0,120);sy=ri(50,95);v+=Li(sx,sy,sx+ri(-15,15),sy+ri(5,15),R('#000000',rf(.08,.18)),rf(1,3))}}
if(dt===0){v+='<rect x="'+(tx-tr)+'" y="'+(ty-tr)+'" width="'+(tr*2)+'" height="'+(tr*2)+'" fill="none" stroke="'+R(cL,.3)+'" stroke-width="1"/>';
for(i=0;i<6;i++)v+=Li(tx-tr+i*tr*.4,ty-tr,tx-tr+i*tr*.4,ty+tr,R(cL,.25),.8);v+=Pa('M'+(tx-tr*.5)+' '+(ty-tr)+' Q'+tx+' '+(ty-tr-8)+' '+(tx+tr*.5)+' '+(ty-tr),0,R(c,.3),.8);
}else if(dt===1){for(i=0;i<5;i++){v+=Li(tx-tr+i*tr*.5,ty-tr,tx-tr+i*tr*.5+tr*.25,ty+tr,R(c,.2),.5)+Li(tx-tr,ty-tr+i*tr*.5,tx+tr,ty-tr+i*tr*.5+tr*.15,R(c,.2),.5)}
}else if(dt===2){v+=Pa('M'+(tx-tr)+' '+ty+' L'+(tx-tr*.7)+' '+(ty+tr*1.2)+' L'+(tx+tr*.7)+' '+(ty+tr*1.2)+' L'+(tx+tr)+' '+ty,R(cDD,.4),R(cD,.3),.6);
for(i=0;i<4;i++){var spx=tx-tr*.4+i*tr*.28;v+=Pa('M'+(spx-1.5)+' '+(ty+tr*1.2)+' L'+spx+' '+(ty+tr*.7)+' L'+(spx+1.5)+' '+(ty+tr*1.2),R(cL,.25))}
}else if(dt===3){for(i=0;i<ri(3,5);i++){cx=tx+ri(-tr,tr);cy=ty-tr;var cp='M'+cx+' '+cy;for(s=0;s<ri(4,7);s++)cp+=' Q'+(cx+ri(-4,4))+' '+(cy+s*5+2)+' '+(cx+ri(-2,2))+' '+(cy+s*5+5);v+=Pa(cp,0,R(c,rf(.2,.35)),rf(.8,1.5),SL)}
}else if(dt===4){v+=Pa('M'+(tx-tr)+' '+(ty+tr*.3)+' L'+tx+' '+(ty+tr)+' L'+(tx+tr)+' '+(ty+tr*.3),0,R(cL,.35),1.5)+Pa('M'+(tx-tr)+' '+(ty-tr*.3)+' L'+tx+' '+(ty-tr)+' L'+(tx+tr)+' '+(ty-tr*.3),0,R(cL,.35),1.5);
for(i=0;i<5;i++){var px=tx-tr*.7+i*tr*.35;v+=Pa('M'+px+' '+(ty+tr*.3-i*.5)+' L'+(px+1)+' '+(ty+1)+' L'+(px+2)+' '+(ty+tr*.3-i*.5),R(cL,.3))+Pa('M'+px+' '+(ty-tr*.3+i*.5)+' L'+(px+1)+' '+(ty-1)+' L'+(px+2)+' '+(ty-tr*.3+i*.5),R(cL,.3))}
}else if(dt===5){v+=E(tx,ty,tr*.65,tr*.85,R(cL,.08),'stroke="'+R(cL,.35)+'" stroke-width="1.5"')+E(tx,ty,tr*.75,tr*.95,'none','stroke="'+R(c,.2)+'" stroke-width="2.5"')+E(tx-tr*.15,ty-tr*.15,tr*.12,tr*.3,R(cL,.15),'transform="rotate(-15 '+tx+' '+ty+')"');
}else if(dt===6){v+=Ci(tx,ty,tr,'none','stroke="'+R(cL,.3)+'" stroke-width="1.2"')+Ci(tx,ty,tr-4,'none','stroke="'+R(c,.2)+'" stroke-width=".6" stroke-dasharray="2 2"');
for(a=0;a<360;a+=60){r=a*P/180;v+='<circle cx="'+(tx+Co(r)*(tr-2)).toFixed(1)+'" cy="'+(ty+Si(r)*(tr-2)).toFixed(1)+'" r="1.5" fill="'+cL+'" opacity="'+rf(.3,.5)+'"><animate attributeName="opacity" values=".2;.6;.2" dur="'+rf(1.5,3)+'s" repeatCount="indefinite"/></circle>'}
v+=Li(tx-tr+4,ty,tx+tr-4,ty,R(cL,.15),.5)+Li(tx,ty-tr+4,tx,ty+tr-4,R(cL,.15),.5);
}else if(dt===7){for(i=0;i<ri(6,10);i++){a=rr()*P*2;d=ri(5,tr);ox=tx+Co(a)*d;oy=ty+Si(a)*d;var tl=ri(4,9);
v+=Li(ox.toFixed(1),oy.toFixed(1),(ox+Co(a)*tl).toFixed(1),(oy+Si(a)*tl).toFixed(1),R(c,rf(.25,.45)),rf(.6,1.2));
v+=Pa('M'+(ox+Co(a)*tl*.5).toFixed(1)+' '+(oy+Si(a)*tl*.5).toFixed(1)+' L'+(ox+Co(a+.6)*tl*.4).toFixed(1)+' '+(oy+Si(a+.6)*tl*.4).toFixed(1),0,R(c,rf(.15,.3)),.5)}
}else if(dt===8){for(a=0;a<360;a+=40){r=a*P/180;v+=Li(tx,ty,(tx+Co(r)*tr*1.2).toFixed(1),(ty+Si(r)*tr*1.2).toFixed(1),R(c,.15),.4)}
for(r=4;r<tr*1.1;r+=4)v+=Ci(tx,ty,r,'none','stroke="'+R(c,.1)+'" stroke-width=".3"');
for(i=0;i<ri(3,5);i++){a=rr()*P*2;d=ri(5,tr);v+=Ci((tx+Co(a)*d).toFixed(1),(ty+Si(a)*d).toFixed(1),rf(.5,1.2),R(cL,rf(.2,.4)))}
}else if(dt===9){v+=Pa('M'+(tx-tr)+' '+ty+' Q'+tx+' '+(ty-tr*.7)+' '+(tx+tr)+' '+ty+' Q'+tx+' '+(ty+tr*.7)+' '+(tx-tr)+' '+ty,R(c,.15),R(cL,.3),.8)+Ci(tx,ty,tr*.35,R(cL,.5))+Ci(tx,ty,tr*.2,'#0a0a12')+Ci(tx+1,ty-1,tr*.06,'#fff','opacity=".9"');
for(i=0;i<3;i++){a=(rr()*60+150+i*40)*P/180;v+=Li(tx,ty,(tx+Co(a)*tr*1.5).toFixed(1),(ty+Si(a)*tr*1.5).toFixed(1),R(cL,rf(.06,.12)),'.4" stroke-dasharray="2 3')}
}else if(dt===10){v+='<rect x="'+(tx-tr*.25)+'" y="'+(ty-tr)+'" width="'+(tr*.5)+'" height="'+(tr*2)+'" rx="2" fill="'+R(c,.3)+'" stroke="'+R(cL,.2)+'" stroke-width=".6"/>';
for(i=0;i<3;i++){var fy=ty-tr*.6+i*tr*.65;for(s=-1;s<=1;s+=2)v+=Ci(tx+tr*.08*s,fy,1.5,cL,'opacity="'+rf(.3,.5)+'"');
v+=Pa('M'+(tx-tr*.1)+' '+(fy+3)+' Q'+tx+' '+(fy+5)+' '+(tx+tr*.1)+' '+(fy+3),0,R(cL,.2),.5)}
}else if(dt===11){v+=Ci(tx,ty,tr*.6,R(cD,.4),'stroke="'+R(cL,.3)+'" stroke-width="1"');
for(a=0;a<360;a+=45){r=a*P/180;v+=Li(tx+Co(r)*tr*.55,ty+Si(r)*tr*.55,tx+Co(r)*tr*.85,ty+Si(r)*tr*.85,R(cL,.3),1.5)+Ci(tx+Co(r)*tr*.85,ty+Si(r)*tr*.85,1.5,R(cL,.35))}
v+=Ci(tx,ty,tr*.15,cL,'opacity=".4" filter="url(#'+g('g2')+')"');
}else if(dt===12){for(i=0;i<4;i++){bx2=tx-tr+i*tr*.7;v+='<rect x="'+bx2+'" y="'+(ty-tr*.8)+'" width="'+(tr*.15)+'" height="'+(tr*1.6)+'" fill="'+R(c,.25)+'" stroke="'+R(cL,.2)+'" stroke-width=".4"/>'}
for(i=0;i<3;i++){bx2=tx-tr+i*tr*.7+tr*.15;v+=Pa('M'+bx2+' '+(ty-tr*.4)+' Q'+(bx2+tr*.35)+' '+ty+' '+bx2+' '+(ty+tr*.4),0,R(cL,rf(.1,.2)),.5)}
}else if(dt===13){v+=Li(tx,ty-tr*1.2,tx,ty-tr*.3,R(c,.3),1)+Li(tx,ty-tr*.3,tx+tr*.5,ty+tr*.6,R(cL,.35),.8);
v+=Pa('M'+(tx+tr*.2)+' '+(ty+tr*.3)+' L'+(tx+tr*.5)+' '+(ty+tr*.6)+' L'+(tx+tr*.8)+' '+(ty+tr*.3)+' Q'+(tx+tr*.5)+' '+(ty+tr*.9)+' '+(tx+tr*.2)+' '+(ty+tr*.3),R(cL,.3))+Ci(tx,ty-tr*.3,2,R(c,.4));
}else if(dt===14){for(i=0;i<4;i++){r=5+i*(tr*.28);v+=E(tx,ty+tr*.2,r*1.3,r*.4,'none','stroke="'+R(c,.25-i*.04)+'" stroke-width="'+(1.2-i*.2)+'" stroke-dasharray="'+(3+i*2)+' '+(2+i)+'"')}
v+=Pa('M'+(tx-3)+' '+(ty-tr*.1)+' L'+tx+' '+(ty-tr*.4)+' L'+(tx+3)+' '+(ty-tr*.1),R(cL,.2));
for(i=0;i<ri(3,4);i++)v+=Ci(tx+ri(-tr*.5,tr*.5),ty+ri(0,tr*.4),rf(.5,1.5),R(cL,.1),'stroke="'+R(cL,.15)+'" stroke-width=".3"');
}else{for(i=0;i<5;i++){r=4+i*(tr*.25);v+='<circle cx="'+tx+'" cy="'+ty+'" r="'+r+'" stroke="'+R(c,.3-i*.04)+'" fill="none" stroke-width="'+(1.5-i*.2)+'" stroke-dasharray="'+(2+i*2)+' '+(1+i)+'"><animateTransform attributeName="transform" type="rotate" from="'+(i%2?360:0)+' '+tx+' '+ty+'" to="'+(i%2?0:360)+' '+tx+' '+ty+'" dur="'+(1.5+i*.3)+'s" repeatCount="indefinite"/></circle>'}v+=Ci(tx,ty,3,R(cDD,.5))}
if(wt===0){for(i=0;i<ri(2,3);i++){wx=tx+ri(-tr*1.2,tr*1.2);wy=ty+ri(-tr*.8,tr*.8);v+=Pa('M'+(wx-2)+' '+(wy-2)+' L'+(wx+2)+' '+(wy+2)+' M'+(wx+2)+' '+(wy-2)+' L'+(wx-2)+' '+(wy+2),0,R(cL,rf(.15,.3)),.7)}
}else if(wt===1){v+='<rect x="2" y="2" width="116" height="96" fill="none" stroke="'+R(cL,.08)+'" stroke-width="1.5" rx="2"/>'
}else if(wt===2){for(i=0;i<ri(1,2);i++){sx=tx+ri(-tr*1.3,tr*1.3);sy=ty+ri(-tr,tr);v+=Ci(sx,sy,3,R(c,.15))+Ci(sx-1,sy-.5,.6,R(cDD,.4))+Ci(sx+1,sy-.5,.6,R(cDD,.4))}
}else if(wt===3){for(i=0;i<ri(1,2);i++){ex=tx+ri(-tr*1.2,tr*1.2);ey=ty+ri(-tr,tr);v+=Li(ex,ey-3,ex,ey+1,R(cL,.3),1)+Ci(ex,ey+3,.6,R(cL,.3))}
}else if(wt===4){for(i=0;i<ri(3,5);i++){rx=tx+ri(-tr*1.2,tr*1.2);ry=ty+ri(-tr,tr);v+=Pa('M'+(rx-2)+' '+ry+' L'+rx+' '+(ry-3)+' L'+(rx+2)+' '+ry+' L'+rx+' '+(ry+3)+' Z',0,R(cL,rf(.1,.22)),.4)}
}else{for(i=0;i<ri(2,3);i++){cx=tx+ri(-tr,tr);cy=ty+ri(-tr,tr);cp='M'+cx+' '+cy;for(s=0;s<ri(2,3);s++)cp+=' L'+(cx+ri(-6,6))+' '+(cy+ri(-6,6));v+=Pa(cp,0,R(cL,rf(.08,.18)),.5)}}}
return'<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg"><defs>'+defs+'</defs><g clip-path="url(#'+g('vp')+')">'+v+'</g></svg>'}

`;

const newHtml = before + newFunction + after;
fs.writeFileSync(filePath, newHtml, 'utf8');
const stats = fs.statSync(filePath);
console.log('File written successfully!');
console.log('New file size: ' + stats.size + ' bytes (' + (stats.size / 1024).toFixed(1) + ' KB)');
console.log('Under 500KB limit: ' + (stats.size < 512000 ? 'YES' : 'NO'));
const fnStart = newHtml.indexOf('function getCardArtSVG(card)');
const fnEndMarker = '// ============================================================\n// CARD HTML RENDERING';
const fnEnd = newHtml.indexOf(fnEndMarker, fnStart);
const fnSize = fnEnd - fnStart;
console.log('Art function size: ' + fnSize + ' bytes (' + (fnSize / 1024).toFixed(1) + ' KB)');
console.log('Under 35KB limit: ' + (fnSize < 35840 ? 'YES' : 'NO'));
