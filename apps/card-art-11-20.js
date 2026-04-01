    // === 11: Pincer Duelist — elegant fencer lobster, rapier claw, en garde stance, underwater arena ===
    11: `<svg viewBox="0 0 120 100">
        <defs>
            <radialGradient id="pd11bg" cx="40%" cy="55%"><stop offset="0%" stop-color="#0c2848"/><stop offset="60%" stop-color="#061428"/><stop offset="100%" stop-color="#020810"/></radialGradient>
            <linearGradient id="pd11body" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#5098cc"/><stop offset="50%" stop-color="#3878b0"/><stop offset="100%" stop-color="#2860a0"/></linearGradient>
            <linearGradient id="pd11blade" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#c0ecff"/><stop offset="100%" stop-color="#60b0e0"/></linearGradient>
        </defs>
        <rect width="120" height="100" fill="url(#pd11bg)"/>
        <!-- Layered underwater arena floor -->
        <path d="M0 82 Q20 78 40 80 Q60 84 80 79 Q100 76 120 80 L120 100 L0 100Z" fill="#081830"/>
        <path d="M0 86 Q30 82 60 85 Q90 88 120 84 L120 100 L0 100Z" fill="#061428"/>
        <path d="M0 92 Q40 89 80 91 Q110 94 120 90 L120 100 L0 100Z" fill="#040c18"/>
        <!-- Caustic light patterns -->
        <g opacity="0.08">
            <path d="M10 20 Q20 14 30 18 Q40 22 50 16 Q60 10 70 17" stroke="#80d0ff" fill="none" stroke-width="2"/>
            <path d="M40 8 Q55 4 65 10 Q80 16 95 9" stroke="#60b8e8" fill="none" stroke-width="1.5"/>
            <path d="M5 35 Q18 30 32 34 Q48 38 60 32" stroke="#70c0f0" fill="none" stroke-width="1"/>
        </g>
        <!-- Blade trail arcs — sweeping fencing motion -->
        <path d="M12 14 Q8 28 16 42 Q26 56 22 68" stroke="#60c0ff" fill="none" stroke-width="1.2" opacity="0.2"><animate attributeName="opacity" values="0.08;0.35;0.08" dur="1.5s" repeatCount="indefinite"/></path>
        <path d="M16 10 Q10 24 20 40 Q30 54 25 64" stroke="#80d8ff" fill="none" stroke-width="0.6" opacity="0.12"/>
        <!-- Duelist lobster — en garde stance -->
        <g transform="translate(28,8)">
            <!-- Body — organic bezier carapace with ridges -->
            <path d="M30 36 C22 34 16 40 15 48 C14 54 16 60 20 64 C24 68 30 70 36 70 C42 70 48 68 50 64 C54 58 54 52 52 46 C50 40 44 35 38 34 C35 33 32 34 30 36Z" fill="url(#pd11body)"/>
            <!-- Shell texture — carapace segment lines -->
            <path d="M20 46 Q28 42 38 43 Q48 44 50 48" stroke="#6ab0d8" fill="none" stroke-width="0.7" opacity="0.5"/>
            <path d="M18 52 Q28 48 40 49 Q50 50 52 54" stroke="#5aa0c8" fill="none" stroke-width="0.6" opacity="0.4"/>
            <path d="M20 58 Q30 55 42 56 Q50 57 50 60" stroke="#4a90b8" fill="none" stroke-width="0.5" opacity="0.35"/>
            <!-- Rim lighting along top edge -->
            <path d="M30 36 C26 35 20 38 17 44 C16 48 16 50 17 52" stroke="#90d8ff" fill="none" stroke-width="0.8" opacity="0.35"/>
            <!-- Head — organic shape with ridges -->
            <path d="M26 26 C22 24 18 26 17 30 C16 34 18 38 22 40 C26 42 32 42 38 40 C44 38 46 34 46 30 C46 26 42 24 38 24 C34 23 30 24 26 26Z" fill="#3880b0"/>
            <!-- Eye stalks + eyes -->
            <path d="M24 26 L20 20 L19 18" stroke="#3070a0" fill="none" stroke-width="1.5"/>
            <ellipse cx="19" cy="17" rx="2.5" ry="2" fill="#40c0ff" opacity="0.9"/>
            <circle cx="19" cy="17" r="1" fill="white"/>
            <path d="M38 25 L42 20 L43 18" stroke="#3070a0" fill="none" stroke-width="1.5"/>
            <ellipse cx="43" cy="17" rx="2.5" ry="2" fill="#40c0ff" opacity="0.9"/>
            <circle cx="43" cy="17" r="1" fill="white"/>
            <!-- Rapier claw — extended, elegant, long blade with guard -->
            <path d="M20 32 L10 24 L4 18 L-2 8" stroke="url(#pd11blade)" fill="none" stroke-width="2.5" stroke-linecap="round"/>
            <!-- Rapier tip — pointed pincer blade -->
            <path d="M-2 8 L-6 2 L-1 6 L-4 4 L-2 8Z" fill="#c0ecff"/>
            <!-- Guard hilt on rapier claw -->
            <path d="M5 19 C2 17 2 21 5 19" stroke="#a0d8f0" fill="none" stroke-width="1.5"/>
            <!-- Blade glint -->
            <circle cx="-4" cy="4" r="3" fill="#c0f0ff" opacity="0.3"><animate attributeName="opacity" values="0.1;0.55;0.1" dur="0.8s" repeatCount="indefinite"/></circle>
            <!-- Guard claw — articulated pincer with thumb/finger -->
            <path d="M44 34 L52 38 L58 36 C60 34 60 32 58 30 L54 28 L50 30Z" fill="#50a8d8"/>
            <path d="M58 36 L62 38 C64 37 64 35 62 34 L58 32" fill="#60b8e8"/>
            <!-- Walking legs — 4 small jointed legs -->
            <path d="M24 62 L18 68 L16 74" stroke="#2870a0" fill="none" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M30 66 L26 72 L24 78" stroke="#2870a0" fill="none" stroke-width="1.3" stroke-linecap="round"/>
            <path d="M40 66 L44 72 L46 78" stroke="#2870a0" fill="none" stroke-width="1.3" stroke-linecap="round"/>
            <path d="M46 62 L52 68 L54 74" stroke="#2870a0" fill="none" stroke-width="1.5" stroke-linecap="round"/>
            <!-- Segmented tail — 5 segments with fan -->
            <path d="M32 70 L30 74" stroke="#2868a0" fill="none" stroke-width="4" stroke-linecap="round"/>
            <path d="M30 75 L29 79" stroke="#2868a0" fill="none" stroke-width="3.5" stroke-linecap="round"/>
            <path d="M29 80 L28 83" stroke="#2560a0" fill="none" stroke-width="3" stroke-linecap="round"/>
            <path d="M28 84 L27 87" stroke="#2258a0" fill="none" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M27 87 L23 92 L27 90 L30 94 L33 90 L37 92 L33 87" fill="#2060a0"/>
            <!-- Detailed antennae — long, tapering, segmented -->
            <path d="M22 24 Q14 14 6 6 Q2 2 -2 -2" stroke="#3878a8" fill="none" stroke-width="1.8" stroke-dasharray="3 1.5"/>
            <path d="M-2 -2 Q-4 -4 -6 -4" stroke="#3070a0" fill="none" stroke-width="0.8"/>
            <path d="M40 24 Q50 12 56 4 Q60 -2 64 -4" stroke="#3878a8" fill="none" stroke-width="1.8" stroke-dasharray="3 1.5"/>
            <path d="M64 -4 Q66 -6 68 -5" stroke="#3070a0" fill="none" stroke-width="0.8"/>
        </g>
        ${_bub(85,22,2.5)}${_bub(78,38,1.8)}${_bub(90,54,2)}
    </svg>`,

    // === 12: Phosphor Shrimp — tiny bioluminescent shrimp blazing with light in deep darkness ===
    12: `<svg viewBox="0 0 120 100">
        <defs>
            <radialGradient id="ps12glow" cx="50%" cy="48%"><stop offset="0%" stop-color="#403808"/><stop offset="40%" stop-color="#181200"/><stop offset="100%" stop-color="#040200"/></radialGradient>
            <radialGradient id="ps12body" cx="40%" cy="30%"><stop offset="0%" stop-color="#fff880"/><stop offset="40%" stop-color="#f0d840"/><stop offset="100%" stop-color="#c0a020"/></radialGradient>
            <radialGradient id="ps12aura" cx="50%" cy="50%"><stop offset="0%" stop-color="#ffe060" stop-opacity="0.2"/><stop offset="100%" stop-color="#ffe060" stop-opacity="0"/></radialGradient>
        </defs>
        <rect width="120" height="100" fill="url(#ps12glow)"/>
        <!-- Deep ocean layered background -->
        <path d="M0 88 Q30 84 60 87 Q90 90 120 86 L120 100 L0 100Z" fill="#060300"/>
        <path d="M0 94 Q40 90 80 93 Q100 95 120 92 L120 100 L0 100Z" fill="#030200"/>
        <!-- Bioluminescent radiance rings -->
        <circle cx="60" cy="46" r="38" fill="url(#ps12aura)"><animate attributeName="r" values="34;42;34" dur="1.5s" repeatCount="indefinite"/></circle>
        <circle cx="60" cy="46" r="24" fill="#fff880" opacity="0.04"><animate attributeName="r" values="20;28;20" dur="1.2s" repeatCount="indefinite"/></circle>
        <!-- Light rays bursting outward -->
        <g opacity="0.15">
            <line x1="60" y1="46" x2="8" y2="10" stroke="#ffe860" stroke-width="1.2"/>
            <line x1="60" y1="46" x2="112" y2="8" stroke="#ffe860" stroke-width="1.2"/>
            <line x1="60" y1="46" x2="4" y2="58" stroke="#ffd040" stroke-width="0.8"/>
            <line x1="60" y1="46" x2="116" y2="52" stroke="#ffd040" stroke-width="0.8"/>
            <line x1="60" y1="46" x2="22" y2="92" stroke="#ffcc30" stroke-width="0.6"/>
            <line x1="60" y1="46" x2="98" y2="90" stroke="#ffcc30" stroke-width="0.6"/>
            <line x1="60" y1="46" x2="60" y2="2" stroke="#ffe860" stroke-width="1"/>
        </g>
        <!-- Phosphor Shrimp — small, curved, glowing body -->
        <g transform="translate(32,22)">
            <!-- Body — curved shrimp shape with bezier -->
            <path d="M28 22 C34 16 42 14 48 18 C54 22 56 30 52 38 C48 44 40 48 34 48 C28 48 22 44 20 38 C18 32 20 26 28 22Z" fill="url(#ps12body)"/>
            <!-- Translucent shell segments -->
            <path d="M24 30 Q34 24 46 26" stroke="#fff8a0" fill="none" stroke-width="0.7" opacity="0.6"/>
            <path d="M22 36 Q34 30 50 33" stroke="#ffe880" fill="none" stroke-width="0.6" opacity="0.5"/>
            <path d="M24 42 Q34 38 48 40" stroke="#ffd860" fill="none" stroke-width="0.5" opacity="0.4"/>
            <!-- Bioluminescent glow organs along body -->
            <circle cx="30" cy="30" r="2" fill="#fff" opacity="0.6"><animate attributeName="opacity" values="0.3;0.8;0.3" dur="0.8s" repeatCount="indefinite"/></circle>
            <circle cx="38" cy="34" r="2.5" fill="#fff" opacity="0.7"><animate attributeName="opacity" values="0.5;0.9;0.5" dur="1s" repeatCount="indefinite"/></circle>
            <circle cx="46" cy="30" r="1.8" fill="#fff" opacity="0.5"><animate attributeName="opacity" values="0.2;0.7;0.2" dur="1.2s" repeatCount="indefinite"/></circle>
            <!-- Head — small rounded with eye stalk -->
            <path d="M22 24 C18 22 14 24 14 28 C14 32 18 36 22 36 C24 36 26 34 26 32 C28 28 26 24 22 24Z" fill="#e0d030"/>
            <!-- Eye on stalk -->
            <path d="M16 24 L12 18" stroke="#c0b020" fill="none" stroke-width="1.2"/>
            <ellipse cx="11" cy="17" rx="2.2" ry="1.8" fill="#fff" opacity="0.9"/>
            <circle cx="11" cy="17" r="0.8" fill="#332200"/>
            <!-- Tiny pincers — delicate, articulated -->
            <path d="M16 30 L8 26 L4 22 C2 20 4 18 6 20 L8 24" fill="#f0e040" stroke="#d0c020" stroke-width="0.5"/>
            <path d="M4 22 L2 18 C0 16 2 16 4 18" fill="#ffe850"/>
            <!-- Segmented tail — curved downward, 4 segments + fan -->
            <path d="M48 38 L52 42" stroke="#c0a820" fill="none" stroke-width="3" stroke-linecap="round"/>
            <path d="M52 42 L54 46" stroke="#b8a018" fill="none" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M54 46 L55 50" stroke="#b09818" fill="none" stroke-width="2" stroke-linecap="round"/>
            <path d="M55 50 L56 53" stroke="#a89018" fill="none" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M56 53 L52 58 L56 56 L59 60 L62 56 L66 58 L60 53" fill="#b8a020"/>
            <!-- Walking legs — 3 tiny pairs -->
            <path d="M28 44 L24 50 L22 54" stroke="#c0a820" fill="none" stroke-width="1" stroke-linecap="round"/>
            <path d="M34 46 L32 52 L30 56" stroke="#c0a820" fill="none" stroke-width="0.8" stroke-linecap="round"/>
            <path d="M42 44 L44 50 L46 54" stroke="#c0a820" fill="none" stroke-width="1" stroke-linecap="round"/>
            <!-- Antennae — long, thin, tapering -->
            <path d="M14 22 Q6 12 -2 6 Q-6 2 -10 0" stroke="#d0c030" fill="none" stroke-width="1.2" stroke-dasharray="2 1"/>
            <path d="M18 22 Q12 10 4 4 Q0 0 -4 -2" stroke="#c8b828" fill="none" stroke-width="0.8" stroke-dasharray="1.5 1"/>
            <!-- Rim light along top -->
            <path d="M28 22 C34 16 42 14 48 18" stroke="#ffffc0" fill="none" stroke-width="0.6" opacity="0.5"/>
        </g>
    </svg>`,

    // === 13: Barnacle Parasite — sinister corrupted lobster covered in pulsating barnacles, tendrils ===
    13: `<svg viewBox="0 0 120 100">
        <defs>
            <radialGradient id="bp13bg" cx="50%" cy="50%"><stop offset="0%" stop-color="#140828"/><stop offset="100%" stop-color="#040010"/></radialGradient>
            <linearGradient id="bp13body" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#7840a8"/><stop offset="50%" stop-color="#5c3090"/><stop offset="100%" stop-color="#3c1868"/></linearGradient>
            <radialGradient id="bp13corrupt" cx="50%" cy="50%"><stop offset="0%" stop-color="#8040c0" stop-opacity="0.15"/><stop offset="100%" stop-color="#8040c0" stop-opacity="0"/></radialGradient>
        </defs>
        <rect width="120" height="100" fill="url(#bp13bg)"/>
        <!-- Corruption spreading environment -->
        <circle cx="60" cy="50" r="40" fill="url(#bp13corrupt)"><animate attributeName="r" values="36;44;36" dur="3s" repeatCount="indefinite"/></circle>
        <!-- Dark seabed with corruption -->
        <path d="M0 82 Q20 76 40 80 C60 84 80 78 100 82 L120 80 L120 100 L0 100Z" fill="#0c0420"/>
        <path d="M0 90 Q30 86 60 89 Q90 92 120 88 L120 100 L0 100Z" fill="#080318"/>
        <!-- Corruption tendrils reaching outward -->
        <g opacity="0.25">
            <path d="M60 50 Q32 22 10 14" stroke="#8040c0" fill="none" stroke-width="1.5" stroke-dasharray="3 2"><animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite"/></path>
            <path d="M60 50 Q88 24 110 18" stroke="#7038b0" fill="none" stroke-width="1.2" stroke-dasharray="3 2"><animate attributeName="stroke-dashoffset" values="0;10" dur="2.5s" repeatCount="indefinite"/></path>
            <path d="M60 50 Q28 72 8 86" stroke="#6030a0" fill="none" stroke-width="1" stroke-dasharray="3 2"><animate attributeName="stroke-dashoffset" values="0;10" dur="3s" repeatCount="indefinite"/></path>
            <path d="M60 50 Q92 74 112 88" stroke="#6830a0" fill="none" stroke-width="1" stroke-dasharray="3 2"><animate attributeName="stroke-dashoffset" values="0;10" dur="2.8s" repeatCount="indefinite"/></path>
        </g>
        <!-- Parasite lobster -->
        <g transform="translate(26,10)">
            <!-- Body — hunched, twisted organic bezier shape -->
            <path d="M28 32 C20 30 14 36 12 44 C10 52 14 60 18 64 C22 68 28 70 34 70 C40 68 46 66 48 60 C52 54 52 46 48 40 C46 36 40 32 34 30 C32 30 30 30 28 32Z" fill="url(#bp13body)"/>
            <!-- Shell texture — distorted by barnacles -->
            <path d="M16 44 Q26 38 40 40 Q48 42 50 46" stroke="#8850b0" fill="none" stroke-width="0.6" opacity="0.4"/>
            <path d="M14 52 Q26 46 42 49 Q50 52 50 56" stroke="#7840a0" fill="none" stroke-width="0.5" opacity="0.3"/>
            <!-- Pulsating barnacle clusters — organic bumps -->
            <path d="M16 38 C12 34 10 36 10 40 C10 44 14 46 18 44 C22 42 20 38 16 38Z" fill="#3a3a50" stroke="#606078" stroke-width="0.8"><animate attributeName="d" values="M16 38 C12 34 10 36 10 40 C10 44 14 46 18 44 C22 42 20 38 16 38Z;M16 37 C11 33 9 35 9 40 C9 45 15 47 19 45 C23 43 21 38 16 37Z;M16 38 C12 34 10 36 10 40 C10 44 14 46 18 44 C22 42 20 38 16 38Z" dur="2s" repeatCount="indefinite"/></path>
            <path d="M42 42 C38 38 36 40 36 44 C36 48 40 50 44 48 C48 46 46 42 42 42Z" fill="#3a3a50" stroke="#606078" stroke-width="0.8"><animate attributeName="d" values="M42 42 C38 38 36 40 36 44 C36 48 40 50 44 48 C48 46 46 42 42 42Z;M42 41 C37 37 35 39 35 44 C35 49 41 51 45 49 C49 47 47 42 42 41Z;M42 42 C38 38 36 40 36 44 C36 48 40 50 44 48 C48 46 46 42 42 42Z" dur="1.8s" repeatCount="indefinite"/></path>
            <circle cx="26" cy="56" r="3.5" fill="#404058" stroke="#606078" stroke-width="0.8"><animate attributeName="r" values="3;4;3" dur="2.2s" repeatCount="indefinite"/></circle>
            <circle cx="38" cy="36" r="2.5" fill="#383850" stroke="#585870" stroke-width="0.6"/>
            <circle cx="22" cy="48" r="2" fill="#383850" stroke="#585870" stroke-width="0.5"/>
            <!-- Head — misshapen, corrupted -->
            <path d="M24 20 C18 18 14 22 14 28 C14 32 18 38 24 38 C28 38 34 36 38 32 C42 28 42 24 38 22 C34 20 30 18 24 20Z" fill="#5c3090"/>
            <!-- Eye stalks — bent, uneven -->
            <path d="M20 20 L16 14 L14 12" stroke="#4c2880" fill="none" stroke-width="1.5"/>
            <ellipse cx="13" cy="11" rx="2.5" ry="2" fill="#c080ff"><animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite"/></ellipse>
            <circle cx="13" cy="11" r="0.8" fill="white"/>
            <path d="M36 20 L40 14 L42 12" stroke="#4c2880" fill="none" stroke-width="1.5"/>
            <ellipse cx="43" cy="11" rx="2.5" ry="2" fill="#c080ff"><animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite"/></ellipse>
            <circle cx="43" cy="11" r="0.8" fill="white"/>
            <!-- Parasitic claws — malformed, oozing -->
            <path d="M18 28 L8 18 L2 12 C-2 10 -2 14 0 16 L4 20 L-2 22 C-4 24 -2 28 2 26 L10 24Z" fill="#7848b0"/>
            <path d="M2 12 L-2 6 C-4 4 -2 4 0 6 L4 10" fill="#8858c0"/>
            <path d="M40 28 L50 18 L56 12 C60 10 60 14 58 16 L54 20 L60 22 C62 24 60 28 56 26 L48 24Z" fill="#7848b0"/>
            <path d="M56 12 L60 6 C62 4 60 4 58 6 L54 10" fill="#8858c0"/>
            <!-- Walking legs — twisted -->
            <path d="M22 64 L16 70 L14 76" stroke="#4c2880" fill="none" stroke-width="1.2" stroke-linecap="round"/>
            <path d="M30 68 L28 74 L26 80" stroke="#4c2880" fill="none" stroke-width="1" stroke-linecap="round"/>
            <path d="M40 66 L44 72 L46 78" stroke="#4c2880" fill="none" stroke-width="1" stroke-linecap="round"/>
            <!-- Segmented tail — withered -->
            <path d="M32 70 L30 74" stroke="#4c2880" fill="none" stroke-width="3.5" stroke-linecap="round"/>
            <path d="M30 75 L29 78" stroke="#442078" fill="none" stroke-width="3" stroke-linecap="round"/>
            <path d="M29 79 L28 82" stroke="#3c1868" fill="none" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M28 82 L24 87 L28 85 L30 89 L34 85 L36 87 L32 82" fill="#3c1868"/>
            <!-- Antennae — broken, patchy -->
            <path d="M18 18 Q10 8 4 2" stroke="#5c3090" fill="none" stroke-width="1.5" stroke-dasharray="2 2"/>
            <path d="M38 18 Q46 8 54 2" stroke="#5c3090" fill="none" stroke-width="1.5" stroke-dasharray="2 2"/>
        </g>
    </svg>`,

    // === 14: Tide Caller — warrior lobster blowing conch war horn, tidal waves resonating ===
    14: `<svg viewBox="0 0 120 100">
        <defs>
            <radialGradient id="tc14bg" cx="30%" cy="50%"><stop offset="0%" stop-color="#0a2838"/><stop offset="100%" stop-color="#030610"/></radialGradient>
            <linearGradient id="tc14body" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#48c0e0"/><stop offset="50%" stop-color="#30a0c8"/><stop offset="100%" stop-color="#2088b0"/></linearGradient>
            <linearGradient id="tc14horn" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#d0b070"/><stop offset="100%" stop-color="#e8c888"/></linearGradient>
        </defs>
        <rect width="120" height="100" fill="url(#tc14bg)"/>
        <!-- Tidal shockwave layers — animated waves -->
        <g opacity="0.3">
            <path d="M0 28 Q30 14 60 26 Q90 40 120 24" stroke="#40c0ff" fill="none" stroke-width="2"><animate attributeName="d" values="M0 28 Q30 14 60 26 Q90 40 120 24;M0 34 Q30 20 60 32 Q90 46 120 30;M0 28 Q30 14 60 26 Q90 40 120 24" dur="1.5s" repeatCount="indefinite"/></path>
            <path d="M0 42 Q30 28 60 40 Q90 54 120 38" stroke="#3090d0" fill="none" stroke-width="1.5"><animate attributeName="d" values="M0 42 Q30 28 60 40 Q90 54 120 38;M0 48 Q30 34 60 46 Q90 58 120 42;M0 42 Q30 28 60 40 Q90 54 120 38" dur="1.8s" repeatCount="indefinite"/></path>
            <path d="M0 58 Q30 48 60 56 Q90 66 120 52" stroke="#2878b0" fill="none" stroke-width="1"><animate attributeName="d" values="M0 58 Q30 48 60 56 Q90 66 120 52;M0 62 Q30 52 60 60 Q90 70 120 56;M0 58 Q30 48 60 56 Q90 66 120 52" dur="2s" repeatCount="indefinite"/></path>
        </g>
        <!-- Caustic light ripples -->
        <g opacity="0.06">
            <path d="M5 18 Q18 12 35 16 Q50 20 65 14" stroke="#80e0ff" fill="none" stroke-width="1.5"/>
            <path d="M50 6 Q70 2 85 8" stroke="#60c0e0" fill="none" stroke-width="1"/>
        </g>
        <!-- Seafloor -->
        <path d="M0 84 Q30 80 60 83 Q90 86 120 82 L120 100 L0 100Z" fill="#061828"/>
        <path d="M0 90 Q40 86 80 89 Q110 92 120 88 L120 100 L0 100Z" fill="#040c18"/>
        <!-- Tide Caller lobster -->
        <g transform="translate(24,12)">
            <!-- Body — powerful, upright stance with organic bezier -->
            <path d="M30 38 C22 36 16 42 14 50 C12 58 14 66 20 70 C26 74 34 76 40 74 C46 72 50 66 52 58 C54 50 50 42 44 38 C40 36 36 36 30 38Z" fill="url(#tc14body)"/>
            <!-- Shell texture — carapace ridges -->
            <path d="M18 50 Q30 44 44 46 Q52 48 52 52" stroke="#58c8e0" fill="none" stroke-width="0.7" opacity="0.5"/>
            <path d="M16 58 Q30 52 44 54 Q52 56 52 60" stroke="#48b8d0" fill="none" stroke-width="0.6" opacity="0.4"/>
            <path d="M18 64 Q32 60 44 62 Q50 64 50 66" stroke="#38a8c0" fill="none" stroke-width="0.5" opacity="0.35"/>
            <!-- Rim lighting -->
            <path d="M30 38 C24 37 18 40 16 46 C14 50 14 54 15 56" stroke="#80e0ff" fill="none" stroke-width="0.7" opacity="0.3"/>
            <!-- Head -->
            <path d="M26 28 C20 26 16 28 15 32 C14 36 16 42 22 44 C28 46 36 44 42 42 C48 40 50 36 48 32 C46 28 40 26 34 26 C30 26 28 26 26 28Z" fill="#3098b8"/>
            <!-- Eye stalks -->
            <path d="M22 28 L18 22 L16 20" stroke="#2888a8" fill="none" stroke-width="1.5"/>
            <ellipse cx="15" cy="19" rx="2.5" ry="2" fill="#80f0ff" opacity="0.9"/>
            <circle cx="15" cy="19" r="1" fill="white"/>
            <path d="M38 27 L42 22 L44 20" stroke="#2888a8" fill="none" stroke-width="1.5"/>
            <ellipse cx="45" cy="19" rx="2.5" ry="2" fill="#80f0ff" opacity="0.9"/>
            <circle cx="45" cy="19" r="1" fill="white"/>
            <!-- War horn held high — conch shell -->
            <path d="M44 36 L54 28 L62 22 L68 18" stroke="url(#tc14horn)" fill="none" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M68 18 C72 14 76 12 78 10 C80 14 82 18 78 20 C74 22 70 20 68 18Z" fill="#d0b070"/>
            <path d="M78 10 C80 8 82 6 84 8 C82 12 80 14 78 12" fill="#e0c080"/>
            <!-- Sonic blast from horn -->
            <g opacity="0.3">
                <circle cx="84" cy="8" r="6" fill="none" stroke="#80d0ff" stroke-width="1.5"><animate attributeName="r" values="4;10;4" dur="0.8s" repeatCount="indefinite"/></circle>
                <circle cx="84" cy="8" r="10" fill="none" stroke="#60b0e0" stroke-width="1"><animate attributeName="r" values="8;16;8" dur="0.8s" repeatCount="indefinite"/></circle>
                <circle cx="84" cy="8" r="14" fill="none" stroke="#40a0d0" stroke-width="0.6"><animate attributeName="r" values="12;20;12" dur="0.8s" repeatCount="indefinite"/></circle>
            </g>
            <!-- Guard claw — articulated pincer -->
            <path d="M18 34 L8 26 L2 20 C-2 18 -2 22 0 24 L4 28 L-2 32 C-4 34 -2 38 2 36 L10 30Z" fill="#50c8e8"/>
            <path d="M2 20 L-2 14 C-4 12 -2 12 0 14 L4 18" fill="#60d8f0"/>
            <!-- Walking legs -->
            <path d="M24 68 L18 74 L16 80" stroke="#2888a8" fill="none" stroke-width="1.3" stroke-linecap="round"/>
            <path d="M32 72 L28 78 L26 82" stroke="#2888a8" fill="none" stroke-width="1.1" stroke-linecap="round"/>
            <path d="M42 70 L46 76 L48 82" stroke="#2888a8" fill="none" stroke-width="1.1" stroke-linecap="round"/>
            <path d="M48 66 L54 72 L56 78" stroke="#2888a8" fill="none" stroke-width="1.3" stroke-linecap="round"/>
            <!-- Segmented tail -->
            <path d="M34 74 L32 78" stroke="#2080a0" fill="none" stroke-width="4" stroke-linecap="round"/>
            <path d="M32 79 L30 82" stroke="#1c78a0" fill="none" stroke-width="3.5" stroke-linecap="round"/>
            <path d="M30 83 L29 86" stroke="#1870a0" fill="none" stroke-width="3" stroke-linecap="round"/>
            <path d="M29 87 L25 92 L29 90 L32 94 L35 90 L39 92 L35 87" fill="#1868a0"/>
            <!-- Antennae -->
            <path d="M20 26 Q10 14 2 6 Q-2 2 -6 0" stroke="#3098b0" fill="none" stroke-width="1.6" stroke-dasharray="2.5 1.5"/>
            <path d="M40 26 Q50 14 58 4 Q62 0 66 -2" stroke="#3098b0" fill="none" stroke-width="1.6" stroke-dasharray="2.5 1.5"/>
        </g>
    </svg>`,

    // === 15: Larval Drifter — tiny translucent baby lobster drifting, spectral, ethereal ===
    15: `<svg viewBox="0 0 120 100">
        <defs>
            <radialGradient id="ld15bg" cx="50%" cy="50%"><stop offset="0%" stop-color="#102030"/><stop offset="60%" stop-color="#081018"/><stop offset="100%" stop-color="#040808"/></radialGradient>
            <linearGradient id="ld15body" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#88c8e0" stop-opacity="0.6"/><stop offset="100%" stop-color="#4898b8" stop-opacity="0.35"/></linearGradient>
            <radialGradient id="ld15glow" cx="50%" cy="50%"><stop offset="0%" stop-color="#80d0f0" stop-opacity="0.08"/><stop offset="100%" stop-color="#80d0f0" stop-opacity="0"/></radialGradient>
        </defs>
        <rect width="120" height="100" fill="url(#ld15bg)"/>
        <!-- Vast ocean depth layers -->
        <path d="M0 72 Q30 68 60 72 Q90 76 120 70 L120 100 L0 100Z" fill="#060e18" opacity="0.5"/>
        <path d="M0 82 Q40 78 80 81 Q100 84 120 80 L120 100 L0 100Z" fill="#040a10" opacity="0.4"/>
        <!-- Dimensional rift / drift current -->
        <ellipse cx="60" cy="50" rx="38" ry="32" fill="none" stroke="#60b0e0" stroke-width="0.6" stroke-dasharray="4 3" opacity="0.15"><animateTransform attributeName="transform" type="rotate" from="0 60 50" to="360 60 50" dur="12s" repeatCount="indefinite"/></ellipse>
        <ellipse cx="60" cy="50" rx="28" ry="22" fill="url(#ld15glow)"/>
        <!-- Phase trails — ghost afterimages -->
        <g opacity="0.12">
            <g transform="translate(28,30)">
                <path d="M18 14 C14 12 10 14 10 18 C10 22 12 26 16 28 C20 30 26 28 28 24 C30 20 28 14 22 13Z" fill="#68a8c8"/>
            </g>
            <g transform="translate(72,34)">
                <path d="M18 14 C14 12 10 14 10 18 C10 22 12 26 16 28 C20 30 26 28 28 24 C30 20 28 14 22 13Z" fill="#68a8c8"/>
            </g>
        </g>
        <!-- Main larval form — translucent, small, delicate -->
        <g transform="translate(40,26)" opacity="0.85">
            <!-- Body — tiny, soft, curved organic shape -->
            <path d="M20 18 C14 16 8 20 8 26 C8 32 12 38 18 40 C22 42 28 40 32 36 C36 32 36 26 32 22 C30 18 26 16 20 18Z" fill="url(#ld15body)"/>
            <!-- Internal organs visible through translucent shell -->
            <path d="M12 26 Q18 22 28 24" stroke="#90d0e8" fill="none" stroke-width="0.5" opacity="0.4"/>
            <path d="M10 30 Q20 28 30 30" stroke="#80c0d8" fill="none" stroke-width="0.4" opacity="0.3"/>
            <circle cx="20" cy="28" r="3" fill="#80d0f0" opacity="0.15"/>
            <!-- Head — tiny, bulbous -->
            <path d="M16 14 C12 12 8 14 8 18 C8 22 12 24 16 24 C20 24 24 22 24 18 C24 14 22 12 18 12Z" fill="#5898c0" opacity="0.7"/>
            <!-- Eye stalks — proportionally large for larva -->
            <path d="M12 14 L8 8" stroke="#5090b0" fill="none" stroke-width="1" opacity="0.7"/>
            <ellipse cx="7" cy="7" rx="2.5" ry="2" fill="#c0f0ff" opacity="0.8"><animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/></ellipse>
            <circle cx="7" cy="7" r="0.8" fill="white"/>
            <path d="M22 13 L26 8" stroke="#5090b0" fill="none" stroke-width="1" opacity="0.7"/>
            <ellipse cx="27" cy="7" rx="2.5" ry="2" fill="#c0f0ff" opacity="0.8"><animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/></ellipse>
            <circle cx="27" cy="7" r="0.8" fill="white"/>
            <!-- Tiny proto-claws — barely formed -->
            <path d="M10 20 L4 16 L2 14 C0 12 2 12 4 14 L6 18" fill="#88d0f0" opacity="0.6"/>
            <path d="M26 18 L32 14 L34 12 C36 10 36 12 34 14 L30 18" fill="#88d0f0" opacity="0.6"/>
            <!-- Tiny walking legs — wisps -->
            <path d="M14 36 L10 40" stroke="#4888a8" fill="none" stroke-width="0.8" opacity="0.5"/>
            <path d="M20 38 L18 42" stroke="#4888a8" fill="none" stroke-width="0.6" opacity="0.5"/>
            <path d="M26 36 L30 40" stroke="#4888a8" fill="none" stroke-width="0.8" opacity="0.5"/>
            <!-- Tail — small, translucent segments -->
            <path d="M22 38 L24 42" stroke="#4888a8" fill="none" stroke-width="2.5" stroke-linecap="round" opacity="0.5"/>
            <path d="M24 43 L25 46" stroke="#4080a0" fill="none" stroke-width="2" stroke-linecap="round" opacity="0.4"/>
            <path d="M25 47 L26 49" stroke="#3878a0" fill="none" stroke-width="1.5" stroke-linecap="round" opacity="0.35"/>
            <path d="M26 49 L23 53 L26 51 L28 54 L30 51 L33 53 L30 49" fill="#3878a0" opacity="0.3"/>
            <!-- Antennae — thin, flowing -->
            <path d="M10 12 Q2 4 -4 -2 Q-8 -6 -12 -8" stroke="#5898b8" fill="none" stroke-width="0.8" opacity="0.5"/>
            <path d="M24 12 Q32 2 38 -4 Q42 -8 46 -8" stroke="#5898b8" fill="none" stroke-width="0.8" opacity="0.5"/>
        </g>
        <!-- Spectral particles floating -->
        <circle cx="25" cy="40" r="1.5" fill="#80d0f0" opacity="0.25"><animate attributeName="cy" values="42;36;42" dur="3s" repeatCount="indefinite"/></circle>
        <circle cx="95" cy="50" r="1" fill="#60b8e0" opacity="0.15"><animate attributeName="cy" values="52;46;52" dur="2.5s" repeatCount="indefinite"/></circle>
        <circle cx="80" cy="30" r="1.5" fill="#70c0e8" opacity="0.2"><animate attributeName="cy" values="32;26;32" dur="3.5s" repeatCount="indefinite"/></circle>
        <circle cx="15" cy="60" r="1" fill="#70c8e0" opacity="0.15"><animate attributeName="cy" values="62;56;62" dur="4s" repeatCount="indefinite"/></circle>
    </svg>`,

    // === 16: Thermidor the Blaze — MASSIVE volcanic fire titan, wreathed in hellfire, boss-tier ===
    16: `<svg viewBox="0 0 120 100">
        <defs>
            <radialGradient id="th16bg" cx="50%" cy="60%"><stop offset="0%" stop-color="#601810"/><stop offset="40%" stop-color="#300808"/><stop offset="100%" stop-color="#0a0200"/></radialGradient>
            <linearGradient id="th16body" x1="0" y1="0" x2="0.5" y2="1"><stop offset="0%" stop-color="#ff6830"/><stop offset="30%" stop-color="#e05020"/><stop offset="70%" stop-color="#c03818"/><stop offset="100%" stop-color="#801808"/></linearGradient>
            <linearGradient id="th16armor" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ff9040"/><stop offset="100%" stop-color="#cc4010"/></linearGradient>
            <radialGradient id="th16lava" cx="50%" cy="50%"><stop offset="0%" stop-color="#ff6600" stop-opacity="0.3"/><stop offset="100%" stop-color="#ff2200" stop-opacity="0"/></radialGradient>
        </defs>
        <rect width="120" height="100" fill="url(#th16bg)"/>
        <!-- Lava ground — molten cracks and pools -->
        <path d="M0 78 Q20 74 40 77 C60 80 80 74 100 78 L120 76 L120 100 L0 100Z" fill="#200800"/>
        <path d="M0 84 Q30 80 60 83 Q90 86 120 82 L120 100 L0 100Z" fill="#140600"/>
        <path d="M0 92 Q40 88 80 91 Q100 94 120 90 L120 100 L0 100Z" fill="#0a0300"/>
        <!-- Lava veins in ground -->
        <path d="M8 82 Q16 80 24 82 Q32 84 38 82" stroke="#ff4400" fill="none" stroke-width="1.5" opacity="0.5"><animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite"/></path>
        <path d="M55 86 Q68 82 80 85 Q92 88 104 84" stroke="#ff6600" fill="none" stroke-width="1.2" opacity="0.4"><animate attributeName="opacity" values="0.5;0.2;0.5" dur="2.5s" repeatCount="indefinite"/></path>
        <path d="M30 90 Q45 86 60 89" stroke="#ff3300" fill="none" stroke-width="1" opacity="0.35"/>
        <!-- Massive flame pillars behind -->
        ${_flame(6,78,55,'#ff2200')}${_flame(104,80,48,'#ff4400')}${_flame(28,82,38,'#ff6600')}${_flame(82,80,42,'#ff3300')}
        <!-- Fire aura — pulsating heat -->
        <circle cx="60" cy="42" r="42" fill="url(#th16lava)"><animate attributeName="r" values="38;48;38" dur="0.7s" repeatCount="indefinite"/></circle>
        <circle cx="60" cy="42" r="28" fill="#ff6600" opacity="0.04"><animate attributeName="r" values="24;32;24" dur="0.5s" repeatCount="indefinite"/></circle>
        <!-- Heat shimmer caustics -->
        <g opacity="0.06">
            <path d="M10 30 Q25 24 40 28 Q55 32 70 26 Q85 20 100 28" stroke="#ffaa40" fill="none" stroke-width="2"/>
            <path d="M15 42 Q30 36 50 40 Q70 44 90 38" stroke="#ff8830" fill="none" stroke-width="1.5"/>
        </g>
        <!-- THERMIDOR — massive fire titan lobster -->
        <g transform="translate(12,0)">
            <!-- Body — MASSIVE, armored, volcanic with ridges and bumps -->
            <path d="M48 28 C36 26 24 32 18 42 C12 52 10 62 14 70 C18 78 28 82 38 84 C48 86 58 84 66 80 C74 74 78 66 78 56 C78 46 74 38 66 32 C60 28 54 26 48 28Z" fill="url(#th16body)"/>
            <!-- Volcanic armor plating — thick ridged segments -->
            <path d="M22 42 Q36 34 56 36 Q72 38 76 44" stroke="#ff7840" fill="none" stroke-width="1.2" opacity="0.6"/>
            <path d="M18 52 Q36 44 58 47 Q76 50 78 56" stroke="#e06028" fill="none" stroke-width="1" opacity="0.5"/>
            <path d="M16 62 Q36 56 58 58 Q74 60 76 66" stroke="#d05020" fill="none" stroke-width="0.8" opacity="0.4"/>
            <path d="M20 72 Q38 66 56 68 Q70 70 72 74" stroke="#c04818" fill="none" stroke-width="0.7" opacity="0.35"/>
            <!-- Molten cracks in armor -->
            <path d="M32 40 L36 48 L34 56" stroke="#ffaa00" fill="none" stroke-width="0.8" opacity="0.5"><animate attributeName="opacity" values="0.3;0.7;0.3" dur="1.5s" repeatCount="indefinite"/></path>
            <path d="M56 44 L58 52 L54 58" stroke="#ff8800" fill="none" stroke-width="0.6" opacity="0.4"><animate attributeName="opacity" values="0.5;0.2;0.5" dur="1.8s" repeatCount="indefinite"/></path>
            <!-- Rim lighting — hellfire glow along top -->
            <path d="M48 28 C40 27 30 30 22 38 C18 42 16 48 14 52" stroke="#ffaa40" fill="none" stroke-width="1.2" opacity="0.4"/>
            <path d="M48 28 C56 27 64 30 70 36 C74 40 76 46 78 52" stroke="#ff9030" fill="none" stroke-width="0.8" opacity="0.3"/>
            <!-- Head — massive, horned, crowned with fire -->
            <path d="M38 14 C30 12 22 14 20 20 C18 26 20 32 28 36 C34 40 42 40 52 38 C60 36 66 32 66 26 C66 20 62 14 54 12 C48 10 44 12 38 14Z" fill="#d04818"/>
            <!-- Blazing horns — volcanic spires -->
            <path d="M26 16 L18 4 L14 -4 C12 -6 16 -6 18 -2 L22 8Z" fill="#ff4400"/>
            <circle cx="14" cy="-4" r="3" fill="#ffaa00" opacity="0.6"><animate attributeName="r" values="2;4;2" dur="0.5s" repeatCount="indefinite"/></circle>
            <path d="M58 14 L66 4 L70 -4 C72 -6 68 -6 66 -2 L62 8Z" fill="#ff4400"/>
            <circle cx="70" cy="-4" r="3" fill="#ffaa00" opacity="0.6"><animate attributeName="r" values="4;2;4" dur="0.5s" repeatCount="indefinite"/></circle>
            <!-- Eye stalks — thick, armored -->
            <path d="M32 16 L26 8 L24 4" stroke="#c04010" fill="none" stroke-width="2"/>
            <ellipse cx="23" cy="3" rx="3.5" ry="2.5" fill="#ff8800"><animate attributeName="fill" values="#ff8800;#ffcc00;#ff8800" dur="0.5s" repeatCount="indefinite"/></ellipse>
            <circle cx="23" cy="3" r="1.5" fill="#ffee00"/>
            <path d="M54 14 L60 8 L62 4" stroke="#c04010" fill="none" stroke-width="2"/>
            <ellipse cx="63" cy="3" rx="3.5" ry="2.5" fill="#ff8800"><animate attributeName="fill" values="#ffcc00;#ff8800;#ffcc00" dur="0.5s" repeatCount="indefinite"/></ellipse>
            <circle cx="63" cy="3" r="1.5" fill="#ffee00"/>
            <!-- Snarling molten mouth -->
            <path d="M38 28 L42 32 L46 28 L50 32 L54 28" stroke="#ff6040" fill="none" stroke-width="1.5"/>
            <!-- INFERNO CLAWS — massive, articulated, flaming pincers -->
            <!-- Left claw — giant crusher -->
            <path d="M22 26 L6 14 L-4 6 C-8 2 -10 6 -8 10 L-2 16 L-10 20 C-14 22 -12 28 -8 26 L4 22Z" fill="#ff6830"/>
            <path d="M-4 6 L-8 0 C-12 -4 -10 -6 -6 -2 L-2 4" fill="#ffaa40"/>
            <path d="M-8 10 L-14 6 C-16 4 -14 2 -10 6" fill="#ffaa40"/>
            <!-- Right claw — massive smasher -->
            <path d="M62 26 L78 14 L88 6 C92 2 94 6 92 10 L86 16 L94 20 C98 22 96 28 92 26 L80 22Z" fill="#ff6830"/>
            <path d="M88 6 L92 0 C96 -4 94 -6 90 -2 L86 4" fill="#ffaa40"/>
            <path d="M92 10 L98 6 C100 4 98 2 94 6" fill="#ffaa40"/>
            <!-- Flame wisps on claws -->
            <circle cx="-6" cy="0" r="4" fill="#ff4400" opacity="0.3"><animate attributeName="r" values="3;5;3" dur="0.6s" repeatCount="indefinite"/></circle>
            <circle cx="92" cy="0" r="4" fill="#ff4400" opacity="0.3"><animate attributeName="r" values="5;3;5" dur="0.6s" repeatCount="indefinite"/></circle>
            <!-- Walking legs — thick, armored -->
            <path d="M24 72 L16 80 L12 86" stroke="#a03010" fill="none" stroke-width="2" stroke-linecap="round"/>
            <path d="M34 78 L28 84 L24 90" stroke="#a03010" fill="none" stroke-width="1.8" stroke-linecap="round"/>
            <path d="M54 76 L60 82 L64 88" stroke="#a03010" fill="none" stroke-width="1.8" stroke-linecap="round"/>
            <path d="M64 72 L72 78 L76 84" stroke="#a03010" fill="none" stroke-width="2" stroke-linecap="round"/>
            <!-- Segmented tail — massive, armored, 5 segments + lava fan -->
            <path d="M42 84 L40 88" stroke="#a03010" fill="none" stroke-width="5" stroke-linecap="round"/>
            <path d="M40 89 L38 92" stroke="#903010" fill="none" stroke-width="4.5" stroke-linecap="round"/>
            <path d="M38 93 L37 95" stroke="#802808" fill="none" stroke-width="4" stroke-linecap="round"/>
            <path d="M37 96 L36 98" stroke="#702008" fill="none" stroke-width="3.5" stroke-linecap="round"/>
            <!-- Antennae — ablaze, flickering -->
            <path d="M28 12 Q16 -2 6 -8 Q0 -12 -4 -14" stroke="#d04818" fill="none" stroke-width="2.2" stroke-dasharray="3 1"/>
            <circle cx="-4" cy="-14" r="2" fill="#ff6600" opacity="0.4"><animate attributeName="opacity" values="0.2;0.6;0.2" dur="0.7s" repeatCount="indefinite"/></circle>
            <path d="M56 12 Q68 -2 78 -8 Q84 -12 88 -14" stroke="#d04818" fill="none" stroke-width="2.2" stroke-dasharray="3 1"/>
            <circle cx="88" cy="-14" r="2" fill="#ff6600" opacity="0.4"><animate attributeName="opacity" values="0.6;0.2;0.6" dur="0.7s" repeatCount="indefinite"/></circle>
        </g>
    </svg>`,

    // === 17: Glacial Lobster — ice emperor with crystalline armor, frozen wasteland, blizzard ===
    17: `<svg viewBox="0 0 120 100">
        <defs>
            <radialGradient id="gl17bg" cx="50%" cy="55%"><stop offset="0%" stop-color="#102838"/><stop offset="50%" stop-color="#081828"/><stop offset="100%" stop-color="#020610"/></radialGradient>
            <linearGradient id="gl17body" x1="0" y1="0" x2="0.5" y2="1"><stop offset="0%" stop-color="#a0e8ff"/><stop offset="30%" stop-color="#70d0f0"/><stop offset="70%" stop-color="#50b8e0"/><stop offset="100%" stop-color="#3090c0"/></linearGradient>
            <linearGradient id="gl17ice" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#e0f8ff"/><stop offset="100%" stop-color="#80d0f0"/></linearGradient>
            <radialGradient id="gl17frost" cx="50%" cy="50%"><stop offset="0%" stop-color="#c0f0ff" stop-opacity="0.1"/><stop offset="100%" stop-color="#c0f0ff" stop-opacity="0"/></radialGradient>
        </defs>
        <rect width="120" height="100" fill="url(#gl17bg)"/>
        <!-- Frozen wasteland — icy terrain layers -->
        <path d="M0 74 Q20 68 40 72 C60 78 80 70 100 74 L120 72 L120 100 L0 100Z" fill="#0c1830"/>
        <path d="M0 80 Q30 76 60 79 Q90 82 120 78 L120 100 L0 100Z" fill="#081428"/>
        <path d="M0 88 Q40 84 80 87 Q110 90 120 86 L120 100 L0 100Z" fill="#060e20"/>
        <!-- Ice crystal formations in background -->
        <path d="M6 74 L10 58 L14 74" fill="url(#gl17ice)" opacity="0.3"/>
        <path d="M104 72 L108 60 L112 72" fill="url(#gl17ice)" opacity="0.25"/>
        <path d="M90 74 L93 64 L96 74" fill="url(#gl17ice)" opacity="0.2"/>
        <!-- Frost effect on ground -->
        <path d="M0 74 L120 72" stroke="#80d0ff" stroke-width="0.8" opacity="0.3"/>
        <!-- Blizzard particles -->
        <g opacity="0.35">
            <circle cx="15" cy="20" r="1.5" fill="white"><animate attributeName="cx" values="15;28;15" dur="3s" repeatCount="indefinite"/><animate attributeName="cy" values="20;32;20" dur="3s" repeatCount="indefinite"/></circle>
            <circle cx="90" cy="15" r="1" fill="white"><animate attributeName="cx" values="90;102;90" dur="2.5s" repeatCount="indefinite"/><animate attributeName="cy" values="15;28;15" dur="2.5s" repeatCount="indefinite"/></circle>
            <circle cx="50" cy="8" r="1.2" fill="white"><animate attributeName="cx" values="50;62;50" dur="4s" repeatCount="indefinite"/><animate attributeName="cy" values="8;22;8" dur="4s" repeatCount="indefinite"/></circle>
            <circle cx="105" cy="38" r="1" fill="white"><animate attributeName="cx" values="105;116;105" dur="3.5s" repeatCount="indefinite"/></circle>
            <circle cx="8" cy="52" r="1.3" fill="white"><animate attributeName="cx" values="8;20;8" dur="2.8s" repeatCount="indefinite"/></circle>
            <circle cx="70" cy="4" r="0.8" fill="white"><animate attributeName="cx" values="70;80;70" dur="3.2s" repeatCount="indefinite"/><animate attributeName="cy" values="4;16;4" dur="3.2s" repeatCount="indefinite"/></circle>
        </g>
        <!-- Frost aura -->
        <circle cx="58" cy="42" r="36" fill="url(#gl17frost)"><animate attributeName="r" values="32;40;32" dur="2s" repeatCount="indefinite"/></circle>
        <!-- Glacial Lobster — crystalline ice emperor -->
        <g transform="translate(14,2)">
            <!-- Body — massive crystalline carapace with faceted edges -->
            <path d="M46 30 C36 28 26 34 20 42 C14 52 12 62 16 70 C20 76 30 80 40 82 C52 84 62 80 68 74 C74 66 76 56 74 46 C72 38 64 32 56 28 C52 26 48 28 46 30Z" fill="url(#gl17body)"/>
            <!-- Crystalline facets / ice armor segments -->
            <path d="M24 42 Q38 34 58 38 Q72 40 74 46" stroke="#b0e8ff" fill="none" stroke-width="0.8" opacity="0.6"/>
            <path d="M18 52 Q38 44 60 48 Q74 52 74 56" stroke="#90d8f0" fill="none" stroke-width="0.7" opacity="0.5"/>
            <path d="M18 62 Q38 56 60 58 Q72 62 72 66" stroke="#70c8e8" fill="none" stroke-width="0.6" opacity="0.4"/>
            <path d="M22 70 Q40 66 58 68 Q68 70 68 74" stroke="#60b8d8" fill="none" stroke-width="0.5" opacity="0.35"/>
            <!-- Ice crystal ridges protruding from shell -->
            <path d="M34 32 L30 24 L36 30" fill="#c0f0ff" opacity="0.5"/>
            <path d="M52 30 L56 22 L54 28" fill="#b0e8ff" opacity="0.4"/>
            <path d="M68 40 L74 34 L70 40" fill="#a0e0ff" opacity="0.35"/>
            <!-- Rim lighting — icy shimmer -->
            <path d="M46 30 C38 28 28 32 22 40 C18 46 16 52 16 58" stroke="#c0f4ff" fill="none" stroke-width="1" opacity="0.4"/>
            <!-- Head — angular, imperial, crowned with ice -->
            <path d="M36 16 C28 14 20 18 18 24 C16 30 20 36 28 40 C36 44 48 42 56 38 C62 34 64 28 62 22 C60 16 52 12 44 14 C40 14 38 14 36 16Z" fill="#50b8d8"/>
            <!-- Ice crown — crystalline spires -->
            <path d="M24 18 L18 4 L22 16" fill="url(#gl17ice)" opacity="0.8"/>
            <path d="M38 14 L36 -2 L40 12" fill="url(#gl17ice)" opacity="0.9"/>
            <path d="M52 16 L58 4 L54 16" fill="url(#gl17ice)" opacity="0.8"/>
            <!-- Crown glint -->
            <circle cx="36" cy="-2" r="2" fill="#e0f8ff" opacity="0.5"><animate attributeName="opacity" values="0.2;0.7;0.2" dur="1.5s" repeatCount="indefinite"/></circle>
            <!-- Eye stalks — frosted -->
            <path d="M30 18 L24 10 L22 6" stroke="#40a8c8" fill="none" stroke-width="1.8"/>
            <ellipse cx="21" cy="5" rx="3" ry="2.5" fill="#c0f0ff" opacity="0.9"/>
            <circle cx="21" cy="5" r="1.2" fill="white"/>
            <path d="M50 16 L56 10 L58 6" stroke="#40a8c8" fill="none" stroke-width="1.8"/>
            <ellipse cx="59" cy="5" rx="3" ry="2.5" fill="#c0f0ff" opacity="0.9"/>
            <circle cx="59" cy="5" r="1.2" fill="white"/>
            <!-- Frost breath -->
            <g opacity="0.2">
                <path d="M32 30 Q22 26 12 30 Q2 34 -6 30" stroke="#c0f0ff" fill="none" stroke-width="2"><animate attributeName="opacity" values="0.1;0.3;0.1" dur="1.5s" repeatCount="indefinite"/></path>
            </g>
            <!-- Frozen claws — ice blade pincers with articulated joints -->
            <!-- Left claw — crystalline blade -->
            <path d="M22 28 L8 18 L-2 10 C-6 6 -8 10 -6 14 L0 20 L-8 24 C-12 26 -10 32 -6 30 L6 24Z" fill="#78d8f0"/>
            <path d="M-2 10 L-6 2 C-10 -2 -8 -4 -4 0 L0 6" fill="url(#gl17ice)"/>
            <path d="M-6 14 L-12 10 C-14 8 -12 6 -8 10" fill="url(#gl17ice)"/>
            <!-- Right claw -->
            <path d="M58 28 L72 18 L82 10 C86 6 88 10 86 14 L80 20 L88 24 C92 26 90 32 86 30 L74 24Z" fill="#78d8f0"/>
            <path d="M82 10 L86 2 C90 -2 88 -4 84 0 L80 6" fill="url(#gl17ice)"/>
            <!-- Walking legs — icy -->
            <path d="M24 74 L16 80 L12 86" stroke="#40a8c8" fill="none" stroke-width="1.8" stroke-linecap="round"/>
            <path d="M34 78 L28 84 L24 90" stroke="#40a8c8" fill="none" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M56 76 L62 82 L66 88" stroke="#40a8c8" fill="none" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M66 74 L74 80 L78 86" stroke="#40a8c8" fill="none" stroke-width="1.8" stroke-linecap="round"/>
            <!-- Segmented tail — 5 icy segments + fan -->
            <path d="M44 82 L42 86" stroke="#3898b8" fill="none" stroke-width="5" stroke-linecap="round"/>
            <path d="M42 87 L40 90" stroke="#3490b0" fill="none" stroke-width="4.5" stroke-linecap="round"/>
            <path d="M40 91 L39 94" stroke="#3088a8" fill="none" stroke-width="3.5" stroke-linecap="round"/>
            <path d="M39 95 L38 97" stroke="#2c80a0" fill="none" stroke-width="3" stroke-linecap="round"/>
            <!-- Antennae — long, icy, crystalline -->
            <path d="M26 14 Q14 2 4 -6 Q-2 -10 -6 -14" stroke="#50b8d0" fill="none" stroke-width="2" stroke-dasharray="3 1.5"/>
            <path d="M54 14 Q66 2 76 -6 Q82 -10 86 -14" stroke="#50b8d0" fill="none" stroke-width="2" stroke-dasharray="3 1.5"/>
        </g>
    </svg>`,

    // === 18: Brood Mother — enormous protective matriarch, underwater cave, glowing eggs ===
    18: `<svg viewBox="0 0 120 100">
        <defs>
            <radialGradient id="bm18bg" cx="50%" cy="60%"><stop offset="0%" stop-color="#200830"/><stop offset="50%" stop-color="#100420"/><stop offset="100%" stop-color="#040010"/></radialGradient>
            <linearGradient id="bm18body" x1="0" y1="0" x2="0.5" y2="1"><stop offset="0%" stop-color="#d870b8"/><stop offset="30%" stop-color="#c060a0"/><stop offset="70%" stop-color="#a04880"/><stop offset="100%" stop-color="#703060"/></linearGradient>
            <radialGradient id="bm18egg" cx="40%" cy="30%"><stop offset="0%" stop-color="#ff90e0"/><stop offset="50%" stop-color="#ff60c0"/><stop offset="100%" stop-color="#d040a0"/></radialGradient>
            <radialGradient id="bm18aura" cx="50%" cy="50%"><stop offset="0%" stop-color="#ff40a0" stop-opacity="0.1"/><stop offset="100%" stop-color="#ff40a0" stop-opacity="0"/></radialGradient>
        </defs>
        <rect width="120" height="100" fill="url(#bm18bg)"/>
        <!-- Underwater cave environment — rock formations -->
        <path d="M0 0 L0 30 Q8 38 16 30 Q20 24 28 32 Q34 40 38 32 L40 18 L36 0Z" fill="#0c0420" opacity="0.7"/>
        <path d="M80 0 L82 20 Q88 30 94 24 Q98 18 104 28 Q110 36 116 28 L120 0Z" fill="#0c0420" opacity="0.7"/>
        <!-- Cave floor layers -->
        <path d="M0 76 Q20 70 40 74 C60 80 80 72 100 76 L120 74 L120 100 L0 100Z" fill="#0c0420"/>
        <path d="M0 84 Q30 78 60 82 Q90 86 120 80 L120 100 L0 100Z" fill="#080318"/>
        <path d="M0 92 Q40 88 80 91 Q100 94 120 90 L120 100 L0 100Z" fill="#040210"/>
        <!-- Protective rage aura -->
        <circle cx="58" cy="44" r="44" fill="url(#bm18aura)"><animate attributeName="r" values="40;48;40" dur="1.5s" repeatCount="indefinite"/></circle>
        <!-- Caustic patterns on cave ceiling -->
        <g opacity="0.05">
            <path d="M20 8 Q35 4 50 10 Q65 16 80 8" stroke="#ff80c0" fill="none" stroke-width="2"/>
            <path d="M40 2 Q55 6 70 2" stroke="#e060a0" fill="none" stroke-width="1.5"/>
        </g>
        <!-- BROOD MOTHER — enormous matriarch -->
        <g transform="translate(10,-2)">
            <!-- Body — MASSIVE, swollen with eggs, powerful organic shape -->
            <path d="M50 24 C36 22 22 30 16 42 C10 54 8 66 12 76 C18 84 30 90 44 92 C58 94 70 90 78 82 C84 74 86 62 84 50 C82 40 76 32 66 26 C60 22 54 22 50 24Z" fill="url(#bm18body)"/>
            <!-- Shell texture — stretched from egg mass -->
            <path d="M20 42 Q38 32 62 36 Q80 40 84 48" stroke="#d870b0" fill="none" stroke-width="0.8" opacity="0.5"/>
            <path d="M14 54 Q38 44 64 48 Q82 52 84 58" stroke="#c060a0" fill="none" stroke-width="0.7" opacity="0.4"/>
            <path d="M14 66 Q38 58 64 62 Q80 66 82 72" stroke="#b05090" fill="none" stroke-width="0.6" opacity="0.35"/>
            <path d="M18 76 Q40 70 62 72 Q76 76 78 80" stroke="#a04880" fill="none" stroke-width="0.5" opacity="0.3"/>
            <!-- Rim lighting -->
            <path d="M50 24 C40 23 28 28 20 38 C16 44 14 52 13 58" stroke="#e888c8" fill="none" stroke-width="1" opacity="0.3"/>
            <!-- Head — fierce, protective maternal rage -->
            <path d="M40 10 C30 8 20 12 18 20 C16 28 20 36 30 40 C40 44 52 42 62 38 C70 34 72 26 70 20 C68 14 60 8 50 8 C46 8 42 8 40 10Z" fill="#b05090"/>
            <!-- Eye stalks — larger, more alert -->
            <path d="M32 12 L26 4 L24 0" stroke="#a04880" fill="none" stroke-width="2"/>
            <ellipse cx="23" cy="-1" rx="3.5" ry="2.8" fill="#ff2080"><animate attributeName="fill" values="#ff2080;#ff40a0;#ff2080" dur="0.8s" repeatCount="indefinite"/></ellipse>
            <circle cx="23" cy="-1" r="1.5" fill="white"/>
            <path d="M56 10 L62 4 L64 0" stroke="#a04880" fill="none" stroke-width="2"/>
            <ellipse cx="65" cy="-1" rx="3.5" ry="2.8" fill="#ff2080"><animate attributeName="fill" values="#ff40a0;#ff2080;#ff40a0" dur="0.8s" repeatCount="indefinite"/></ellipse>
            <circle cx="65" cy="-1" r="1.5" fill="white"/>
            <!-- Snarling mouth — protective fury -->
            <path d="M40 28 L44 32 L48 28 L52 32 L56 28" stroke="#ff60b0" fill="none" stroke-width="1.5"/>
            <!-- MASSIVE protective claws — guarding pose -->
            <!-- Left claw -->
            <path d="M22 24 L4 12 L-8 4 C-12 0 -14 4 -12 8 L-4 16 L-14 22 C-18 24 -16 30 -10 28 L6 20Z" fill="#d870b8"/>
            <path d="M-8 4 L-12 -2 C-16 -6 -14 -8 -10 -4 L-6 2" fill="#e880c8"/>
            <path d="M-12 8 L-18 4 C-22 2 -20 0 -16 4" fill="#e880c8"/>
            <!-- Right claw -->
            <path d="M66 24 L84 12 L96 4 C100 0 102 4 100 8 L92 16 L102 22 C106 24 104 30 98 28 L82 20Z" fill="#d870b8"/>
            <path d="M96 4 L100 -2 C104 -6 102 -8 98 -4 L94 2" fill="#e880c8"/>
            <!-- Egg cluster — glowing, precious -->
            <g opacity="0.85">
                <circle cx="36" cy="68" r="5" fill="url(#bm18egg)"><animate attributeName="r" values="4.5;5.5;4.5" dur="2s" repeatCount="indefinite"/></circle>
                <circle cx="36" cy="68" r="2" fill="white" opacity="0.3"/>
                <circle cx="48" cy="72" r="5.5" fill="url(#bm18egg)"><animate attributeName="r" values="5;6;5" dur="1.8s" repeatCount="indefinite"/></circle>
                <circle cx="48" cy="72" r="2.2" fill="white" opacity="0.3"/>
                <circle cx="60" cy="68" r="5" fill="url(#bm18egg)"><animate attributeName="r" values="5.5;4.5;5.5" dur="2.2s" repeatCount="indefinite"/></circle>
                <circle cx="60" cy="68" r="2" fill="white" opacity="0.3"/>
                <circle cx="42" cy="78" r="4.5" fill="url(#bm18egg)" opacity="0.8"/>
                <circle cx="54" cy="78" r="4.5" fill="url(#bm18egg)" opacity="0.8"/>
                <circle cx="48" cy="82" r="3.5" fill="url(#bm18egg)" opacity="0.6"/>
            </g>
            <!-- Walking legs -->
            <path d="M24 80 L16 86 L12 92" stroke="#a04880" fill="none" stroke-width="1.8" stroke-linecap="round"/>
            <path d="M34 84 L28 90 L24 96" stroke="#a04880" fill="none" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M62 82 L68 88 L72 94" stroke="#a04880" fill="none" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M72 78 L80 84 L84 90" stroke="#a04880" fill="none" stroke-width="1.8" stroke-linecap="round"/>
            <!-- Antennae — long, sweeping, protective arc -->
            <path d="M28 8 Q14 -4 2 -10 Q-4 -14 -8 -16" stroke="#b05090" fill="none" stroke-width="2.2" stroke-dasharray="3 1.5"/>
            <path d="M60 8 Q74 -4 86 -10 Q92 -14 96 -16" stroke="#b05090" fill="none" stroke-width="2.2" stroke-dasharray="3 1.5"/>
        </g>
        <!-- Swarming baby lobsters — tiny, detailed -->
        <g transform="translate(4,80) scale(0.3)">
            <path d="M18 10 C14 8 10 12 10 16 C10 20 14 24 18 24 C22 22 24 18 22 14Z" fill="#d870b0"/>
            <circle cx="14" cy="10" r="1.5" fill="#ff80d0"/>
        </g>
        <g transform="translate(96,78) scale(0.25)">
            <path d="M18 10 C14 8 10 12 10 16 C10 20 14 24 18 24 C22 22 24 18 22 14Z" fill="#d870b0"/>
            <circle cx="22" cy="10" r="1.5" fill="#ff80d0"/>
        </g>
        <g transform="translate(50,86) scale(0.2)" opacity="0.7">
            <path d="M18 10 C14 8 10 12 10 16 C10 20 14 24 18 24 C22 22 24 18 22 14Z" fill="#d870b0"/>
        </g>
    </svg>`,

    // === 19: Abyssal Lurker — nightmare barely visible in pitch black, multiple eyes, horror ===
    19: `<svg viewBox="0 0 120 100">
        <defs>
            <radialGradient id="al19bg" cx="50%" cy="50%"><stop offset="0%" stop-color="#080018"/><stop offset="100%" stop-color="#010004"/></radialGradient>
            <radialGradient id="al19form" cx="50%" cy="40%"><stop offset="0%" stop-color="#1c0840" stop-opacity="0.5"/><stop offset="60%" stop-color="#100430" stop-opacity="0.25"/><stop offset="100%" stop-color="#080020" stop-opacity="0"/></radialGradient>
            <radialGradient id="al19void" cx="50%" cy="90%"><stop offset="0%" stop-color="#0c0020"/><stop offset="100%" stop-color="#020008"/></radialGradient>
        </defs>
        <rect width="120" height="100" fill="url(#al19bg)"/>
        <!-- Absolute void — barely any light -->
        <ellipse cx="60" cy="92" rx="58" ry="14" fill="url(#al19void)"/>
        <!-- Abyssal depth layer — almost black -->
        <path d="M0 80 Q30 74 60 78 Q90 82 120 76 L120 100 L0 100Z" fill="#060014" opacity="0.6"/>
        <path d="M0 90 Q40 86 80 89 Q110 92 120 88 L120 100 L0 100Z" fill="#030008" opacity="0.5"/>
        <!-- Barely visible ambient void glow -->
        <g opacity="0.03">
            <circle cx="30" cy="60" r="24" fill="#6030c0"/>
            <circle cx="85" cy="50" r="20" fill="#4020a0"/>
        </g>
        <!-- THE LURKER — nightmare form, barely visible -->
        <g transform="translate(16,14)">
            <!-- Body — massive, formless, melting into darkness, visible only as a shape -->
            <path d="M44 26 C30 22 16 30 10 44 C4 58 6 72 14 80 C22 88 36 90 48 88 C60 86 72 80 78 70 C84 58 82 44 74 34 C68 26 56 22 48 24Z" fill="url(#al19form)"/>
            <!-- Barely visible shell ridges in the dark -->
            <path d="M14 44 Q32 34 56 38 Q76 42 80 50" stroke="#200850" fill="none" stroke-width="0.6" opacity="0.2"/>
            <path d="M10 56 Q32 48 58 52 Q78 56 80 62" stroke="#180840" fill="none" stroke-width="0.5" opacity="0.15"/>
            <path d="M12 68 Q34 62 58 64 Q76 68 78 72" stroke="#140830" fill="none" stroke-width="0.4" opacity="0.1"/>
            <!-- Head — massive, hidden in shadow -->
            <path d="M36 12 C24 8 12 14 10 24 C8 34 14 42 26 46 C38 50 54 46 64 40 C72 34 74 24 70 16 C66 8 52 6 44 8Z" fill="#140830" opacity="0.5"/>
            <!-- MULTIPLE SINISTER EYES — the horror -->
            <!-- Primary eyes — large, glowing -->
            <ellipse cx="28" cy="18" rx="4.5" ry="3.5" fill="#a040ff" opacity="0.85"><animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite"/></ellipse>
            <circle cx="28" cy="18" r="2" fill="white" opacity="0.7"/>
            <circle cx="28" cy="18" r="1" fill="#6020c0"/>
            <ellipse cx="56" cy="18" rx="4" ry="3" fill="#8030e0" opacity="0.6"><animate attributeName="opacity" values="0.3;0.7;0.3" dur="4s" repeatCount="indefinite"/></ellipse>
            <circle cx="56" cy="18" r="1.5" fill="white" opacity="0.5"/>
            <circle cx="56" cy="18" r="0.8" fill="#5020b0"/>
            <!-- Secondary eyes — smaller, scattered, asymmetric -->
            <circle cx="20" cy="28" r="2.5" fill="#6020c0" opacity="0.35"><animate attributeName="opacity" values="0.15;0.5;0.15" dur="5s" repeatCount="indefinite"/></circle>
            <circle cx="20" cy="28" r="0.8" fill="white" opacity="0.4"/>
            <circle cx="64" cy="24" r="2" fill="#5818b0" opacity="0.25"><animate attributeName="opacity" values="0.4;0.1;0.4" dur="4.5s" repeatCount="indefinite"/></circle>
            <circle cx="64" cy="24" r="0.7" fill="white" opacity="0.3"/>
            <circle cx="38" cy="10" r="1.8" fill="#4818a0" opacity="0.2"><animate attributeName="opacity" values="0.1;0.35;0.1" dur="6s" repeatCount="indefinite"/></circle>
            <circle cx="48" cy="28" r="1.5" fill="#3810a0" opacity="0.15"><animate attributeName="opacity" values="0.3;0.05;0.3" dur="5.5s" repeatCount="indefinite"/></circle>
            <!-- Shadowy claws — reaching from void, barely visible -->
            <!-- Left claw -->
            <path d="M18 30 L4 18 L-6 10 C-10 6 -12 10 -10 14 L-4 20 L-12 26 C-16 28 -14 34 -8 30 L8 24Z" fill="#2c1060" opacity="0.4"/>
            <path d="M-6 10 L-10 4 C-14 0 -12 -2 -8 4 L-4 8" fill="#3818a0" opacity="0.3"/>
            <!-- Right claw -->
            <path d="M64 30 L78 18 L88 10 C92 6 94 10 92 14 L86 20 L94 26 C98 28 96 34 90 30 L76 24Z" fill="#2c1060" opacity="0.4"/>
            <path d="M88 10 L92 4 C96 0 94 -2 90 4 L86 8" fill="#3818a0" opacity="0.3"/>
            <!-- Antennae — shadow tendrils, writhing -->
            <path d="M24 8 Q12 -6 0 -14 Q-6 -18 -10 -22" stroke="#1c0848" fill="none" stroke-width="2" opacity="0.3">
                <animate attributeName="d" values="M24 8 Q12 -6 0 -14 Q-6 -18 -10 -22;M24 8 Q14 -4 2 -12 Q-4 -16 -8 -20;M24 8 Q12 -6 0 -14 Q-6 -18 -10 -22" dur="4s" repeatCount="indefinite"/>
            </path>
            <path d="M58 8 Q70 -6 82 -14 Q88 -18 92 -22" stroke="#1c0848" fill="none" stroke-width="2" opacity="0.25">
                <animate attributeName="d" values="M58 8 Q70 -6 82 -14 Q88 -18 92 -22;M58 8 Q68 -4 80 -12 Q86 -16 90 -20;M58 8 Q70 -6 82 -14 Q88 -18 92 -22" dur="3.5s" repeatCount="indefinite"/>
            </path>
            <!-- Walking legs — shadowy, half visible -->
            <path d="M20 76 L12 82 L8 88" stroke="#180840" fill="none" stroke-width="1.2" opacity="0.25" stroke-linecap="round"/>
            <path d="M32 80 L26 86 L22 92" stroke="#180840" fill="none" stroke-width="1" opacity="0.2" stroke-linecap="round"/>
            <path d="M58 78 L64 84 L68 90" stroke="#180840" fill="none" stroke-width="1" opacity="0.2" stroke-linecap="round"/>
            <path d="M68 74 L76 80 L80 86" stroke="#180840" fill="none" stroke-width="1.2" opacity="0.25" stroke-linecap="round"/>
            <!-- Segmented tail — dissolving into void -->
            <path d="M44 86 L42 90" stroke="#140830" fill="none" stroke-width="4" stroke-linecap="round" opacity="0.3"/>
            <path d="M42 91 L40 94" stroke="#100828" fill="none" stroke-width="3" stroke-linecap="round" opacity="0.2"/>
            <path d="M40 95 L39 97" stroke="#0c0820" fill="none" stroke-width="2" stroke-linecap="round" opacity="0.15"/>
        </g>
    </svg>`,

    // === 20: Coconut Crab King — colossal armored warlord, coconut shell crown, battle-scarred terrain ===
    20: `<svg viewBox="0 0 120 100">
        <defs>
            <radialGradient id="ck20bg" cx="50%" cy="60%"><stop offset="0%" stop-color="#2a1a00"/><stop offset="50%" stop-color="#181000"/><stop offset="100%" stop-color="#080400"/></radialGradient>
            <linearGradient id="ck20body" x1="0" y1="0" x2="0.5" y2="1"><stop offset="0%" stop-color="#e0a848"/><stop offset="25%" stop-color="#c89840"/><stop offset="60%" stop-color="#a87828"/><stop offset="100%" stop-color="#785818"/></linearGradient>
            <linearGradient id="ck20crown" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8a5828"/><stop offset="50%" stop-color="#6a4020"/><stop offset="100%" stop-color="#4a2810"/></linearGradient>
            <radialGradient id="ck20aura" cx="50%" cy="50%"><stop offset="0%" stop-color="#c09030" stop-opacity="0.08"/><stop offset="100%" stop-color="#c09030" stop-opacity="0"/></radialGradient>
        </defs>
        <rect width="120" height="100" fill="url(#ck20bg)"/>
        <!-- Battle-scarred terrain layers -->
        <path d="M0 70 Q20 64 40 68 C60 74 80 66 100 70 L120 68 L120 100 L0 100Z" fill="#140c00"/>
        <path d="M0 78 Q30 72 60 76 Q90 80 120 74 L120 100 L0 100Z" fill="#100800"/>
        <path d="M0 86 Q40 82 80 85 Q100 88 120 84 L120 100 L0 100Z" fill="#0a0600"/>
        <path d="M0 94 Q50 90 100 93 L120 92 L120 100 L0 100Z" fill="#060400"/>
        <!-- Cracked, destroyed ground -->
        ${_crack(12,70,20,'#c09040')}${_crack(78,72,18,'#b08030')}${_crack(48,74,16,'#a07028')}
        <!-- Crushed shell debris -->
        <path d="M8 72 Q12 70 16 72 Q14 74 10 74Z" fill="#3a2810" opacity="0.4"/>
        <path d="M90 70 Q94 68 98 70 Q96 72 92 72Z" fill="#3a2810" opacity="0.3"/>
        <path d="M54 76 Q58 74 62 76 Q60 78 56 78Z" fill="#3a2810" opacity="0.35"/>
        <!-- Imperial aura -->
        <circle cx="56" cy="38" r="40" fill="url(#ck20aura)"><animate attributeName="r" values="36;44;36" dur="2s" repeatCount="indefinite"/></circle>
        <!-- Dust/sand caustics -->
        <g opacity="0.05">
            <path d="M10 30 Q30 24 50 30 Q70 36 90 28" stroke="#d0a040" fill="none" stroke-width="2"/>
            <path d="M20 18 Q40 14 60 20" stroke="#c09030" fill="none" stroke-width="1.5"/>
        </g>
        <!-- COCONUT CRAB KING — colossal armored warlord -->
        <g transform="translate(8,-2)">
            <!-- Body — MASSIVE, heavily armored, ridged, battle-scarred -->
            <path d="M52 22 C38 20 22 28 14 40 C6 54 4 66 10 76 C16 84 30 90 46 92 C62 94 76 88 84 78 C90 68 92 54 88 42 C84 32 72 24 62 20 C58 18 54 20 52 22Z" fill="url(#ck20body)"/>
            <!-- Heavy armor plating — thick ridges -->
            <path d="M18 40 Q38 30 64 34 Q84 38 88 44" stroke="#d0a040" fill="none" stroke-width="1.2" opacity="0.6"/>
            <path d="M10 54 Q38 44 66 48 Q88 52 90 58" stroke="#c09030" fill="none" stroke-width="1" opacity="0.5"/>
            <path d="M8 66 Q38 58 66 62 Q86 66 88 72" stroke="#b08028" fill="none" stroke-width="0.8" opacity="0.4"/>
            <path d="M14 76 Q40 70 64 72 Q82 76 84 80" stroke="#a07020" fill="none" stroke-width="0.7" opacity="0.35"/>
            <!-- Battle scars on armor -->
            ${_scar(40,44,14,10)}${_scar(56,58,12,-15)}${_scar(30,66,10,25)}
            <!-- Rim lighting — golden glow -->
            <path d="M52 22 C42 21 28 26 18 36 C14 42 10 50 9 56" stroke="#e8b858" fill="none" stroke-width="1.2" opacity="0.35"/>
            <path d="M52 22 C60 21 72 26 80 34 C84 40 88 48 89 54" stroke="#d0a040" fill="none" stroke-width="0.8" opacity="0.25"/>
            <!-- Head — massive, square-jawed, imperial -->
            <path d="M42 8 C30 4 18 10 14 20 C10 30 16 40 28 44 C40 48 56 46 66 40 C76 34 78 24 74 16 C70 8 58 2 48 4 C44 4 42 6 42 8Z" fill="#b88838"/>
            <!-- COCONUT SHELL CROWN — battle-worn, spiked -->
            <path d="M28 8 C24 2 22 -4 26 -10 C32 -16 42 -18 50 -16 C58 -14 64 -8 62 -2 C60 4 56 8 52 10 L48 8 L44 10 L40 8 L36 10 L32 8Z" fill="url(#ck20crown)" stroke="#a06828" stroke-width="1"/>
            <!-- Crown spikes — gold tipped -->
            <path d="M30 -6 L26 -16 L32 -8" fill="#c09040"/>
            <path d="M40 -10 L38 -22 L42 -12" fill="#d0a848"/>
            <path d="M52 -8 L56 -18 L54 -10" fill="#c09040"/>
            <!-- Crown jewel -->
            <circle cx="42" cy="-12" r="2.5" fill="#ff8800" opacity="0.7"><animate attributeName="opacity" values="0.5;0.9;0.5" dur="2s" repeatCount="indefinite"/></circle>
            <!-- Eye stalks — thick, armored, imposing -->
            <path d="M32 10 L24 2 L20 -2" stroke="#a07828" fill="none" stroke-width="2.5"/>
            <ellipse cx="19" cy="-3" rx="4" ry="3" fill="#ff8800"><animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite"/></ellipse>
            <circle cx="19" cy="-3" r="1.8" fill="#ffcc00"/>
            <path d="M56 8 L64 2 L68 -2" stroke="#a07828" fill="none" stroke-width="2.5"/>
            <ellipse cx="69" cy="-3" rx="4" ry="3" fill="#ff8800"><animate attributeName="opacity" values="1;0.7;1" dur="1.5s" repeatCount="indefinite"/></ellipse>
            <circle cx="69" cy="-3" r="1.8" fill="#ffcc00"/>
            <!-- Snarling imperial mouth -->
            <path d="M38 28 L42 32 L46 28 L50 32 L54 28" stroke="#c07020" fill="none" stroke-width="1.5"/>
            <!-- COLOSSAL WAR CLAWS — enormous, articulated, battle-worn pincers -->
            <!-- Left claw — massive crusher -->
            <path d="M18 26 L-2 14 L-14 4 C-20 -2 -22 4 -18 10 L-8 18 L-20 26 C-26 30 -22 38 -16 34 L2 24Z" fill="#d8a850"/>
            <path d="M-14 4 L-20 -4 C-26 -10 -22 -12 -18 -6 L-12 2" fill="#e8b860"/>
            <path d="M-18 10 L-26 6 C-30 4 -28 0 -22 4" fill="#e8b860"/>
            <!-- Left claw scar -->
            <path d="M-12 12 L-6 18" stroke="#ff3030" fill="none" stroke-width="0.8" opacity="0.4"/>
            <!-- Right claw — massive smasher -->
            <path d="M72 26 L92 14 L104 4 C110 -2 112 4 108 10 L98 18 L110 26 C116 30 112 38 106 34 L88 24Z" fill="#d8a850"/>
            <path d="M104 4 L110 -4 C116 -10 112 -12 108 -6 L102 2" fill="#e8b860"/>
            <path d="M108 10 L116 6 C120 4 118 0 112 4" fill="#e8b860"/>
            <!-- Walking legs — thick, powerful -->
            <path d="M20 80 L10 86 L6 92" stroke="#a07828" fill="none" stroke-width="2.2" stroke-linecap="round"/>
            <path d="M32 84 L24 90 L20 96" stroke="#a07828" fill="none" stroke-width="1.8" stroke-linecap="round"/>
            <path d="M62 82 L70 88 L74 94" stroke="#a07828" fill="none" stroke-width="1.8" stroke-linecap="round"/>
            <path d="M74 78 L84 84 L88 90" stroke="#a07828" fill="none" stroke-width="2.2" stroke-linecap="round"/>
            <!-- Segmented tail — 5 massive segments -->
            <path d="M50 92 L48 96" stroke="#907020" fill="none" stroke-width="6" stroke-linecap="round"/>
            <path d="M48 97 L46 100" stroke="#886818" fill="none" stroke-width="5" stroke-linecap="round"/>
            <!-- Antennae — thick, battle-worn, commanding -->
            <path d="M28 6 Q14 -6 2 -14 Q-4 -18 -8 -22" stroke="#b88838" fill="none" stroke-width="2.5" stroke-dasharray="3 1.5"/>
            <path d="M60 6 Q74 -6 86 -14 Q92 -18 96 -22" stroke="#b88838" fill="none" stroke-width="2.5" stroke-dasharray="3 1.5"/>
        </g>
    </svg>`,