#!/usr/bin/env node
/**
 * redesign-cards.js
 *
 * Redesigns the card rendering in apps/claw-wars.html to match the
 * new Yu-Gi-Oh-inspired card template spec.
 *
 * Three replacements:
 *   1. Google Fonts link — adds Orbitron + Chakra Petch
 *   2. Card CSS section — from "CARD RENDERING" to just before "COLLECTION SCREEN"
 *   3. renderCard function — new HTML structure with level stars above art,
 *      typed attribute orbs, colored ATK/DEF stats, bracketed type line
 *   4. Responsive breakpoint detail-card-wrap font overrides (768, 1024, 1400)
 */

const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, 'apps', 'claw-wars.html');

// ---------------------------------------------------------------------------
// Read
// ---------------------------------------------------------------------------
let src = fs.readFileSync(FILE, 'utf8');
const originalSize = Buffer.byteLength(src, 'utf8');
console.log(`Read ${FILE}`);
console.log(`Original size: ${originalSize} bytes (${(originalSize / 1024).toFixed(1)} KB)`);

// ---------------------------------------------------------------------------
// 1. Replace Google Fonts link — add Orbitron + Chakra Petch
// ---------------------------------------------------------------------------
const oldFonts = `<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet">`;
const newFonts = `<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Orbitron:wght@700;800;900&family=Chakra+Petch:wght@400;500;600&display=swap" rel="stylesheet">`;

if (src.includes(newFonts)) {
    console.log('[1/4] Google Fonts already include Orbitron + Chakra Petch — skipped.');
} else if (src.includes(oldFonts)) {
    src = src.replace(oldFonts, newFonts);
    console.log('[1/4] Replaced Google Fonts link (added Orbitron + Chakra Petch)');
} else {
    console.error('ERROR: Could not find existing Google Fonts link tag.');
    process.exit(1);
}

// ---------------------------------------------------------------------------
// 2. Replace card CSS section
//    From: /* ===== CARD RENDERING ===== */
//    To just before: /* ===== COLLECTION SCREEN ===== */
// ---------------------------------------------------------------------------
const CSS_START = '/* ===== CARD RENDERING ===== */';
const CSS_END   = '/* ===== COLLECTION SCREEN ===== */';

const cssStartIdx = src.indexOf(CSS_START);
const cssEndIdx   = src.indexOf(CSS_END);

if (cssStartIdx === -1) {
    console.error('ERROR: Could not find "/* ===== CARD RENDERING ===== */" in source.');
    process.exit(1);
}
if (cssEndIdx === -1) {
    console.error('ERROR: Could not find "/* ===== COLLECTION SCREEN ===== */" in source.');
    process.exit(1);
}

