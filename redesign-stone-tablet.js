#!/usr/bin/env node
/**
 * redesign-stone-tablet.js
 *
 * 1. Replaces title screen CSS+HTML: water tablet → engraved stone tablet on water
 * 2. Renames "CLAW WARS" / "Claw Wars" → "CRUSTACEAN COMBAT" / "Crustacean Combat" everywhere
 */

const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, 'apps', 'claw-wars.html');

let src = fs.readFileSync(FILE, 'utf8');
const originalSize = Buffer.byteLength(src, 'utf8');
console.log(`Read ${FILE}`);
console.log(`Original size: ${originalSize} bytes (${(originalSize / 1024).toFixed(1)} KB)`);

// ---------------------------------------------------------------------------
// 1. Replace title screen CSS
// ---------------------------------------------------------------------------
const CSS_START = '/* ===== TITLE SCREEN ===== */';
const CSS_END   = '/* ===== HEADER BAR ===== */';

const cssStartIdx = src.indexOf(CSS_START);
const cssEndIdx   = src.indexOf(CSS_END);

if (cssStartIdx === -1) { console.error('ERROR: CSS_START not found'); process.exit(1); }
if (cssEndIdx === -1)   { console.error('ERROR: CSS_END not found'); process.exit(1); }

const newTitleCSS = `/* ===== TITLE SCREEN ===== */
        #title-screen {
            align-items: center;
            justify-content: center;
            background: #06080c;
            position: relative;
            overflow: hidden;
        }

        /* ---- Water environment ---- */
        .water-surface {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background:
                radial-gradient(ellipse at 50% 70%, rgba(0,70,140,0.14) 0%, transparent 65%),
                radial-gradient(ellipse at 25% 85%, rgba(0,50,110,0.10) 0%, transparent 50%),
                radial-gradient(ellipse at 75% 50%, rgba(0,80,150,0.06) 0%, transparent 50%),
                linear-gradient(180deg, #06080c 0%, #081420 25%, #0a2038 55%, #071828 100%);
            z-index: 0;
        }

        .water-caustics {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            z-index: 1;
            opacity: 0.35;
            mix-blend-mode: screen;
            background:
                conic-gradient(from 0deg at 20% 70%, transparent 0deg, rgba(50,150,220,0.05) 10deg, transparent 20deg, transparent 90deg, rgba(50,150,220,0.04) 100deg, transparent 110deg, transparent 180deg, rgba(50,150,220,0.05) 190deg, transparent 200deg, transparent 270deg, rgba(50,150,220,0.04) 280deg, transparent 290deg),
                conic-gradient(from 45deg at 80% 30%, transparent 0deg, rgba(40,130,200,0.04) 15deg, transparent 30deg, transparent 120deg, rgba(40,130,200,0.03) 135deg, transparent 150deg, transparent 240deg, rgba(40,130,200,0.04) 255deg, transparent 270deg);
            animation: causticShift 16s ease-in-out infinite;
        }
        @keyframes causticShift {
            0% { transform: scale(1) rotate(0deg); opacity: 0.3; }
            50% { transform: scale(1.08) rotate(2deg); opacity: 0.5; }
            100% { transform: scale(1) rotate(0deg); opacity: 0.3; }
        }

        .water-waves {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            z-index: 1;
            pointer-events: none;
        }
        .water-waves::before {
            content: '';
            position: absolute;
            top: 0; left: -50%; right: -50%; bottom: 0;
            background: repeating-linear-gradient(0deg, transparent 0px, transparent 44px, rgba(60,150,220,0.018) 46px, transparent 48px, transparent 90px);
            animation: waveSlide 9s ease-in-out infinite;
            transform: skewY(-1.5deg);
        }
        .water-waves::after {
            content: '';
            position: absolute;
            top: 0; left: -50%; right: -50%; bottom: 0;
            background: repeating-linear-gradient(0deg, transparent 0px, transparent 60px, rgba(50,130,200,0.015) 62px, transparent 64px, transparent 120px);
            animation: waveSlide2 13s ease-in-out infinite;
            transform: skewY(1deg);
        }
        @keyframes waveSlide {
            0% { transform: skewY(-1.5deg) translateY(0) translateX(0); }
            50% { transform: skewY(-1deg) translateY(10px) translateX(16px); }
            100% { transform: skewY(-1.5deg) translateY(0) translateX(0); }
        }
        @keyframes waveSlide2 {
            0% { transform: skewY(1deg) translateY(0) translateX(0); }
            50% { transform: skewY(0.5deg) translateY(-7px) translateX(-12px); }
            100% { transform: skewY(1deg) translateY(0) translateX(0); }
        }

        .water-lightrays {
            position: absolute;
            bottom: 0; left: 0; right: 0;
            height: 100%;
            z-index: 1;
            pointer-events: none;
            background:
                linear-gradient(170deg, transparent 0%, transparent 42%, rgba(0,120,200,0.02) 44%, transparent 46%),
                linear-gradient(178deg, transparent 0%, transparent 52%, rgba(0,140,220,0.018) 54%, transparent 56%),
                linear-gradient(185deg, transparent 0%, transparent 58%, rgba(0,100,180,0.022) 60%, transparent 62%);
            animation: lightRayPulse 12s ease-in-out infinite;
        }
        @keyframes lightRayPulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
        }

        /* Ripple rings from stone tablet */
        .water-ripples {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            width: 0; height: 0;
            z-index: 1;
            pointer-events: none;
        }
        .ripple-ring {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            border: 1px solid rgba(80,160,220,0.10);
            border-radius: 50%;
            animation: rippleExpand 7s ease-out infinite;
        }
        .ripple-ring:nth-child(1) { animation-delay: 0s; }
        .ripple-ring:nth-child(2) { animation-delay: 1.75s; }
        .ripple-ring:nth-child(3) { animation-delay: 3.5s; }
        .ripple-ring:nth-child(4) { animation-delay: 5.25s; }
        @keyframes rippleExpand {
            0% { width: 220px; height: 130px; opacity: 0.35; border-color: rgba(80,160,220,0.12); }
            100% { width: 900px; height: 550px; opacity: 0; border-color: rgba(80,160,220,0); }
        }

        /* Water sparkles */
        .water-sparkles {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            z-index: 2;
            pointer-events: none;
        }
        .water-sparkles::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background:
                radial-gradient(1.5px 1.5px at 10% 20%, rgba(120,190,240,0.5), transparent),
                radial-gradient(1px 1px at 25% 75%, rgba(140,200,240,0.35), transparent),
                radial-gradient(1.5px 1.5px at 45% 30%, rgba(100,170,230,0.4), transparent),
                radial-gradient(1px 1px at 65% 85%, rgba(120,190,240,0.35), transparent),
                radial-gradient(1.5px 1.5px at 80% 15%, rgba(100,170,230,0.45), transparent),
                radial-gradient(1px 1px at 90% 60%, rgba(140,200,240,0.3), transparent);
            animation: sparkleFloat 11s ease-in-out infinite;
        }
        .water-sparkles::after {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background:
                radial-gradient(1px 1px at 8% 50%, rgba(180,220,250,0.4), transparent),
                radial-gradient(1px 1px at 35% 65%, rgba(160,210,245,0.3), transparent),
                radial-gradient(1px 1px at 55% 10%, rgba(180,220,250,0.35), transparent),
                radial-gradient(1px 1px at 75% 80%, rgba(160,210,245,0.3), transparent),
                radial-gradient(1px 1px at 92% 40%, rgba(180,220,250,0.35), transparent);
            animation: sparkleFloat2 14s ease-in-out infinite;
        }
        @keyframes sparkleFloat {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0.4; }
            33% { transform: translateY(-8px) translateX(6px); opacity: 0.7; }
            66% { transform: translateY(5px) translateX(-5px); opacity: 0.35; }
        }
        @keyframes sparkleFloat2 {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0.25; }
            25% { transform: translateY(6px) translateX(-8px); opacity: 0.5; }
            75% { transform: translateY(3px) translateX(8px); opacity: 0.45; }
        }

        /* ===== THE STONE TABLET ===== */
        .tablet-device {
            position: relative;
            z-index: 3;
            animation: tabletFloat 6s ease-in-out infinite;
        }
        @keyframes tabletFloat {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            30% { transform: translateY(-6px) rotate(0.3deg); }
            60% { transform: translateY(3px) rotate(-0.2deg); }
        }

        .tablet-frame {
            background:
                linear-gradient(175deg, rgba(255,255,255,0.06) 0%, transparent 30%),
                linear-gradient(145deg, #4a4540 0%, #3a352e 15%, #2e2a24 35%, #262220 55%, #1e1b18 80%, #161412 100%);
            border-radius: 6px;
            padding: 18px 16px 16px;
            position: relative;
            max-width: 380px;
            width: 90vw;
            border: 2px solid rgba(90,80,65,0.4);
            box-shadow:
                0 35px 80px rgba(0,0,0,0.8),
                0 0 50px rgba(0,60,120,0.06),
                0 0 100px rgba(0,40,80,0.03),
                inset 0 1px 0 rgba(255,255,255,0.08),
                inset 0 -1px 0 rgba(0,0,0,0.4),
                inset 2px 2px 6px rgba(0,0,0,0.3),
                inset -2px -2px 6px rgba(0,0,0,0.2);
        }
        /* Stone texture overlay */
        .tablet-frame::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            border-radius: 6px;
            background:
                radial-gradient(3px 3px at 12% 8%, rgba(255,255,255,0.04), transparent),
                radial-gradient(2px 2px at 28% 22%, rgba(255,255,255,0.03), transparent),
                radial-gradient(4px 3px at 45% 12%, rgba(255,255,255,0.025), transparent),
                radial-gradient(2px 2px at 62% 35%, rgba(255,255,255,0.04), transparent),
                radial-gradient(3px 2px at 78% 18%, rgba(255,255,255,0.03), transparent),
                radial-gradient(2px 3px at 88% 42%, rgba(255,255,255,0.025), transparent),
                radial-gradient(3px 3px at 18% 55%, rgba(255,255,255,0.03), transparent),
                radial-gradient(2px 2px at 35% 70%, rgba(255,255,255,0.025), transparent),
                radial-gradient(4px 2px at 55% 62%, rgba(255,255,255,0.04), transparent),
                radial-gradient(2px 3px at 72% 78%, rgba(255,255,255,0.03), transparent),
                radial-gradient(3px 2px at 85% 65%, rgba(255,255,255,0.025), transparent),
                radial-gradient(2px 2px at 15% 88%, rgba(255,255,255,0.03), transparent),
                radial-gradient(3px 3px at 50% 85%, rgba(255,255,255,0.025), transparent),
                radial-gradient(2px 2px at 70% 92%, rgba(255,255,255,0.04), transparent);
            pointer-events: none;
            z-index: 0;
        }
        /* Chiseled edge effect — top/left lighter, bottom/right darker */
        .tablet-frame::after {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            border-radius: 6px;
            border-top: 1px solid rgba(180,170,150,0.12);
            border-left: 1px solid rgba(180,170,150,0.08);
            border-bottom: 1px solid rgba(0,0,0,0.3);
            border-right: 1px solid rgba(0,0,0,0.2);
            pointer-events: none;
            z-index: 1;
        }

        /* Engraved inner area */
        .tablet-screen {
            background:
                linear-gradient(175deg, rgba(255,255,255,0.03) 0%, transparent 40%),
                linear-gradient(180deg, #1a1714 0%, #161310 50%, #121010 100%);
            border-radius: 3px;
            padding: 22px 16px 16px;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 480px;
            border: 1px solid rgba(60,55,45,0.5);
            box-shadow:
                inset 0 2px 8px rgba(0,0,0,0.6),
                inset 0 0 20px rgba(0,0,0,0.3),
                inset 0 -1px 0 rgba(255,255,255,0.03);
        }
        /* Carved groove lines — horizontal */
        .tablet-screen::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            border-radius: 3px;
            background:
                linear-gradient(0deg, transparent 0%, transparent 3px, rgba(60,55,45,0.08) 3px, transparent 4px, transparent 100%),
                linear-gradient(0deg, transparent 0%, transparent 97%, rgba(60,55,45,0.08) 97%, transparent 98%, transparent 100%),
                linear-gradient(90deg, transparent 0%, transparent 3px, rgba(60,55,45,0.06) 3px, transparent 4px, transparent 100%),
                linear-gradient(90deg, transparent 0%, transparent 97%, rgba(60,55,45,0.06) 97%, transparent 98%, transparent 100%);
            pointer-events: none;
            z-index: 10;
        }
        /* Subtle noise/grain for stone feel */
        .tablet-screen::after {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background:
                radial-gradient(1px 1px at 10% 15%, rgba(200,190,170,0.05), transparent),
                radial-gradient(1px 1px at 30% 40%, rgba(200,190,170,0.04), transparent),
                radial-gradient(1px 1px at 55% 25%, rgba(200,190,170,0.05), transparent),
                radial-gradient(1px 1px at 75% 60%, rgba(200,190,170,0.04), transparent),
                radial-gradient(1px 1px at 20% 70%, rgba(200,190,170,0.05), transparent),
                radial-gradient(1px 1px at 60% 80%, rgba(200,190,170,0.04), transparent),
                radial-gradient(1px 1px at 85% 35%, rgba(200,190,170,0.05), transparent),
                radial-gradient(1px 1px at 40% 90%, rgba(200,190,170,0.04), transparent);
            pointer-events: none;
            z-index: 10;
            border-radius: 3px;
        }

        /* Water reflection below stone tablet */
        .tablet-reflection {
            position: absolute;
            bottom: -70px;
            left: 50%;
            transform: translateX(-50%) scaleY(-0.25) scaleX(0.85);
            width: 90vw;
            max-width: 380px;
            height: 180px;
            background: linear-gradient(180deg, rgba(40,35,28,0.25) 0%, transparent 55%);
            border-radius: 6px;
            filter: blur(10px);
            opacity: 0.35;
            z-index: 2;
            pointer-events: none;
            animation: reflectionPulse 6s ease-in-out infinite;
        }
        @keyframes reflectionPulse {
            0%, 100% { opacity: 0.25; transform: translateX(-50%) scaleY(-0.25) scaleX(0.85); }
            50% { opacity: 0.4; transform: translateX(-50%) scaleY(-0.28) scaleX(0.88); }
        }

        /* Glow on water beneath stone */
        .tablet-water-glow {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            width: 480px;
            height: 280px;
            background: radial-gradient(ellipse, rgba(0,80,160,0.06) 0%, rgba(0,50,120,0.03) 40%, transparent 70%);
            z-index: 2;
            pointer-events: none;
            animation: waterGlow 6s ease-in-out infinite;
        }
        @keyframes waterGlow {
            0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 1; transform: translate(-50%, -50%) scale(1.06); }
        }

        /* ---- Card showcase orbiting on stone surface ---- */
        .title-showcase {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            width: 280px; height: 280px;
            z-index: 0;
            pointer-events: none;
        }
        .showcase-card {
            position: absolute;
            width: 50px;
            aspect-ratio: 0.686;
            border-radius: 3px;
            overflow: hidden;
            box-shadow: 0 2px 12px rgba(0,0,0,0.6), 0 0 8px rgba(180,160,120,0.08);
            opacity: 0;
            animation: showcaseOrbit 24s linear infinite;
            transform-origin: center center;
        }
        .showcase-card:nth-child(1) { animation-delay: 0s; }
        .showcase-card:nth-child(2) { animation-delay: -3s; }
        .showcase-card:nth-child(3) { animation-delay: -6s; }
        .showcase-card:nth-child(4) { animation-delay: -9s; }
        .showcase-card:nth-child(5) { animation-delay: -12s; }
        .showcase-card:nth-child(6) { animation-delay: -15s; }
        .showcase-card:nth-child(7) { animation-delay: -18s; }
        .showcase-card:nth-child(8) { animation-delay: -21s; }
        @keyframes showcaseOrbit {
            0% { transform: translate(-50%,-50%) rotate(0deg) translateX(110px) rotate(0deg) scale(0.55); opacity: 0; filter: blur(2px) brightness(0.3); }
            5% { opacity: 0.35; }
            12.5% { transform: translate(-50%,-50%) rotate(45deg) translateX(110px) rotate(-45deg) scale(0.75); opacity: 0.6; filter: blur(0) brightness(0.8); }
            25% { transform: translate(-50%,-50%) rotate(90deg) translateX(110px) rotate(-90deg) scale(0.85); opacity: 0.7; filter: blur(0) brightness(0.9); }
            37.5% { transform: translate(-50%,-50%) rotate(135deg) translateX(110px) rotate(-135deg) scale(0.75); opacity: 0.6; filter: blur(0) brightness(0.8); }
            50% { transform: translate(-50%,-50%) rotate(180deg) translateX(110px) rotate(-180deg) scale(0.55); opacity: 0.35; filter: blur(1px) brightness(0.4); }
            55% { opacity: 0; }
            100% { transform: translate(-50%,-50%) rotate(360deg) translateX(110px) rotate(-360deg) scale(0.55); opacity: 0; filter: blur(2px) brightness(0.3); }
        }

        /* ---- Content on the stone tablet ---- */
        .title-center {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            width: 100%;
        }

        /* Lobster mascot — carved / embossed look */
        .title-lobster {
            width: 90px;
            height: 90px;
            margin: 0 auto 6px;
            position: relative;
            animation: mascotFloat 5s ease-in-out infinite;
            filter: drop-shadow(0 0 10px rgba(200,160,100,0.2)) drop-shadow(0 4px 16px rgba(0,0,0,0.5));
        }
        .title-lobster svg { width: 90px; height: 90px; }
        .title-lobster::before {
            content: '';
            position: absolute;
            top: -16px; left: -16px; right: -16px; bottom: -16px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(200,160,100,0.08) 0%, transparent 60%);
            animation: glowBreath 4s ease-in-out infinite;
            z-index: -1;
        }
        @keyframes mascotFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
        @keyframes glowBreath {
            0%, 100% { transform: scale(1); opacity: 0.4; }
            50% { transform: scale(1.08); opacity: 0.8; }
        }

        /* Title text — engraved / chiseled stone look */
        .title-logo {
            position: relative;
            z-index: 2;
            text-align: center;
            margin-bottom: 4px;
        }
        .title-logo h1 {
            font-family: 'Orbitron', sans-serif;
            font-size: 24px;
            font-weight: 900;
            letter-spacing: 4px;
            line-height: 1.15;
            color: transparent;
            background: linear-gradient(
                180deg,
                #d4c8a8 0%,
                #c0b088 20%,
                #a89870 40%,
                #8a7a58 60%,
                #6e6244 80%,
                #584e38 100%
            );
            background-size: 100% 200%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: titleGradShift 5s ease-in-out infinite alternate;
            position: relative;
            text-shadow: none;
            filter: drop-shadow(0 1px 0 rgba(0,0,0,0.8)) drop-shadow(0 -1px 0 rgba(255,255,255,0.06)) drop-shadow(0 0 20px rgba(200,170,100,0.12));
        }
        /* Shimmer pass over engraved text */
        .title-logo h1::after {
            content: 'CRUSTACEAN COMBAT';
            position: absolute;
            top: 0; left: 0; right: 0;
            background: linear-gradient(90deg, transparent 15%, rgba(255,240,200,0.15) 50%, transparent 85%);
            background-size: 250% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: titleHighlight 5s ease-in-out infinite;
            pointer-events: none;
        }
        @keyframes titleGradShift {
            0% { background-position: 0% 0%; }
            100% { background-position: 0% 50%; }
        }
        @keyframes titleHighlight {
            0%, 100% { background-position: 250% 0; }
            50% { background-position: -250% 0; }
        }
        .title-logo .subtitle {
            font-family: 'Chakra Petch', sans-serif;
            font-size: 9px;
            color: rgba(180,165,130,0.35);
            letter-spacing: 6px;
            text-transform: uppercase;
            margin-top: 4px;
            font-weight: 600;
        }

        /* Engraved decorative line */
        .title-tagline {
            font-family: 'Chakra Petch', sans-serif;
            font-size: 11px;
            color: rgba(160,145,115,0.4);
            font-weight: 500;
            margin-bottom: 18px;
            letter-spacing: 1px;
            position: relative;
            padding-bottom: 14px;
        }
        .title-tagline::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(160,145,115,0.2), rgba(200,180,140,0.3), rgba(160,145,115,0.2), transparent);
            border-radius: 1px;
            box-shadow: 0 1px 0 rgba(0,0,0,0.4);
        }

        /* Menu buttons — carved stone buttons */
        .menu-buttons {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            gap: 7px;
            width: 100%;
        }
        .menu-btn {
            padding: 12px 20px;
            border-radius: 4px;
            font-family: 'Chakra Petch', sans-serif;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 2px;
            transition: all 0.25s cubic-bezier(.4,0,.2,1);
            position: relative;
            overflow: hidden;
            text-transform: uppercase;
        }
        .menu-btn:active { transform: scale(0.96); }
        .menu-btn.primary {
            background: linear-gradient(145deg, #4a3a20 0%, #3a2c16 30%, #2e2210 60%, #221a0c 100%);
            color: #d4c090;
            font-family: 'Orbitron', sans-serif;
            font-size: 15px;
            font-weight: 900;
            padding: 16px 20px;
            letter-spacing: 5px;
            border-radius: 5px;
            box-shadow:
                0 4px 20px rgba(0,0,0,0.5),
                inset 0 1px 0 rgba(255,240,200,0.1),
                inset 0 -2px 0 rgba(0,0,0,0.3);
            border: 1px solid rgba(160,130,80,0.2);
            text-shadow: 0 1px 2px rgba(0,0,0,0.5), 0 0 12px rgba(200,170,100,0.15);
        }
        .menu-btn.primary::before {
            content: '';
            position: absolute;
            top: 0; left: -100%; width: 60%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,240,200,0.08), transparent);
            animation: btnSweep 5s ease-in-out infinite;
        }
        @keyframes btnSweep {
            0%, 70% { left: -100%; }
            100% { left: 200%; }
        }
        .menu-btn.primary:active {
            transform: scale(0.97);
            box-shadow:
                0 2px 10px rgba(0,0,0,0.5),
                inset 0 2px 4px rgba(0,0,0,0.4),
                inset 0 -1px 0 rgba(255,240,200,0.05);
        }
        .menu-btn.secondary {
            background: linear-gradient(145deg, rgba(60,55,42,0.4) 0%, rgba(40,36,28,0.5) 100%);
            color: rgba(180,165,130,0.55);
            border: 1px solid rgba(120,105,75,0.12);
            box-shadow: 0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,240,200,0.03), inset 0 -1px 0 rgba(0,0,0,0.2);
        }
        .menu-btn.secondary:hover {
            background: linear-gradient(145deg, rgba(70,62,48,0.5) 0%, rgba(50,44,34,0.6) 100%);
            border-color: rgba(140,120,85,0.18);
            color: rgba(210,195,160,0.7);
        }
        .menu-btn.secondary:active {
            background: linear-gradient(145deg, rgba(45,40,30,0.6) 0%, rgba(35,30,22,0.7) 100%);
            transform: scale(0.97);
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);
        }

        /* Top bar indicators */
        .coin-display {
            position: absolute;
            top: 6px;
            right: 8px;
            background: rgba(30,28,20,0.7);
            border: 1px solid rgba(80,200,80,0.12);
            padding: 4px 10px;
            border-radius: 3px;
            font-weight: 800;
            color: #50c850;
            font-size: 11px;
            z-index: 12;
            letter-spacing: 0.5px;
            box-shadow: inset 0 1px 3px rgba(0,0,0,0.3);
        }

        .wallet-display {
            position: absolute;
            top: 6px;
            left: 8px;
            background: rgba(20,25,30,0.7);
            border: 1px solid rgba(0,180,255,0.1);
            padding: 4px 10px;
            border-radius: 3px;
            font-weight: 700;
            color: #00c8f0;
            font-size: 10px;
            z-index: 12;
            display: flex;
            align-items: center;
            gap: 6px;
            box-shadow: inset 0 1px 3px rgba(0,0,0,0.3);
        }
        .wallet-display .wallet-addr {
            font-family: monospace;
            font-size: 9px;
        }
        .wallet-display .wallet-change-btn {
            background: rgba(255,255,255,0.06);
            color: #6b7a94;
            border: none;
            padding: 2px 8px;
            border-radius: 3px;
            font-size: 9px;
            font-weight: 700;
            cursor: pointer;
            font-family: 'Nunito', sans-serif;
            min-height: 20px;
            min-width: 20px;
            transition: background 0.2s;
        }
        .wallet-display .wallet-change-btn:hover { background: rgba(255,255,255,0.12); }

        /* Bottom stats — etched into stone */
        .title-stats {
            display: flex;
            justify-content: center;
            gap: 24px;
            margin-top: 14px;
            z-index: 3;
            width: 100%;
            padding-top: 10px;
            border-top: 1px solid rgba(120,105,75,0.1);
        }
        .title-stat {
            text-align: center;
        }
        .title-stat-value {
            font-family: 'Orbitron', sans-serif;
            font-size: 16px;
            font-weight: 900;
            background: linear-gradient(180deg, #c8b888 0%, #8a7a58 100%);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            filter: drop-shadow(0 1px 0 rgba(0,0,0,0.6));
        }
        .title-stat-label {
            font-family: 'Chakra Petch', sans-serif;
            font-size: 8px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: rgba(140,125,95,0.4);
            font-weight: 600;
        }

        /* Version tag */
        .title-version {
            position: absolute;
            bottom: 8px;
            right: 8px;
            font-size: 8px;
            color: rgba(100,90,70,0.2);
            letter-spacing: 1px;
            z-index: 12;
        }

        `;

