const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'apps', 'claw-wars.html');
let html = fs.readFileSync(filePath, 'utf8');

console.log(`Original file size: ${Buffer.byteLength(html)} bytes`);

// ── NEW CSS ──────────────────────────────────────────────────────────
const newCSS = `
        /* @property for Chromium holo-angle animation */
        @property --holo-angle {
            syntax: '<angle>';
            inherits: false;
            initial-value: 135deg;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'Nunito', sans-serif;
            background: #050508;
            color: #e2e8f0;
            min-height: 100vh;
            overflow-x: hidden;
            -webkit-tap-highlight-color: transparent;
            user-select: none;
            touch-action: manipulation;
        }

        /* Noise texture overlay */
        body::after {
            content: '';
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.018;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
            background-repeat: repeat;
            background-size: 200px 200px;
        }

        button { font-family: 'Nunito', sans-serif; cursor: pointer; border: none; outline: none; min-height: 44px; min-width: 44px; }
        .screen { display: none; min-height: 100vh; }
        .screen.active { display: flex; flex-direction: column; }

        /* ===== GLOBAL ANIMATIONS ===== */
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
        }
        @keyframes glow-pulse {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
        }
        @keyframes shimmer-bg {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }
        @keyframes caustic {
            0% { background-position: 0% 0%, 0% 0%; }
            50% { background-position: 50% 30%, -30% 50%; }
            100% { background-position: 100% 60%, -60% 100%; }
        }
        @keyframes screen-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .screen.active {
            animation: screen-in 0.3s ease-out;
        }

        /* ===== WALLET CONNECT MODAL ===== */
        .wallet-modal-overlay {
            display: none;
            position: fixed;
            top:0;left:0;right:0;bottom:0;
            background: rgba(0,0,0,0.92);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            z-index: 300;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 20px;
        }
        .wallet-modal-overlay.active { display: flex; }
        .wallet-modal {
            background: rgba(16,19,28,0.9);
            backdrop-filter: blur(30px);
            -webkit-backdrop-filter: blur(30px);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 20px;
            padding: 36px 28px;
            max-width: 400px;
            width: 100%;
            text-align: center;
            box-shadow: 0 24px 80px rgba(0,0,0,0.6), 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .wallet-modal h2 {
            font-size: 24px;
            font-weight: 900;
            margin-bottom: 8px;
            background: linear-gradient(135deg, #ffd700, #ffaa00, #ffd700);
            background-size: 200% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmer-bg 3s linear infinite;
        }
        .wallet-modal .wallet-subtitle {
            font-size: 13px;
            color: #6b7a94;
            margin-bottom: 24px;
            line-height: 1.6;
        }
        .wallet-modal input {
            width: 100%;
            padding: 14px 16px;
            border-radius: 12px;
            border: 1px solid rgba(255,255,255,0.08);
            background: rgba(255,255,255,0.04);
            color: #e2e8f0;
            font-family: 'Nunito', monospace;
            font-size: 14px;
            margin-bottom: 8px;
            outline: none;
            min-height: 48px;
            transition: border-color 0.2s, box-shadow 0.2s;
        }
        .wallet-modal input:focus {
            border-color: rgba(255,215,0,0.4);
            box-shadow: 0 0 20px rgba(255,215,0,0.08);
        }
        .wallet-modal .wallet-error {
            font-size: 11px;
            color: #ff2d78;
            min-height: 18px;
            margin-bottom: 8px;
        }
        .wallet-modal .wallet-connect-btn {
            width: 100%;
            padding: 14px;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 700;
            background: linear-gradient(135deg, #ffd700 0%, #ffaa00 50%, #ffd700 100%);
            background-size: 200% 100%;
            color: #1a1a1a;
            margin-bottom: 14px;
            min-height: 50px;
            transition: transform 0.15s, box-shadow 0.15s;
            box-shadow: 0 4px 20px rgba(255,215,0,0.2);
        }
        .wallet-modal .wallet-connect-btn:active { transform: scale(0.97); }
        .wallet-modal .wallet-skip-btn {
            background: none;
            border: none;
            color: #6b7a94;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            text-decoration: underline;
            text-underline-offset: 3px;
            min-height: 44px;
            padding: 8px 16px;
            font-family: 'Nunito', sans-serif;
            transition: color 0.2s;
        }
        .wallet-modal .wallet-skip-btn:hover { color: #8892a8; }

        /* ===== TITLE SCREEN ===== */
        #title-screen {
            align-items: center;
            justify-content: center;
            background:
                radial-gradient(ellipse at 50% 30%, rgba(10,22,40,0.9) 0%, #050508 70%);
            position: relative;
            overflow: hidden;
        }

        /* Hex pattern background */
        #title-screen::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background:
                radial-gradient(circle at 20% 80%, rgba(255,45,120,0.06) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(0,212,255,0.06) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(255,215,0,0.03) 0%, transparent 40%);
            animation: titlePulse 8s ease-in-out infinite alternate;
            z-index: 0;
        }

        /* Floating particles */
        #title-screen::after {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background:
                radial-gradient(2px 2px at 10% 15%, rgba(0,212,255,0.5), transparent),
                radial-gradient(2px 2px at 25% 70%, rgba(255,45,120,0.4), transparent),
                radial-gradient(2px 2px at 40% 25%, rgba(255,215,0,0.5), transparent),
                radial-gradient(2px 2px at 55% 85%, rgba(0,212,255,0.3), transparent),
                radial-gradient(2px 2px at 70% 40%, rgba(255,45,120,0.5), transparent),
                radial-gradient(2px 2px at 85% 60%, rgba(255,215,0,0.4), transparent),
                radial-gradient(1.5px 1.5px at 15% 45%, rgba(0,212,255,0.4), transparent),
                radial-gradient(1.5px 1.5px at 60% 10%, rgba(255,215,0,0.3), transparent),
                radial-gradient(1.5px 1.5px at 90% 80%, rgba(255,45,120,0.3), transparent),
                radial-gradient(1px 1px at 35% 55%, rgba(0,212,255,0.6), transparent),
                radial-gradient(1px 1px at 75% 20%, rgba(255,215,0,0.5), transparent),
                radial-gradient(1px 1px at 50% 90%, rgba(255,45,120,0.4), transparent);
            background-size: 100% 100%;
            animation: float 6s ease-in-out infinite;
            z-index: 0;
            pointer-events: none;
        }

        @keyframes titlePulse {
            0% { opacity: 0.5; }
            100% { opacity: 1; }
        }

        .title-logo {
            position: relative;
            z-index: 1;
            text-align: center;
            margin-bottom: 48px;
        }
        .title-logo h1 {
            font-size: 58px;
            font-weight: 900;
            letter-spacing: 6px;
            background: linear-gradient(135deg, #ff4444 0%, #ff6b3d 20%, #ffd700 50%, #ff6b3d 80%, #ff4444 100%);
            background-size: 200% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: titleShimmer 3s linear infinite, titleBreathe 4s ease-in-out infinite;
            text-shadow: none;
            filter: drop-shadow(0 0 30px rgba(255,100,50,0.35)) drop-shadow(0 0 60px rgba(255,215,0,0.15));
        }
        @keyframes titleShimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
        @keyframes titleBreathe {
            0%, 100% { filter: drop-shadow(0 0 30px rgba(255,100,50,0.35)) drop-shadow(0 0 60px rgba(255,215,0,0.15)); }
            50% { filter: drop-shadow(0 0 40px rgba(255,100,50,0.5)) drop-shadow(0 0 80px rgba(255,215,0,0.25)); }
        }
        .title-logo .subtitle {
            font-size: 13px;
            color: #6b7a94;
            letter-spacing: 8px;
            text-transform: uppercase;
            margin-top: 6px;
            font-weight: 700;
        }
        .title-lobster {
            width: 140px;
            height: 140px;
            margin: 0 auto 14px;
            position: relative;
            animation: float 5s ease-in-out infinite;
        }
        .title-lobster::after {
            content: '';
            position: absolute;
            top: -15px; left: -15px; right: -15px; bottom: -15px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255,68,68,0.2) 0%, rgba(255,68,68,0) 70%);
            animation: glow-pulse 3s ease-in-out infinite;
            z-index: -1;
        }

        .menu-buttons {
            position: relative;
            z-index: 1;
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 280px;
        }
        .menu-btn {
            padding: 15px 24px;
            border-radius: 14px;
            font-size: 15px;
            font-weight: 700;
            letter-spacing: 1.5px;
            transition: all 0.2s;
            position: relative;
            overflow: hidden;
        }
        .menu-btn:active { transform: scale(0.96); }
        .menu-btn.primary {
            background: linear-gradient(135deg, #c0392b, #e74c3c, #ff5252);
            color: white;
            box-shadow: 0 4px 24px rgba(231,76,60,0.35), inset 0 1px 0 rgba(255,255,255,0.15);
            font-size: 17px;
            padding: 17px 24px;
        }
        .menu-btn.primary::before {
            content: '';
            position: absolute;
            top: 0; left: -100%; width: 50%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
            animation: shimmer-bg 3s ease-in-out infinite;
        }
        .menu-btn.secondary {
            background: rgba(255,255,255,0.03);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            color: #8892a8;
            border: 1px solid rgba(255,255,255,0.06);
            box-shadow: 0 2px 10px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03);
        }
        .menu-btn.secondary:active { background: rgba(255,255,255,0.08); }

        .coin-display {
            position: absolute;
            top: 16px;
            right: 16px;
            background: rgba(80,200,80,0.08);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(80,200,80,0.2);
            padding: 7px 16px;
            border-radius: 24px;
            font-weight: 800;
            color: #50c850;
            font-size: 13px;
            z-index: 2;
            box-shadow: 0 2px 12px rgba(80,200,80,0.1);
            letter-spacing: 0.5px;
        }

        .wallet-display {
            position: absolute;
            top: 16px;
            left: 16px;
            background: rgba(0,212,255,0.06);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(0,212,255,0.15);
            padding: 7px 14px;
            border-radius: 24px;
            font-weight: 700;
            color: #00d4ff;
            font-size: 12px;
            z-index: 2;
            display: flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 2px 12px rgba(0,212,255,0.08);
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
        .wallet-display .wallet-change-btn:hover { background: rgba(255,255,255,0.12); }

        /* ===== HEADER BAR ===== */
        .header-bar {
            display: flex;
            align-items: center;
            padding: 14px 16px;
            background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border-bottom: 1px solid rgba(255,255,255,0.05);
            gap: 14px;
            flex-shrink: 0;
        }
        .back-btn {
            background: rgba(255,255,255,0.06);
            color: #8892a8;
            padding: 7px 16px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 700;
            transition: all 0.2s;
            border: 1px solid rgba(255,255,255,0.06);
        }
        .back-btn:active { transform: scale(0.95); }
        .header-bar h2 {
            font-size: 19px;
            font-weight: 900;
            flex: 1;
            background: linear-gradient(135deg, #e2e8f0 0%, #a0aec0 100%);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: 0.5px;
        }

        /* ===== CARD RENDERING ===== */
        .card {
            position: relative;
            border-radius: 8px;
            overflow: hidden;
            transition: transform 0.3s, box-shadow 0.3s;
            transform-style: preserve-3d;
            box-shadow: 0 2px 6px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(0,0,0,0.3);
        }
        .card.face-down .card-front { display: none; }
        .card.face-down .card-back { display: flex; }
        .card-front {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            position: relative;
        }
        .card-back {
            width: 100%;
            height: 100%;
            display: none;
            align-items: center;
            justify-content: center;
            background: radial-gradient(ellipse at 50% 50%, #2d1b4e 0%, #1a0a2e 70%);
            border: 2px solid #4a3070;
            border-radius: 8px;
            box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
        }
        .card-back-pattern {
            width: 70%;
            height: 70%;
            border: 1.5px solid rgba(180,140,220,0.25);
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            background:
                repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(180,140,220,0.04) 4px, rgba(180,140,220,0.04) 5px),
                repeating-linear-gradient(-45deg, transparent, transparent 4px, rgba(180,140,220,0.04) 4px, rgba(180,140,220,0.04) 5px);
            box-shadow: inset 0 0 10px rgba(100,60,160,0.2);
        }
        .card-back-text {
            font-size: 10px;
            font-weight: 900;
            color: rgba(180,140,220,0.35);
            letter-spacing: 3px;
            transform: rotate(-25deg);
            text-shadow: 0 0 8px rgba(140,80,220,0.25);
        }
        .card-frame {
            position: absolute;
            top:0;left:0;right:0;bottom:0;
            border-radius: 8px;
            padding: 3px;
            box-shadow: inset 1px 1px 2px rgba(255,255,255,0.15), inset -1px -1px 2px rgba(0,0,0,0.3);
        }
        .card-frame::before {
            content: '';
            position: absolute;
            top:0;left:0;right:0;bottom:0;
            border-radius: 8px;
            background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.015) 2px, rgba(0,0,0,0.015) 3px);
            pointer-events: none;
            z-index: 1;
        }
        .card-inner {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            border-radius: 6px;
            overflow: hidden;
        }
        .card-name-bar {
            padding: 4px 6px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-weight: 800;
            font-size: 8px;
            min-height: 20px;
            background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.35) 100%);
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.2);
            letter-spacing: 0.4px;
            text-shadow: 0 1px 2px rgba(0,0,0,0.6);
        }
        .card-name {
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .card-attr {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 7px;
            font-weight: 900;
            flex-shrink: 0;
            margin-left: 3px;
            box-shadow: inset 0 -2px 3px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.25), 0 1px 3px rgba(0,0,0,0.4);
            text-shadow: 0 0.5px 1px rgba(0,0,0,0.5);
            border: 0.5px solid rgba(0,0,0,0.2);
        }
        .card-art-box {
            flex: 1;
            position: relative;
            overflow: hidden;
            margin: 2px;
            border: 1px solid rgba(180,160,80,0.25);
            border-radius: 2px;
            box-shadow: inset 0 0 10px rgba(0,0,0,0.4), 0 0.5px 0 rgba(255,255,255,0.06);
        }
        .card-art-bg {
            position: absolute;
            top:0;left:0;right:0;bottom:0;
        }
        .card-art-svg {
            position: absolute;
            top:0;left:0;right:0;bottom:0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .card-art-svg svg {
            width: 100%;
            height: 100%;
        }
        .card-level-bar {
            display: flex;
            justify-content: flex-end;
            padding: 1px 4px;
            gap: 1px;
            min-height: 10px;
            background: rgba(0,0,0,0.2);
        }
        .level-star {
            width: 8px;
            height: 8px;
            background: linear-gradient(180deg, #ffe88a 0%, #e6b800 40%, #cc9900 100%);
            clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
            border: none;
            border-radius: 0;
            filter: drop-shadow(0 0 2px rgba(204,153,0,0.7));
        }
        .card-desc-box {
            padding: 3px 5px;
            font-size: 5.5px;
            line-height: 1.4;
            min-height: 28px;
            background: linear-gradient(180deg, rgba(15,13,10,0.6) 0%, rgba(8,6,4,0.7) 100%);
            color: rgba(255,255,255,0.92);
            overflow: hidden;
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -1px 0 rgba(0,0,0,0.15);
            border-top: 0.5px solid rgba(180,160,80,0.12);
        }
        .card-stats-bar {
            display: flex;
            justify-content: flex-end;
            gap: 8px;
            padding: 2px 6px;
            font-size: 7px;
            font-weight: 900;
            background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 100%);
            text-shadow: 0 1px 2px rgba(0,0,0,0.7);
            letter-spacing: 0.5px;
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
        }
        .card-type-label {
            padding: 1px 4px;
            font-size: 5px;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            text-align: center;
            background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.35) 100%);
            color: rgba(255,255,255,0.65);
            text-shadow: 0 0.5px 1px rgba(0,0,0,0.4);
        }

        /* Card frame colors — rich metallic gradients */
        .card-frame.normal-monster { background: linear-gradient(160deg, #d4b44c 0%, #c4a43c 12%, #e8cc66 35%, #dfc058 50%, #b89828 65%, #a88a2a 85%, #8a7020 100%); }
        .card-frame.effect-monster { background: linear-gradient(160deg, #d87830 0%, #c46a1f 12%, #e88848 35%, #de7e3e 50%, #a05518 65%, #884410 85%, #703810 100%); }
        .card-frame.ritual-monster { background: linear-gradient(160deg, #5a8bd8 0%, #4a7bc8 12%, #6a9be8 35%, #5e90dd 50%, #3860a0 65%, #2c5090 85%, #204080 100%); }
        .card-frame.fusion-monster { background: linear-gradient(160deg, #8a4bad 0%, #7a3b9d 12%, #9a5bc0 35%, #8e50b5 50%, #602e7d 65%, #502468 85%, #401a58 100%); }
        .card-frame.synchro-monster { background: linear-gradient(160deg, #e8e8ec 0%, #d4d4d8 12%, #f4f4f4 35%, #ededed 50%, #b8b8c0 65%, #a8a8b0 85%, #909098 100%); }
        .card-frame.spell { background: linear-gradient(160deg, #2a9a6e 0%, #1d8a5e 12%, #38b880 35%, #30ae76 50%, #156d4a 65%, #105a3c 85%, #0a4830 100%); }
        .card-frame.trap { background: linear-gradient(160deg, #ac3793 0%, #9c2783 12%, #c040a0 35%, #b63898 50%, #7a1e68 65%, #6a1458 85%, #580e48 100%); }

        /* Attribute colors */
        .attr-WATER { background: linear-gradient(135deg, #2980b9, #3498db); }
        .attr-FIRE { background: linear-gradient(135deg, #c0392b, #e74c3c); }
        .attr-EARTH { background: linear-gradient(135deg, #8b6914, #a07820); }
        .attr-WIND { background: linear-gradient(135deg, #27ae60, #2ecc71); }
        .attr-LIGHT { background: linear-gradient(135deg, #d4a017, #f1c40f); }
        .attr-DARK { background: linear-gradient(135deg, #6c3483, #8e44ad); }
        .attr-SPELL { background: linear-gradient(135deg, #1d8a5e, #27ae60); }
        .attr-TRAP { background: linear-gradient(135deg, #9c2783, #c040a0); }

        /* ===== HOLOGRAPHIC EFFECTS ===== */
        .card-holo-overlay {
            position: absolute;
            top:0;left:0;right:0;bottom:0;
            pointer-events: none;
            z-index: 2;
            border-radius: 8px;
        }

        .rarity-R .card-name {
            background: linear-gradient(90deg, #999, #e8e8e8, #999, #e8e8e8, #999);
            background-size: 300% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmer 2.5s linear infinite;
        }
        @keyframes shimmer {
            0% { background-position: 300% 0; }
            100% { background-position: -300% 0; }
        }

        .rarity-SR .card-art-box::after {
            content: '';
            position: absolute;
            top:0;left:0;right:0;bottom:0;
            background: linear-gradient(
                var(--holo-angle, 135deg),
                transparent 15%,
                rgba(255,30,30,0.18) 25%,
                rgba(255,180,30,0.18) 35%,
                rgba(30,255,30,0.18) 45%,
                rgba(30,200,255,0.18) 55%,
                rgba(180,30,255,0.18) 65%,
                transparent 75%
            );
            background-size: 200% 200%;
            mix-blend-mode: color-dodge;
            z-index: 1;
            animation: holoSweep 3s ease-in-out infinite alternate;
        }
        @keyframes holoSweep {
            0% { --holo-angle: 100deg; opacity: 0.6; background-position: 0% 0%; }
            100% { --holo-angle: 200deg; opacity: 1; background-position: 100% 100%; }
        }

        .rarity-UR .card-name {
            background: linear-gradient(90deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c);
            background-size: 400% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmer 3s linear infinite;
        }
        .rarity-UR .card-art-box::after {
            content: '';
            position: absolute;
            top:0;left:0;right:0;bottom:0;
            background: linear-gradient(
                var(--holo-angle, 135deg),
                transparent 10%,
                rgba(255,50,50,0.25) 20%,
                rgba(255,200,50,0.25) 35%,
                rgba(50,255,100,0.25) 50%,
                rgba(50,150,255,0.25) 65%,
                rgba(200,50,255,0.25) 80%,
                transparent 90%
            );
            background-size: 200% 200%;
            mix-blend-mode: color-dodge;
            z-index: 1;
            animation: holoSweep 3s ease-in-out infinite alternate;
        }

        .rarity-ScR .card-name {
            background: linear-gradient(90deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c);
            background-size: 400% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmer 3s linear infinite;
        }
        .rarity-ScR .card-art-box::after {
            content: '';
            position: absolute;
            top:0;left:0;right:0;bottom:0;
            background:
                repeating-linear-gradient(
                    var(--holo-angle, 45deg),
                    transparent 0px, transparent 3px,
                    rgba(255,255,255,0.12) 3px, rgba(255,255,255,0.12) 4px
                ),
                repeating-linear-gradient(
                    calc(var(--holo-angle, 45deg) + 90deg),
                    transparent 0px, transparent 3px,
                    rgba(255,255,255,0.12) 3px, rgba(255,255,255,0.12) 4px
                ),
                linear-gradient(
                    var(--holo-angle, 135deg),
                    rgba(255,0,0,0.2), rgba(255,255,0,0.2), rgba(0,255,0,0.2),
                    rgba(0,255,255,0.2), rgba(0,0,255,0.2), rgba(255,0,255,0.2), rgba(255,0,0,0.2)
                );
            background-size: 8px 8px, 8px 8px, 300% 300%;
            mix-blend-mode: color-dodge;
            z-index: 1;
            animation: secretHolo 4s linear infinite;
        }
        @keyframes secretHolo {
            0% { background-position: 0 0, 0 0, 0% 0%; }
            100% { background-position: 8px 8px, -8px 8px, 300% 300%; }
        }

        .rarity-GhR .card-front { filter: saturate(0.2) brightness(1.3) contrast(0.9); }
        .rarity-GhR .card-art-box::after {
            content: '';
            position: absolute;
            top:0;left:0;right:0;bottom:0;
            background: linear-gradient(
                var(--holo-angle, 135deg),
                rgba(200,200,255,0.35),
                rgba(255,200,255,0.25),
                rgba(200,255,255,0.35)
            );
            background-size: 200% 200%;
            mix-blend-mode: screen;
            z-index: 1;
            animation: ghostPulse 5s ease-in-out infinite;
        }
        @keyframes ghostPulse {
            0%, 100% { opacity: 0.5; background-position: 0% 0%; }
            50% { opacity: 1; background-position: 100% 100%; }
        }
        .rarity-GhR .card-holo-overlay {
            background: radial-gradient(ellipse at var(--holo-x, 50%) var(--holo-y, 50%),
                rgba(220,220,255,0.15) 0%, transparent 60%);
        }

        .rarity-UltR .card-name {
            background: linear-gradient(90deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c);
            background-size: 400% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmer 3s linear infinite;
        }
        .rarity-UltR .card-art-box::after {
            content: '';
            position: absolute;
            top:0;left:0;right:0;bottom:0;
            background: linear-gradient(
                var(--holo-angle, 135deg),
                rgba(255,200,100,0.15), rgba(100,255,200,0.15),
                rgba(255,100,200,0.15), rgba(100,200,255,0.15)
            );
            background-size: 200% 200%;
            mix-blend-mode: color-dodge;
            z-index: 1;
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

        .rarity-StR .card-name {
            background: linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff, #ff6b6b);
            background-size: 600% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: prismaticText 4s linear infinite;
        }
        @keyframes prismaticText {
            0% { background-position: 600% 0; }
            100% { background-position: -600% 0; }
        }
        .rarity-StR .card-art-box::after {
            content: '';
            position: absolute;
            top:0;left:0;right:0;bottom:0;
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
                linear-gradient(var(--holo-angle, 135deg),
                    rgba(255,0,0,0.12), rgba(255,255,0,0.12), rgba(0,255,0,0.12),
                    rgba(0,255,255,0.12), rgba(0,0,255,0.12), rgba(255,0,255,0.12)
                );
            mix-blend-mode: color-dodge;
            z-index: 1;
            animation: starlightTwinkle 2s ease-in-out infinite alternate;
        }
        @keyframes starlightTwinkle {
            0% { opacity: 0.4; filter: blur(0px); background-position: 0% 0%; }
            50% { opacity: 1; filter: blur(0.3px); background-position: 50% 50%; }
            100% { opacity: 0.6; filter: blur(0px); background-position: 100% 100%; }
        }

        .card-detail-view { perspective: 800px; }
        .card-detail-view .card {
            transition: transform 0.1s ease-out;
            will-change: transform;
        }

        /* ===== COLLECTION SCREEN ===== */
        .filter-bar {
            display: flex;
            gap: 6px;
            padding: 12px 16px;
            overflow-x: auto;
            flex-shrink: 0;
            -webkit-overflow-scrolling: touch;
        }
        .filter-btn {
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 700;
            background: rgba(255,255,255,0.04);
            color: #6b7a94;
            white-space: nowrap;
            border: 1px solid rgba(255,255,255,0.06);
            min-height: 44px;
            transition: all 0.2s;
        }
        .filter-btn.active {
            background: rgba(0,212,255,0.1);
            color: #00d4ff;
            border-color: rgba(0,212,255,0.3);
            box-shadow: 0 0 16px rgba(0,212,255,0.12);
        }
        .card-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(105px, 1fr));
            gap: 12px;
            padding: 14px 16px;
            flex: 1;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
        }
        .card-grid .card {
            width: 100%;
            aspect-ratio: 0.686;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .card-grid .card:active { transform: scale(0.95); }
        .card-count-badge {
            position: absolute;
            top: -5px;
            right: -5px;
            background: linear-gradient(135deg, #ff2d78, #e74c3c);
            color: white;
            font-size: 9px;
            font-weight: 900;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 5;
            box-shadow: 0 2px 6px rgba(255,45,120,0.3);
        }
        .card-locked {
            filter: brightness(0.25) grayscale(1);
        }

        /* ===== CARD DETAIL MODAL ===== */
        .modal-overlay {
            display: none;
            position: fixed;
            top:0;left:0;right:0;bottom:0;
            background: rgba(0,0,0,0.88);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            z-index: 100;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 20px;
        }
        .modal-overlay.active { display: flex; }
        .detail-card-wrap {
            width: 260px;
            aspect-ratio: 0.686;
            margin-bottom: 20px;
        }
        .detail-card-wrap .card {
            width: 100%;
            height: 100%;
            box-shadow: 0 8px 40px rgba(0,0,0,0.5), 0 0 60px rgba(255,215,0,0.05);
        }
        .detail-card-wrap .card-name-bar { font-size: 13px; padding: 7px 10px; min-height: 32px; }
        .detail-card-wrap .card-attr { width: 22px; height: 22px; font-size: 11px; }
        .detail-card-wrap .level-star { width: 13px; height: 13px; }
        .detail-card-wrap .card-level-bar { padding: 3px 8px; gap: 3px; min-height: 18px; }
        .detail-card-wrap .card-desc-box { font-size: 10px; padding: 7px 9px; min-height: 55px; line-height: 1.55; }
        .detail-card-wrap .card-stats-bar { font-size: 13px; padding: 4px 10px; }
        .detail-card-wrap .card-type-label { font-size: 9px; }
        .detail-info {
            text-align: center;
            max-width: 320px;
        }
        .detail-rarity {
            font-size: 14px;
            font-weight: 800;
            color: #ffd700;
            margin-bottom: 8px;
            letter-spacing: 1px;
        }
        .detail-close {
            margin-top: 18px;
            padding: 12px 40px;
            border-radius: 14px;
            background: rgba(255,255,255,0.06);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.08);
            color: #8892a8;
            font-size: 15px;
            font-weight: 700;
            transition: all 0.2s;
        }
        .detail-close:active { transform: scale(0.95); }

        /* ===== PACK OPENING ===== */
        #pack-screen .pack-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
            padding: 16px;
            flex: 1;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
        }
        .pack-item {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 16px;
            background: rgba(255,255,255,0.03);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border-radius: 16px;
            border: 1px solid rgba(255,255,255,0.05);
            transition: border-color 0.2s;
            box-shadow: 0 2px 12px rgba(0,0,0,0.2);
        }
        .pack-icon {
            width: 64px;
            height: 84px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            flex-shrink: 0;
            position: relative;
            overflow: hidden;
        }
        .pack-icon::after {
            content: '';
            position: absolute;
            top: -50%; left: -50%; right: -50%; bottom: -50%;
            background: linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%);
            animation: shimmer-bg 3s ease-in-out infinite;
        }
        .pack-info { flex: 1; }
        .pack-info h3 { font-size: 16px; font-weight: 800; letter-spacing: 0.3px; }
        .pack-info p { font-size: 12px; color: #6b7a94; margin-top: 3px; }
        .pack-buy-btn {
            padding: 10px 20px;
            border-radius: 12px;
            font-size: 13px;
            font-weight: 800;
            background: linear-gradient(135deg, #ffd700 0%, #ffaa00 100%);
            color: #1a1a1a;
            box-shadow: 0 2px 12px rgba(255,215,0,0.2);
            transition: transform 0.15s, box-shadow 0.15s;
        }
        .pack-buy-btn:active { transform: scale(0.95); }
        .pack-buy-btn:disabled {
            background: rgba(255,255,255,0.06);
            color: #444;
            box-shadow: none;
        }
        .pack-reveal {
            display: none;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 20px;
            background: radial-gradient(ellipse at 50% 40%, rgba(255,215,0,0.04) 0%, transparent 60%);
        }
        .pack-reveal.active { display: flex; }
        .pack-cards-row {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            justify-content: center;
            margin-bottom: 24px;
        }
        .pack-cards-row .card {
            width: 90px;
            aspect-ratio: 0.686;
            animation: cardReveal 0.5s ease-out both;
        }
        @keyframes cardReveal {
            0% { transform: scale(0.5) rotateY(180deg); opacity: 0; }
            100% { transform: scale(1) rotateY(0deg); opacity: 1; }
        }
        .reveal-new-badge {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(255,215,0,0.95), rgba(255,170,0,0.95));
            color: #1a1a1a;
            font-size: 8px;
            font-weight: 900;
            padding: 3px 8px;
            border-radius: 6px;
            z-index: 10;
            box-shadow: 0 2px 8px rgba(255,215,0,0.3);
        }

        /* ===== DECK BUILDER ===== */
        #deckbuilder-screen .deck-stats {
            padding: 12px 16px;
            display: flex;
            gap: 14px;
            font-size: 13px;
            color: #6b7a94;
            flex-shrink: 0;
            background: rgba(255,255,255,0.02);
            border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .deck-stats span { font-weight: 800; color: #00d4ff; }
        .deck-zone-label {
            padding: 8px 16px;
            font-size: 12px;
            font-weight: 800;
            color: #ffd700;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            border-bottom: 1px solid rgba(255,215,0,0.08);
        }
        .deck-section {
            padding: 10px 16px;
        }
        .deck-cards-row {
            display: flex;
            gap: 4px;
            flex-wrap: wrap;
        }
        .deck-cards-row .card {
            width: 48px;
            aspect-ratio: 0.686;
            cursor: pointer;
            font-size: 4px;
        }
        .deck-cards-row .card .card-desc-box { display: none; }
        .deck-cards-row .card .card-stats-bar { font-size: 5px; }
        .deck-add-area {
            flex: 1;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
        }
        .deck-save-btn {
            margin: 14px 16px;
            padding: 14px;
            border-radius: 14px;
            font-size: 15px;
            font-weight: 800;
            background: linear-gradient(135deg, #27ae60, #2ecc71, #27ae60);
            background-size: 200% 100%;
            color: white;
            text-align: center;
            box-shadow: 0 4px 20px rgba(46,204,113,0.25);
            transition: transform 0.15s;
            letter-spacing: 0.5px;
        }
        .deck-save-btn:active { transform: scale(0.97); }

        /* ===== DUEL SCREEN ===== */
        #duel-screen {
            height: 100vh;
            max-height: 100vh;
            overflow: hidden;
            position: relative;
            background:
                radial-gradient(ellipse at 30% 20%, rgba(0,212,255,0.03) 0%, transparent 50%),
                radial-gradient(ellipse at 70% 80%, rgba(0,100,200,0.03) 0%, transparent 50%),
                radial-gradient(ellipse at 50% 50%, rgba(15,30,55,0.0) 30%, rgba(5,5,8,0.6) 100%),
                linear-gradient(180deg, #081828 0%, #0a2238 25%, #0c2a48 50%, #0a2238 75%, #050508 100%);
            overscroll-behavior: none;
        }

        /* Caustic underwater light overlay */
        #duel-screen::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background:
                repeating-conic-gradient(from 0deg at 25% 30%, transparent 0deg, rgba(0,212,255,0.012) 5deg, transparent 10deg),
                repeating-conic-gradient(from 45deg at 75% 70%, transparent 0deg, rgba(0,150,255,0.01) 5deg, transparent 10deg);
            background-size: 300px 300px, 250px 250px;
            animation: caustic 12s linear infinite;
            pointer-events: none;
            z-index: 0;
        }

        /* Subtle hex grid pattern */
        #duel-screen::after {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background:
                repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.008) 1px, rgba(255,255,255,0.008) 2px),
                repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.008) 1px, rgba(255,255,255,0.008) 2px);
            background-size: 24px 24px;
            pointer-events: none;
            z-index: 0;
        }

        .duel-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 12px;
            padding-top: calc(8px + env(safe-area-inset-top, 0px));
            flex-shrink: 0;
            z-index: 5;
            position: relative;
        }
        .lp-bar {
            display: flex;
            align-items: center;
            gap: 8px;
            background: rgba(0,0,0,0.3);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            padding: 4px 10px;
            border-radius: 12px;
            border: 1px solid rgba(255,255,255,0.04);
        }
        .lp-label {
            font-size: 10px;
            color: #6b7a94;
            font-weight: 800;
            letter-spacing: 1px;
        }
        .lp-value {
            font-size: 16px;
            font-weight: 900;
            min-width: 50px;
            text-shadow: 0 0 12px currentColor;
        }
        .lp-value.player-lp { color: #00d4ff; }
        .lp-value.ai-lp { color: #ff2d78; }
        .lp-fill {
            width: 60px;
            height: 7px;
            background: rgba(255,255,255,0.04);
            border-radius: 4px;
            overflow: hidden;
            box-shadow: inset 0 1px 2px rgba(0,0,0,0.5);
        }
        .lp-fill-inner {
            height: 100%;
            border-radius: 4px;
            transition: width 0.5s;
        }
        .lp-fill-inner.player {
            background: linear-gradient(90deg, #0090c0, #00d4ff);
            box-shadow: 0 0 8px rgba(0,212,255,0.4);
        }
        .lp-fill-inner.ai {
            background: linear-gradient(90deg, #c02050, #ff2d78);
            box-shadow: 0 0 8px rgba(255,45,120,0.4);
        }
        .turn-indicator {
            font-size: 10px;
            font-weight: 900;
            color: #ffd700;
            text-align: center;
            text-shadow: 0 0 12px rgba(255,215,0,0.4);
            letter-spacing: 1px;
            padding: 4px 10px;
            background: rgba(255,215,0,0.06);
            border-radius: 8px;
            border: 1px solid rgba(255,215,0,0.1);
        }

        .duel-field {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 2px 8px;
            gap: 2px;
            min-height: 0;
            position: relative;
            z-index: 1;
        }
        .field-row {
            display: flex;
            justify-content: center;
            gap: 3px;
        }
        .field-zone {
            width: 42px;
            height: 58px;
            border-radius: 6px;
            border: 1px solid rgba(0,212,255,0.08);
            background: rgba(0,15,30,0.4);
            position: relative;
            cursor: pointer;
            transition: all 0.2s;
            min-height: 38px;
            box-shadow: inset 0 1px 4px rgba(0,0,0,0.3), 0 0.5px 0 rgba(0,212,255,0.03);
        }
        .field-zone:hover, .field-zone.highlight {
            border-color: rgba(0,212,255,0.35);
            background: rgba(0,212,255,0.04);
            box-shadow: inset 0 1px 4px rgba(0,0,0,0.3), 0 0 12px rgba(0,212,255,0.08);
        }
        .field-zone.selected {
            border-color: #00d4ff;
            box-shadow: 0 0 12px rgba(0,212,255,0.3), inset 0 0 8px rgba(0,212,255,0.08);
        }
        .field-zone.attack-target {
            border-color: #ff2d78;
            box-shadow: 0 0 12px rgba(255,45,120,0.3), inset 0 0 8px rgba(255,45,120,0.08);
        }
        .field-zone .card {
            position: absolute;
            top:1px;left:1px;right:1px;bottom:1px;
            border-radius: 4px;
        }
        .field-zone .card.def-pos {
            transform: rotate(90deg) scale(0.85);
        }
        .field-zone.field-spell-zone {
            width: 38px;
            height: 52px;
            border-color: rgba(30,138,94,0.2);
            background: rgba(5,40,25,0.35);
            align-self: center;
            box-shadow: inset 0 1px 4px rgba(0,0,0,0.25), 0 0.5px 0 rgba(30,138,94,0.06);
        }
        .field-label {
            position: absolute;
            bottom: 1px;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 5px;
            color: rgba(255,255,255,0.15);
            pointer-events: none;
        }
        .field-center-row {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 12px;
            padding: 2px 0;
            position: relative;
        }
        .field-center-row::before {
            content: '';
            position: absolute;
            left: 10%;
            right: 10%;
            top: 50%;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(0,212,255,0.12), transparent);
            z-index: 0;
        }
        .gy-zone, .deck-zone {
            width: 34px;
            height: 48px;
            border-radius: 6px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 6px;
            font-weight: 700;
            color: rgba(255,255,255,0.35);
            cursor: pointer;
            border: 1px solid rgba(255,255,255,0.06);
            min-height: 38px;
        }
        .gy-zone {
            background: rgba(60,0,10,0.3);
            border-color: rgba(255,45,120,0.12);
            box-shadow: inset 0 1px 4px rgba(0,0,0,0.3);
        }
        .deck-zone {
            background: rgba(0,10,60,0.3);
            border-color: rgba(0,100,212,0.12);
            box-shadow: inset 0 1px 4px rgba(0,0,0,0.3);
        }
        .zone-count {
            font-size: 10px;
            font-weight: 900;
            color: #e2e8f0;
        }

        .phase-bar {
            display: flex;
            gap: 4px;
            padding: 5px 8px;
            padding-bottom: calc(5px + env(safe-area-inset-bottom, 0px));
            justify-content: center;
            flex-shrink: 0;
            position: relative;
            z-index: 1;
        }
        .phase-btn {
            padding: 5px 10px;
            border-radius: 16px;
            font-size: 10px;
            font-weight: 700;
            background: rgba(255,255,255,0.04);
            color: #444;
            min-height: 44px;
            transition: all 0.2s;
            border: 1px solid transparent;
        }
        .phase-btn.current {
            background: rgba(255,215,0,0.1);
            color: #ffd700;
            border-color: rgba(255,215,0,0.25);
            box-shadow: 0 0 10px rgba(255,215,0,0.08);
        }
        .phase-btn.clickable {
            color: #00d4ff;
            background: rgba(0,212,255,0.08);
            border-color: rgba(0,212,255,0.25);
            box-shadow: 0 0 10px rgba(0,212,255,0.08);
        }

        .hand-area {
            padding: 5px 8px 8px;
            padding-bottom: calc(8px + env(safe-area-inset-bottom, 0px));
            flex-shrink: 0;
            overflow-x: auto;
            display: flex;
            gap: 4px;
            justify-content: center;
            min-height: 75px;
            -webkit-overflow-scrolling: touch;
            position: relative;
            z-index: 1;
            mask-image: linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%);
            -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%);
        }
        .hand-area .card {
            width: 48px;
            height: 68px;
            flex-shrink: 0;
            cursor: pointer;
            transition: transform 0.15s, margin-top 0.15s, box-shadow 0.2s;
        }
        .hand-area .card:hover, .hand-area .card.selected {
            transform: translateY(-12px) scale(1.05);
            z-index: 10;
            box-shadow: 0 10px 28px rgba(0,0,0,0.6), 0 0 16px rgba(0,212,255,0.15), 0 0 0 0.5px rgba(0,212,255,0.2);
        }
        .hand-area .card .card-desc-box { display: none; }

        /* Action menu */
        .action-menu {
            display: none;
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(16,20,35,0.92);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 16px;
            padding: 10px;
            z-index: 50;
            gap: 6px;
            flex-direction: column;
            min-width: 170px;
            box-shadow: 0 12px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04);
        }
        .action-menu.active { display: flex; }
        .action-btn {
            padding: 11px 18px;
            border-radius: 12px;
            font-size: 13px;
            font-weight: 700;
            text-align: center;
            transition: all 0.15s;
            min-height: 44px;
        }
        .action-btn.summon { background: rgba(46,204,113,0.1); color: #2ecc71; border: 1px solid rgba(46,204,113,0.12); }
        .action-btn.set { background: rgba(155,89,182,0.1); color: #bb6bd9; border: 1px solid rgba(155,89,182,0.12); }
        .action-btn.activate { background: rgba(0,212,255,0.1); color: #00d4ff; border: 1px solid rgba(0,212,255,0.12); }
        .action-btn.attack { background: rgba(255,45,120,0.1); color: #ff2d78; border: 1px solid rgba(255,45,120,0.12); }
        .action-btn.position { background: rgba(255,215,0,0.1); color: #ffd700; border: 1px solid rgba(255,215,0,0.12); }
        .action-btn.cancel { background: rgba(255,255,255,0.03); color: #555; border: 1px solid rgba(255,255,255,0.04); }
        .action-btn:active { filter: brightness(1.3); transform: scale(0.97); }

        /* Duel log */
        .duel-log {
            position: absolute;
            top: 36px;
            left: 8px;
            right: 8px;
            max-height: 60px;
            overflow: hidden;
            pointer-events: none;
            z-index: 20;
        }
        .log-entry {
            font-size: 10px;
            padding: 3px 10px;
            background: rgba(0,0,0,0.6);
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
            border-radius: 6px;
            margin-bottom: 2px;
            color: #8892a8;
            animation: logFade 3s forwards;
            border-left: 2px solid rgba(0,212,255,0.3);
        }
        @keyframes logFade {
            0% { opacity: 1; }
            70% { opacity: 1; }
            100% { opacity: 0; }
        }

        /* Chain/Trap prompt */
        .trap-prompt-overlay {
            display: none;
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.88);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            z-index: 95;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 20px;
        }
        .trap-prompt-overlay.active { display: flex; }
        .trap-prompt-box {
            background: linear-gradient(135deg, rgba(30,12,55,0.95) 0%, rgba(10,20,40,0.95) 100%);
            border: 2px solid #ff2d78;
            border-radius: 18px;
            padding: 24px;
            text-align: center;
            max-width: 300px;
            width: 90%;
            box-shadow: 0 0 80px rgba(255,45,120,0.2), 0 0 0 1px rgba(255,45,120,0.1), inset 0 1px 0 rgba(255,255,255,0.05);
            animation: trapSlideIn 0.25s ease-out;
        }
        @keyframes trapSlideIn {
            from { transform: translateY(30px) scale(0.95); opacity: 0; }
            to { transform: translateY(0) scale(1); opacity: 1; }
        }
        .trap-prompt-title {
            font-size: 15px;
            font-weight: 900;
            color: #ff2d78;
            margin-bottom: 14px;
            text-transform: uppercase;
            letter-spacing: 2px;
            text-shadow: 0 0 16px rgba(255,45,120,0.4);
        }
        .trap-prompt-card-area {
            width: 140px;
            aspect-ratio: 0.686;
            margin: 0 auto 14px;
        }
        .trap-prompt-card-area .card { width: 100%; height: 100%; }
        .trap-prompt-desc {
            font-size: 11px;
            color: #8892a8;
            line-height: 1.5;
            margin-bottom: 18px;
            padding: 0 4px;
        }
        .trap-prompt-buttons { display: flex; gap: 12px; justify-content: center; }
        .trap-prompt-btn {
            padding: 11px 30px;
            border-radius: 12px;
            font-weight: 800;
            font-size: 14px;
            cursor: pointer;
            border: none;
            font-family: 'Nunito', sans-serif;
            min-height: 44px;
            transition: all 0.15s;
        }
        .trap-prompt-btn:active { transform: scale(0.95); }
        .trap-yes {
            background: linear-gradient(135deg, #ff2d78, #e91e63);
            color: white;
            box-shadow: 0 4px 16px rgba(255,45,120,0.3);
        }
        .trap-no {
            background: rgba(255,255,255,0.06);
            color: #6b7a94;
            border: 1px solid rgba(255,255,255,0.06);
        }

        /* Game over overlay */
        .game-over-overlay {
            display: none;
            position: fixed;
            top:0;left:0;right:0;bottom:0;
            background: rgba(0,0,0,0.92);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            z-index: 200;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }
        .game-over-overlay.active { display: flex; }
        .game-over-text {
            font-size: 48px;
            font-weight: 900;
            margin-bottom: 14px;
            letter-spacing: 4px;
        }
        .game-over-text.win {
            color: #ffd700;
            text-shadow: 0 0 30px rgba(255,215,0,0.5), 0 0 60px rgba(255,215,0,0.2);
            animation: winPulse 2s ease-in-out infinite;
        }
        @keyframes winPulse {
            0%, 100% { text-shadow: 0 0 30px rgba(255,215,0,0.5), 0 0 60px rgba(255,215,0,0.2); }
            50% { text-shadow: 0 0 50px rgba(255,215,0,0.7), 0 0 100px rgba(255,215,0,0.3); }
        }
        .game-over-text.lose {
            color: #ff2d78;
            text-shadow: 0 0 30px rgba(255,45,120,0.5);
        }
        .game-over-reward {
            font-size: 16px;
            color: #8892a8;
            margin-bottom: 28px;
            letter-spacing: 0.5px;
        }
        .game-over-btn {
            padding: 15px 44px;
            border-radius: 14px;
            font-size: 16px;
            font-weight: 700;
            background: rgba(255,255,255,0.06);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.08);
            color: #e2e8f0;
            transition: all 0.2s;
        }
        .game-over-btn:active { transform: scale(0.96); }

        /* Damage flash */
        .damage-flash {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 52px;
            font-weight: 900;
            color: #ff2d78;
            text-shadow: 0 0 30px rgba(255,45,120,0.6), 0 0 60px rgba(255,45,120,0.3);
            z-index: 60;
            animation: dmgFlash 1s ease-out forwards;
            pointer-events: none;
            letter-spacing: 2px;
        }
        .damage-flash.heal { color: #2ecc71; text-shadow: 0 0 30px rgba(46,204,113,0.6), 0 0 60px rgba(46,204,113,0.3); }
        @keyframes dmgFlash {
            0% { opacity: 1; transform: translate(-50%, -50%) scale(0.4); }
            25% { transform: translate(-50%, -50%) scale(1.3); }
            100% { opacity: 0; transform: translate(-50%, -75%) scale(1); }
        }

        /* Tribute select */
        .tribute-prompt {
            position: fixed;
            bottom: 0; left: 0; right: 0;
            background: rgba(16,20,35,0.95);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-top: 2px solid rgba(255,215,0,0.25);
            padding: 14px 16px;
            padding-bottom: calc(14px + env(safe-area-inset-bottom, 0px));
            z-index: 55;
            display: none;
            text-align: center;
            box-shadow: 0 -8px 32px rgba(0,0,0,0.4);
        }
        .tribute-prompt.active { display: block; }
        .tribute-prompt p {
            font-size: 13px;
            color: #ffd700;
            font-weight: 800;
            margin-bottom: 10px;
            letter-spacing: 0.5px;
        }
        .tribute-confirm {
            padding: 9px 28px;
            border-radius: 12px;
            font-size: 13px;
            font-weight: 800;
            background: rgba(46,204,113,0.12);
            color: #2ecc71;
            margin-top: 8px;
            min-height: 44px;
            border: 1px solid rgba(46,204,113,0.2);
            transition: all 0.15s;
        }
        .tribute-confirm:active { transform: scale(0.95); }

        /* How to play screen */
        #howto-screen .howto-content {
            padding: 20px 16px;
            flex: 1;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
        }
        .howto-content h3 {
            color: #ffd700;
            font-size: 16px;
            margin: 20px 0 10px;
            letter-spacing: 0.5px;
        }
        .howto-content h3:first-child { margin-top: 0; }
        .howto-content p, .howto-content li {
            font-size: 13px;
            color: #8892a8;
            line-height: 1.7;
            margin-bottom: 6px;
        }
        .howto-content ul { padding-left: 20px; }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }

        /* ===== TABLET / SMALL DESKTOP (768px+) ===== */
        @media (min-width: 768px) {
            .title-logo h1 { font-size: 72px; letter-spacing: 8px; }
            .title-lobster { width: 170px; height: 170px; }
            .title-lobster svg { width: 170px; height: 170px; }
            .menu-buttons { width: 340px; }
            .card-grid {
                grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            }
            .detail-card-wrap { width: 340px; }
            .detail-card-wrap .card-name-bar { font-size: 15px; padding: 8px 12px; }
            .detail-card-wrap .card-attr { width: 24px; height: 24px; font-size: 12px; }
            .detail-card-wrap .card-desc-box { font-size: 12px; padding: 9px 11px; line-height: 1.55; }
            .detail-card-wrap .card-stats-bar { font-size: 15px; padding: 5px 12px; }
            .detail-card-wrap .card-type-label { font-size: 10px; }
            .detail-info { max-width: 340px; }
            .deck-cards-row .card { width: 64px; }
            .pack-item { flex-direction: row; }
            .pack-icon { width: 72px; height: 94px; }
            /* Duel — tablet */
            .field-zone { width: 52px; height: 72px; }
            .field-row { gap: 4px; }
            .field-zone.field-spell-zone { width: 46px; height: 64px; }
            .hand-area .card { width: 60px; height: 86px; }
            .hand-area { min-height: 95px; gap: 5px; }
            .phase-btn { padding: 8px 16px; font-size: 12px; }
            .action-menu { min-width: 210px; padding: 12px; }
            .gy-zone, .deck-zone { width: 42px; height: 58px; }
            .zone-count { font-size: 12px; }
            .field-center-row { gap: 12px; }
            .lp-value { font-size: 18px; }
            .lp-fill { width: 80px; }
            .duel-log { max-height: 70px; }
            .log-entry { font-size: 11px; }
        }

        /* ===== DESKTOP (1024px+) ===== */
        @media (min-width: 1024px) {
            .title-logo h1 { font-size: 80px; }
            .card-grid {
                grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
                gap: 14px;
            }
            .card-grid .card:hover { transform: scale(1.04); box-shadow: 0 4px 20px rgba(0,0,0,0.4), 0 0 12px rgba(0,212,255,0.08); }
            .detail-card-wrap { width: 420px; }
            .detail-card-wrap .card-name-bar { font-size: 18px; padding: 9px 14px; min-height: 38px; }
            .detail-card-wrap .card-attr { width: 28px; height: 28px; font-size: 14px; }
            .detail-card-wrap .level-star { width: 16px; height: 16px; }
            .detail-card-wrap .card-desc-box { font-size: 14px; padding: 10px 12px; min-height: 70px; line-height: 1.55; }
            .detail-card-wrap .card-stats-bar { font-size: 18px; padding: 6px 14px; }
            .detail-card-wrap .card-type-label { font-size: 12px; }
            .detail-info { max-width: 420px; }
            /* Duel — desktop */
            #duel-screen { align-items: center; }
            .duel-header { max-width: 600px; width: 100%; }
            .duel-field { max-width: 580px; width: 100%; }
            .phase-bar { max-width: 520px; width: 100%; }
            .hand-area { max-width: 640px; width: 100%; }
            .duel-log { max-width: 580px; max-height: 80px; }
            .field-zone { width: 64px; height: 88px; }
            .field-row { gap: 6px; }
            .field-zone.field-spell-zone { width: 56px; height: 78px; }
            .hand-area .card { width: 72px; height: 102px; }
            .hand-area { min-height: 115px; gap: 6px; }
            .hand-area .card:hover, .hand-area .card.selected { transform: translateY(-14px) scale(1.06); }
            .lp-value { font-size: 20px; }
            .lp-fill { width: 90px; height: 7px; }
            .lp-label { font-size: 11px; }
            .turn-indicator { font-size: 11px; }
            .gy-zone, .deck-zone { width: 44px; height: 62px; font-size: 7px; }
            .zone-count { font-size: 13px; }
            .field-center-row { gap: 14px; }
            .action-menu { min-width: 230px; padding: 14px; }
            .action-btn { padding: 13px 22px; font-size: 14px; }
            .log-entry { font-size: 11px; }
            .phase-btn { padding: 8px 18px; font-size: 13px; }
            /* Desktop card preview panel */
            .card-preview-panel { display: block; position: fixed; right: 16px; top: 50%; transform: translateY(-50%); z-index: 60; pointer-events: none; opacity: 0; transition: opacity 0.2s; cursor: pointer; }
            .card-preview-panel.active { opacity: 1; pointer-events: auto; }
            .card-preview-panel .card { width: 220px; height: 308px; box-shadow: 0 10px 50px rgba(0,0,0,0.6), 0 0 30px rgba(0,212,255,0.05); }
            .card-preview-panel .card .card-name-bar { font-size: 12px; }
            .card-preview-panel .card .card-desc-box { font-size: 10px; line-height: 1.4; display: block; }
            .card-preview-panel .card .card-stats-bar { font-size: 12px; }
            .card-preview-panel .card .card-type-label { font-size: 8px; }
            .menu-btn:hover {
                filter: brightness(1.15);
                transform: scale(1.02);
            }
            .menu-btn:active { transform: scale(0.96); }
            .phase-btn.clickable:hover {
                filter: brightness(1.2);
                transform: scale(1.05);
            }
            .action-btn:hover { filter: brightness(1.2); }
            .filter-btn:hover { background: rgba(255,255,255,0.08); }
            .pack-buy-btn:hover:not(:disabled) {
                filter: brightness(1.1);
                transform: scale(1.03);
            }
            .pack-item:hover { border-color: rgba(255,255,255,0.1); }
            .detail-close:hover { background: rgba(255,255,255,0.1); }
            .back-btn:hover { background: rgba(255,255,255,0.1); }
        }

        /* ===== LARGE DESKTOP (1400px+) ===== */
        @media (min-width: 1400px) {
            .field-zone { width: 76px; height: 104px; }
            .field-row { gap: 8px; }
            .field-zone.field-spell-zone { width: 66px; height: 92px; }
            .hand-area .card { width: 84px; height: 120px; }
            .hand-area { min-height: 135px; gap: 8px; }
            .hand-area .card:hover, .hand-area .card.selected { transform: translateY(-18px) scale(1.08); }
            .duel-field { max-width: 700px; }
            .duel-header { max-width: 700px; }
            .phase-bar { max-width: 640px; }
            .hand-area { max-width: 760px; }
            .lp-value { font-size: 24px; min-width: 56px; }
            .lp-fill { width: 120px; height: 8px; }
            .lp-label { font-size: 13px; }
            .turn-indicator { font-size: 13px; }
            .gy-zone, .deck-zone { width: 52px; height: 72px; font-size: 8px; }
            .zone-count { font-size: 15px; }
            .field-center-row { gap: 20px; }
            .duel-log { max-width: 700px; max-height: 90px; }
            .log-entry { font-size: 12px; padding: 3px 10px; }
            .action-menu { min-width: 260px; }
            .action-btn { padding: 14px 24px; font-size: 15px; }
            .phase-btn { padding: 10px 22px; font-size: 14px; }
            .game-over-text { font-size: 60px; }
            .game-over-reward { font-size: 20px; }
            .game-over-btn { padding: 16px 48px; font-size: 18px; }
            .card-preview-panel .card { width: 280px; height: 392px; }
            .card-preview-panel .card .card-name-bar { font-size: 14px; }
            .card-preview-panel .card .card-desc-box { font-size: 12px; line-height: 1.45; }
            .card-preview-panel .card .card-stats-bar { font-size: 14px; }
            .card-preview-panel .card .card-type-label { font-size: 10px; }
            .card-preview-panel { right: 30px; }
            .detail-card-wrap { width: 500px; }
            .detail-card-wrap .card-name-bar { font-size: 22px; padding: 10px 16px; min-height: 44px; }
            .detail-card-wrap .card-attr { width: 32px; height: 32px; font-size: 16px; }
            .detail-card-wrap .level-star { width: 18px; height: 18px; }
            .detail-card-wrap .card-desc-box { font-size: 16px; padding: 12px 14px; min-height: 80px; line-height: 1.6; }
            .detail-card-wrap .card-stats-bar { font-size: 22px; padding: 8px 16px; }
            .detail-card-wrap .card-type-label { font-size: 13px; }
            .detail-info { max-width: 500px; }
            .detail-rarity { font-size: 16px; }
            .detail-close { font-size: 16px; padding: 12px 40px; }
        }

        /* ===== MOBILE LANDSCAPE ===== */
        @media (max-height: 500px) and (orientation: landscape) {
            .duel-header { padding: 2px 12px; }
            .lp-value { font-size: 13px; min-width: 40px; }
            .lp-fill { width: 50px; height: 4px; }
            .lp-bar { padding: 3px 8px; }
            .turn-indicator { font-size: 9px; padding: 2px 6px; }
            .field-zone { width: 38px; height: 52px; min-height: 32px; }
            .field-row { gap: 2px; }
            .duel-field { padding: 1px 6px; gap: 1px; }
            .hand-area { min-height: 60px; padding: 2px 6px 4px; gap: 2px; }
            .hand-area .card { width: 40px; height: 58px; }
            .phase-bar { padding: 2px 6px; gap: 2px; }
            .phase-btn { padding: 3px 6px; font-size: 8px; min-height: 28px; }
            .gy-zone, .deck-zone { width: 30px; height: 42px; min-height: 32px; font-size: 5px; }
            .zone-count { font-size: 9px; }
            .field-zone.field-spell-zone { width: 34px; height: 48px; }
            .field-center-row { gap: 6px; padding: 1px 0; }
            .action-menu { bottom: 65px; }
            .trap-prompt-box { max-width: 240px; padding: 16px; }
            .trap-prompt-card-area { width: 100px; }
        }
    `;