// We want to replace everything from CSS_START up to (but not including) CSS_END.
// Preserve the leading whitespace before COLLECTION SCREEN.
const newCardCSS = `/* ===== CARD RENDERING ===== */
        .card {
            position: relative;
            border-radius: 6px;
            overflow: hidden;
            transition: transform 0.3s, box-shadow 0.3s;
            transform-style: preserve-3d;
            box-shadow: 0 2px 8px rgba(0,0,0,0.6), 0 0 0 1px rgba(100,60,18,0.4);
        }
        .card.face-down .card-front { display: none; }
        .card.face-down .card-back { display: flex; }
        .card-front {
            width: 100%; height: 100%;
            display: flex; flex-direction: column;
            position: relative;
        }
        .card-back {
            width: 100%; height: 100%;
            display: none; align-items: center; justify-content: center;
            background: radial-gradient(ellipse at 50% 50%, #3a1e0a 0%, #1a0e04 70%);
            border: 2px solid #6a4018;
            border-radius: 6px;
            box-shadow: inset 0 0 20px rgba(0,0,0,0.6);
        }
        .card-back-pattern {
            width: 72%; height: 72%;
            border: 1px solid rgba(200,120,48,0.25);
            border-radius: 4px;
            display: flex; align-items: center; justify-content: center;
            background:
                repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(200,120,48,0.04) 4px, rgba(200,120,48,0.04) 5px),
                repeating-linear-gradient(-45deg, transparent, transparent 4px, rgba(200,120,48,0.04) 4px, rgba(200,120,48,0.04) 5px);
            box-shadow: inset 0 0 10px rgba(100,60,18,0.3);
        }
        .card-back-text {
            font-family: 'Orbitron', sans-serif;
            font-size: 9px; font-weight: 900;
            color: rgba(200,120,48,0.3);
            letter-spacing: 3px;
            transform: rotate(-25deg);
            text-shadow: 0 0 8px rgba(200,120,48,0.2);
        }

        /* Frame — bronze/dark brown with gold accents */
        .card-frame {
            position: absolute; top:0;left:0;right:0;bottom:0;
            border-radius: 6px;
            padding: 3px;
            background: linear-gradient(170deg, #6a4018 0%, #5a3414 20%, #7a4c20 45%, #4a2810 65%, #3a1e0a 100%);
            box-shadow: inset 1px 1px 2px rgba(200,150,80,0.2), inset -1px -1px 2px rgba(0,0,0,0.4);
            border: 1px solid #c87830;
        }
        /* Subtle grain texture */
        .card-frame::before {
            content: '';
            position: absolute; top:0;left:0;right:0;bottom:0;
            border-radius: 6px;
            background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 3px);
            pointer-events: none; z-index: 1;
        }
        .card-inner {
            width: 100%; height: 100%;
            display: flex; flex-direction: column;
            border-radius: 4px;
            overflow: hidden;
            border: 0.5px solid rgba(200,120,48,0.3);
        }

        /* Name bar — gold text on dark bronze */
        .card-name-bar {
            padding: 4px 6px;
            display: flex; align-items: center; justify-content: space-between;
            font-family: 'Orbitron', sans-serif;
            font-weight: 900;
            font-size: 7px;
            min-height: 20px;
            background: linear-gradient(180deg, rgba(60,30,10,0.85) 0%, rgba(30,15,5,0.95) 100%);
            border-bottom: 1px solid rgba(200,120,48,0.25);
            letter-spacing: 0.6px;
        }
        .card-name {
            flex: 1;
            overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
            color: #f0d080;
            text-transform: uppercase;
            text-shadow: 0 0 4px rgba(240,208,128,0.4), 0 0 10px rgba(200,150,50,0.2);
        }
        /* Attribute orb — 3D sphere effect */
        .card-attr {
            width: 15px; height: 15px;
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            font-family: 'Orbitron', sans-serif;
            font-size: 6px; font-weight: 900;
            flex-shrink: 0; margin-left: 3px;
            box-shadow: inset 0 -3px 4px rgba(0,0,0,0.35), inset 0 2px 3px rgba(255,255,255,0.25), 0 1px 3px rgba(0,0,0,0.5);
            text-shadow: 0 1px 1px rgba(0,0,0,0.6);
            border: 0.5px solid rgba(0,0,0,0.25);
            color: #fff;
        }

        /* Level stars bar */
        .card-level-bar {
            display: flex;
            justify-content: flex-end;
            padding: 1px 4px;
            gap: 1px;
            min-height: 10px;
            background: linear-gradient(180deg, rgba(30,15,5,0.6) 0%, rgba(20,10,3,0.7) 100%);
            border-bottom: 0.5px solid rgba(200,120,48,0.15);
        }
        .level-star {
            width: 8px; height: 8px;
            background: linear-gradient(180deg, #ffe88a 0%, #e6b800 40%, #cc9900 100%);
            clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
            filter: drop-shadow(0 0 2px rgba(204,153,0,0.8));
        }

        /* Art window — dark ocean with gold border */
        .card-art-box {
            flex: 1;
            position: relative; overflow: hidden;
            margin: 2px 3px;
            border: 1px solid rgba(200,120,48,0.35);
            border-radius: 2px;
            box-shadow: inset 0 0 12px rgba(0,0,0,0.5), 0 0.5px 0 rgba(200,150,80,0.1);
        }
        .card-art-bg {
            position: absolute; top:0;left:0;right:0;bottom:0;
        }
        .card-art-svg {
            position: absolute; top:0;left:0;right:0;bottom:0;
            display: flex; align-items: center; justify-content: center;
        }
        .card-art-svg svg { width: 100%; height: 100%; }

        /* Type line — bracketed, centered */
        .card-type-label {
            padding: 2px 6px;
            font-family: 'Orbitron', sans-serif;
            font-size: 5px; font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            text-align: center;
            background: linear-gradient(180deg, rgba(60,30,10,0.7) 0%, rgba(30,15,5,0.8) 100%);
            color: rgba(240,208,128,0.6);
            border-top: 0.5px solid rgba(200,120,48,0.2);
            border-bottom: 0.5px solid rgba(200,120,48,0.15);
        }

        /* Description / effect text box — parchment look */
        .card-desc-box {
            padding: 3px 5px;
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 5.5px;
            line-height: 1.4;
            min-height: 26px;
            background: linear-gradient(180deg, rgba(45,30,15,0.65) 0%, rgba(25,15,8,0.75) 100%);
            color: rgba(230,210,180,0.9);
            overflow: hidden;
            box-shadow: inset 0 1px 0 rgba(200,150,80,0.06), inset 0 -1px 0 rgba(0,0,0,0.2);
            border-top: 0.5px solid rgba(200,120,48,0.12);
        }

        /* Stats bar — ATK red, DEF blue */
        .card-stats-bar {
            display: flex;
            justify-content: flex-end;
            gap: 6px;
            padding: 2px 6px 3px;
            font-family: 'Orbitron', sans-serif;
            font-size: 7px; font-weight: 900;
            background: linear-gradient(180deg, rgba(30,15,5,0.7) 0%, rgba(20,10,3,0.85) 100%);
            letter-spacing: 0.3px;
            border-top: 0.5px solid rgba(200,120,48,0.15);
        }
        .card-stats-bar .atk-stat { color: #ff8a8a; text-shadow: 0 0 6px rgba(255,100,100,0.25); }
        .card-stats-bar .def-stat { color: #8ac5ff; text-shadow: 0 0 6px rgba(138,197,255,0.25); }

        /* ---- Frame color variants ---- */
        /* All types use the base bronze frame. The inner border tint changes per type */
        .card-frame.normal-monster { background: linear-gradient(170deg, #7a5820 0%, #6a4818 20%, #8a6828 45%, #5a3810 65%, #4a2808 100%); border-color: #d0a040; }
        .card-frame.effect-monster { background: linear-gradient(170deg, #7a4010 0%, #6a3008 20%, #8a5018 45%, #5a2808 65%, #4a1c04 100%); border-color: #d88030; }
        .card-frame.ritual-monster { background: linear-gradient(170deg, #283868 0%, #1e2e58 20%, #384878 45%, #1a2448 65%, #121a38 100%); border-color: #5878b8; }
        .card-frame.fusion-monster { background: linear-gradient(170deg, #482860 0%, #3a1e50 20%, #583870 45%, #2e1840 65%, #201030 100%); border-color: #8050a0; }
        .card-frame.synchro-monster { background: linear-gradient(170deg, #585858 0%, #484848 20%, #686868 45%, #3a3a3a 65%, #2a2a2a 100%); border-color: #a0a0a8; }
        .card-frame.spell { background: linear-gradient(170deg, #1a5038 0%, #10402a 20%, #2a6048 45%, #0e3420 65%, #082818 100%); border-color: #38a070; }
        .card-frame.trap { background: linear-gradient(170deg, #581040 0%, #480832 20%, #681850 45%, #380628 65%, #28041c 100%); border-color: #a03080; }

        /* Attribute orb colors */
        .attr-WATER { background: radial-gradient(circle at 35% 30%, #4aa8e0, #1a6090); }
        .attr-FIRE { background: radial-gradient(circle at 35% 30%, #e85040, #a02818); }
        .attr-EARTH { background: radial-gradient(circle at 35% 30%, #c0a040, #6a5010); }
        .attr-WIND { background: radial-gradient(circle at 35% 30%, #40c878, #18783a); }
        .attr-LIGHT { background: radial-gradient(circle at 35% 30%, #f0d060, #a88818); }
        .attr-DARK { background: radial-gradient(circle at 35% 30%, #9060c0, #482878); }
        .attr-SPELL { background: radial-gradient(circle at 35% 30%, #40b878, #186848); }
        .attr-TRAP { background: radial-gradient(circle at 35% 30%, #c050a0, #782060); }

        /* ===== HOLOGRAPHIC EFFECTS ===== */
        .card-holo-overlay {
            position: absolute; top:0;left:0;right:0;bottom:0;
            pointer-events: none; z-index: 2; border-radius: 6px;
        }

        /* Rare — silver name shimmer */
        .rarity-R .card-name {
            background: linear-gradient(90deg, #aaa, #f0f0f0, #aaa, #f0f0f0, #aaa);
            background-size: 300% 100%;
            -webkit-background-clip: text; background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmer 2.5s linear infinite;
        }
        @keyframes shimmer {
            0% { background-position: 300% 0; }
            100% { background-position: -300% 0; }
        }

        /* Super Rare — rainbow shimmer on art */
        .rarity-SR .card-art-box::after {
            content: ''; position: absolute; top:0;left:0;right:0;bottom:0;
            background: linear-gradient(var(--holo-angle, 135deg), transparent 15%, rgba(255,30,30,0.18) 25%, rgba(255,180,30,0.18) 35%, rgba(30,255,30,0.18) 45%, rgba(30,200,255,0.18) 55%, rgba(180,30,255,0.18) 65%, transparent 75%);
            background-size: 200% 200%;
            mix-blend-mode: color-dodge; z-index: 1;
            animation: holoSweep 3s ease-in-out infinite alternate;
        }
        @keyframes holoSweep {
            0% { --holo-angle: 100deg; opacity: 0.6; background-position: 0% 0%; }
            100% { --holo-angle: 200deg; opacity: 1; background-position: 100% 100%; }
        }

        /* Ultra Rare — gold name + rainbow */
        .rarity-UR .card-name {
            background: linear-gradient(90deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c);
            background-size: 400% 100%;
            -webkit-background-clip: text; background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmer 3s linear infinite;
        }
        .rarity-UR .card-art-box::after {
            content: ''; position: absolute; top:0;left:0;right:0;bottom:0;
            background: linear-gradient(var(--holo-angle, 135deg), transparent 10%, rgba(255,50,50,0.25) 20%, rgba(255,200,50,0.25) 35%, rgba(50,255,100,0.25) 50%, rgba(50,150,255,0.25) 65%, rgba(200,50,255,0.25) 80%, transparent 90%);
            background-size: 200% 200%;
            mix-blend-mode: color-dodge; z-index: 1;
            animation: holoSweep 3s ease-in-out infinite alternate;
        }

        /* Secret Rare — cross-hatch holographic */
        .rarity-ScR .card-name {
            background: linear-gradient(90deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c);
            background-size: 400% 100%;
            -webkit-background-clip: text; background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmer 3s linear infinite;
        }
        .rarity-ScR .card-art-box::after {
            content: ''; position: absolute; top:0;left:0;right:0;bottom:0;
            background:
                repeating-linear-gradient(var(--holo-angle, 45deg), transparent 0px, transparent 3px, rgba(255,255,255,0.12) 3px, rgba(255,255,255,0.12) 4px),
                repeating-linear-gradient(calc(var(--holo-angle, 45deg) + 90deg), transparent 0px, transparent 3px, rgba(255,255,255,0.12) 3px, rgba(255,255,255,0.12) 4px),
                linear-gradient(var(--holo-angle, 135deg), rgba(255,0,0,0.2), rgba(255,255,0,0.2), rgba(0,255,0,0.2), rgba(0,255,255,0.2), rgba(0,0,255,0.2), rgba(255,0,255,0.2), rgba(255,0,0,0.2));
            background-size: 8px 8px, 8px 8px, 300% 300%;
            mix-blend-mode: color-dodge; z-index: 1;
            animation: secretHolo 4s linear infinite;
        }
        @keyframes secretHolo {
            0% { background-position: 0 0, 0 0, 0% 0%; }
            100% { background-position: 8px 8px, -8px 8px, 300% 300%; }
        }

        /* Phantom Rare — ghostly */
        .rarity-GhR .card-front { filter: saturate(0.2) brightness(1.3) contrast(0.9); }
        .rarity-GhR .card-art-box::after {
            content: ''; position: absolute; top:0;left:0;right:0;bottom:0;
            background: linear-gradient(var(--holo-angle, 135deg), rgba(200,200,255,0.35), rgba(255,200,255,0.25), rgba(200,255,255,0.35));
            background-size: 200% 200%;
            mix-blend-mode: screen; z-index: 1;
            animation: ghostPulse 5s ease-in-out infinite;
        }
        @keyframes ghostPulse {
            0%, 100% { opacity: 0.5; background-position: 0% 0%; }
            50% { opacity: 1; background-position: 100% 100%; }
        }
        .rarity-GhR .card-holo-overlay {
            background: radial-gradient(ellipse at var(--holo-x, 50%) var(--holo-y, 50%), rgba(220,220,255,0.15) 0%, transparent 60%);
        }

        /* Embossed Rare — 3D relief */
        .rarity-UltR .card-name {
            background: linear-gradient(90deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c);
            background-size: 400% 100%;
            -webkit-background-clip: text; background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmer 3s linear infinite;
        }
        .rarity-UltR .card-art-box::after {
            content: ''; position: absolute; top:0;left:0;right:0;bottom:0;
            background: linear-gradient(var(--holo-angle, 135deg), rgba(255,200,100,0.15), rgba(100,255,200,0.15), rgba(255,100,200,0.15), rgba(100,200,255,0.15));
            background-size: 200% 200%;
            mix-blend-mode: color-dodge; z-index: 1;
            animation: ultRSweep 4s ease-in-out infinite alternate;
        }
        @keyframes ultRSweep {
            0% { background-position: 0% 0%; }
            100% { background-position: 100% 100%; }
        }
        .rarity-UltR .card-frame {
            box-shadow: inset 1px 1px 3px rgba(255,255,255,0.25), inset -1px -1px 3px rgba(0,0,0,0.4);
        }
        .rarity-UltR .card-art-svg svg {
            filter: drop-shadow(1px 1px 0px rgba(0,0,0,0.5)) drop-shadow(-1px -1px 0px rgba(255,255,255,0.15));
        }

        /* Cosmic Rare — prismatic sparkles */
        .rarity-StR .card-name {
            background: linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff, #ff6b6b);
            background-size: 600% 100%;
            -webkit-background-clip: text; background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: prismaticText 4s linear infinite;
        }
        @keyframes prismaticText {
            0% { background-position: 600% 0; }
            100% { background-position: -600% 0; }
        }
        .rarity-StR .card-art-box::after {
            content: ''; position: absolute; top:0;left:0;right:0;bottom:0;
            background:
                radial-gradient(circle at 15% 20%, rgba(255,255,255,0.8) 0px, transparent 2px),
                radial-gradient(circle at 55% 10%, rgba(255,255,255,0.6) 0px, transparent 2px),
                radial-gradient(circle at 85% 30%, rgba(255,255,255,0.9) 0px, transparent 2px),
                radial-gradient(circle at 25% 55%, rgba(255,255,255,0.5) 0px, transparent 2px),
                radial-gradient(circle at 70% 50%, rgba(255,255,255,0.7) 0px, transparent 2px),
                radial-gradient(circle at 45% 75%, rgba(255,255,255,0.8) 0px, transparent 2px),
                radial-gradient(circle at 90% 70%, rgba(255,255,255,0.6) 0px, transparent 2px),
                radial-gradient(circle at 10% 85%, rgba(255,255,255,0.7) 0px, transparent 2px),
                radial-gradient(circle at 65% 90%, rgba(255,255,255,0.5) 0px, transparent 2px),
                radial-gradient(circle at 35% 40%, rgba(255,255,255,0.6) 0px, transparent 2px),
                linear-gradient(var(--holo-angle, 135deg), rgba(255,0,0,0.12), rgba(255,255,0,0.12), rgba(0,255,0,0.12), rgba(0,255,255,0.12), rgba(0,0,255,0.12), rgba(255,0,255,0.12));
            mix-blend-mode: color-dodge; z-index: 1;
            animation: starlightTwinkle 2s ease-in-out infinite alternate;
        }
        @keyframes starlightTwinkle {
            0% { opacity: 0.4; filter: blur(0px); background-position: 0% 0%; }
            50% { opacity: 1; filter: blur(0.3px); background-position: 50% 50%; }
            100% { opacity: 0.6; filter: blur(0px); background-position: 100% 100%; }
        }

        /* 3D tilt on detail view */
        .card-detail-view { perspective: 800px; }
        .card-detail-view .card { transition: transform 0.1s ease-out; will-change: transform; }

        `;