src = src.substring(0, cssStartIdx) + newTitleCSS + src.substring(cssEndIdx);
console.log('[1/3] Replaced title screen CSS (stone tablet)');

// ---------------------------------------------------------------------------
// 2. Replace title screen HTML
// ---------------------------------------------------------------------------
const HTML_START = '<!-- ===== TITLE SCREEN ===== -->';
const HTML_END   = '<!-- ===== COLLECTION SCREEN ===== -->';

const htmlStartIdx = src.indexOf(HTML_START);
const htmlEndIdx   = src.indexOf(HTML_END);

if (htmlStartIdx === -1) { console.error('ERROR: HTML_START not found'); process.exit(1); }
if (htmlEndIdx === -1)   { console.error('ERROR: HTML_END not found'); process.exit(1); }

const newTitleHTML = `<!-- ===== TITLE SCREEN ===== -->
    <div id="title-screen" class="screen active">
        <!-- Water environment -->
        <div class="water-surface"></div>
        <div class="water-caustics"></div>
        <div class="water-waves"></div>
        <div class="water-lightrays"></div>
        <div class="water-sparkles"></div>

        <!-- Ripple rings from stone tablet -->
        <div class="water-ripples">
            <div class="ripple-ring"></div>
            <div class="ripple-ring"></div>
            <div class="ripple-ring"></div>
            <div class="ripple-ring"></div>
        </div>

        <!-- Water glow beneath -->
        <div class="tablet-water-glow"></div>

        <!-- The stone tablet -->
        <div class="tablet-device">
            <div class="tablet-frame">
                <!-- Wallet & coins carved into stone edge -->
                <div class="coin-display" id="title-coins">$DD 0</div>
                <div class="wallet-display" id="title-wallet">
                    <span class="wallet-addr" id="title-wallet-addr">No Wallet</span>
                    <button class="wallet-change-btn" id="title-wallet-btn" onclick="showWalletModal()">Connect</button>
                </div>

                <!-- Engraved inner surface -->
                <div class="tablet-screen">
                    <!-- Card showcase orbiting -->
                    <div class="title-showcase" id="title-showcase"></div>

                    <!-- Stone tablet content -->
                    <div class="title-center">
                        <div class="title-logo">
                            <div class="title-lobster">
                                <svg viewBox="0 0 120 120" width="90" height="90">
                                    <defs>
                                        <linearGradient id="lobster-grad" x1="0" y1="0" x2="1" y2="1">
                                            <stop offset="0%" stop-color="#c8a060"/>
                                            <stop offset="50%" stop-color="#a08040"/>
                                            <stop offset="100%" stop-color="#806228"/>
                                        </linearGradient>
                                        <filter id="lobster-glow">
                                            <feGaussianBlur stdDeviation="2" result="g"/>
                                            <feComposite in="g" in2="g" operator="arithmetic" k1="0" k2="2" k3="0" k4="0"/>
                                        </filter>
                                    </defs>
                                    <g filter="url(#lobster-glow)" opacity="0.3">
                                        <ellipse cx="60" cy="62" rx="20" ry="28" fill="#b89050"/>
                                        <circle cx="60" cy="34" r="15" fill="#b89050"/>
                                    </g>
                                    <g fill="url(#lobster-grad)">
                                        <ellipse cx="60" cy="62" rx="18" ry="26"/>
                                        <circle cx="60" cy="34" r="13"/>
                                        <path d="M47 48 L28 34 L16 22 L24 34 L14 46 L30 38Z"/>
                                        <path d="M73 48 L92 34 L104 22 L96 34 L106 46 L90 38Z"/>
                                        <path d="M50 86 L44 102 L54 96 L60 106 L66 96 L76 102 L70 86Z"/>
                                        <circle cx="54" cy="30" r="3.5" fill="rgba(255,250,230,0.7)"/>
                                        <circle cx="66" cy="30" r="3.5" fill="rgba(255,250,230,0.7)"/>
                                        <circle cx="54" cy="30" r="1.8" fill="#2a2010"/>
                                        <circle cx="66" cy="30" r="1.8" fill="#2a2010"/>
                                        <circle cx="55" cy="29" r="0.8" fill="rgba(255,250,230,0.6)" opacity="0.8"/>
                                        <circle cx="67" cy="29" r="0.8" fill="rgba(255,250,230,0.6)" opacity="0.8"/>
                                        <path d="M54 22 Q40 4 26 0" stroke="#b89050" fill="none" stroke-width="2.5" stroke-linecap="round"/>
                                        <path d="M66 22 Q80 4 94 0" stroke="#b89050" fill="none" stroke-width="2.5" stroke-linecap="round"/>
                                        <line x1="48" y1="72" x2="32" y2="88" stroke="#907038" stroke-width="2.5" stroke-linecap="round"/>
                                        <line x1="52" y1="78" x2="38" y2="94" stroke="#907038" stroke-width="2.5" stroke-linecap="round"/>
                                        <line x1="72" y1="72" x2="88" y2="88" stroke="#907038" stroke-width="2.5" stroke-linecap="round"/>
                                        <line x1="68" y1="78" x2="82" y2="94" stroke="#907038" stroke-width="2.5" stroke-linecap="round"/>
                                        <ellipse cx="60" cy="52" rx="14" ry="2" fill="none" stroke="rgba(255,250,230,0.1)" stroke-width="0.8"/>
                                        <ellipse cx="60" cy="62" rx="16" ry="2" fill="none" stroke="rgba(255,250,230,0.08)" stroke-width="0.8"/>
                                        <ellipse cx="60" cy="72" rx="14" ry="2" fill="none" stroke="rgba(255,250,230,0.06)" stroke-width="0.8"/>
                                    </g>
                                </svg>
                            </div>
                            <h1>CRUSTACEAN COMBAT</h1>
                            <div class="subtitle">Trading Card Game</div>
                        </div>
                        <div class="title-tagline">Battle. Collect. Dominate the Reef.</div>
                        <div class="menu-buttons">
                            <button class="menu-btn primary" onclick="startDuel()">DUEL</button>
                            <button class="menu-btn secondary" onclick="showScreen('collection-screen')">COLLECTION</button>
                            <button class="menu-btn secondary" onclick="showScreen('pack-screen')">OPEN PACKS</button>
                            <button class="menu-btn secondary" onclick="openStore()">BUY $DD</button>
                            <button class="menu-btn secondary" onclick="showScreen('deckbuilder-screen')">DECK BUILDER</button>
                            <button class="menu-btn secondary" onclick="showScreen('howto-screen')">HOW TO PLAY</button>
                        </div>
                        <div class="title-stats" id="title-stats"></div>
                    </div>
                </div>
            </div>
            <div class="tablet-reflection"></div>
        </div>

        <div class="title-version">v1.0</div>
    </div>

    `;

