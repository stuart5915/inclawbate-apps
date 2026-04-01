const fs = require('fs');
const file = 'apps/claw-wars.html';
let html = fs.readFileSync(file, 'utf8');

const startMarker = '// ============================================================\n// CARD ART SVG GENERATION';
const endMarker = '\n// ============================================================\n// CARD HTML RENDERING';

const startIdx = html.indexOf(startMarker);
const endIdx = html.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) { console.log('Markers not found!', startIdx, endIdx); process.exit(1); }

const newCode = `// ============================================================
// CARD ART — PROCEDURAL HIGH-FANTASY ILLUSTRATION ENGINE
// ============================================================
// Color utilities
function _hexRgb(h){const r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16);return[r,g,b];}
function _rgbHex(r,g,b){return'#'+[r,g,b].map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join('');}
function _lit(h,f){const[r,g,b]=_hexRgb(h);return _rgbHex(r+(255-r)*f,g+(255-g)*f,b+(255-b)*f);}
function _drk(h,f){const[r,g,b]=_hexRgb(h);return _rgbHex(r*(1-f),g*(1-f),b*(1-f));}
function _rgba(h,a){const[r,g,b]=_hexRgb(h);return'rgba('+r+','+g+','+b+','+a+')';}

function getCardArtSVG(card) {
    const bg = card.art?.bg || ['#1a1a2e','#0d0d18'];
    const c = card.art?.color || '#5080a0';
    const id = card.id;
    const attr = card.attribute || '';
    const lv = card.level || 0;
    const cL = _lit(c, 0.35), cD = _drk(c, 0.4), cDD = _drk(c, 0.65);
    const bgL = _lit(bg[0], 0.12), bgD = _drk(bg[1], 0.3);

    // Seeded PRNG
    let _s = (id * 2654435761) >>> 0;
    const rr = () => { _s = (_s * 1664525 + 1013904223) >>> 0; return _s / 4294967296; };
    const ri = (a,b) => a + Math.floor(rr()*(b-a+1));
    const rf = (a,b) => +(a + rr()*(b-a)).toFixed(2);
    const rp = () => rf(0,1); // 0-1

    // Unique ID prefix
    const g = n => n + id;

    // Common defs
    let defs = \`<radialGradient id="\${g('bg')}" cx="\${ri(35,55)}%" cy="\${ri(30,48)}%" r="\${ri(55,75)}%"><stop offset="0%" stop-color="\${bg[0]}"/><stop offset="70%" stop-color="\${bg[1]}"/><stop offset="100%" stop-color="\${bgD}"/></radialGradient>\`;
    defs += \`<filter id="\${g('gl')}"><feGaussianBlur stdDeviation="4" result="b"/><feComposite in="b" in2="b" operator="arithmetic" k1="0" k2="1.5" k3="0" k4="0"/></filter>\`;
    defs += \`<filter id="\${g('gl2')}"><feGaussianBlur stdDeviation="2"/></filter>\`;
    defs += \`<filter id="\${g('gl3')}"><feGaussianBlur stdDeviation="6" result="b"/><feComposite in="b" in2="b" operator="arithmetic" k1="0" k2="2" k3="0" k4="0"/></filter>\`;
    defs += \`<filter id="\${g('sh')}"><feGaussianBlur stdDeviation="1.5"/></filter>\`;
    defs += \`<clipPath id="\${g('vp')}"><rect width="120" height="100"/></clipPath>\`;

    let svg = '';

    // Atmospheric background layers
    svg += \`<rect width="120" height="100" fill="url(#\${g('bg')})"/>\`;
    // Light rays
    for (let i = 0; i < ri(2,4); i++) {
        const rx = ri(5,90), rw = ri(4,10);
        svg += \`<polygon points="\${rx},0 \${rx+rw},0 \${rx+rw*3},100 \${rx-rw},100" fill="\${_rgba(cL,rf(0.03,0.07))}"/>\`;
    }
    // Depth fog
    svg += \`<rect width="120" height="35" y="65" fill="url(#\${g('fog')})" opacity="0.4"/>\`;
    defs += \`<linearGradient id="\${g('fog')}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="\${bgD}" stop-opacity="0"/><stop offset="100%" stop-color="\${bgD}" stop-opacity="0.6"/></linearGradient>\`;

    // Caustic light ripples
    for (let i = 0; i < ri(2,4); i++) {
        svg += \`<path d="M\${ri(0,40)} \${ri(3,15)} Q\${ri(30,60)} \${ri(0,12)} \${ri(60,120)} \${ri(3,15)}" stroke="\${_rgba(cL,rf(0.04,0.1))}" fill="none" stroke-width="\${rf(0.8,1.5)}" stroke-linecap="round"/>\`;
    }

    if (card.type === 'monster') {
        const mx = ri(50,66), my = ri(38,50);
        const sz = Math.min(12 + lv * 2.5 + ri(0,3), 30);
        const template = (id * 3 + ri(0,2)) % 10;

        // Body gradient
        defs += \`<linearGradient id="\${g('bd')}" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0%" stop-color="\${cL}"/><stop offset="40%" stop-color="\${c}"/><stop offset="100%" stop-color="\${cD}"/></linearGradient>\`;
        defs += \`<radialGradient id="\${g('br')}" cx="40%" cy="30%" r="65%"><stop offset="0%" stop-color="\${cL}"/><stop offset="100%" stop-color="\${cD}"/></radialGradient>\`;

        // Shadow on ground
        svg += \`<ellipse cx="\${mx}" cy="\${my+sz*0.8+5}" rx="\${sz*1.2}" ry="\${sz*0.2}" fill="\${_rgba('#000',0.2)}" filter="url(#\${g('sh')})"/>\`;

        // Aura glow behind creature
        svg += \`<ellipse cx="\${mx}" cy="\${my}" rx="\${sz*1.3}" ry="\${sz*1.1}" fill="\${_rgba(c,0.12)}" filter="url(#\${g('gl3')})"/>\`;

        switch(template) {
        case 0: { // LOBSTER — segmented body, big claws, fan tail, stalk eyes
            // Tail fan
            for (let i = -2; i <= 2; i++) {
                svg += \`<ellipse cx="\${mx-sz*0.9+i*3}" cy="\${my+sz*0.3+Math.abs(i)*2}" rx="5" ry="\${8+ri(0,3)}" fill="url(#\${g('bd')})" opacity="0.5" transform="rotate(\${i*12} \${mx-sz*0.9+i*3} \${my+sz*0.3})"/>\`;
            }
            // Body segments
            for (let i = 3; i >= 0; i--) {
                const sx = mx - sz*0.4 + i * sz*0.35, sy = my + ri(-1,1);
                const srx = sz*0.32 - i*0.8, sry = sz*0.45 - i*1.2;
                svg += \`<ellipse cx="\${sx}" cy="\${sy}" rx="\${srx}" ry="\${sry}" fill="url(#\${g('br')})" opacity="\${0.7-i*0.05}"/>\`;
                // Segment line
                if (i > 0) svg += \`<ellipse cx="\${sx-srx*0.5}" cy="\${sy}" rx="0.5" ry="\${sry*0.7}" fill="\${_rgba(cDD,0.3)}"/>\`;
            }
            // Claws
            const clawY = my - sz*0.15;
            for (let side = -1; side <= 1; side += 2) {
                const cx = mx + sz*0.7*side, armX = mx + sz*0.35*side;
                // Arm
                svg += \`<path d="M\${armX} \${clawY} Q\${armX+8*side} \${clawY-8} \${cx} \${clawY-5}" stroke="url(#\${g('bd')})" fill="none" stroke-width="4" stroke-linecap="round"/>\`;
                // Claw pincers
                svg += \`<path d="M\${cx} \${clawY-5} Q\${cx+6*side} \${clawY-14} \${cx+2*side} \${clawY-18}" fill="url(#\${g('bd')})" stroke="\${cD}" stroke-width="0.5"/>\`;
                svg += \`<path d="M\${cx} \${clawY-5} Q\${cx+8*side} \${clawY-8} \${cx+5*side} \${clawY-16}" fill="url(#\${g('br')})" stroke="\${cD}" stroke-width="0.5"/>\`;
                // Claw highlight
                svg += \`<path d="M\${cx+2*side} \${clawY-12} Q\${cx+4*side} \${clawY-15} \${cx+2*side} \${clawY-17}" stroke="\${_rgba(cL,0.5)}" fill="none" stroke-width="0.6"/>\`;
            }
            // Stalk eyes
            for (let side = -1; side <= 1; side += 2) {
                const ex = mx + 6*side, ey = my - sz*0.5;
                svg += \`<line x1="\${mx+3*side}" y1="\${my-sz*0.3}" x2="\${ex}" y2="\${ey}" stroke="\${c}" stroke-width="1.8"/>\`;
                svg += \`<circle cx="\${ex}" cy="\${ey}" r="3" fill="\${cL}"/>\`;
                svg += \`<circle cx="\${ex}" cy="\${ey}" r="2" fill="#111"/>\`;
                svg += \`<circle cx="\${ex+0.8*side}" cy="\${ey-0.8}" r="0.8" fill="#fff" opacity="0.85"/>\`;
            }
            // Antennae
            svg += \`<path d="M\${mx+4} \${my-sz*0.35} Q\${mx+18} \${my-sz*0.9} \${mx+25} \${my-sz}" stroke="\${c}" fill="none" stroke-width="0.8" opacity="0.6"/>\`;
            svg += \`<path d="M\${mx-4} \${my-sz*0.35} Q\${mx-18} \${my-sz*0.9} \${mx-25} \${my-sz}" stroke="\${c}" fill="none" stroke-width="0.8" opacity="0.6"/>\`;
            // Walking legs
            for (let i = 0; i < 4; i++) {
                const lx = mx - sz*0.25 + i*sz*0.22;
                svg += \`<path d="M\${lx} \${my+sz*0.35} L\${lx+ri(-3,-1)} \${my+sz*0.55} L\${lx+ri(-5,-2)} \${my+sz*0.8}" stroke="\${cD}" fill="none" stroke-width="1.2" stroke-linecap="round"/>\`;
            }
            // Shell texture highlights
            svg += \`<ellipse cx="\${mx+2}" cy="\${my-4}" rx="\${sz*0.15}" ry="\${sz*0.08}" fill="\${_rgba(cL,0.2)}"/>\`;
            svg += \`<ellipse cx="\${mx-3}" cy="\${my+2}" rx="\${sz*0.12}" ry="\${sz*0.06}" fill="\${_rgba(cL,0.15)}"/>\`;
            break;
        }
        case 1: { // SEA SERPENT — long sinuous body, fins, dragon head
            // Body path — thick S-curve
            const pts = [];
            for (let t = 0; t <= 1; t += 0.05) {
                const px = mx - sz*1.2 + t * sz*2.8;
                const py = my + Math.sin(t * Math.PI * 2.5 + id) * sz*0.5;
                pts.push([px, py]);
            }
            // Thick body stroke with gradient
            const pathD = 'M' + pts.map(p => p[0]+' '+p[1]).join(' L');
            svg += \`<path d="\${pathD}" stroke="\${cD}" fill="none" stroke-width="\${6+lv*0.5}" stroke-linecap="round" opacity="0.7"/>\`;
            svg += \`<path d="\${pathD}" stroke="url(#\${g('bd')})" fill="none" stroke-width="\${4+lv*0.4}" stroke-linecap="round"/>\`;
            svg += \`<path d="\${pathD}" stroke="\${_rgba(cL,0.25)}" fill="none" stroke-width="\${2+lv*0.2}" stroke-linecap="round"/>\`;
            // Dorsal fins
            for (let i = 2; i < pts.length-3; i += 3) {
                const [fx,fy] = pts[i];
                svg += \`<path d="M\${fx-2} \${fy} L\${fx} \${fy-ri(6,10)} L\${fx+3} \${fy}" fill="\${_rgba(c,0.4)}" stroke="\${_rgba(cL,0.2)}" stroke-width="0.5"/>\`;
            }
            // Head
            const [hx,hy] = pts[pts.length-1];
            svg += \`<ellipse cx="\${hx}" cy="\${hy}" rx="7" ry="5" fill="url(#\${g('br')})"/>\`;
            svg += \`<path d="M\${hx+5} \${hy-1} L\${hx+11} \${hy-2} L\${hx+9} \${hy+1} Z" fill="\${c}" opacity="0.7"/>\`; // jaw
            // Horns
            svg += \`<path d="M\${hx-1} \${hy-4} Q\${hx-4} \${hy-12} \${hx-2} \${hy-14}" stroke="\${cL}" fill="none" stroke-width="1.2"/>\`;
            svg += \`<path d="M\${hx+2} \${hy-4} Q\${hx+5} \${hy-12} \${hx+3} \${hy-14}" stroke="\${cL}" fill="none" stroke-width="1.2"/>\`;
            // Eye
            svg += \`<circle cx="\${hx+3}" cy="\${hy-1.5}" r="2.2" fill="\${_rgba(cL,0.9)}"/>\`;
            svg += \`<circle cx="\${hx+3}" cy="\${hy-1.5}" r="1.2" fill="#111"/>\`;
            svg += \`<circle cx="\${hx+3.5}" cy="\${hy-2}" r="0.6" fill="#fff" opacity="0.9"/>\`;
            // Tail fin
            const [tx,ty] = pts[0];
            svg += \`<path d="M\${tx} \${ty} Q\${tx-8} \${ty-8} \${tx-12} \${ty-3} Q\${tx-6} \${ty} \${tx-12} \${ty+3} Q\${tx-8} \${ty+8} \${tx} \${ty}" fill="\${_rgba(c,0.4)}"/>\`;
            // Scale pattern
            for (let i = 4; i < pts.length-4; i += 2) {
                svg += \`<ellipse cx="\${pts[i][0]}" cy="\${pts[i][1]}" rx="1.5" ry="1" fill="\${_rgba(cL,0.12)}" transform="rotate(\${ri(-10,10)} \${pts[i][0]} \${pts[i][1]})"/>\`;
            }
            break;
        }
        case 2: { // JELLYFISH — translucent dome, bioluminescent, long tentacles
            const jx = mx, jy = my - 5;
            const jr = sz * 0.9;
            // Outer glow
            svg += \`<circle cx="\${jx}" cy="\${jy}" r="\${jr*1.3}" fill="\${_rgba(c,0.08)}" filter="url(#\${g('gl')})"/>\`;
            // Bell dome
            defs += \`<radialGradient id="\${g('jl')}" cx="40%" cy="30%" r="60%"><stop offset="0%" stop-color="\${_rgba(cL,0.5)}"/><stop offset="50%" stop-color="\${_rgba(c,0.3)}"/><stop offset="100%" stop-color="\${_rgba(cD,0.15)}"/></radialGradient>\`;
            svg += \`<path d="M\${jx-jr} \${jy+2} Q\${jx-jr} \${jy-jr*1.1} \${jx} \${jy-jr} Q\${jx+jr} \${jy-jr*1.1} \${jx+jr} \${jy+2} Q\${jx+jr*0.5} \${jy+6} \${jx} \${jy+4} Q\${jx-jr*0.5} \${jy+6} \${jx-jr} \${jy+2}" fill="url(#\${g('jl')})" stroke="\${_rgba(cL,0.3)}" stroke-width="0.8"/>\`;
            // Inner organs
            svg += \`<ellipse cx="\${jx}" cy="\${jy-jr*0.2}" rx="\${jr*0.35}" ry="\${jr*0.25}" fill="\${_rgba(cL,0.25)}"/>\`;
            svg += \`<circle cx="\${jx-jr*0.15}" cy="\${jy-jr*0.3}" r="\${jr*0.1}" fill="\${_rgba(cL,0.35)}"/>\`;
            // Frilly rim
            for (let a = -80; a <= 80; a += ri(10,15)) {
                const rad = (a+90) * Math.PI / 180;
                const rx = jx + Math.cos(rad) * jr * 0.95;
                const ry = jy + 3 + Math.sin(rad) * 4;
                svg += \`<path d="M\${rx} \${ry} Q\${rx+ri(-2,2)} \${ry+ri(3,6)} \${rx+ri(-3,3)} \${ry+ri(1,3)}" stroke="\${_rgba(c,rf(0.15,0.35))}" fill="none" stroke-width="0.8"/>\`;
            }
            // Tentacles
            for (let i = 0; i < ri(8,12); i++) {
                const tx = jx - jr*0.7 + i * jr*0.16 + rf(-2,2);
                let tPath = \`M\${tx} \${jy+5}\`;
                let ty2 = jy + 5;
                for (let s = 0; s < ri(4,7); s++) {
                    ty2 += ri(6,10);
                    tPath += \` Q\${tx+ri(-8,8)} \${ty2-ri(2,5)} \${tx+ri(-4,4)} \${ty2}\`;
                }
                svg += \`<path d="\${tPath}" stroke="\${_rgba(c,rf(0.12,0.3))}" fill="none" stroke-width="\${rf(0.4,1.2)}" stroke-linecap="round"/>\`;
            }
            // Bioluminescent spots
            for (let i = 0; i < ri(5,8); i++) {
                const sx = jx + ri(-jr*0.6, jr*0.6), sy = jy + ri(-jr*0.5, jr*0.3);
                svg += \`<circle cx="\${sx}" cy="\${sy}" r="\${rf(0.5,1.5)}" fill="\${cL}" opacity="\${rf(0.3,0.6)}"><animate attributeName="opacity" values="\${rf(0.2,0.4)};\${rf(0.5,0.8)};\${rf(0.2,0.4)}" dur="\${rf(1.5,3)}s" repeatCount="indefinite"/></circle>\`;
            }
            break;
        }
        case 3: { // ARMORED WARRIOR — humanoid, shell armor, trident/weapon
            const wx = mx, wy = my;
            const ws = sz * 0.7;
            // Armor gradient
            defs += \`<linearGradient id="\${g('arm')}" x1="0" y1="0" x2="0.5" y2="1"><stop offset="0%" stop-color="\${cL}"/><stop offset="50%" stop-color="\${c}"/><stop offset="100%" stop-color="\${cDD}"/></linearGradient>\`;
            // Legs
            svg += \`<path d="M\${wx-ws*0.2} \${wy+ws*0.5} L\${wx-ws*0.35} \${wy+ws*1.3}" stroke="url(#\${g('arm')})" stroke-width="3.5" stroke-linecap="round"/>\`;
            svg += \`<path d="M\${wx+ws*0.2} \${wy+ws*0.5} L\${wx+ws*0.3} \${wy+ws*1.3}" stroke="url(#\${g('arm')})" stroke-width="3.5" stroke-linecap="round"/>\`;
            // Torso
            svg += \`<path d="M\${wx-ws*0.45} \${wy-ws*0.25} L\${wx-ws*0.55} \${wy+ws*0.55} L\${wx+ws*0.55} \${wy+ws*0.55} L\${wx+ws*0.45} \${wy-ws*0.25} Z" fill="url(#\${g('arm')})" stroke="\${_rgba(cL,0.2)}" stroke-width="0.5"/>\`;
            // Chest plate detail
            svg += \`<path d="M\${wx-ws*0.2} \${wy-ws*0.1} L\${wx} \${wy+ws*0.15} L\${wx+ws*0.2} \${wy-ws*0.1}" fill="none" stroke="\${_rgba(cL,0.3)}" stroke-width="0.8"/>\`;
            // Shoulder pauldrons
            svg += \`<ellipse cx="\${wx-ws*0.5}" cy="\${wy-ws*0.2}" rx="\${ws*0.22}" ry="\${ws*0.15}" fill="url(#\${g('br')})"/>\`;
            svg += \`<ellipse cx="\${wx+ws*0.5}" cy="\${wy-ws*0.2}" rx="\${ws*0.22}" ry="\${ws*0.15}" fill="url(#\${g('br')})"/>\`;
            // Arms
            svg += \`<path d="M\${wx-ws*0.5} \${wy-ws*0.1} Q\${wx-ws*0.8} \${wy+ws*0.2} \${wx-ws*0.9} \${wy-ws*0.2}" stroke="url(#\${g('bd')})" fill="none" stroke-width="3" stroke-linecap="round"/>\`;
            svg += \`<path d="M\${wx+ws*0.5} \${wy-ws*0.1} Q\${wx+ws*0.85} \${wy-ws*0.1} \${wx+ws*0.9} \${wy-ws*0.7}" stroke="url(#\${g('bd')})" fill="none" stroke-width="3" stroke-linecap="round"/>\`;
            // Weapon (trident)
            svg += \`<line x1="\${wx+ws*0.9}" y1="\${wy-ws*0.7}" x2="\${wx+ws*0.95}" y2="\${wy-ws*1.5}" stroke="\${_rgba(cL,0.7)}" stroke-width="1.5"/>\`;
            svg += \`<path d="M\${wx+ws*0.85} \${wy-ws*1.5} L\${wx+ws*0.95} \${wy-ws*1.75} L\${wx+ws*1.05} \${wy-ws*1.5}" fill="none" stroke="\${cL}" stroke-width="1.2"/>\`;
            svg += \`<line x1="\${wx+ws*0.95}" y1="\${wy-ws*1.5}" x2="\${wx+ws*0.95}" y2="\${wy-ws*1.8}" stroke="\${cL}" stroke-width="1"/>\`;
            // Helmet/Head
            svg += \`<path d="M\${wx-ws*0.22} \${wy-ws*0.3} Q\${wx-ws*0.25} \${wy-ws*0.75} \${wx} \${wy-ws*0.85} Q\${wx+ws*0.25} \${wy-ws*0.75} \${wx+ws*0.22} \${wy-ws*0.3}" fill="url(#\${g('br')})"/>\`;
            // Visor slit
            svg += \`<path d="M\${wx-ws*0.12} \${wy-ws*0.52} L\${wx+ws*0.12} \${wy-ws*0.52}" stroke="\${_rgba(cL,0.8)}" stroke-width="1.5"/>\`;
            // Helmet crest
            svg += \`<path d="M\${wx} \${wy-ws*0.85} Q\${wx+ws*0.05} \${wy-ws*1.15} \${wx} \${wy-ws*1.2} Q\${wx-ws*0.05} \${wy-ws*1.15} \${wx} \${wy-ws*0.85}" fill="\${_rgba(c,0.5)}"/>\`;
            // Eye glow through visor
            svg += \`<circle cx="\${wx}" cy="\${wy-ws*0.52}" r="2.5" fill="\${cL}" opacity="0.5" filter="url(#\${g('gl2')})"/>\`;
            break;
        }
        case 4: { // GIANT CRAB — wide body, massive asymmetric claws, armored shell
            const cx = mx, cy = my + 3;
            const cw = sz*1.4, ch = sz*0.6;
            // Shell body
            defs += \`<radialGradient id="\${g('cs')}" cx="45%" cy="35%" r="55%"><stop offset="0%" stop-color="\${cL}"/><stop offset="60%" stop-color="\${c}"/><stop offset="100%" stop-color="\${cDD}"/></radialGradient>\`;
            svg += \`<ellipse cx="\${cx}" cy="\${cy}" rx="\${cw}" ry="\${ch}" fill="url(#\${g('cs')})" stroke="\${_rgba(cD,0.3)}" stroke-width="0.8"/>\`;
            // Shell ridges
            for (let i = -2; i <= 2; i++) {
                svg += \`<ellipse cx="\${cx+i*cw*0.2}" cy="\${cy-ch*0.1}" rx="\${cw*0.12}" ry="\${ch*0.5}" fill="none" stroke="\${_rgba(cL,0.12)}" stroke-width="0.6"/>\`;
            }
            // Big claw (right)
            svg += \`<path d="M\${cx+cw*0.8} \${cy-ch*0.3} Q\${cx+cw*1.1} \${cy-ch*0.8} \${cx+cw*1.0} \${cy-ch*1.2}" fill="url(#\${g('br')})" stroke="\${cD}" stroke-width="0.6"/>\`;
            svg += \`<path d="M\${cx+cw*0.8} \${cy-ch*0.3} Q\${cx+cw*1.2} \${cy-ch*0.5} \${cx+cw*1.15} \${cy-ch*1.0}" fill="url(#\${g('bd')})" stroke="\${cD}" stroke-width="0.6"/>\`;
            svg += \`<ellipse cx="\${cx+cw*0.95}" cy="\${cy-ch*0.5}" rx="\${cw*0.22}" ry="\${ch*0.35}" fill="url(#\${g('br')})" stroke="\${_rgba(cD,0.3)}" stroke-width="0.5"/>\`;
            // Small claw (left)
            svg += \`<path d="M\${cx-cw*0.8} \${cy-ch*0.2} Q\${cx-cw*1.0} \${cy-ch*0.6} \${cx-cw*0.85} \${cy-ch*0.9}" fill="url(#\${g('br')})" stroke="\${cD}" stroke-width="0.5"/>\`;
            svg += \`<path d="M\${cx-cw*0.8} \${cy-ch*0.2} Q\${cx-cw*1.05} \${cy-ch*0.4} \${cx-cw*0.95} \${cy-ch*0.8}" fill="url(#\${g('bd')})" stroke="\${cD}" stroke-width="0.5"/>\`;
            // Stalk eyes
            for (let side = -1; side <= 1; side += 2) {
                const ex = cx + 8*side, ey = cy - ch - 6;
                svg += \`<line x1="\${cx+4*side}" y1="\${cy-ch*0.8}" x2="\${ex}" y2="\${ey}" stroke="\${c}" stroke-width="2"/>\`;
                svg += \`<circle cx="\${ex}" cy="\${ey}" r="3.5" fill="\${cL}"/>\`;
                svg += \`<circle cx="\${ex}" cy="\${ey}" r="2" fill="#0a0a0a"/>\`;
                svg += \`<circle cx="\${ex+0.7*side}" cy="\${ey-0.7}" r="0.9" fill="#fff" opacity="0.85"/>\`;
            }
            // Legs
            for (let i = 0; i < 3; i++) {
                for (let side = -1; side <= 1; side += 2) {
                    const lx = cx + (cw*0.3 + i*cw*0.25)*side;
                    svg += \`<path d="M\${lx} \${cy+ch*0.6} L\${lx+4*side} \${cy+ch*0.9} L\${lx+6*side} \${cy+ch*1.3}" stroke="\${cD}" fill="none" stroke-width="1.3" stroke-linecap="round"/>\`;
                }
            }
            break;
        }
        case 5: { // PUFFERFISH — inflated spiny sphere, wide eyes, spines
            const px = mx, py = my;
            const pr = sz*0.85;
            // Body glow
            svg += \`<circle cx="\${px}" cy="\${py}" r="\${pr*1.2}" fill="\${_rgba(c,0.06)}" filter="url(#\${g('gl3')})"/>\`;
            // Main body
            defs += \`<radialGradient id="\${g('pf')}" cx="38%" cy="32%" r="60%"><stop offset="0%" stop-color="\${cL}"/><stop offset="40%" stop-color="\${c}"/><stop offset="100%" stop-color="\${cD}"/></radialGradient>\`;
            svg += \`<circle cx="\${px}" cy="\${py}" r="\${pr}" fill="url(#\${g('pf')})"/>\`;
            // Belly
            svg += \`<ellipse cx="\${px}" cy="\${py+pr*0.2}" rx="\${pr*0.6}" ry="\${pr*0.5}" fill="\${_rgba(cL,0.15)}"/>\`;
            // Spines
            for (let a = 0; a < 360; a += ri(18,28)) {
                const rad = a * Math.PI / 180;
                const len = pr + ri(5,12);
                svg += \`<line x1="\${px+Math.cos(rad)*pr*0.85}" y1="\${py+Math.sin(rad)*pr*0.85}" x2="\${px+Math.cos(rad)*len}" y2="\${py+Math.sin(rad)*len}" stroke="\${c}" stroke-width="\${rf(0.6,1.2)}" opacity="\${rf(0.3,0.55)}" stroke-linecap="round"/>\`;
            }
            // Eyes — large, wide
            for (let side = -1; side <= 1; side += 2) {
                const ex = px + pr*0.3*side, ey = py - pr*0.2;
                svg += \`<circle cx="\${ex}" cy="\${ey}" r="\${pr*0.22}" fill="#e8e8e8"/>\`;
                svg += \`<circle cx="\${ex+side}" cy="\${ey}" r="\${pr*0.14}" fill="#111"/>\`;
                svg += \`<circle cx="\${ex+side*1.5}" cy="\${ey-1}" r="\${pr*0.06}" fill="#fff" opacity="0.9"/>\`;
            }
            // Small fins
            svg += \`<path d="M\${px-pr} \${py} Q\${px-pr-5} \${py-4} \${px-pr-2} \${py-8} Q\${px-pr+2} \${py-4} \${px-pr} \${py}" fill="\${_rgba(c,0.35)}"/>\`;
            svg += \`<path d="M\${px+pr} \${py} Q\${px+pr+5} \${py-4} \${px+pr+2} \${py-8} Q\${px+pr-2} \${py-4} \${px+pr} \${py}" fill="\${_rgba(c,0.35)}"/>\`;
            // Tail
            svg += \`<path d="M\${px} \${py+pr} Q\${px-4} \${py+pr+6} \${px} \${py+pr+10} Q\${px+4} \${py+pr+6} \${px} \${py+pr}" fill="\${_rgba(c,0.3)}"/>\`;
            // Spots
            for (let i = 0; i < ri(4,7); i++) {
                const sa = rr()*Math.PI*2, sd = pr*rf(0.3,0.65);
                svg += \`<circle cx="\${px+Math.cos(sa)*sd}" cy="\${py+Math.sin(sa)*sd}" r="\${rf(1,2.5)}" fill="\${_rgba(cD,rf(0.15,0.3))}"/>\`;
            }
            break;
        }
        case 6: { // LEVIATHAN — massive whale-like, ancient markings, glowing runes
            const lx = mx - 5, ly = my;
            const lw = sz*1.6, lh = sz*0.7;
            // Body
            svg += \`<path d="M\${lx-lw} \${ly+2} Q\${lx-lw*0.5} \${ly-lh} \${lx+lw*0.2} \${ly-lh*0.8} Q\${lx+lw*0.8} \${ly-lh*0.5} \${lx+lw} \${ly} Q\${lx+lw*0.7} \${ly+lh*0.6} \${lx} \${ly+lh*0.5} Q\${lx-lw*0.5} \${ly+lh*0.3} \${lx-lw} \${ly+2}" fill="url(#\${g('bd')})" stroke="\${_rgba(cD,0.3)}" stroke-width="0.6"/>\`;
            // Underbelly
            svg += \`<path d="M\${lx-lw*0.6} \${ly+2} Q\${lx} \${ly+lh*0.55} \${lx+lw*0.6} \${ly+2}" fill="\${_rgba(cL,0.1)}"/>\`;
            // Eye
            svg += \`<circle cx="\${lx+lw*0.7}" cy="\${ly-lh*0.15}" r="3.5" fill="\${_rgba(cL,0.8)}"/>\`;
            svg += \`<circle cx="\${lx+lw*0.7}" cy="\${ly-lh*0.15}" r="2" fill="#0a0a12"/>\`;
            svg += \`<circle cx="\${lx+lw*0.72}" cy="\${ly-lh*0.2}" r="0.8" fill="#fff" opacity="0.9"/>\`;
            // Dorsal ridge
            for (let i = 0; i < 5; i++) {
                const dx = lx - lw*0.3 + i*lw*0.3, dy = ly - lh*0.7 - i*0.5;
                svg += \`<path d="M\${dx-2} \${dy+3} L\${dx} \${dy-ri(3,7)} L\${dx+3} \${dy+3}" fill="\${_rgba(c,0.3)}"/>\`;
            }
            // Tail flukes
            svg += \`<path d="M\${lx-lw} \${ly+2} Q\${lx-lw-8} \${ly-8} \${lx-lw-12} \${ly-12}" fill="\${_rgba(c,0.3)}"/>\`;
            svg += \`<path d="M\${lx-lw} \${ly+2} Q\${lx-lw-8} \${ly+10} \${lx-lw-12} \${ly+14}" fill="\${_rgba(c,0.3)}"/>\`;
            // Pectoral fin
            svg += \`<path d="M\${lx+lw*0.2} \${ly+lh*0.3} Q\${lx+lw*0.1} \${ly+lh*0.8} \${lx-lw*0.1} \${ly+lh*0.6}" fill="\${_rgba(c,0.25)}" stroke="\${_rgba(cL,0.15)}" stroke-width="0.5"/>\`;
            // Glowing rune markings
            for (let i = 0; i < ri(4,6); i++) {
                const rx = lx - lw*0.4 + i*lw*0.3, ry = ly + ri(-lh*0.3, lh*0.1);
                svg += \`<ellipse cx="\${rx}" cy="\${ry}" rx="\${rf(2,4)}" ry="\${rf(1,2)}" fill="\${cL}" opacity="\${rf(0.15,0.35)}"><animate attributeName="opacity" values="\${rf(0.1,0.2)};\${rf(0.3,0.5)};\${rf(0.1,0.2)}" dur="\${rf(2,4)}s" repeatCount="indefinite"/></ellipse>\`;
            }
            break;
        }
        case 7: { // KRAKEN — central mass, 8 thick tentacles, textured suckers
            const kx = mx, ky = my - 8;
            const kr = sz*0.5;
            // Head/mantle
            svg += \`<path d="M\${kx-kr} \${ky+kr*0.3} Q\${kx-kr*1.1} \${ky-kr*0.8} \${kx} \${ky-kr} Q\${kx+kr*1.1} \${ky-kr*0.8} \${kx+kr} \${ky+kr*0.3} Q\${kx+kr*0.5} \${ky+kr*0.6} \${kx} \${ky+kr*0.4} Q\${kx-kr*0.5} \${ky+kr*0.6} \${kx-kr} \${ky+kr*0.3}" fill="url(#\${g('br')})"/>\`;
            // Eyes
            for (let side = -1; side <= 1; side += 2) {
                const ex = kx + kr*0.35*side, ey = ky - kr*0.1;
                svg += \`<ellipse cx="\${ex}" cy="\${ey}" rx="3.5" ry="2.5" fill="\${_rgba(cL,0.8)}" transform="rotate(\${-10*side} \${ex} \${ey})"/>\`;
                svg += \`<ellipse cx="\${ex}" cy="\${ey}" rx="1.8" ry="2" fill="#0a0a12" transform="rotate(\${-10*side} \${ex} \${ey})"/>\`;
                svg += \`<circle cx="\${ex+side}" cy="\${ey-0.8}" r="0.7" fill="#fff" opacity="0.85"/>\`;
            }
            // Tentacles
            for (let i = 0; i < 8; i++) {
                const angle = 140 + i * 32 + ri(-5,5);
                const rad = angle * Math.PI / 180;
                const len = sz*rf(0.9,1.5);
                let tPath = \`M\${kx+Math.cos(rad)*kr*0.3} \${ky+kr*0.3+Math.sin(rad)*kr*0.2}\`;
                let cx2 = kx + Math.cos(rad)*kr*0.3, cy2 = ky+kr*0.3+Math.sin(rad)*kr*0.2;
                for (let s = 0; s < 3; s++) {
                    const nx = cx2 + Math.cos(rad+rf(-0.5,0.5))*len*0.35;
                    const ny = cy2 + Math.sin(rad)*len*0.25 + len*0.15;
                    tPath += \` Q\${cx2+ri(-5,5)} \${cy2+ri(3,8)} \${nx} \${ny}\`;
                    cx2 = nx; cy2 = ny;
                }
                svg += \`<path d="\${tPath}" stroke="url(#\${g('bd')})" fill="none" stroke-width="\${rf(2,3.5)}" stroke-linecap="round" opacity="0.65"/>\`;
                // Suckers
                for (let s = 1; s <= 2; s++) {
                    const sx = kx + Math.cos(rad)*kr*0.3 + Math.cos(rad+0.3)*len*0.2*s;
                    const sy = ky + kr*0.3 + s*len*0.2;
                    svg += \`<circle cx="\${sx}" cy="\${sy}" r="\${rf(0.8,1.5)}" fill="\${_rgba(cL,0.2)}" stroke="\${_rgba(cD,0.15)}" stroke-width="0.3"/>\`;
                }
            }
            break;
        }
        case 8: { // MANTIS SHRIMP — colorful, striking appendages, compound eyes
            const sx2 = mx, sy2 = my;
            const ss = sz*0.8;
            // Tail segments
            for (let i = 3; i >= 0; i--) {
                const tx = sx2 - ss*0.5 - i*ss*0.25, ty = sy2 + i*2;
                svg += \`<ellipse cx="\${tx}" cy="\${ty}" rx="\${ss*0.2}" ry="\${ss*0.35-i*1.5}" fill="url(#\${g('bd')})" opacity="\${0.65-i*0.06}"/>\`;
            }
            // Main body
            svg += \`<ellipse cx="\${sx2}" cy="\${sy2}" rx="\${ss*0.45}" ry="\${ss*0.55}" fill="url(#\${g('br')})"/>\`;
            // Color bands
            for (let i = -2; i <= 2; i++) {
                const bandC = i % 2 === 0 ? cL : cD;
                svg += \`<ellipse cx="\${sx2}" cy="\${sy2+i*ss*0.12}" rx="\${ss*0.42}" ry="\${ss*0.06}" fill="\${_rgba(bandC,0.2)}"/>\`;
            }
            // Striking appendages (raptorial)
            for (let side = -1; side <= 1; side += 2) {
                svg += \`<path d="M\${sx2+ss*0.3*side} \${sy2-ss*0.3} L\${sx2+ss*0.65*side} \${sy2-ss*0.7} L\${sx2+ss*0.8*side} \${sy2-ss*0.5}" stroke="url(#\${g('bd')})" fill="none" stroke-width="3" stroke-linecap="round"/>\`;
                // Club
                svg += \`<circle cx="\${sx2+ss*0.8*side}" cy="\${sy2-ss*0.5}" r="\${ss*0.12}" fill="\${cL}" opacity="0.7"/>\`;
                svg += \`<circle cx="\${sx2+ss*0.8*side}" cy="\${sy2-ss*0.5}" r="\${ss*0.06}" fill="#fff" opacity="0.4"/>\`;
            }
            // Compound eyes (large, on stalks)
            for (let side = -1; side <= 1; side += 2) {
                const ex = sx2 + ss*0.25*side, ey = sy2 - ss*0.65;
                svg += \`<line x1="\${sx2+ss*0.1*side}" y1="\${sy2-ss*0.45}" x2="\${ex}" y2="\${ey}" stroke="\${c}" stroke-width="2"/>\`;
                svg += \`<circle cx="\${ex}" cy="\${ey}" r="4" fill="url(#\${g('br')})"/>\`;
                // Multi-color eye
                svg += \`<circle cx="\${ex}" cy="\${ey}" r="2.5" fill="\${cL}"/>\`;
                svg += \`<rect x="\${ex-2.5}" y="\${ey-0.5}" width="5" height="1" fill="#111" opacity="0.6"/>\`;
                svg += \`<circle cx="\${ex+0.5*side}" cy="\${ey-0.5}" r="0.6" fill="#fff" opacity="0.85"/>\`;
            }
            // Tail fan
            svg += \`<path d="M\${sx2-ss*0.75} \${sy2+6} Q\${sx2-ss*0.9} \${sy2+2} \${sx2-ss} \${sy2-2} L\${sx2-ss*0.7} \${sy2+4}" fill="\${_rgba(c,0.3)}"/>\`;
            svg += \`<path d="M\${sx2-ss*0.75} \${sy2+6} Q\${sx2-ss*0.85} \${sy2+10} \${sx2-ss*0.95} \${sy2+14} L\${sx2-ss*0.7} \${sy2+8}" fill="\${_rgba(c,0.3)}"/>\`;
            break;
        }
        case 9: { // ANGLERFISH — bulbous body, huge jaws, bioluminescent lure
            const ax = mx + 3, ay = my + 2;
            const ar = sz*0.8;
            // Body
            svg += \`<ellipse cx="\${ax}" cy="\${ay}" rx="\${ar}" ry="\${ar*0.85}" fill="url(#\${g('br')})"/>\`;
            svg += \`<ellipse cx="\${ax+ar*0.1}" cy="\${ay+ar*0.15}" rx="\${ar*0.65}" ry="\${ar*0.5}" fill="\${_rgba(cL,0.08)}"/>\`;
            // Huge open jaw
            svg += \`<path d="M\${ax+ar*0.5} \${ay-ar*0.2} Q\${ax+ar*1.1} \${ay-ar*0.5} \${ax+ar*1.2} \${ay-ar*0.15} L\${ax+ar*0.6} \${ay}" fill="\${cD}" opacity="0.6"/>\`;
            svg += \`<path d="M\${ax+ar*0.5} \${ay+ar*0.2} Q\${ax+ar*1.1} \${ay+ar*0.5} \${ax+ar*1.2} \${ay+ar*0.15} L\${ax+ar*0.6} \${ay}" fill="\${cDD}" opacity="0.6"/>\`;
            // Teeth
            for (let i = 0; i < 5; i++) {
                const t = i / 4;
                const tx2 = ax+ar*0.55 + t*(ar*0.6), ty2 = ay-ar*0.15 - t*ar*0.15 + t*t*ar*0.1;
                svg += \`<path d="M\${tx2-1} \${ty2} L\${tx2} \${ty2+ri(3,6)} L\${tx2+1} \${ty2}" fill="\${_rgba('#e0e0d0',rf(0.4,0.7))}"/>\`;
                svg += \`<path d="M\${tx2-1} \${ty2+ar*0.3+t*ar*0.05} L\${tx2} \${ty2+ar*0.3+t*ar*0.05-ri(3,5)} L\${tx2+1} \${ty2+ar*0.3+t*ar*0.05}" fill="\${_rgba('#e0e0d0',rf(0.3,0.6))}"/>\`;
            }
            // Eye
            svg += \`<circle cx="\${ax+ar*0.35}" cy="\${ay-ar*0.35}" r="4" fill="\${_rgba(cL,0.7)}"/>\`;
            svg += \`<circle cx="\${ax+ar*0.35}" cy="\${ay-ar*0.35}" r="2.5" fill="#080810"/>\`;
            svg += \`<circle cx="\${ax+ar*0.37}" cy="\${ay-ar*0.38}" r="0.9" fill="#fff" opacity="0.85"/>\`;
            // Lure (esca) — bioluminescent
            svg += \`<path d="M\${ax-ar*0.3} \${ay-ar*0.7} Q\${ax-ar*0.1} \${ay-ar*1.3} \${ax+ar*0.15} \${ay-ar*1.2}" stroke="\${c}" fill="none" stroke-width="1" opacity="0.5"/>\`;
            svg += \`<circle cx="\${ax+ar*0.15}" cy="\${ay-ar*1.2}" r="4" fill="\${cL}" opacity="0.7" filter="url(#\${g('gl')})"/>\`;
            svg += \`<circle cx="\${ax+ar*0.15}" cy="\${ay-ar*1.2}" r="2" fill="#fff" opacity="0.8"><animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite"/></circle>\`;
            // Small fins
            svg += \`<path d="M\${ax-ar*0.7} \${ay} Q\${ax-ar*1.0} \${ay-4} \${ax-ar*0.8} \${ay-8} Q\${ax-ar*0.6} \${ay-3} \${ax-ar*0.7} \${ay}" fill="\${_rgba(c,0.3)}"/>\`;
            svg += \`<path d="M\${ax} \${ay+ar*0.75} Q\${ax+5} \${ay+ar*0.9} \${ax+2} \${ay+ar} Q\${ax-3} \${ay+ar*0.9} \${ax} \${ay+ar*0.75}" fill="\${_rgba(c,0.25)}"/>\`;
            break;
        }
        }

        // Floating particles universal
        for (let i = 0; i < ri(4,7); i++) {
            svg += \`<circle cx="\${ri(5,115)}" cy="\${ri(5,90)}" r="\${rf(0.3,0.8)}" fill="\${_rgba(cL,rf(0.1,0.25))}"><animate attributeName="cy" values="\${ri(10,80)};\${ri(5,70)};\${ri(10,80)}" dur="\${rf(3,6)}s" repeatCount="indefinite"/></circle>\`;
        }
        // Bubbles
        for (let i = 0; i < ri(3,5); i++) {
            const bx = ri(5,115), by = ri(15,75), br = rf(0.8,2);
            svg += \`<circle cx="\${bx}" cy="\${by}" r="\${br}" fill="\${_rgba(cL,0.04)}" stroke="\${_rgba(cL,rf(0.08,0.15))}" stroke-width="0.4"/>\`;
            svg += \`<circle cx="\${bx-br*0.2}" cy="\${by-br*0.3}" r="\${br*0.2}" fill="\${_rgba('#fff',0.3)}"/>\`;
        }

    } else if (card.type === 'spell') {
        const sx = ri(50,66), sy = ri(38,50);
        const template = (id * 3 + ri(0,1)) % 6;

        defs += \`<radialGradient id="\${g('sp')}" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="\${cL}" stop-opacity="0.6"/><stop offset="50%" stop-color="\${c}" stop-opacity="0.3"/><stop offset="100%" stop-color="\${cD}" stop-opacity="0"/></radialGradient>\`;

        switch(template) {
        case 0: { // Arcane sigil — intricate circle with glowing runes
            const sr = ri(26,34);
            svg += \`<circle cx="\${sx}" cy="\${sy}" r="\${sr+8}" fill="\${_rgba(c,0.06)}" filter="url(#\${g('gl3')})"/>\`;
            svg += \`<circle cx="\${sx}" cy="\${sy}" r="\${sr}" stroke="\${_rgba(cL,0.35)}" fill="none" stroke-width="1.8"/>\`;
            svg += \`<circle cx="\${sx}" cy="\${sy}" r="\${sr-6}" stroke="\${_rgba(c,0.25)}" fill="none" stroke-width="0.8" stroke-dasharray="3 2"/>\`;
            svg += \`<circle cx="\${sx}" cy="\${sy}" r="\${sr-12}" stroke="\${_rgba(c,0.2)}" fill="none" stroke-width="0.6"/>\`;
            // Inner star/pentagram
            const pts = [];
            for (let i = 0; i < 5; i++) {
                const a = (i * 72 - 90) * Math.PI / 180;
                pts.push([sx+Math.cos(a)*(sr-14), sy+Math.sin(a)*(sr-14)]);
            }
            svg += \`<polygon points="\${pts.map(p=>p.join(',')).join(' ')}" stroke="\${_rgba(cL,0.3)}" fill="\${_rgba(c,0.06)}" stroke-width="0.8"/>\`;
            // Connect star points
            for (let i = 0; i < 5; i++) {
                const j = (i+2) % 5;
                svg += \`<line x1="\${pts[i][0]}" y1="\${pts[i][1]}" x2="\${pts[j][0]}" y2="\${pts[j][1]}" stroke="\${_rgba(cL,0.2)}" stroke-width="0.6"/>\`;
            }
            // Rune marks on outer circle
            for (let a = 0; a < 360; a += 30) {
                const rad = a * Math.PI / 180;
                const rx = sx+Math.cos(rad)*sr, ry = sy+Math.sin(rad)*sr;
                svg += \`<circle cx="\${rx}" cy="\${ry}" r="1.5" fill="\${cL}" opacity="\${rf(0.3,0.6)}"><animate attributeName="opacity" values="0.2;0.7;0.2" dur="\${rf(1.5,3)}s" repeatCount="indefinite" begin="\${a/360}s"/></circle>\`;
            }
            svg += \`<circle cx="\${sx}" cy="\${sy}" r="4" fill="\${cL}" opacity="0.6" filter="url(#\${g('gl2')})"/>\`;
            break;
        }
        case 1: { // Energy nova — explosive burst
            // Radial beams
            for (let a = 0; a < 360; a += ri(15,25)) {
                const rad = a * Math.PI / 180;
                const len = ri(25,40);
                svg += \`<line x1="\${sx}" y1="\${sy}" x2="\${sx+Math.cos(rad)*len}" y2="\${sy+Math.sin(rad)*len}" stroke="\${_rgba(cL,rf(0.1,0.25))}" stroke-width="\${rf(0.5,1.5)}"/>\`;
            }
            svg += \`<circle cx="\${sx}" cy="\${sy}" r="18" fill="url(#\${g('sp')})" filter="url(#\${g('gl')})"/>\`;
            svg += \`<circle cx="\${sx}" cy="\${sy}" r="8" fill="\${_rgba(cL,0.4)}"/>\`;
            svg += \`<circle cx="\${sx}" cy="\${sy}" r="3" fill="#fff" opacity="0.7"/>\`;
            // Debris/particles
            for (let i = 0; i < ri(8,12); i++) {
                const a = rr()*Math.PI*2, d = ri(15,35);
                svg += \`<circle cx="\${sx+Math.cos(a)*d}" cy="\${sy+Math.sin(a)*d}" r="\${rf(0.5,1.5)}" fill="\${cL}" opacity="\${rf(0.2,0.5)}"/>\`;
            }
            break;
        }
        case 2: { // Whirlpool vortex — spiraling water
            for (let i = 0; i < 5; i++) {
                const r = 8 + i * 6;
                svg += \`<circle cx="\${sx}" cy="\${sy}" r="\${r}" stroke="\${_rgba(c,0.35-i*0.05)}" fill="none" stroke-width="\${2.5-i*0.3}" stroke-dasharray="\${4+i*3} \${3+i*2}"><animateTransform attributeName="transform" type="rotate" from="\${i%2?360:0} \${sx} \${sy}" to="\${i%2?0:360} \${sx} \${sy}" dur="\${2+i*0.5}s" repeatCount="indefinite"/></circle>\`;
            }
            svg += \`<circle cx="\${sx}" cy="\${sy}" r="5" fill="\${_rgba(cD,0.5)}"/>\`;
            svg += \`<circle cx="\${sx}" cy="\${sy}" r="2" fill="\${_rgba(cDD,0.7)}"/>\`;
            // Pulled-in debris
            for (let i = 0; i < 6; i++) {
                const a = rr()*Math.PI*2, d = ri(20,32);
                svg += \`<path d="M\${sx+Math.cos(a)*d} \${sy+Math.sin(a)*d} Q\${sx+Math.cos(a+0.5)*d*0.5} \${sy+Math.sin(a+0.5)*d*0.5} \${sx+ri(-3,3)} \${sy+ri(-3,3)}" stroke="\${_rgba(cL,0.15)}" fill="none" stroke-width="0.5"/>\`;
            }
            break;
        }
        case 3: { // Crystal formation — geometric growths
            // Crystal clusters
            for (let i = 0; i < ri(5,8); i++) {
                const cx = sx + ri(-20,20), cy = sy + ri(-15,20);
                const ch = ri(10,22), cw = ri(2,5);
                const ang = ri(-30,30);
                defs += \`<linearGradient id="\${g('cr'+i)}" x1="0" y1="0" x2="0.3" y2="1"><stop offset="0%" stop-color="\${cL}" stop-opacity="0.6"/><stop offset="100%" stop-color="\${cD}" stop-opacity="0.3"/></linearGradient>\`;
                svg += \`<polygon points="\${cx-cw},\${cy} \${cx-cw*0.3},\${cy-ch} \${cx+cw*0.3},\${cy-ch} \${cx+cw},\${cy}" fill="url(#\${g('cr'+i)})" stroke="\${_rgba(cL,0.3)}" stroke-width="0.5" transform="rotate(\${ang} \${cx} \${cy})"/>\`;
                svg += \`<line x1="\${cx}" y1="\${cy}" x2="\${cx}" y2="\${cy-ch}" stroke="\${_rgba(cL,0.25)}" stroke-width="0.4" transform="rotate(\${ang} \${cx} \${cy})"/>\`;
            }
            svg += \`<circle cx="\${sx}" cy="\${sy}" r="12" fill="\${_rgba(cL,0.1)}" filter="url(#\${g('gl')})"/>\`;
            break;
        }
        case 4: { // Summoning portal — dimensional rift
            svg += \`<ellipse cx="\${sx}" cy="\${sy}" rx="30" ry="18" fill="\${_rgba(cD,0.3)}" stroke="\${_rgba(cL,0.3)}" stroke-width="1.5" transform="rotate(\${ri(-15,15)} \${sx} \${sy})"/>\`;
            svg += \`<ellipse cx="\${sx}" cy="\${sy}" rx="22" ry="12" fill="\${_rgba(cDD,0.5)}" transform="rotate(\${ri(-15,15)} \${sx} \${sy})"/>\`;
            svg += \`<ellipse cx="\${sx}" cy="\${sy}" rx="12" ry="6" fill="\${_rgba('#000',0.5)}" transform="rotate(\${ri(-15,15)} \${sx} \${sy})"/>\`;
            // Energy tendrils rising from portal
            for (let i = 0; i < ri(5,8); i++) {
                const tx = sx + ri(-18,18), ty2 = sy;
                svg += \`<path d="M\${tx} \${ty2} Q\${tx+ri(-8,8)} \${ty2-ri(15,25)} \${tx+ri(-10,10)} \${ty2-ri(25,40)}" stroke="\${_rgba(cL,rf(0.1,0.25))}" fill="none" stroke-width="\${rf(0.4,1.2)}" stroke-linecap="round"/>\`;
            }
            svg += \`<ellipse cx="\${sx}" cy="\${sy}" rx="8" ry="4" fill="\${cL}" opacity="0.3" filter="url(#\${g('gl2')})"/>\`;
            break;
        }
        case 5: { // Elemental convergence — swirling elements merging
            // Multiple colored streams converging
            const colors = [c, cL, cD];
            for (let i = 0; i < 4; i++) {
                const startA = i * 90 + ri(-15,15);
                const rad = startA * Math.PI / 180;
                const startX = sx + Math.cos(rad)*35, startY = sy + Math.sin(rad)*35;
                svg += \`<path d="M\${startX} \${startY} Q\${sx+Math.cos(rad+0.5)*18} \${sy+Math.sin(rad+0.5)*18} \${sx} \${sy}" stroke="\${_rgba(colors[i%3],0.3)}" fill="none" stroke-width="\${rf(2,4)}" stroke-linecap="round"/>\`;
            }
            svg += \`<circle cx="\${sx}" cy="\${sy}" r="8" fill="url(#\${g('sp')})" filter="url(#\${g('gl')})"/>\`;
            svg += \`<circle cx="\${sx}" cy="\${sy}" r="3" fill="\${_rgba('#fff',0.6)}"/>\`;
            for (let i = 0; i < 6; i++) {
                const pa = rr()*Math.PI*2, pd = ri(10,20);
                svg += \`<circle cx="\${sx+Math.cos(pa)*pd}" cy="\${sy+Math.sin(pa)*pd}" r="\${rf(0.6,1.5)}" fill="\${cL}" opacity="\${rf(0.15,0.4)}"/>\`;
            }
            break;
        }
        }

        // Universal spell sparkles
        for (let i = 0; i < ri(5,8); i++) {
            svg += \`<circle cx="\${ri(8,112)}" cy="\${ri(8,88)}" r="\${rf(0.3,0.7)}" fill="\${_rgba(cL,rf(0.15,0.35))}"><animate attributeName="opacity" values="0;\${rf(0.3,0.6)};0" dur="\${rf(1.5,3.5)}s" repeatCount="indefinite" begin="\${rf(0,2)}s"/></circle>\`;
        }

    } else { // trap
        const tx = ri(50,66), ty = ri(38,50);
        const template = (id * 3 + ri(0,1)) % 6;

        defs += \`<radialGradient id="\${g('tr')}" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="\${c}" stop-opacity="0.3"/><stop offset="100%" stop-color="\${cD}" stop-opacity="0"/></radialGradient>\`;

        // Ominous vignette
        svg += \`<rect width="120" height="100" fill="rgba(0,0,0,0.15)"/>\`;

        switch(template) {
        case 0: { // Iron cage — metal bars with rivets
            const cw = ri(28,36), ch = ri(32,40);
            svg += \`<rect x="\${tx-cw}" y="\${ty-ch}" width="\${cw*2}" height="\${ch*2}" rx="3" fill="none" stroke="\${_rgba(cL,0.4)}" stroke-width="2"/>\`;
            // Bars
            for (let i = -3; i <= 3; i++) {
                svg += \`<line x1="\${tx+i*cw*0.3}" y1="\${ty-ch}" x2="\${tx+i*cw*0.3}" y2="\${ty+ch}" stroke="\${_rgba(c,0.35)}" stroke-width="1.8"/>\`;
            }
            // Cross bars
            svg += \`<line x1="\${tx-cw}" y1="\${ty}" x2="\${tx+cw}" y2="\${ty}" stroke="\${_rgba(c,0.3)}" stroke-width="1.5"/>\`;
            // Rivets
            for (let i = -3; i <= 3; i++) {
                svg += \`<circle cx="\${tx+i*cw*0.3}" cy="\${ty-ch}" r="1.5" fill="\${_rgba(cL,0.4)}"/>\`;
                svg += \`<circle cx="\${tx+i*cw*0.3}" cy="\${ty+ch}" r="1.5" fill="\${_rgba(cL,0.4)}"/>\`;
            }
            svg += \`<circle cx="\${tx}" cy="\${ty}" r="10" fill="url(#\${g('tr')})"/>\`;
            break;
        }
        case 1: { // Watchful eye — detailed all-seeing eye
            const er = ri(22,28);
            svg += \`<circle cx="\${tx}" cy="\${ty}" r="\${er+10}" fill="\${_rgba(c,0.05)}" filter="url(#\${g('gl3')})"/>\`;
            svg += \`<path d="M\${tx-er*1.3} \${ty} Q\${tx} \${ty-er*0.9} \${tx+er*1.3} \${ty} Q\${tx} \${ty+er*0.9} \${tx-er*1.3} \${ty}" fill="\${_rgba(c,0.12)}" stroke="\${_rgba(cL,0.4)}" stroke-width="1.5"/>\`;
            svg += \`<circle cx="\${tx}" cy="\${ty}" r="\${er*0.45}" fill="\${c}"/>\`;
            svg += \`<circle cx="\${tx}" cy="\${ty}" r="\${er*0.3}" fill="#0a0a12"/>\`;
            svg += \`<circle cx="\${tx+2}" cy="\${ty-2}" r="\${er*0.1}" fill="#fff" opacity="0.85"/>\`;
            // Veins
            for (let i = 0; i < 6; i++) {
                const a = ri(-40,40), side = i < 3 ? -1 : 1;
                const vx = tx + er*0.55*side, vy = ty + ri(-er*0.3, er*0.3);
                svg += \`<path d="M\${vx} \${vy} Q\${vx+ri(5,12)*side} \${vy+ri(-4,4)} \${vx+ri(10,18)*side} \${vy+ri(-6,6)}" stroke="\${_rgba(c,rf(0.1,0.2))}" fill="none" stroke-width="0.5"/>\`;
            }
            break;
        }
        case 2: { // Bear trap — mechanical jaws
            const js = ri(20,26);
            // Base plate
            svg += \`<ellipse cx="\${tx}" cy="\${ty+js*0.3}" rx="\${js}" ry="\${js*0.25}" fill="\${_rgba(cD,0.3)}" stroke="\${_rgba(c,0.2)}" stroke-width="0.8"/>\`;
            // Upper jaw teeth
            for (let i = -3; i <= 3; i++) {
                const tw = 3, th = ri(8,14);
                svg += \`<polygon points="\${tx+i*js*0.2-tw},\${ty-2} \${tx+i*js*0.2},\${ty-2-th} \${tx+i*js*0.2+tw},\${ty-2}" fill="\${_rgba(c,0.5)}" stroke="\${_rgba(cL,0.2)}" stroke-width="0.4"/>\`;
            }
            // Lower jaw teeth
            for (let i = -3; i <= 3; i++) {
                const tw = 2.5, th = ri(6,10);
                svg += \`<polygon points="\${tx+i*js*0.2-tw},\${ty+5} \${tx+i*js*0.2},\${ty+5+th} \${tx+i*js*0.2+tw},\${ty+5}" fill="\${_rgba(c,0.45)}" stroke="\${_rgba(cL,0.15)}" stroke-width="0.4"/>\`;
            }
            // Hinge circles
            svg += \`<circle cx="\${tx-js}" cy="\${ty+2}" r="3" fill="\${_rgba(c,0.4)}" stroke="\${_rgba(cL,0.3)}" stroke-width="0.8"/>\`;
            svg += \`<circle cx="\${tx+js}" cy="\${ty+2}" r="3" fill="\${_rgba(c,0.4)}" stroke="\${_rgba(cL,0.3)}" stroke-width="0.8"/>\`;
            // Chain
            for (let i = 0; i < 3; i++) {
                svg += \`<ellipse cx="\${tx}" cy="\${ty+js*0.5+i*5}" rx="3" ry="2.5" fill="none" stroke="\${_rgba(c,0.3)}" stroke-width="1"/>\`;
            }
            svg += \`<circle cx="\${tx}" cy="\${ty}" r="12" fill="url(#\${g('tr')})"/>\`;
            break;
        }
        case 3: { // Net trap — woven web pattern with caught creature
            const nr = ri(28,35);
            // Net threads — concentric
            for (let r = 6; r <= nr; r += ri(5,7)) {
                svg += \`<circle cx="\${tx}" cy="\${ty}" r="\${r}" stroke="\${_rgba(c,rf(0.12,0.25))}" fill="none" stroke-width="0.6"/>\`;
            }
            // Net threads — radial
            for (let a = 0; a < 360; a += ri(20,30)) {
                const rad = a * Math.PI / 180;
                svg += \`<line x1="\${tx}" y1="\${ty}" x2="\${tx+Math.cos(rad)*nr}" y2="\${ty+Math.sin(rad)*nr}" stroke="\${_rgba(c,rf(0.1,0.2))}" stroke-width="0.5"/>\`;
            }
            // Knot highlights at intersections
            for (let r = 10; r <= nr; r += 10) {
                for (let a = 0; a < 360; a += 45) {
                    const rad = a * Math.PI / 180;
                    svg += \`<circle cx="\${tx+Math.cos(rad)*r}" cy="\${ty+Math.sin(rad)*r}" r="0.8" fill="\${_rgba(cL,0.25)}"/>\`;
                }
            }
            // Caught creature silhouette
            svg += \`<ellipse cx="\${tx}" cy="\${ty}" rx="8" ry="6" fill="\${_rgba(cD,0.3)}"/>\`;
            svg += \`<circle cx="\${tx+2}" cy="\${ty-2}" r="1" fill="\${_rgba(cL,0.5)}"/>\`;
            break;
        }
        case 4: { // Lightning cage — electric grid
            const lr = ri(24,30);
            svg += \`<rect x="\${tx-lr}" y="\${ty-lr*0.8}" width="\${lr*2}" height="\${lr*1.6}" rx="2" fill="none" stroke="\${_rgba(cL,0.25)}" stroke-width="1"/>\`;
            // Lightning bolts between edges
            for (let i = 0; i < ri(6,10); i++) {
                const x1 = ri(-1,1) === 0 ? tx-lr : (ri(0,1) ? tx+lr : tx+ri(-lr,lr));
                const y1 = x1 === tx-lr || x1 === tx+lr ? ty+ri(-lr*0.7,lr*0.7) : ty-lr*0.8;
                const x2 = tx + ri(-lr*0.3,lr*0.3), y2 = ty + ri(-lr*0.3,lr*0.3);
                // Zigzag bolt
                const mx2 = (x1+x2)/2+ri(-5,5), my2 = (y1+y2)/2+ri(-5,5);
                svg += \`<path d="M\${x1} \${y1} L\${mx2} \${my2} L\${x2} \${y2}" stroke="\${_rgba(cL,rf(0.2,0.4))}" fill="none" stroke-width="\${rf(0.5,1.2)}"><animate attributeName="opacity" values="0;\${rf(0.3,0.6)};0" dur="\${rf(0.3,0.8)}s" repeatCount="indefinite" begin="\${rf(0,1)}s"/></path>\`;
            }
            svg += \`<circle cx="\${tx}" cy="\${ty}" r="8" fill="\${_rgba(c,0.15)}" filter="url(#\${g('gl2')})"/>\`;
            break;
        }
        case 5: { // Poison cloud — toxic vapor with skull
            // Cloud layers
            for (let i = 0; i < ri(6,9); i++) {
                const cx2 = tx + ri(-22,22), cy2 = ty + ri(-15,15), cr = ri(8,18);
                svg += \`<circle cx="\${cx2}" cy="\${cy2}" r="\${cr}" fill="\${_rgba(c,rf(0.06,0.12))}" filter="url(#\${g('gl')})"/>\`;
            }
            // Skull
            svg += \`<circle cx="\${tx}" cy="\${ty-3}" r="8" fill="\${_rgba(c,0.4)}"/>\`;
            svg += \`<path d="M\${tx-4}" y1="\${ty+3} L\${tx-2} \${ty+10} L\${tx+2} \${ty+10} L\${tx+4} \${ty+3}" fill="\${_rgba(c,0.3)}"/>\`;
            svg += \`<circle cx="\${tx-3}" cy="\${ty-4}" r="2" fill="#000" opacity="0.5"/>\`;
            svg += \`<circle cx="\${tx+3}" cy="\${ty-4}" r="2" fill="#000" opacity="0.5"/>\`;
            svg += \`<path d="M\${tx-2} \${ty+1} L\${tx+2} \${ty+1}" stroke="#000" stroke-width="0.8" opacity="0.4" stroke-dasharray="1 1"/>\`;
            // Dripping vapor
            for (let i = 0; i < 4; i++) {
                const dx = tx + ri(-15,15), dy = ty + ri(10,20);
                svg += \`<path d="M\${dx} \${dy} Q\${dx+ri(-3,3)} \${dy+ri(8,15)} \${dx+ri(-2,2)} \${dy+ri(15,25)}" stroke="\${_rgba(c,0.12)}" fill="none" stroke-width="\${rf(0.5,1.5)}" stroke-linecap="round"/>\`;
            }
            break;
        }
        }

        // Trap ambient particles
        for (let i = 0; i < ri(3,5); i++) {
            svg += \`<circle cx="\${ri(8,112)}" cy="\${ri(10,85)}" r="\${rf(0.3,0.6)}" fill="\${_rgba(cL,rf(0.1,0.2))}"/>\`;
        }
    }

    svg += '</svg>';
    return \`<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg"><defs>\${defs}</defs><g clip-path="url(#\${g('vp')})">\${svg}</g></svg>\`;
}

`;

html = html.substring(0, startIdx) + newCode + html.substring(endIdx);
fs.writeFileSync(file, html);
console.log('Art engine replaced. New size:', html.length, 'bytes');