src = src.substring(0, cssStartIdx) + newCardCSS + src.substring(cssEndIdx);
console.log('[2/4] Replaced card CSS section (CARD RENDERING through HOLOGRAPHIC EFFECTS)');

// ---------------------------------------------------------------------------
// 3. Replace renderCard function
// ---------------------------------------------------------------------------
const FUNC_START = 'function renderCard(card, opts = {}) {';
const funcStartIdx = src.indexOf(FUNC_START);

if (funcStartIdx === -1) {
    console.error('ERROR: Could not find renderCard function.');
    process.exit(1);
}

// Find the function end by counting braces from the opening `{`
const braceStart = funcStartIdx + FUNC_START.length - 1; // index of the opening `{`
let depth = 0;
let funcEndIdx = -1;
for (let i = braceStart; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') {
        depth--;
        if (depth === 0) {
            funcEndIdx = i + 1; // include the closing `}`
            break;
        }
    }
}

if (funcEndIdx === -1) {
    console.error('ERROR: Could not find end of renderCard function (unmatched braces).');
    process.exit(1);
}

const newRenderCard = `function renderCard(card, opts = {}) {
    const faceDown = opts.faceDown;
    const defPos = opts.defPos;
    const rClass = \`rarity-\${card.rarity}\`;
    const frameClass = getFrameClass(card);
    const bg = card.art?.bg || ['#1a1a2e', '#0d0d18'];
    const artSVG = getCardArtSVG(card);

    const attrColor = card.type === 'monster' ? (ATTR_COLORS[card.attribute] || '#555')
        : card.type === 'spell' ? '#1d8a5e' : '#9c2783';
    const attrLabel = card.type === 'monster' ? (ATTR_LABELS[card.attribute] || '?')
        : card.type === 'spell' ? 'SP' : 'TR';

    let levelHTML = '';
    if (card.type === 'monster' && card.level) {
        levelHTML = Array(card.level).fill('<div class="level-star"></div>').join('');
    }

    let statsHTML = '';
    if (card.type === 'monster') {
        const atkVal = opts.atkMod ? card.atk + opts.atkMod : card.atk;
        const defVal = opts.defMod ? card.def + opts.defMod : card.def;
        statsHTML = \`<div class="card-stats-bar"><span class="atk-stat">ATK/\${atkVal}</span><span class="def-stat">DEF/\${defVal}</span></div>\`;
    }

    let typeLabel = '';
    if (card.type === 'monster') {
        const sub = card.subtype || 'normal';
        const subName = sub === 'normal' ? 'Normal' : sub.charAt(0).toUpperCase() + sub.slice(1);
        const attr = card.attribute || '';
        let typeStr = \`[ \${attr} / \${subName} ]\`;
        if (card.isTuner) typeStr = \`[ \${attr} / Conduit ]\`;
        typeLabel = \`<div class="card-type-label">\${typeStr}</div>\`;
    } else {
        typeLabel = \`<div class="card-type-label">[ \${getSpellTrapLabel(card)} ]</div>\`;
    }

    const html = \`
        <div class="card \${rClass} \${faceDown ? 'face-down' : ''} \${defPos ? 'def-pos' : ''}" data-card-id="\${card.id}">
            <div class="card-front">
                <div class="card-frame \${frameClass}">
                    <div class="card-inner">
                        <div class="card-name-bar">
                            <span class="card-name">\${card.name}</span>
                            <div class="card-attr attr-\${card.type === 'monster' ? card.attribute : (card.type === 'spell' ? 'SPELL' : 'TRAP')}" style="background:\${attrColor}">\${attrLabel}</div>
                        </div>
                        \${levelHTML ? \`<div class="card-level-bar">\${levelHTML}</div>\` : ''}
                        <div class="card-art-box">
                            <div class="card-art-bg" style="background:linear-gradient(135deg, \${bg[0]}, \${bg[1]})"></div>
                            <div class="card-art-svg">\${artSVG}</div>
                        </div>
                        \${typeLabel}
                        <div class="card-desc-box">\${card.desc || ''}</div>
                        \${statsHTML}
                    </div>
                </div>
                <div class="card-holo-overlay"></div>
            </div>
            <div class="card-back">
                <div class="card-back-pattern">
                    <span class="card-back-text">CLAW<br>WARS</span>
                </div>
            </div>
        </div>
    \`;
    return html;
}`;

