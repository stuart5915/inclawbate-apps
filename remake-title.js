const fs = require('fs');
let html = fs.readFileSync('apps/claw-wars.html', 'utf8');

// === 1. Replace title screen CSS (lines 173-375 area) ===
const cssSectionStart = '        /* ===== TITLE SCREEN ===== */';
const cssSectionEnd = '\n        /* ===== HEADER BAR ===== */';
const cssStartIdx = html.indexOf(cssSectionStart);
const cssEndIdx = html.indexOf(cssSectionEnd);
if (cssStartIdx === -1 || cssEndIdx === -1) { console.log('CSS markers not found!'); process.exit(1); }

const newTitleCSS = `        /* ===== TITLE SCREEN ===== */
        #title-screen {
            align-items: center;
            justify-content: center;
            background: #020206;
            position: relative;
            overflow: hidden;
        }

        /* Deep ocean gradient base */
        #title-screen .title-bg {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background:
                radial-gradient(ellipse at 50% 120%, rgba(0,60,120,0.25) 0%, transparent 60%),
                radial-gradient(ellipse at 20% 0%, rgba(120,0,40,0.12) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 0%, rgba(0,80,180,0.12) 0%, transparent 50%),
                radial-gradient(ellipse at 50% 50%, rgba(8,12,24,1) 0%, #020206 100%);
            z-index: 0;
        }

        /* Animated caustic light rays */
        #title-screen .title-caustics {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background:
                conic-gradient(from 0deg at 30% 70%, transparent 0deg, rgba(0,180,255,0.04) 15deg, transparent 30deg, transparent 90deg, rgba(0,180,255,0.03) 105deg, transparent 120deg, transparent 180deg, rgba(0,200,255,0.04) 195deg, transparent 210deg, transparent 270deg, rgba(0,160,255,0.03) 285deg, transparent 300deg),
                conic-gradient(from 45deg at 70% 30%, transparent 0deg, rgba(255,100,50,0.03) 20deg, transparent 40deg, transparent 120deg, rgba(255,80,40,0.02) 140deg, transparent 160deg, transparent 240deg, rgba(255,120,60,0.03) 260deg, transparent 280deg);
            background-size: 100% 100%;
            animation: titleCaustic 12s ease-in-out infinite;
            z-index: 0;
            opacity: 0.7;
        }
        @keyframes titleCaustic {
            0% { transform: scale(1) rotate(0deg); opacity: 0.5; }
            50% { transform: scale(1.15) rotate(3deg); opacity: 0.8; }
            100% { transform: scale(1) rotate(0deg); opacity: 0.5; }
        }

        /* Floating particle layer 1 — large slow */
        #title-screen .title-particles {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            z-index: 1;
            pointer-events: none;
        }
        #title-screen .title-particles::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background:
                radial-gradient(3px 3px at 8% 12%, rgba(0,212,255,0.7), transparent),
                radial-gradient(2px 2px at 18% 68%, rgba(255,215,0,0.6), transparent),
                radial-gradient(3px 3px at 32% 28%, rgba(255,80,120,0.5), transparent),
                radial-gradient(2px 2px at 45% 82%, rgba(0,212,255,0.5), transparent),
                radial-gradient(4px 4px at 58% 15%, rgba(255,215,0,0.7), transparent),
                radial-gradient(2px 2px at 72% 55%, rgba(255,80,120,0.4), transparent),
                radial-gradient(3px 3px at 88% 38%, rgba(0,212,255,0.6), transparent),
                radial-gradient(2px 2px at 95% 78%, rgba(255,215,0,0.5), transparent);
            animation: particleDrift1 8s ease-in-out infinite;
        }
        #title-screen .title-particles::after {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background:
                radial-gradient(1.5px 1.5px at 5% 45%, rgba(0,255,200,0.5), transparent),
                radial-gradient(2px 2px at 22% 90%, rgba(255,160,40,0.4), transparent),
                radial-gradient(1.5px 1.5px at 38% 55%, rgba(120,100,255,0.5), transparent),
                radial-gradient(2px 2px at 52% 5%, rgba(0,255,200,0.4), transparent),
                radial-gradient(1.5px 1.5px at 65% 72%, rgba(255,160,40,0.5), transparent),
                radial-gradient(2px 2px at 78% 18%, rgba(120,100,255,0.4), transparent),
                radial-gradient(1.5px 1.5px at 92% 55%, rgba(0,255,200,0.6), transparent),
                radial-gradient(1px 1px at 15% 30%, #fff, transparent),
                radial-gradient(1px 1px at 85% 65%, #fff, transparent);
            animation: particleDrift2 11s ease-in-out infinite;
        }
        @keyframes particleDrift1 {
            0%, 100% { transform: translateY(0) translateX(0); }
            33% { transform: translateY(-18px) translateX(10px); }
            66% { transform: translateY(8px) translateX(-8px); }
        }
        @keyframes particleDrift2 {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0.6; }
            25% { transform: translateY(12px) translateX(-12px); opacity: 0.9; }
            50% { transform: translateY(-8px) translateX(6px); opacity: 0.5; }
            75% { transform: translateY(6px) translateX(14px); opacity: 0.8; }
        }

        /* Horizontal light sweep across screen */
        #title-screen .title-sweep {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            z-index: 1;
            pointer-events: none;
            overflow: hidden;
        }
        #title-screen .title-sweep::before {
            content: '';
            position: absolute;
            top: -50%; left: -100%;
            width: 60%;
            height: 200%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.015), rgba(255,255,255,0.04), rgba(255,255,255,0.015), transparent);
            transform: skewX(-15deg);
            animation: sweepAcross 6s ease-in-out infinite;
        }
        @keyframes sweepAcross {
            0% { left: -100%; }
            40%, 100% { left: 200%; }
        }

        /* ---- Showcase cards orbiting behind logo ---- */
        .title-showcase {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            width: 500px; height: 500px;
            z-index: 0;
            pointer-events: none;
        }
        .showcase-card {
            position: absolute;
            width: 80px;
            aspect-ratio: 0.686;
            border-radius: 6px;
            overflow: hidden;
            box-shadow: 0 4px 30px rgba(0,0,0,0.6), 0 0 15px rgba(0,150,255,0.1);
            opacity: 0;
            animation: showcaseOrbit 20s linear infinite;
            transform-origin: center center;
        }
        .showcase-card:nth-child(1) { animation-delay: 0s; top: 50%; left: 50%; }
        .showcase-card:nth-child(2) { animation-delay: -2.5s; top: 50%; left: 50%; }
        .showcase-card:nth-child(3) { animation-delay: -5s; top: 50%; left: 50%; }
        .showcase-card:nth-child(4) { animation-delay: -7.5s; top: 50%; left: 50%; }
        .showcase-card:nth-child(5) { animation-delay: -10s; top: 50%; left: 50%; }
        .showcase-card:nth-child(6) { animation-delay: -12.5s; top: 50%; left: 50%; }
        .showcase-card:nth-child(7) { animation-delay: -15s; top: 50%; left: 50%; }
        .showcase-card:nth-child(8) { animation-delay: -17.5s; top: 50%; left: 50%; }
        @keyframes showcaseOrbit {
            0% { transform: translate(-50%,-50%) rotate(0deg) translateX(180px) rotate(0deg) scale(0.7); opacity: 0; filter: blur(2px) brightness(0.5); }
            5% { opacity: 0.5; filter: blur(1px) brightness(0.7); }
            12.5% { transform: translate(-50%,-50%) rotate(45deg) translateX(180px) rotate(-45deg) scale(0.9); opacity: 0.8; filter: blur(0px) brightness(1); }
            25% { transform: translate(-50%,-50%) rotate(90deg) translateX(180px) rotate(-90deg) scale(1); opacity: 0.9; filter: blur(0px) brightness(1.1); }
            37.5% { transform: translate(-50%,-50%) rotate(135deg) translateX(180px) rotate(-135deg) scale(0.9); opacity: 0.8; filter: blur(0px) brightness(1); }
            50% { transform: translate(-50%,-50%) rotate(180deg) translateX(180px) rotate(-180deg) scale(0.7); opacity: 0.5; filter: blur(1px) brightness(0.7); }
            55% { opacity: 0; }
            100% { transform: translate(-50%,-50%) rotate(360deg) translateX(180px) rotate(-360deg) scale(0.7); opacity: 0; filter: blur(2px) brightness(0.5); }
        }

        /* ---- Central content container ---- */
        .title-center {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
        }

        /* Lobster mascot — bigger, more dramatic */
        .title-lobster {
            width: 160px;
            height: 160px;
            margin: 0 auto 8px;
            position: relative;
            animation: mascotFloat 4s ease-in-out infinite;
            filter: drop-shadow(0 0 25px rgba(255,60,40,0.4)) drop-shadow(0 10px 30px rgba(0,0,0,0.5));
        }
        .title-lobster::before {
            content: '';
            position: absolute;
            top: -30px; left: -30px; right: -30px; bottom: -30px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255,68,68,0.2) 0%, rgba(255,100,50,0.08) 40%, transparent 70%);
            animation: glowBreath 3s ease-in-out infinite;
            z-index: -1;
        }
        .title-lobster::after {
            content: '';
            position: absolute;
            bottom: -20px;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 12px;
            background: radial-gradient(ellipse, rgba(255,60,40,0.15) 0%, transparent 70%);
            border-radius: 50%;
            animation: shadowPulse 4s ease-in-out infinite;
        }
        @keyframes mascotFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-14px); }
        }
        @keyframes glowBreath {
            0%, 100% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.15); opacity: 1; }
        }
        @keyframes shadowPulse {
            0%, 100% { transform: translateX(-50%) scaleX(1); opacity: 0.8; }
            50% { transform: translateX(-50%) scaleX(0.7); opacity: 0.4; }
        }

        /* Title text — massive glowing treatment */
        .title-logo {
            position: relative;
            z-index: 2;
            text-align: center;
            margin-bottom: 12px;
        }
        .title-logo h1 {
            font-size: 56px;
            font-weight: 900;
            letter-spacing: 8px;
            line-height: 1;
            background: linear-gradient(
                180deg,
                #fff 0%,
                #ffe0a0 15%,
                #ff8844 35%,
                #ff4444 55%,
                #cc2222 75%,
                #881111 100%
            );
            background-size: 100% 200%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: titleGradShift 4s ease-in-out infinite alternate;
            filter: drop-shadow(0 0 20px rgba(255,68,68,0.5)) drop-shadow(0 0 60px rgba(255,100,50,0.2)) drop-shadow(0 4px 8px rgba(0,0,0,0.8));
            position: relative;
        }
        .title-logo h1::after {
            content: 'CLAW WARS';
            position: absolute;
            top: 0; left: 0; right: 0;
            background: linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.3) 50%, transparent 80%);
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
            font-size: 11px;
            color: rgba(255,180,120,0.5);
            letter-spacing: 10px;
            text-transform: uppercase;
            margin-top: 4px;
            font-weight: 800;
        }

        /* Tagline with animated underline */
        .title-tagline {
            font-size: 15px;
            color: rgba(200,210,230,0.6);
            font-weight: 600;
            margin-bottom: 32px;
            position: relative;
            padding-bottom: 16px;
            letter-spacing: 0.5px;
        }
        .title-tagline::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 2px;
            background: linear-gradient(90deg, transparent, rgba(255,100,50,0.5), rgba(255,215,0,0.5), rgba(0,212,255,0.5), transparent);
            border-radius: 2px;
            animation: lineShimmer 3s ease-in-out infinite;
        }
        @keyframes lineShimmer {
            0%, 100% { width: 60px; opacity: 0.6; }
            50% { width: 120px; opacity: 1; }
        }

        /* Menu buttons — dramatic glass cards */
        .menu-buttons {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 300px;
        }
        .menu-btn {
            padding: 15px 24px;
            border-radius: 14px;
            font-size: 15px;
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
            font-size: 20px;
            font-weight: 900;
            padding: 20px 24px;
            letter-spacing: 6px;
            border-radius: 16px;
            box-shadow:
                0 0 20px rgba(230,60,60,0.3),
                0 0 60px rgba(230,60,60,0.1),
                0 8px 30px rgba(0,0,0,0.4),
                inset 0 1px 0 rgba(255,255,255,0.2),
                inset 0 -2px 0 rgba(0,0,0,0.2);
            border: 1px solid rgba(255,150,100,0.2);
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .menu-btn.primary::before {
            content: '';
            position: absolute;
            top: 0; left: -100%; width: 60%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            animation: btnSweep 4s ease-in-out infinite;
        }
        @keyframes btnSweep {
            0%, 70% { left: -100%; }
            100% { left: 200%; }
        }
        .menu-btn.primary:active {
            transform: scale(0.97);
            box-shadow:
                0 0 30px rgba(230,60,60,0.5),
                0 0 80px rgba(230,60,60,0.15),
                0 4px 15px rgba(0,0,0,0.4),
                inset 0 1px 0 rgba(255,255,255,0.2);
        }
        .menu-btn.secondary {
            background: rgba(255,255,255,0.025);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            color: rgba(200,210,225,0.7);
            border: 1px solid rgba(255,255,255,0.05);
            box-shadow: 0 2px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03);
            font-size: 13px;
        }
        .menu-btn.secondary:hover {
            background: rgba(255,255,255,0.05);
            border-color: rgba(255,255,255,0.1);
            color: #e2e8f0;
            box-shadow: 0 2px 20px rgba(0,0,0,0.3), 0 0 12px rgba(0,150,255,0.05), inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .menu-btn.secondary:active { background: rgba(255,255,255,0.08); transform: scale(0.97); }

        /* Top bar indicators */
        .coin-display {
            position: absolute;
            top: 16px;
            right: 16px;
            background: rgba(30,60,30,0.4);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(80,200,80,0.15);
            padding: 7px 16px;
            border-radius: 24px;
            font-weight: 800;
            color: #50c850;
            font-size: 13px;
            z-index: 5;
            box-shadow: 0 0 15px rgba(80,200,80,0.08);
            letter-spacing: 0.5px;
        }

        .wallet-display {
            position: absolute;
            top: 16px;
            left: 16px;
            background: rgba(0,30,60,0.4);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(0,180,255,0.12);
            padding: 7px 14px;
            border-radius: 24px;
            font-weight: 700;
            color: #00c8f0;
            font-size: 12px;
            z-index: 5;
            display: flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 0 15px rgba(0,180,255,0.06);
        }
        .wallet-display .wallet-addr {
            font-family: monospace;
            font-size: 11px;
        }
        .wallet-display .wallet-change-btn {
            background: rgba(255,255,255,0.08);
            color: #6b7a94;
            border: none;
            padding: 3px 10px;
            border-radius: 12px;
            font-size: 10px;
            font-weight: 700;
            cursor: pointer;
            font-family: 'Nunito', sans-serif;
            min-height: 24px;
            min-width: 24px;
            transition: background 0.2s;
        }
        .wallet-display .wallet-change-btn:hover { background: rgba(255,255,255,0.14); }

        /* Bottom stats bar */
        .title-stats {
            position: absolute;
            bottom: 24px;
            left: 0; right: 0;
            display: flex;
            justify-content: center;
            gap: 32px;
            z-index: 3;
            padding: 0 20px;
        }
        .title-stat {
            text-align: center;
        }
        .title-stat-value {
            font-size: 22px;
            font-weight: 900;
            background: linear-gradient(180deg, #fff 0%, #aab8d0 100%);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .title-stat-label {
            font-size: 9px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: rgba(150,160,180,0.5);
            font-weight: 700;
        }

        /* Version tag */
        .title-version {
            position: absolute;
            bottom: 8px;
            right: 16px;
            font-size: 9px;
            color: rgba(100,110,130,0.3);
            letter-spacing: 1px;
            z-index: 3;
        }
`;

