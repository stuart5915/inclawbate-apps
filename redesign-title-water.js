#!/usr/bin/env node
/**
 * redesign-title-water.js
 *
 * Replaces the title screen with a tablet-floating-on-water design.
 * - Water surface with animated caustic light patterns and wave ripples
 * - A 3D tablet device floating on the water, gently bobbing
 * - Ripple rings emanating outward from the tablet
 * - Light rays from beneath the surface
 * - All game content displayed "on the tablet screen"
 *
 * Preserves all element IDs, onclick handlers, and JS hooks.
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
//    From: /* ===== TITLE SCREEN ===== */
//    To just before: /* ===== HEADER BAR ===== */
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
            background: #010a14;
            position: relative;
            overflow: hidden;
        }

        /* Deep ocean water surface */
        .water-surface {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background:
                radial-gradient(ellipse at 50% 60%, rgba(0,80,160,0.18) 0%, transparent 70%),
                radial-gradient(ellipse at 30% 80%, rgba(0,60,120,0.12) 0%, transparent 50%),
                radial-gradient(ellipse at 70% 40%, rgba(0,100,180,0.08) 0%, transparent 50%),
                linear-gradient(180deg, #010a14 0%, #021a2e 30%, #0a2844 60%, #08203a 100%);
            z-index: 0;
        }

        /* Animated caustic light pattern on water */
        .water-caustics {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            z-index: 1;
            opacity: 0.5;
            mix-blend-mode: screen;
            background:
                conic-gradient(from 0deg at 25% 65%, transparent 0deg, rgba(60,180,255,0.06) 8deg, transparent 16deg, transparent 60deg, rgba(80,200,255,0.05) 68deg, transparent 76deg, transparent 120deg, rgba(40,160,240,0.06) 128deg, transparent 136deg, transparent 180deg, rgba(60,180,255,0.04) 188deg, transparent 196deg, transparent 240deg, rgba(80,200,255,0.05) 248deg, transparent 256deg, transparent 300deg, rgba(40,160,240,0.06) 308deg, transparent 316deg),
                conic-gradient(from 60deg at 75% 35%, transparent 0deg, rgba(40,200,255,0.05) 12deg, transparent 24deg, transparent 80deg, rgba(60,220,255,0.04) 92deg, transparent 104deg, transparent 160deg, rgba(40,200,255,0.05) 172deg, transparent 184deg, transparent 240deg, rgba(60,220,255,0.04) 252deg, transparent 264deg, transparent 320deg, rgba(40,200,255,0.05) 332deg, transparent 344deg);
            animation: causticShift 14s ease-in-out infinite;
        }
        @keyframes causticShift {
            0% { transform: scale(1) rotate(0deg); opacity: 0.4; }
            33% { transform: scale(1.1) rotate(2deg); opacity: 0.6; }
            66% { transform: scale(1.05) rotate(-1deg); opacity: 0.5; }
            100% { transform: scale(1) rotate(0deg); opacity: 0.4; }
        }

        /* Horizontal wave lines across surface */
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
            background:
                repeating-linear-gradient(
                    0deg,
                    transparent 0px,
                    transparent 38px,
                    rgba(80,180,255,0.025) 40px,
                    transparent 42px,
                    transparent 80px
                );
            animation: waveSlide 8s linear infinite;
            transform: skewY(-1.5deg);
        }
        .water-waves::after {
            content: '';
            position: absolute;
            top: 0; left: -50%; right: -50%; bottom: 0;
            background:
                repeating-linear-gradient(
                    0deg,
                    transparent 0px,
                    transparent 55px,
                    rgba(60,160,240,0.02) 57px,
                    transparent 59px,
                    transparent 110px
                );
            animation: waveSlide2 12s linear infinite;
            transform: skewY(1deg);
        }
        @keyframes waveSlide {
            0% { transform: skewY(-1.5deg) translateY(0) translateX(0); }
            50% { transform: skewY(-1deg) translateY(12px) translateX(20px); }
            100% { transform: skewY(-1.5deg) translateY(0) translateX(0); }
        }
        @keyframes waveSlide2 {
            0% { transform: skewY(1deg) translateY(0) translateX(0); }
            50% { transform: skewY(0.5deg) translateY(-8px) translateX(-15px); }
            100% { transform: skewY(1deg) translateY(0) translateX(0); }
        }

        /* Light rays from beneath */
        .water-lightrays {
            position: absolute;
            bottom: 0; left: 0; right: 0;
            height: 100%;
            z-index: 1;
            pointer-events: none;
            background:
                linear-gradient(172deg, transparent 0%, transparent 40%, rgba(0,140,255,0.03) 42%, transparent 44%),
                linear-gradient(168deg, transparent 0%, transparent 55%, rgba(0,180,255,0.025) 57%, transparent 59%),
                linear-gradient(176deg, transparent 0%, transparent 45%, rgba(0,120,220,0.02) 47%, transparent 49%),
                linear-gradient(182deg, transparent 0%, transparent 50%, rgba(0,160,255,0.03) 52%, transparent 54%),
                linear-gradient(188deg, transparent 0%, transparent 60%, rgba(0,140,255,0.025) 62%, transparent 64%);
            animation: lightRayPulse 10s ease-in-out infinite;
        }
        @keyframes lightRayPulse {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
        }

        /* Ripple rings from tablet */
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
            border: 1px solid rgba(80,180,255,0.12);
            border-radius: 50%;
            animation: rippleExpand 6s ease-out infinite;
        }
        .ripple-ring:nth-child(1) { animation-delay: 0s; }
        .ripple-ring:nth-child(2) { animation-delay: 1.5s; }
        .ripple-ring:nth-child(3) { animation-delay: 3s; }
        .ripple-ring:nth-child(4) { animation-delay: 4.5s; }
        @keyframes rippleExpand {
            0% { width: 200px; height: 120px; opacity: 0.4; border-color: rgba(80,180,255,0.15); }
            100% { width: 900px; height: 550px; opacity: 0; border-color: rgba(80,180,255,0); }
        }

        /* === THE TABLET === */
        .tablet-device {
            position: relative;
            z-index: 3;
            animation: tabletFloat 5s ease-in-out infinite;
            perspective: 1200px;
        }
        @keyframes tabletFloat {
            0%, 100% { transform: translateY(0) rotateX(0deg); }
            30% { transform: translateY(-8px) rotateX(0.5deg); }
            60% { transform: translateY(4px) rotateX(-0.3deg); }
        }

        .tablet-frame {
            background: linear-gradient(145deg, #1a1e2e 0%, #0e1220 40%, #080c18 100%);
            border-radius: 22px;
            padding: 14px;
            box-shadow:
                0 30px 80px rgba(0,0,0,0.7),
                0 0 60px rgba(0,100,200,0.08),
                0 0 120px rgba(0,80,160,0.04),
                inset 0 1px 0 rgba(255,255,255,0.08),
                inset 0 -1px 0 rgba(0,0,0,0.5);
            border: 1px solid rgba(80,140,200,0.08);
            position: relative;
            max-width: 380px;
            width: 90vw;
        }
        /* Subtle bezel highlight */
        .tablet-frame::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 50%;
            border-radius: 22px 22px 0 0;
            background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%);
            pointer-events: none;
        }
        /* Camera dot */
        .tablet-frame::after {
            content: '';
            position: absolute;
            top: 6px;
            left: 50%;
            transform: translateX(-50%);
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(40,80,120,0.6) 30%, rgba(20,40,60,0.4) 100%);
            border: 1px solid rgba(60,100,140,0.15);
        }

        /* The screen area */
        .tablet-screen {
            background: linear-gradient(180deg, #050a14 0%, #08101e 50%, #060e1a 100%);
            border-radius: 10px;
            padding: 20px 16px 16px;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 480px;
        }
        /* Screen edge glow */
        .tablet-screen::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            border-radius: 10px;
            border: 1px solid rgba(60,140,220,0.06);
            box-shadow: inset 0 0 30px rgba(0,80,180,0.04);
            pointer-events: none;
            z-index: 10;
        }
        /* Scan line overlay for screen feel */
        .tablet-screen::after {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: repeating-linear-gradient(
                0deg,
                transparent 0px,
                transparent 2px,
                rgba(0,0,0,0.03) 2px,
                rgba(0,0,0,0.03) 4px
            );
            pointer-events: none;
            z-index: 10;
            border-radius: 10px;
        }

        /* Tablet water reflection below */
        .tablet-reflection {
            position: absolute;
            bottom: -80px;
            left: 50%;
            transform: translateX(-50%) scaleY(-0.3) scaleX(0.85);
            width: 90vw;
            max-width: 380px;
            height: 200px;
            background: linear-gradient(180deg, rgba(10,30,60,0.2) 0%, transparent 60%);
            border-radius: 22px;
            filter: blur(8px);
            opacity: 0.4;
            z-index: 2;
            pointer-events: none;
            animation: reflectionPulse 5s ease-in-out infinite;
        }
        @keyframes reflectionPulse {
            0%, 100% { opacity: 0.3; transform: translateX(-50%) scaleY(-0.3) scaleX(0.85); }
            50% { opacity: 0.5; transform: translateX(-50%) scaleY(-0.35) scaleX(0.9); }
        }

        /* Water glow beneath tablet */
        .tablet-water-glow {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            width: 500px;
            height: 300px;
            background: radial-gradient(ellipse, rgba(0,100,200,0.08) 0%, rgba(0,60,140,0.04) 40%, transparent 70%);
            z-index: 2;
            pointer-events: none;
            animation: waterGlow 5s ease-in-out infinite;
        }
        @keyframes waterGlow {
            0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 1; transform: translate(-50%, -50%) scale(1.08); }
        }

        /* ---- Card showcase orbiting inside tablet ---- */
        .title-showcase {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            width: 300px; height: 300px;
            z-index: 0;
            pointer-events: none;
        }
        .showcase-card {
            position: absolute;
            width: 55px;
            aspect-ratio: 0.686;
            border-radius: 4px;
            overflow: hidden;
            box-shadow: 0 2px 15px rgba(0,0,0,0.5), 0 0 10px rgba(0,100,200,0.1);
            opacity: 0;
            animation: showcaseOrbit 22s linear infinite;
            transform-origin: center center;
        }
        .showcase-card:nth-child(1) { animation-delay: 0s; }
        .showcase-card:nth-child(2) { animation-delay: -2.75s; }
        .showcase-card:nth-child(3) { animation-delay: -5.5s; }
        .showcase-card:nth-child(4) { animation-delay: -8.25s; }
        .showcase-card:nth-child(5) { animation-delay: -11s; }
        .showcase-card:nth-child(6) { animation-delay: -13.75s; }
        .showcase-card:nth-child(7) { animation-delay: -16.5s; }
        .showcase-card:nth-child(8) { animation-delay: -19.25s; }
        @keyframes showcaseOrbit {
            0% { transform: translate(-50%,-50%) rotate(0deg) translateX(120px) rotate(0deg) scale(0.6); opacity: 0; filter: blur(2px) brightness(0.4); }
            5% { opacity: 0.4; }
            12.5% { transform: translate(-50%,-50%) rotate(45deg) translateX(120px) rotate(-45deg) scale(0.8); opacity: 0.7; filter: blur(0) brightness(0.9); }
            25% { transform: translate(-50%,-50%) rotate(90deg) translateX(120px) rotate(-90deg) scale(0.9); opacity: 0.8; filter: blur(0) brightness(1); }
            37.5% { transform: translate(-50%,-50%) rotate(135deg) translateX(120px) rotate(-135deg) scale(0.8); opacity: 0.7; filter: blur(0) brightness(0.9); }
            50% { transform: translate(-50%,-50%) rotate(180deg) translateX(120px) rotate(-180deg) scale(0.6); opacity: 0.4; filter: blur(1px) brightness(0.5); }
            55% { opacity: 0; }
            100% { transform: translate(-50%,-50%) rotate(360deg) translateX(120px) rotate(-360deg) scale(0.6); opacity: 0; filter: blur(2px) brightness(0.4); }
        }

        /* ---- Content inside the tablet screen ---- */
        .title-center {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            width: 100%;
        }

        /* Lobster mascot */
        .title-lobster {
            width: 100px;
            height: 100px;
            margin: 0 auto 4px;
            position: relative;
            animation: mascotFloat 4s ease-in-out infinite;
            filter: drop-shadow(0 0 16px rgba(255,60,40,0.35)) drop-shadow(0 6px 20px rgba(0,0,0,0.4));
        }
        .title-lobster svg { width: 100px; height: 100px; }
        .title-lobster::before {
            content: '';
            position: absolute;
            top: -20px; left: -20px; right: -20px; bottom: -20px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255,68,68,0.15) 0%, transparent 60%);
            animation: glowBreath 3s ease-in-out infinite;
            z-index: -1;
        }
        @keyframes mascotFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
        }
        @keyframes glowBreath {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 0.9; }
        }

        /* Title text */
        .title-logo {
            position: relative;
            z-index: 2;
            text-align: center;
            margin-bottom: 6px;
        }
        .title-logo h1 {
            font-size: 36px;
            font-weight: 900;
            letter-spacing: 6px;
            line-height: 1;
            background: linear-gradient(180deg, #fff 0%, #ffe0a0 15%, #ff8844 35%, #ff4444 55%, #cc2222 75%, #881111 100%);
            background-size: 100% 200%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: titleGradShift 4s ease-in-out infinite alternate;
            filter: drop-shadow(0 0 12px rgba(255,68,68,0.4)) drop-shadow(0 2px 6px rgba(0,0,0,0.6));
            position: relative;
        }
        .title-logo h1::after {
            content: 'CLAW WARS';
            position: absolute;
            top: 0; left: 0; right: 0;
            background: linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.25) 50%, transparent 80%);
            background-size: 200% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: titleHighlight 3s ease-in-out infinite;
            pointer-events: none;
        }
        @keyframes titleGradShift {
            0% { background-position: 0% 0%; }
            100% { background-position: 0% 60%; }
        }
        @keyframes titleHighlight {
            0%, 100% { background-position: 200% 0; }
            50% { background-position: -200% 0; }
        }
        .title-logo .subtitle {
            font-size: 9px;
            color: rgba(255,180,120,0.45);
            letter-spacing: 8px;
            text-transform: uppercase;
            margin-top: 3px;
            font-weight: 800;
        }

        /* Tagline */
        .title-tagline {
            font-size: 12px;
            color: rgba(160,180,210,0.5);
            font-weight: 600;
            margin-bottom: 16px;
            letter-spacing: 0.5px;
        }

        /* Menu buttons inside tablet */
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
            border-radius: 10px;
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 2px;
            transition: all 0.25s cubic-bezier(.4,0,.2,1);
            position: relative;
            overflow: hidden;
            text-transform: uppercase;
        }
        .menu-btn:active { transform: scale(0.96); }
        .menu-btn.primary {
            background: linear-gradient(135deg, #b22222 0%, #e63c3c 40%, #ff5252 70%, #ff7b52 100%);
            color: white;
            font-size: 17px;
            font-weight: 900;
            padding: 16px 20px;
            letter-spacing: 5px;
            border-radius: 12px;
            box-shadow:
                0 0 15px rgba(230,60,60,0.25),
                0 0 40px rgba(230,60,60,0.08),
                0 4px 20px rgba(0,0,0,0.3),
                inset 0 1px 0 rgba(255,255,255,0.2),
                inset 0 -2px 0 rgba(0,0,0,0.2);
            border: 1px solid rgba(255,150,100,0.15);
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .menu-btn.primary::before {
            content: '';
            position: absolute;
            top: 0; left: -100%; width: 60%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
            animation: btnSweep 4s ease-in-out infinite;
        }
        @keyframes btnSweep {
            0%, 70% { left: -100%; }
            100% { left: 200%; }
        }
        .menu-btn.primary:active {
            transform: scale(0.97);
            box-shadow:
                0 0 25px rgba(230,60,60,0.4),
                0 2px 10px rgba(0,0,0,0.3),
                inset 0 1px 0 rgba(255,255,255,0.2);
        }
        .menu-btn.secondary {
            background: rgba(255,255,255,0.03);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            color: rgba(180,195,215,0.65);
            border: 1px solid rgba(255,255,255,0.04);
            box-shadow: 0 2px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.02);
            font-size: 12px;
        }
        .menu-btn.secondary:hover {
            background: rgba(255,255,255,0.06);
            border-color: rgba(255,255,255,0.08);
            color: #d8e2f0;
        }
        .menu-btn.secondary:active { background: rgba(255,255,255,0.08); transform: scale(0.97); }

        /* Top bar indicators — positioned on tablet frame */
        .coin-display {
            position: absolute;
            top: 6px;
            right: 8px;
            background: rgba(30,60,30,0.5);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(80,200,80,0.12);
            padding: 4px 10px;
            border-radius: 16px;
            font-weight: 800;
            color: #50c850;
            font-size: 11px;
            z-index: 12;
            letter-spacing: 0.5px;
        }

        .wallet-display {
            position: absolute;
            top: 6px;
            left: 8px;
            background: rgba(0,30,60,0.5);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(0,180,255,0.1);
            padding: 4px 10px;
            border-radius: 16px;
            font-weight: 700;
            color: #00c8f0;
            font-size: 10px;
            z-index: 12;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .wallet-display .wallet-addr {
            font-family: monospace;
            font-size: 9px;
        }
        .wallet-display .wallet-change-btn {
            background: rgba(255,255,255,0.08);
            color: #6b7a94;
            border: none;
            padding: 2px 8px;
            border-radius: 10px;
            font-size: 9px;
            font-weight: 700;
            cursor: pointer;
            font-family: 'Nunito', sans-serif;
            min-height: 20px;
            min-width: 20px;
            transition: background 0.2s;
        }
        .wallet-display .wallet-change-btn:hover { background: rgba(255,255,255,0.14); }

        /* Bottom stats bar — inside tablet */
        .title-stats {
            display: flex;
            justify-content: center;
            gap: 24px;
            margin-top: 12px;
            z-index: 3;
            width: 100%;
        }
        .title-stat {
            text-align: center;
        }
        .title-stat-value {
            font-size: 18px;
            font-weight: 900;
            background: linear-gradient(180deg, #fff 0%, #8aa8cc 100%);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .title-stat-label {
            font-size: 8px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: rgba(120,140,170,0.45);
            font-weight: 700;
        }

        /* Version tag */
        .title-version {
            position: absolute;
            bottom: 8px;
            right: 8px;
            font-size: 8px;
            color: rgba(80,100,130,0.25);
            letter-spacing: 1px;
            z-index: 12;
        }

        /* Floating sparkle particles on the water */
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
                radial-gradient(1.5px 1.5px at 8% 25%, rgba(120,200,255,0.6), transparent),
                radial-gradient(1px 1px at 15% 72%, rgba(160,220,255,0.4), transparent),
                radial-gradient(2px 2px at 28% 15%, rgba(100,180,255,0.5), transparent),
                radial-gradient(1px 1px at 42% 88%, rgba(140,210,255,0.4), transparent),
                radial-gradient(1.5px 1.5px at 55% 35%, rgba(120,200,255,0.5), transparent),
                radial-gradient(1px 1px at 68% 62%, rgba(160,220,255,0.3), transparent),
                radial-gradient(2px 2px at 82% 20%, rgba(100,180,255,0.5), transparent),
                radial-gradient(1px 1px at 92% 78%, rgba(140,210,255,0.4), transparent);
            animation: sparkleFloat 10s ease-in-out infinite;
        }
        .water-sparkles::after {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background:
                radial-gradient(1px 1px at 5% 55%, rgba(200,240,255,0.5), transparent),
                radial-gradient(1.5px 1.5px at 22% 40%, rgba(180,230,255,0.4), transparent),
                radial-gradient(1px 1px at 38% 70%, rgba(200,240,255,0.3), transparent),
                radial-gradient(1px 1px at 60% 12%, rgba(180,230,255,0.5), transparent),
                radial-gradient(1.5px 1.5px at 75% 85%, rgba(200,240,255,0.4), transparent),
                radial-gradient(1px 1px at 88% 48%, rgba(180,230,255,0.3), transparent);
            animation: sparkleFloat2 13s ease-in-out infinite;
        }
        @keyframes sparkleFloat {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0.5; }
            33% { transform: translateY(-10px) translateX(8px); opacity: 0.8; }
            66% { transform: translateY(6px) translateX(-6px); opacity: 0.4; }
        }
        @keyframes sparkleFloat2 {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
            25% { transform: translateY(8px) translateX(-10px); opacity: 0.6; }
            50% { transform: translateY(-5px) translateX(4px); opacity: 0.35; }
            75% { transform: translateY(4px) translateX(10px); opacity: 0.55; }
        }

        `;

src = src.substring(0, cssStartIdx) + newTitleCSS + src.substring(cssEndIdx);
console.log('[1/2] Replaced title screen CSS');

// ---------------------------------------------------------------------------
// 2. Replace title screen HTML
//    From: <!-- ===== TITLE SCREEN ===== -->
//    To just before: <!-- ===== COLLECTION SCREEN ===== -->
// ---------------------------------------------------------------------------
const HTML_START = '<!-- ===== TITLE SCREEN ===== -->';
const HTML_END   = '<!-- ===== COLLECTION SCREEN ===== -->';

const htmlStartIdx = src.indexOf(HTML_START);
const htmlEndIdx   = src.indexOf(HTML_END);

if (htmlStartIdx === -1) { console.error('ERROR: HTML_START not found'); process.exit(1); }
if (htmlEndIdx === -1)   { console.error('ERROR: HTML_END not found'); process.exit(1); }

const newTitleHTML = `<!-- ===== TITLE SCREEN ===== -->
    <div id="title-screen" class="screen active">
        <!-- Water environment layers -->
        <div class="water-surface"></div>
        <div class="water-caustics"></div>
        <div class="water-waves"></div>
        <div class="water-lightrays"></div>
        <div class="water-sparkles"></div>

        <!-- Ripple rings emanating from tablet -->
        <div class="water-ripples">
            <div class="ripple-ring"></div>
            <div class="ripple-ring"></div>
            <div class="ripple-ring"></div>
            <div class="ripple-ring"></div>
        </div>

        <!-- Glow on water beneath tablet -->
        <div class="tablet-water-glow"></div>

        <!-- The tablet device floating on water -->
        <div class="tablet-device">
            <div class="tablet-frame">
                <!-- Wallet & coins on tablet bezel -->
                <div class="coin-display" id="title-coins">$DD 0</div>
                <div class="wallet-display" id="title-wallet">
                    <span class="wallet-addr" id="title-wallet-addr">No Wallet</span>
                    <button class="wallet-change-btn" id="title-wallet-btn" onclick="showWalletModal()">Connect</button>
                </div>

                <!-- Tablet screen -->
                <div class="tablet-screen">
                    <!-- Orbiting showcase cards -->
                    <div class="title-showcase" id="title-showcase"></div>

                    <!-- Screen content -->
                    <div class="title-center">
                        <div class="title-logo">
                            <div class="title-lobster">
                                <svg viewBox="0 0 120 120" width="100" height="100">
                                    <defs>
                                        <linearGradient id="lobster-grad" x1="0" y1="0" x2="1" y2="1">
                                            <stop offset="0%" stop-color="#ff5555"/>
                                            <stop offset="50%" stop-color="#dd2222"/>
                                            <stop offset="100%" stop-color="#aa1111"/>
                                        </linearGradient>
                                        <filter id="lobster-glow">
                                            <feGaussianBlur stdDeviation="2" result="g"/>
                                            <feComposite in="g" in2="g" operator="arithmetic" k1="0" k2="2" k3="0" k4="0"/>
                                        </filter>
                                    </defs>
                                    <g filter="url(#lobster-glow)" opacity="0.4">
                                        <ellipse cx="60" cy="62" rx="20" ry="28" fill="#ff4444"/>
                                        <circle cx="60" cy="34" r="15" fill="#ff4444"/>
                                    </g>
                                    <g fill="url(#lobster-grad)">
                                        <ellipse cx="60" cy="62" rx="18" ry="26"/>
                                        <circle cx="60" cy="34" r="13"/>
                                        <path d="M47 48 L28 34 L16 22 L24 34 L14 46 L30 38Z"/>
                                        <path d="M73 48 L92 34 L104 22 L96 34 L106 46 L90 38Z"/>
                                        <path d="M50 86 L44 102 L54 96 L60 106 L66 96 L76 102 L70 86Z"/>
                                        <circle cx="54" cy="30" r="3.5" fill="#fff"/>
                                        <circle cx="66" cy="30" r="3.5" fill="#fff"/>
                                        <circle cx="54" cy="30" r="1.8" fill="#111"/>
                                        <circle cx="66" cy="30" r="1.8" fill="#111"/>
                                        <circle cx="55" cy="29" r="0.8" fill="#fff" opacity="0.8"/>
                                        <circle cx="67" cy="29" r="0.8" fill="#fff" opacity="0.8"/>
                                        <path d="M54 22 Q40 4 26 0" stroke="#ff4444" fill="none" stroke-width="2.5" stroke-linecap="round"/>
                                        <path d="M66 22 Q80 4 94 0" stroke="#ff4444" fill="none" stroke-width="2.5" stroke-linecap="round"/>
                                        <line x1="48" y1="72" x2="32" y2="88" stroke="#cc2222" stroke-width="2.5" stroke-linecap="round"/>
                                        <line x1="52" y1="78" x2="38" y2="94" stroke="#cc2222" stroke-width="2.5" stroke-linecap="round"/>
                                        <line x1="72" y1="72" x2="88" y2="88" stroke="#cc2222" stroke-width="2.5" stroke-linecap="round"/>
                                        <line x1="68" y1="78" x2="82" y2="94" stroke="#cc2222" stroke-width="2.5" stroke-linecap="round"/>
                                        <ellipse cx="60" cy="52" rx="14" ry="2" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="0.8"/>
                                        <ellipse cx="60" cy="62" rx="16" ry="2" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.8"/>
                                        <ellipse cx="60" cy="72" rx="14" ry="2" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="0.8"/>
                                    </g>
                                </svg>
                            </div>
                            <h1>CLAW WARS</h1>
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
                        <!-- Stats inside tablet -->
                        <div class="title-stats" id="title-stats"></div>
                    </div>
                </div>
            </div>
            <!-- Reflection on water below tablet -->
            <div class="tablet-reflection"></div>
        </div>

        <div class="title-version">v1.0</div>
    </div>

    `;

src = src.substring(0, htmlStartIdx) + newTitleHTML + src.substring(htmlEndIdx);
console.log('[2/2] Replaced title screen HTML');

// ---------------------------------------------------------------------------
// Write
// ---------------------------------------------------------------------------
fs.writeFileSync(FILE, src, 'utf8');
const newSize = Buffer.byteLength(src, 'utf8');
console.log(`\nWrote ${FILE}`);
console.log(`New size: ${newSize} bytes (${(newSize / 1024).toFixed(1)} KB)`);
console.log(`Delta: ${newSize > originalSize ? '+' : ''}${newSize - originalSize} bytes`);
console.log('\nDone. Title screen redesigned as tablet floating on water.');