src = src.substring(0, funcStartIdx) + newRenderCard + src.substring(funcEndIdx);
console.log('[3/4] Replaced renderCard function');

// ---------------------------------------------------------------------------
// 4. Update responsive breakpoint detail-card-wrap font sizes
// ---------------------------------------------------------------------------

// Step 2's CSS replacement already includes the correct responsive breakpoint
// values, so step 4 is only needed if running on an older version of the file.
const old768NameBar = `.detail-card-wrap .card-name-bar { font-size: 15px; padding: 8px 12px; }`;
const new768NameBar = `.detail-card-wrap .card-name-bar { font-size: 14px; padding: 8px 12px; }`;

if (src.includes(new768NameBar)) {
    console.log('[4/4] Responsive breakpoint values already correct — skipped.');
} else if (src.includes(old768NameBar)) {
    // Apply all breakpoint replacements
    src = src.replace(old768NameBar, new768NameBar);
    src = src.replace(`.detail-card-wrap .card-desc-box { font-size: 12px; padding: 9px 11px; line-height: 1.55; }`,
                      `.detail-card-wrap .card-desc-box { font-family: 'Chakra Petch', sans-serif; font-size: 11px; padding: 9px 11px; line-height: 1.55; }`);
    src = src.replace(`.detail-card-wrap .card-stats-bar { font-size: 15px; padding: 5px 12px; }`,
                      `.detail-card-wrap .card-stats-bar { font-size: 14px; padding: 5px 12px; }`);
    src = src.replace(`.detail-card-wrap .card-type-label { font-size: 10px; }`,
                      `.detail-card-wrap .card-type-label { font-size: 9px; }`);
    src = src.replace(`.detail-card-wrap .card-name-bar { font-size: 18px; padding: 9px 14px; min-height: 38px; }`,
                      `.detail-card-wrap .card-name-bar { font-size: 16px; padding: 9px 14px; min-height: 38px; }`);
    src = src.replace(`.detail-card-wrap .card-desc-box { font-size: 14px; padding: 10px 12px; min-height: 70px; line-height: 1.55; }`,
                      `.detail-card-wrap .card-desc-box { font-size: 13px; padding: 10px 12px; min-height: 70px; line-height: 1.55; }`);
    src = src.replace(`.detail-card-wrap .card-stats-bar { font-size: 18px; padding: 6px 14px; }`,
                      `.detail-card-wrap .card-stats-bar { font-size: 16px; padding: 6px 14px; }`);
    src = src.replace(`.detail-card-wrap .card-type-label { font-size: 12px; }`,
                      `.detail-card-wrap .card-type-label { font-size: 10px; }`);
    src = src.replace(`.detail-card-wrap .card-name-bar { font-size: 22px; padding: 10px 16px; min-height: 44px; }`,
                      `.detail-card-wrap .card-name-bar { font-size: 20px; padding: 10px 16px; min-height: 44px; }`);
    src = src.replace(`.detail-card-wrap .card-desc-box { font-size: 16px; padding: 12px 14px; min-height: 80px; line-height: 1.6; }`,
                      `.detail-card-wrap .card-desc-box { font-size: 15px; padding: 12px 14px; min-height: 80px; line-height: 1.6; }`);
    src = src.replace(`.detail-card-wrap .card-stats-bar { font-size: 22px; padding: 8px 16px; }`,
                      `.detail-card-wrap .card-stats-bar { font-size: 20px; padding: 8px 16px; }`);
    src = src.replace(`.detail-card-wrap .card-type-label { font-size: 13px; }`,
                      `.detail-card-wrap .card-type-label { font-size: 12px; }`);
    console.log('[4/4] Updated responsive breakpoint detail-card-wrap font sizes');
} else {
    console.log('[4/4] Responsive breakpoints not found in old format — likely already updated by step 2. Skipping.');
}

// ---------------------------------------------------------------------------
// Write
// ---------------------------------------------------------------------------
fs.writeFileSync(FILE, src, 'utf8');
const newSize = Buffer.byteLength(src, 'utf8');
console.log(`\nWrote ${FILE}`);
console.log(`New size: ${newSize} bytes (${(newSize / 1024).toFixed(1)} KB)`);
console.log(`Delta: ${newSize > originalSize ? '+' : ''}${newSize - originalSize} bytes`);
console.log('\nDone. All card rendering redesigned.');