src = src.substring(0, htmlStartIdx) + newTitleHTML + src.substring(htmlEndIdx);
console.log('[2/3] Replaced title screen HTML');

// ---------------------------------------------------------------------------
// 3. Rename CLAW WARS → CRUSTACEAN COMBAT everywhere
// ---------------------------------------------------------------------------
let renameCount = 0;

// Page title
if (src.includes('<title>Claw Wars</title>')) {
    src = src.replace('<title>Claw Wars</title>', '<title>Crustacean Combat</title>');
    renameCount++;
}

// CSS h1::after content (already handled in new CSS above, but catch any leftover)
const oldContent = "content: 'CLAW WARS'";
if (src.includes(oldContent)) {
    src = src.split(oldContent).join("content: 'CRUSTACEAN COMBAT'");
    renameCount++;
}

// HTML h1 text (already handled in new HTML above, but catch any leftover)
if (src.includes('>CLAW WARS<')) {
    src = src.split('>CLAW WARS<').join('>CRUSTACEAN COMBAT<');
    renameCount++;
}

// Wallet modal text
if (src.includes('the currency for Claw Wars')) {
    src = src.replace('the currency for Claw Wars', 'the currency for Crustacean Combat');
    renameCount++;
}

// How-to-play text
if (src.includes('Claw Wars is a strategic')) {
    src = src.replace('Claw Wars is a strategic', 'Crustacean Combat is a strategic');
    renameCount++;
}

// Catch any remaining "Claw Wars" (case-sensitive)
let remaining = (src.match(/Claw Wars/g) || []).length;
if (remaining > 0) {
    src = src.split('Claw Wars').join('Crustacean Combat');
    renameCount += remaining;
}
remaining = (src.match(/CLAW WARS/g) || []).length;
if (remaining > 0) {
    src = src.split('CLAW WARS').join('CRUSTACEAN COMBAT');
    renameCount += remaining;
}

console.log('[3/3] Renamed game to Crustacean Combat (' + renameCount + ' replacements)');

// ---------------------------------------------------------------------------
// Write
// ---------------------------------------------------------------------------
fs.writeFileSync(FILE, src, 'utf8');
const newSize = Buffer.byteLength(src, 'utf8');
console.log('\\nWrote ' + FILE);
console.log('New size: ' + newSize + ' bytes (' + (newSize / 1024).toFixed(1) + ' KB)');
console.log('Delta: ' + (newSize > originalSize ? '+' : '') + (newSize - originalSize) + ' bytes');
console.log('\\nDone. Stone tablet + Crustacean Combat rename applied.');