html = html.substring(0, cssStartIdx) + newTitleCSS + html.substring(cssEndIdx);

// === 2. Update responsive breakpoints for title ===
// 768px
html = html.replace(
    /\.title-logo h1 \{ font-size: 72px; letter-spacing: 8px; \}\s*\n\s*\.title-lobster \{ width: 170px; height: 170px; \}\s*\n\s*\.title-lobster svg \{ width: 170px; height: 170px; \}\s*\n\s*\.menu-buttons \{ width: 340px; \}/,
    `.title-logo h1 { font-size: 72px; letter-spacing: 10px; }
            .title-lobster { width: 180px; height: 180px; }
            .title-lobster svg { width: 180px; height: 180px; }
            .menu-buttons { width: 360px; }
            .showcase-card { width: 100px; }
            .title-showcase { width: 600px; height: 600px; }
            @keyframes showcaseOrbit {
                0% { transform: translate(-50%,-50%) rotate(0deg) translateX(220px) rotate(0deg) scale(0.7); opacity: 0; filter: blur(2px) brightness(0.5); }
                5% { opacity: 0.5; }
                12.5% { transform: translate(-50%,-50%) rotate(45deg) translateX(220px) rotate(-45deg) scale(0.9); opacity: 0.8; filter: blur(0px) brightness(1); }
                25% { transform: translate(-50%,-50%) rotate(90deg) translateX(220px) rotate(-90deg) scale(1); opacity: 0.9; filter: blur(0px) brightness(1.1); }
                37.5% { transform: translate(-50%,-50%) rotate(135deg) translateX(220px) rotate(-135deg) scale(0.9); opacity: 0.8; }
                50% { transform: translate(-50%,-50%) rotate(180deg) translateX(220px) rotate(-180deg) scale(0.7); opacity: 0.5; filter: blur(1px) brightness(0.7); }
                55% { opacity: 0; }
                100% { transform: translate(-50%,-50%) rotate(360deg) translateX(220px) rotate(-360deg) scale(0.7); opacity: 0; filter: blur(2px) brightness(0.5); }
            }
            .title-tagline { font-size: 16px; }
            .title-stats { gap: 48px; }
            .title-stat-value { font-size: 26px; }`
);