// ── NEW HTML BODY ────────────────────────────────────────────────────
const newHTML = `
    <!-- ===== WALLET CONNECT MODAL ===== -->
    <div class="wallet-modal-overlay" id="wallet-modal">
        <div class="wallet-modal">
            <h2>Connect Wallet</h2>
            <p class="wallet-subtitle">$DD (DuckDollars) is the currency for Claw Wars. Connect your wallet to track your on-chain balance.</p>
            <input type="text" id="wallet-input" placeholder="0x..." maxlength="42" autocomplete="off" autocorrect="off" spellcheck="false">
            <div class="wallet-error" id="wallet-error"></div>
            <button class="wallet-connect-btn" onclick="connectWalletFromInput()">Connect</button>
            <button class="wallet-skip-btn" onclick="playWithoutWallet()">Play Without Wallet</button>
        </div>
    </div>

    <!-- ===== TITLE SCREEN ===== -->
    <div id="title-screen" class="screen active">
        <div class="coin-display" id="title-coins">$DD 0</div>
        <div class="wallet-display" id="title-wallet">
            <span class="wallet-addr" id="title-wallet-addr">No Wallet</span>
            <button class="wallet-change-btn" id="title-wallet-btn" onclick="showWalletModal()">Connect</button>
        </div>
        <div class="title-logo">
            <div class="title-lobster">
                <svg viewBox="0 0 120 120" width="120" height="120">
                    <defs>
                        <linearGradient id="lobster-grad" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stop-color="#ff4444"/>
                            <stop offset="100%" stop-color="#cc2222"/>
                        </linearGradient>
                    </defs>
                    <g fill="url(#lobster-grad)">
                        <ellipse cx="60" cy="62" rx="18" ry="26"/>
                        <circle cx="60" cy="34" r="13"/>
                        <path d="M47 48 L28 34 L16 24 L24 34 L16 44 L30 38Z"/>
                        <path d="M73 48 L92 34 L104 24 L96 34 L104 44 L90 38Z"/>
                        <path d="M50 86 L46 100 L54 96 L60 104 L66 96 L74 100 L70 86Z"/>
                        <circle cx="54" cy="30" r="3" fill="#fff"/>
                        <circle cx="66" cy="30" r="3" fill="#fff"/>
                        <circle cx="54" cy="30" r="1.5" fill="#111"/>
                        <circle cx="66" cy="30" r="1.5" fill="#111"/>
                        <path d="M54 22 Q42 6 30 2" stroke="#ff4444" fill="none" stroke-width="2.5" stroke-linecap="round"/>
                        <path d="M66 22 Q78 6 90 2" stroke="#ff4444" fill="none" stroke-width="2.5" stroke-linecap="round"/>
                        <line x1="48" y1="72" x2="34" y2="86" stroke="#cc2222" stroke-width="2.5"/>
                        <line x1="52" y1="78" x2="40" y2="92" stroke="#cc2222" stroke-width="2.5"/>
                        <line x1="72" y1="72" x2="86" y2="86" stroke="#cc2222" stroke-width="2.5"/>
                        <line x1="68" y1="78" x2="80" y2="92" stroke="#cc2222" stroke-width="2.5"/>
                    </g>
                </svg>
            </div>
            <h1>CLAW WARS</h1>
            <div class="subtitle">Lobster Trading Card Game</div>
        </div>
        <div class="menu-buttons">
            <button class="menu-btn primary" onclick="startDuel()">DUEL</button>
            <button class="menu-btn secondary" onclick="showScreen('collection-screen')">COLLECTION</button>
            <button class="menu-btn secondary" onclick="showScreen('pack-screen')">OPEN PACKS</button>
            <button class="menu-btn secondary" onclick="showScreen('deckbuilder-screen')">DECK BUILDER</button>
            <button class="menu-btn secondary" onclick="showScreen('howto-screen')">HOW TO PLAY</button>
        </div>
    </div>

    <!-- ===== COLLECTION SCREEN ===== -->
    <div id="collection-screen" class="screen">
        <div class="header-bar">
            <button class="back-btn" onclick="showScreen('title-screen')">\u2190 Back</button>
            <h2>Collection</h2>
            <span id="coll-count" style="font-size:12px;color:#6b7a94"></span>
        </div>
        <div class="filter-bar" id="coll-filters"></div>
        <div class="card-grid" id="coll-grid"></div>
    </div>

    <!-- ===== PACK SCREEN ===== -->
    <div id="pack-screen" class="screen">
        <div class="header-bar">
            <button class="back-btn" onclick="showScreen('title-screen')">\u2190 Back</button>
            <h2>Open Packs</h2>
            <span id="pack-coins" class="coin-display" style="position:static">$DD 0</span>
        </div>
        <div class="pack-list" id="pack-list"></div>
        <div class="pack-reveal" id="pack-reveal">
            <div class="pack-cards-row" id="reveal-cards"></div>
            <button class="menu-btn primary" onclick="closeReveal()" style="width:200px">CONTINUE</button>
        </div>
    </div>

    <!-- ===== DECK BUILDER SCREEN ===== -->
    <div id="deckbuilder-screen" class="screen">
        <div class="header-bar">
            <button class="back-btn" onclick="showScreen('title-screen')">\u2190 Back</button>
            <h2>Deck Builder</h2>
        </div>
        <div class="deck-stats" id="deck-stats"></div>
        <div class="deck-add-area" id="deck-area"></div>
    </div>

    <!-- ===== HOW TO PLAY ===== -->
    <div id="howto-screen" class="screen">
        <div class="header-bar">
            <button class="back-btn" onclick="showScreen('title-screen')">\u2190 Back</button>
            <h2>How To Play</h2>
        </div>
        <div class="howto-content">
            <h3>Overview</h3>
            <p>Claw Wars is a strategic trading card game where you command an army of lobster warriors! Reduce your opponent's Life Points from 8000 to 0 to win.</p>
            <h3>Card Types</h3>
            <ul>
                <li><b style="color:#e8cc66">Monster Cards</b> \u2014 Summon creatures to attack and defend. They have ATK (attack) and DEF (defense) values and a Level (stars).</li>
                <li><b style="color:#38b880">Spell Cards</b> \u2014 Magical effects: Normal, Continuous, Equip, Swift, Field, and Ritual types.</li>
                <li><b style="color:#c040a0">Trap Cards</b> \u2014 Set face-down and activate when conditions are met to surprise your opponent.</li>
            </ul>
            <h3>Turn Phases</h3>
            <ul>
                <li><b>Draw Phase</b> \u2014 Draw 1 card from your deck</li>
                <li><b>Main Phase 1</b> \u2014 Summon monsters, activate/set Spells and Traps</li>
                <li><b>Battle Phase</b> \u2014 Attack with your monsters</li>
                <li><b>Main Phase 2</b> \u2014 More summons and card plays</li>
                <li><b>End Phase</b> \u2014 End your turn</li>
            </ul>
            <h3>Summoning</h3>
            <ul>
                <li>Level 1-4 monsters: Normal Summon directly (1 per turn)</li>
                <li>Level 5-6 monsters: Tribute 1 monster you control</li>
                <li>Level 7+ monsters: Tribute 2 monsters you control</li>
                <li>Fusion: Use "Shell Fusion" + listed materials</li>
                <li>Sync: Conduit + non-Conduit(s) whose levels equal the Sync monster's level</li>
                <li>Ritual: Use a Ritual Spell + tributes matching the level</li>
            </ul>
            <h3>Battle</h3>
            <ul>
                <li>ATK vs ATK: Lower ATK destroyed, owner takes damage equal to the difference</li>
                <li>ATK vs DEF: If ATK > DEF, defender destroyed (no damage). If DEF >= ATK, attacker takes damage equal to the difference</li>
                <li>Direct Attack: If opponent has no monsters, attack their Life Points directly</li>
            </ul>
            <h3>Rarities</h3>
            <ul>
                <li><b>Common</b> \u2014 Standard card</li>
                <li><b style="color:#ccc">Rare</b> \u2014 Silver name text</li>
                <li><b style="color:#00d4ff">Super Rare</b> \u2014 Rainbow shimmer on art</li>
                <li><b style="color:#ffd700">Ultra Rare</b> \u2014 Gold name + rainbow art</li>
                <li><b style="color:#ff2d78">Secret Rare</b> \u2014 Cross-hatch holographic</li>
                <li><b style="color:#aabbff">Phantom Rare</b> \u2014 Ethereal ghostly effect</li>
                <li><b style="color:#ffaa55">Embossed Rare</b> \u2014 3D relief</li>
                <li><b style="color:#ff9ff3">Cosmic Rare</b> \u2014 Prismatic sparkle</li>
            </ul>
        </div>
    </div>

    <!-- ===== DUEL SCREEN ===== -->
    <div id="duel-screen" class="screen">
        <div class="duel-header">
            <div class="lp-bar">
                <div class="lp-label">AI</div>
                <div class="lp-value ai-lp" id="ai-lp">8000</div>
                <div class="lp-fill"><div class="lp-fill-inner ai" id="ai-lp-bar" style="width:100%"></div></div>
            </div>
            <div class="turn-indicator" id="turn-info">Turn 1</div>
            <div class="lp-bar" style="flex-direction:row-reverse">
                <div class="lp-label">YOU</div>
                <div class="lp-value player-lp" id="player-lp">8000</div>
                <div class="lp-fill"><div class="lp-fill-inner player" id="player-lp-bar" style="width:100%"></div></div>
            </div>
        </div>
        <div class="duel-log" id="duel-log"></div>
        <div class="duel-field" id="duel-field"></div>
        <div class="phase-bar" id="phase-bar"></div>
        <div class="hand-area" id="player-hand"></div>
        <div class="card-preview-panel" id="card-preview-panel"></div>
        <div class="action-menu" id="action-menu"></div>
        <div class="trap-prompt-overlay" id="trap-prompt">
            <div class="trap-prompt-box">
                <div class="trap-prompt-title">Activate Trap?</div>
                <div class="trap-prompt-card-area" id="trap-prompt-card"></div>
                <div class="trap-prompt-desc" id="trap-prompt-desc"></div>
                <div class="trap-prompt-buttons">
                    <button class="trap-prompt-btn trap-yes" id="trap-yes-btn">Activate</button>
                    <button class="trap-prompt-btn trap-no" id="trap-no-btn">No</button>
                </div>
            </div>
        </div>
        <div class="tribute-prompt" id="tribute-prompt">
            <p id="tribute-text">Select monsters to tribute</p>
            <button class="tribute-confirm" id="tribute-confirm" onclick="confirmTributes()">Confirm</button>
        </div>
        <div class="game-over-overlay" id="game-over">
            <div class="game-over-text" id="game-over-text"></div>
            <div class="game-over-reward" id="game-over-reward"></div>
            <button class="game-over-btn" onclick="showScreen('title-screen')">Return to Menu</button>
        </div>
    </div>

    <!-- ===== CARD DETAIL MODAL ===== -->
    <div class="modal-overlay" id="card-modal">
        <div class="detail-card-wrap card-detail-view" id="detail-card-wrap"></div>
        <div class="detail-info">
            <div class="detail-rarity" id="detail-rarity"></div>
        </div>
        <button class="detail-close" onclick="closeModal()">Close</button>
    </div>

`;