// 1024px
html = html.replace(
    '.title-logo h1 { font-size: 80px; }',
    `.title-logo h1 { font-size: 88px; letter-spacing: 12px; }
            .title-lobster { width: 200px; height: 200px; }
            .title-lobster svg { width: 200px; height: 200px; }
            .showcase-card { width: 110px; }
            .title-tagline { font-size: 17px; }`
);

// === 3. Replace title screen HTML ===
const htmlStart = '    <!-- ===== TITLE SCREEN ===== -->';
const htmlEnd = '\n    <!-- ===== COLLECTION SCREEN ===== -->';
const htmlStartIdx = html.indexOf(htmlStart);
const htmlEndIdx = html.indexOf(htmlEnd);
if (htmlStartIdx === -1 || htmlEndIdx === -1) { console.log('HTML markers not found!'); process.exit(1); }

const newTitleHTML = `    <!-- ===== TITLE SCREEN ===== -->
    <div id="title-screen" class="screen active">
        <!-- Background layers -->
        <div class="title-bg"></div>
        <div class="title-caustics"></div>
        <div class="title-particles"></div>
        <div class="title-sweep"></div>

        <!-- Orbiting showcase cards (populated by JS) -->
        <div class="title-showcase" id="title-showcase"></div>

        <!-- Top bar -->
        <div class="coin-display" id="title-coins">$DD 0</div>
        <div class="wallet-display" id="title-wallet">
            <span class="wallet-addr" id="title-wallet-addr">No Wallet</span>
            <button class="wallet-change-btn" id="title-wallet-btn" onclick="showWalletModal()">Connect</button>
        </div>

        <!-- Main content -->
        <div class="title-center">
            <div class="title-logo">
                <div class="title-lobster">
                    <svg viewBox="0 0 120 120" width="160" height="160">
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
                        <!-- Glow layer -->
                        <g filter="url(#lobster-glow)" opacity="0.4">
                            <ellipse cx="60" cy="62" rx="20" ry="28" fill="#ff4444"/>
                            <circle cx="60" cy="34" r="15" fill="#ff4444"/>
                        </g>
                        <!-- Main body -->
                        <g fill="url(#lobster-grad)">
                            <ellipse cx="60" cy="62" rx="18" ry="26"/>
                            <circle cx="60" cy="34" r="13"/>
                            <!-- Claws -->
                            <path d="M47 48 L28 34 L16 22 L24 34 L14 46 L30 38Z"/>
                            <path d="M73 48 L92 34 L104 22 L96 34 L106 46 L90 38Z"/>
                            <!-- Tail -->
                            <path d="M50 86 L44 102 L54 96 L60 106 L66 96 L76 102 L70 86Z"/>
                            <!-- Eyes -->
                            <circle cx="54" cy="30" r="3.5" fill="#fff"/>
                            <circle cx="66" cy="30" r="3.5" fill="#fff"/>
                            <circle cx="54" cy="30" r="1.8" fill="#111"/>
                            <circle cx="66" cy="30" r="1.8" fill="#111"/>
                            <circle cx="55" cy="29" r="0.8" fill="#fff" opacity="0.8"/>
                            <circle cx="67" cy="29" r="0.8" fill="#fff" opacity="0.8"/>
                            <!-- Antennae -->
                            <path d="M54 22 Q40 4 26 0" stroke="#ff4444" fill="none" stroke-width="2.5" stroke-linecap="round"/>
                            <path d="M66 22 Q80 4 94 0" stroke="#ff4444" fill="none" stroke-width="2.5" stroke-linecap="round"/>
                            <!-- Legs -->
                            <line x1="48" y1="72" x2="32" y2="88" stroke="#cc2222" stroke-width="2.5" stroke-linecap="round"/>
                            <line x1="52" y1="78" x2="38" y2="94" stroke="#cc2222" stroke-width="2.5" stroke-linecap="round"/>
                            <line x1="72" y1="72" x2="88" y2="88" stroke="#cc2222" stroke-width="2.5" stroke-linecap="round"/>
                            <line x1="68" y1="78" x2="82" y2="94" stroke="#cc2222" stroke-width="2.5" stroke-linecap="round"/>
                            <!-- Shell segments -->
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
                <button class="menu-btn secondary" onclick="showScreen('deckbuilder-screen')">DECK BUILDER</button>
                <button class="menu-btn secondary" onclick="showScreen('howto-screen')">HOW TO PLAY</button>
            </div>
        </div>

        <!-- Bottom stats -->
        <div class="title-stats" id="title-stats"></div>
        <div class="title-version">v1.0</div>
    </div>
`;

html = html.substring(0, htmlStartIdx) + newTitleHTML + html.substring(htmlEndIdx);

// === 4. Add JS to populate showcase cards and stats on title screen ===
// Insert right after the showScreen function's updateCoinsDisplay call
const showScreenHook = "if (id === 'collection-screen') renderCollection();";
const hookIdx = html.indexOf(showScreenHook);
if (hookIdx === -1) { console.log('showScreen hook not found!'); process.exit(1); }

// Add title screen init
const titleInitCode = `if (id === 'title-screen') initTitleShowcase();
    `;
html = html.substring(0, hookIdx) + titleInitCode + html.substring(hookIdx);

// Add initTitleShowcase function before showScreen
const beforeShowScreen = 'function showScreen(id) {';
const bssIdx = html.indexOf(beforeShowScreen);
if (bssIdx === -1) { console.log('showScreen function not found!'); process.exit(1); }

const showcaseJS = `let titleShowcaseInit = false;
function initTitleShowcase() {
    // Populate showcase cards with random cards from collection
    const showcase = document.getElementById('title-showcase');
    if (!showcase) return;
    if (titleShowcaseInit && showcase.children.length > 0) return;
    titleShowcaseInit = true;
    showcase.innerHTML = '';
    const owned = Object.keys(playerData.collection).map(Number).filter(id => playerData.collection[id] > 0);
    const pool = owned.length >= 8 ? owned : CARDS.slice(0, 20).map(c => c.id);
    const shuffled = pool.sort(() => Math.random() - 0.5).slice(0, 8);
    shuffled.forEach(cid => {
        const card = CARDS.find(c => c.id === cid);
        if (!card) return;
        const div = document.createElement('div');
        div.className = 'showcase-card';
        div.innerHTML = getCardHTML(card, false);
        showcase.appendChild(div);
    });
    // Populate stats
    const statsEl = document.getElementById('title-stats');
    if (statsEl) {
        const totalOwned = Object.values(playerData.collection).reduce((a,b) => a + (b > 0 ? 1 : 0), 0);
        statsEl.innerHTML = \`
            <div class="title-stat"><div class="title-stat-value">\${totalOwned}</div><div class="title-stat-label">Cards</div></div>
            <div class="title-stat"><div class="title-stat-value">\${playerData.wins || 0}</div><div class="title-stat-label">Wins</div></div>
            <div class="title-stat"><div class="title-stat-value">\${CARDS.length}</div><div class="title-stat-label">Total</div></div>
        \`;
    }
}

`;

html = html.substring(0, bssIdx) + showcaseJS + html.substring(bssIdx);

// Also call initTitleShowcase on page load — find the init/DOMContentLoaded or the end of the script
const domLoadedMatch = html.match(/initWalletConnect\(\);/);
if (domLoadedMatch) {
    const dli = html.indexOf('initWalletConnect();');
    html = html.substring(0, dli + 'initWalletConnect();'.length) + '\ninitTitleShowcase();' + html.substring(dli + 'initWalletConnect();'.length);
}

// === 5. Track wins in playerData ===
// Add wins tracking to game over
const winRewardMatch = 'playerData.coins += reward;';
const wri = html.indexOf(winRewardMatch);
if (wri !== -1) {
    html = html.substring(0, wri + winRewardMatch.length) + '\n    if (won) playerData.wins = (playerData.wins || 0) + 1;' + html.substring(wri + winRewardMatch.length);
}

fs.writeFileSync('apps/claw-wars.html', html);
const sz = fs.statSync('apps/claw-wars.html').size;
console.log(`New file size: ${sz} bytes (${(sz/1024).toFixed(1)} KB) — ${sz <= 512000 ? 'OK' : 'OVER LIMIT'}`);