// ── PERFORM REPLACEMENT ──────────────────────────────────────────────
const styleStart = html.indexOf('<style>') + 7;
const styleEnd = html.indexOf('</style>');

if (styleStart === 6 || styleEnd === -1) {
    console.error('ERROR: Could not find <style> block');
    process.exit(1);
}

const bodyStart = html.indexOf('<body>') + 6;
const scriptStart = html.indexOf('\n<script>');
const scriptStartAlt = scriptStart === -1 ? html.indexOf('<script>') : scriptStart;

if (bodyStart === 5 || scriptStartAlt === -1) {
    console.error('ERROR: Could not find <body> or <script> tag');
    process.exit(1);
}

const actualScriptStart = scriptStart !== -1 ? scriptStart : scriptStartAlt;

// Rebuild the file:
// 1. Everything before <style> content
// 2. New CSS
// 3. </style></head><body>
// 4. New HTML body
// 5. <script> through end of file
const beforeCSS = html.substring(0, styleStart);
const betweenCSSandBody = html.substring(styleEnd, bodyStart);
const fromScript = html.substring(actualScriptStart);

html = beforeCSS + '\n' + newCSS + '\n    ' + betweenCSSandBody + '\n' + newHTML + '\n' + fromScript;

fs.writeFileSync(filePath, html, 'utf8');

const newSize = Buffer.byteLength(html);
console.log(`New file size: ${newSize} bytes (${(newSize / 1024).toFixed(1)} KB)`);

if (newSize > 500 * 1024) {
    console.warn('WARNING: File exceeds 500KB limit!');
} else {
    console.log('File size OK (under 500KB).');
}

console.log('UI redesign applied successfully.');
