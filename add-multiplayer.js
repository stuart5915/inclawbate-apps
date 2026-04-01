#!/usr/bin/env node
/**
 * add-multiplayer.js
 * Adds real-time multiplayer battles to Crustacean Combat using the Realtime SDK.
 * - Room-based matchmaking (create/join with 4-char code)
 * - Turn-based PvP duels synced via WebSocket messages
 * - Attack resolution via 2-phase protocol (attacker declares, defender resolves)
 * - Monkey-patches existing action functions to broadcast in MP mode
 */
const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, 'apps', 'claw-wars.html');
let src = fs.readFileSync(FILE, 'utf8');
const origSize = Buffer.byteLength(src, 'utf8');
console.log(`Read ${FILE} — ${(origSize/1024).toFixed(1)} KB`);

// ===================================================================
// 1. Add MULTIPLAYER button to title menu
// ===================================================================
const menuAnchor = `<button class="menu-btn secondary" onclick="showScreen('howto-screen')">HOW TO PLAY</button>`;
if (!src.includes(menuAnchor)) { console.error('ERR: menu anchor not found'); process.exit(1); }
src = src.replace(menuAnchor, menuAnchor + `\n                            <button class="menu-btn secondary" onclick="showScreen('mp-lobby')">MULTIPLAYER</button>`);
console.log('[1/5] Added MULTIPLAYER button');

// ===================================================================
// 2. Insert MP CSS before HEADER BAR
// ===================================================================
const cssAnchor = '/* ===== HEADER BAR ===== */';
if (!src.includes(cssAnchor)) { console.error('ERR: CSS anchor not found'); process.exit(1); }

const MP_CSS = `/* ===== MULTIPLAYER LOBBY ===== */
        #mp-lobby { flex-direction: column; background: #06080c; }
        #mp-lobby-content { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:20px; gap:20px; }
        #mp-create-join { display:flex; flex-direction:column; align-items:center; gap:14px; width:100%; max-width:340px; }
        .mp-action-btn { width:100%; padding:16px; border-radius:6px; font-family:'Orbitron',sans-serif; font-size:13px; font-weight:700; letter-spacing:3px; text-transform:uppercase; border:1px solid rgba(160,130,80,0.2); background:linear-gradient(145deg,#3a2c16,#2e2210); color:#d4c090; cursor:pointer; transition:all .2s; text-shadow:0 1px 2px rgba(0,0,0,.5); }
        .mp-action-btn:active { transform:scale(.97); }
        .mp-join-row { display:flex; gap:8px; width:100%; }
        .mp-join-row input { flex:1; background:rgba(20,18,14,.8); border:1px solid rgba(120,105,75,.2); border-radius:6px; padding:12px 14px; color:#d4c090; font-family:'Orbitron',sans-serif; font-size:16px; letter-spacing:4px; text-align:center; text-transform:uppercase; outline:none; }
        .mp-join-row input::placeholder { color:rgba(160,145,115,.3); letter-spacing:2px; font-size:11px; }
        .mp-join-row button { padding:12px 20px; border-radius:6px; background:linear-gradient(145deg,#3a2c16,#2e2210); color:#d4c090; font-family:'Orbitron',sans-serif; font-size:12px; font-weight:700; letter-spacing:2px; border:1px solid rgba(160,130,80,.2); cursor:pointer; }
        .mp-or { font-family:'Chakra Petch',sans-serif; font-size:12px; color:rgba(140,125,95,.35); letter-spacing:3px; text-transform:uppercase; }
        #mp-waiting { display:none; flex-direction:column; align-items:center; gap:16px; text-align:center; }
        #mp-room-display { font-family:'Orbitron',sans-serif; font-size:42px; font-weight:900; letter-spacing:12px; color:#d4c090; text-shadow:0 0 20px rgba(200,170,100,.2); padding:16px 28px; background:rgba(20,18,14,.6); border:1px solid rgba(120,105,75,.15); border-radius:8px; }
        #mp-status-text { font-family:'Chakra Petch',sans-serif; font-size:14px; color:rgba(160,145,115,.6); white-space:pre-line; line-height:1.6; }
        #mp-players-list { display:flex; gap:20px; }
        .mp-player { font-family:'Chakra Petch',sans-serif; font-size:13px; color:rgba(180,165,130,.5); padding:8px 16px; background:rgba(20,18,14,.5); border:1px solid rgba(120,105,75,.1); border-radius:4px; }
        #mp-start-btn { display:none; padding:16px 40px; border-radius:8px; font-family:'Orbitron',sans-serif; font-size:15px; font-weight:900; letter-spacing:4px; background:linear-gradient(135deg,#b22222,#e63c3c 40%,#ff5252 70%); color:#fff; border:1px solid rgba(255,150,100,.2); cursor:pointer; text-shadow:0 2px 4px rgba(0,0,0,.3); box-shadow:0 0 15px rgba(230,60,60,.25); }
        .mp-surrender-btn { position:absolute; top:8px; right:8px; padding:4px 10px; border-radius:4px; background:rgba(180,30,30,.3); color:rgba(255,120,120,.6); border:1px solid rgba(180,30,30,.2); font-size:9px; font-weight:700; letter-spacing:1px; cursor:pointer; z-index:20; font-family:'Nunito',sans-serif; }

        `;

src = src.replace(cssAnchor, MP_CSS + cssAnchor);
console.log('[2/5] Added MP CSS');

// ===================================================================
// 3. Insert MP lobby HTML before COLLECTION SCREEN
// ===================================================================
const htmlAnchor = '<!-- ===== COLLECTION SCREEN ===== -->';
if (!src.includes(htmlAnchor)) { console.error('ERR: HTML anchor not found'); process.exit(1); }

const MP_HTML = `<!-- ===== MULTIPLAYER LOBBY ===== -->
    <div id="mp-lobby" class="screen">
        <div class="header-bar">
            <button class="back-btn" onclick="mpLeaveLobby()">\\u2190 Back</button>
            <h2 class="screen-title">Multiplayer</h2>
        </div>
        <div id="mp-lobby-content">
            <div id="mp-create-join">
                <button class="mp-action-btn" onclick="mpCreateRoom()">CREATE ROOM</button>
                <div class="mp-or">\\u2014 or \\u2014</div>
                <div class="mp-join-row">
                    <input id="mp-code-input" maxlength="4" placeholder="Code">
                    <button onclick="mpJoinRoom()">JOIN</button>
                </div>
            </div>
            <div id="mp-waiting">
                <div style="font-family:'Chakra Petch',sans-serif;font-size:11px;color:rgba(140,125,95,.4);letter-spacing:3px;text-transform:uppercase;">Room Code</div>
                <div id="mp-room-display">----</div>
                <div id="mp-status-text">Connecting...</div>
                <div id="mp-players-list"></div>
                <button id="mp-start-btn" onclick="mpStartGame()">START DUEL</button>
            </div>
        </div>
    </div>

    `;

src = src.replace(htmlAnchor, MP_HTML + htmlAnchor);
console.log('[3/5] Added MP lobby HTML');

// ===================================================================
// 4. Modify turn info display for MP awareness
// ===================================================================
const oldTurnInfo = `\${duel.currentPlayer === 'player' ? 'Your Turn' : 'AI Turn'}`;
const newTurnInfo = `\${duel.currentPlayer === 'player' ? 'Your Turn' : (duel.isMultiplayer ? "Opponent's Turn" : 'AI Turn')}`;
if (src.includes(oldTurnInfo)) {
    src = src.replace(oldTurnInfo, newTurnInfo);
    console.log('[4/5] Updated turn info display for MP');
} else {
    console.log('[4/5] Turn info string not found (may already be updated)');
}

// ===================================================================
// 5. Insert MP JavaScript before </script>
// ===================================================================
const scriptEnd = '</script>';
const lastScriptEnd = src.lastIndexOf(scriptEnd);
if (lastScriptEnd === -1) { console.error('ERR: </script> not found'); process.exit(1); }

const MP_JS = `

// ============================================================
// MULTIPLAYER SYSTEM
// ============================================================

let mp = { active: false, room: null, role: null, opponentId: null };

function mpLeaveLobby() {
    mp.active = false; mp.room = null; mp.role = null; mp.opponentId = null;
    document.getElementById('mp-create-join').style.display = 'flex';
    document.getElementById('mp-waiting').style.display = 'none';
    showScreen('title-screen');
}

function mpCreateRoom() {
    const code = Math.random().toString(36).substr(2, 4).toUpperCase();
    mpConnect(code);
}

function mpJoinRoom() {
    const code = document.getElementById('mp-code-input').value.trim().toUpperCase();
    if (!code || code.length < 3) return alert('Enter a valid room code');
    mpConnect(code);
}

async function mpConnect(code) {
    mp.room = code;
    document.getElementById('mp-create-join').style.display = 'none';
    const w = document.getElementById('mp-waiting');
    w.style.display = 'flex';
    document.getElementById('mp-room-display').textContent = code;
    document.getElementById('mp-status-text').textContent = 'Connecting...';
    document.getElementById('mp-start-btn').style.display = 'none';

    if (!window.Realtime) {
        document.getElementById('mp-status-text').textContent = 'Realtime not available (local testing)';
        return;
    }

    await Realtime.connect('cc-' + code);

    Realtime.on('mp', (data, sid) => {
        if (sid === Realtime.me.id) return;
        mpReceive(data, sid);
    });

    Realtime.onJoin(p => {
        if (p.id === Realtime.me?.id) return;
        mp.opponentId = p.id;
        document.getElementById('mp-status-text').textContent = 'Opponent joined!';
        mpUpdatePlayers();
        if (mp.role === 'host') document.getElementById('mp-start-btn').style.display = 'block';
    });

    Realtime.onLeave(p => {
        if (p.id === mp.opponentId) {
            mp.opponentId = null;
            document.getElementById('mp-status-text').textContent = 'Opponent disconnected';
            document.getElementById('mp-start-btn').style.display = 'none';
            mpUpdatePlayers();
            if (duel && duel.isMultiplayer && !duel.gameOver) {
                duelLog('Opponent disconnected!');
                endDuelResult('win');
            }
        }
    });

    const players = Realtime.getPlayers();
    const others = players.filter(p => p.id !== Realtime.me.id);
    if (others.length > 0) {
        mp.role = 'guest';
        mp.opponentId = others[0].id;
        document.getElementById('mp-status-text').textContent = 'Opponent found!';
        mpUpdatePlayers();
    } else {
        mp.role = 'host';
        document.getElementById('mp-status-text').textContent = 'Waiting for opponent...\\nShare code: ' + code;
    }
    Realtime.setMyState({ role: mp.role, ready: true });
}

function mpUpdatePlayers() {
    const el = document.getElementById('mp-players-list');
    if (!el) return;
    const you = 'You';
    const opp = mp.opponentId ? 'Opponent' : '...';
    el.innerHTML = '<div class="mp-player">P1: ' + (mp.role === 'host' ? you : opp) + '</div>' +
                   '<div class="mp-player">P2: ' + (mp.role === 'guest' ? you : opp) + '</div>';
}

function mpStartGame() {
    if (!mp.opponentId) return;
    if (playerData.deck.length < 20) return alert('Need at least 20 cards in deck!');
    Realtime.send('mp', { type: 'start' });
    mpInitDuel(true);
}

function mpInitDuel(goFirst) {
    mp.active = true;
    if (playerData.deck.length < 20) return alert('Need at least 20 cards in your deck!');

    duel = {
        turn: 1,
        currentPlayer: goFirst ? 'player' : 'ai',
        phase: goFirst ? 'main1' : 'draw',
        player: createPlayerState([...playerData.deck], [...playerData.extraDeck]),
        ai: {
            lp: 8000, deck: [], hand: [], handCount: 5, deckCount: 30,
            monsters: [null, null, null, null, null],
            spells: [null, null, null, null, null],
            fieldSpell: null, graveyard: [], extraDeck: [],
            hasNormalSummoned: false
        },
        log: [], gameOver: false, selectedCard: null, selectedZone: null,
        uiState: 'idle', tributeTargets: [], tributeNeeded: 0,
        pendingAction: null, chainResolving: false,
        isFirstTurn: true, isMultiplayer: true, _mpInit: true
    };

    for (let i = 0; i < 5; i++) drawCard('player');
    duel._mpInit = false;

    showScreen('duel-screen');

    // Add surrender button
    const ds = document.getElementById('duel-screen');
    if (ds && !document.getElementById('mp-surrender')) {
        const btn = document.createElement('button');
        btn.id = 'mp-surrender';
        btn.className = 'mp-surrender-btn';
        btn.textContent = 'SURRENDER';
        btn.onclick = mpSurrender;
        ds.appendChild(btn);
    }
    const sb = document.getElementById('mp-surrender');
    if (sb) sb.style.display = 'block';

    if (goFirst) {
        duelLog('Your turn first!');
    } else {
        duelLog("Opponent goes first. Waiting...");
    }
    renderDuel();
}

function mpSend(data) {
    if (window.Realtime && mp.active) {
        try { Realtime.send('mp', data); } catch(e) {}
    }
}

function mpSurrender() {
    if (duel && duel.isMultiplayer && !duel.gameOver) {
        mpSend({ type: 'surrender' });
        duelLog('You surrendered.');
        endDuelResult('lose');
    }
}

// ---- Message router ----

function mpReceive(data, sid) {
    if (!data || !data.type) return;

    if (data.type === 'start') {
        if (!duel || !duel.isMultiplayer) mpInitDuel(false);
        return;
    }

    if (!duel || !duel.isMultiplayer || duel.gameOver) return;

    switch (data.type) {
        case 'draw':     mpRxDraw(); break;
        case 'summon':   mpRxSummon(data); break;
        case 'set-mon':  mpRxSetMon(data); break;
        case 'tribute':  mpRxTribute(data); break;
        case 'spell':    mpRxSpell(data); break;
        case 'set-st':   mpRxSetST(data); break;
        case 'fld-spl':  mpRxFieldSpell(data); break;
        case 'atk-dec':  mpRxAtkDeclare(data); break;
        case 'atk-res':  mpRxAtkResult(data); break;
        case 'dir-dec':  mpRxDirDeclare(data); break;
        case 'dir-res':  mpRxDirResult(data); break;
        case 'end':      mpRxEndTurn(); break;
        case 'pos':      mpRxChangePos(data); break;
        case 'flip':     mpRxFlip(data); break;
        case 'phase':    break; // informational only
        case 'surrender': if (!duel.gameOver) { duelLog('Opponent surrendered!'); endDuelResult('win'); } break;
    }
}

// ---- Opponent action handlers ----

function mpRxDraw() {
    duel.ai.handCount = (duel.ai.handCount || 0) + 1;
    duel.ai.deckCount = Math.max(0, (duel.ai.deckCount || 30) - 1);
    if (duel.ai.deckCount <= 0 && duel.ai.handCount <= 0) {
        duelLog('Opponent decked out!');
        endDuelResult('win');
        return;
    }
    duelLog('Opponent draws a card.');
    renderDuel();
}

function mpRxSummon(d) {
    const c = CARDS.find(x => x.id === d.cid);
    if (!c) return;
    duel.ai.monsters[d.zi] = createFieldCard(c, d.pos || 'atk', true);
    duel.ai.handCount = Math.max(0, (duel.ai.handCount || 1) - 1);
    duel.ai.hasNormalSummoned = true;
    duelLog('Opponent summons ' + c.name + '!');
    renderDuel();
}

function mpRxSetMon(d) {
    const dummy = { id: -1, name: '???', type: 'monster', atk: 0, def: 0, level: 1, attribute: '?', effects: [], rarity: 'common' };
    duel.ai.monsters[d.zi] = createFieldCard(dummy, 'def', false);
    duel.ai.monsters[d.zi].justSet = true;
    duel.ai.monsters[d.zi].turnSet = duel.turn;
    duel.ai.handCount = Math.max(0, (duel.ai.handCount || 1) - 1);
    duelLog('Opponent sets a monster.');
    renderDuel();
}

function mpRxTribute(d) {
    const c = CARDS.find(x => x.id === d.cid);
    if (!c) return;
    if (d.tributes) d.tributes.forEach(zi => {
        if (duel.ai.monsters[zi]) {
            duel.ai.graveyard.push(duel.ai.monsters[zi].card);
            duel.ai.monsters[zi] = null;
        }
    });
    duel.ai.monsters[d.zi] = createFieldCard(c, 'atk', true);
    duel.ai.handCount = Math.max(0, (duel.ai.handCount || 1) - 1);
    duelLog('Opponent tribute summons ' + c.name + '!');
    renderDuel();
}

function mpRxSpell(d) {
    const c = CARDS.find(x => x.id === d.cid);
    if (!c) return;
    duel.ai.handCount = Math.max(0, (duel.ai.handCount || 1) - 1);
    duelLog('Opponent activates ' + c.name + '!');
    // Resolve spell effect from opponent's perspective
    if (c.effects) c.effects.forEach(eff => {
        switch (eff.action) {
            case 'damage': takeDamage('player', eff.value || 0); break;
            case 'heal': duel.ai.lp = Math.min(8000, duel.ai.lp + (eff.value || 0)); break;
            case 'draw': duel.ai.handCount += (eff.value || 1); break;
            case 'atkBuff': case 'atkBuffSelf':
                for (let i = 0; i < 5; i++) {
                    if (duel.ai.monsters[i] && duel.ai.monsters[i].faceUp) {
                        duel.ai.monsters[i].atkMod += (eff.value || 0);
                        break;
                    }
                } break;
            case 'destroyMonster': {
                let best = -1, bestA = -1;
                for (let i = 0; i < 5; i++) {
                    const m = duel.player.monsters[i];
                    if (m && m.faceUp) { const a = m.card.atk + m.atkMod; if (a > bestA) { bestA = a; best = i; } }
                }
                if (best >= 0) destroyMonster('player', best);
            } break;
            case 'destroyAllMonsters':
                for (let i = 4; i >= 0; i--) {
                    if (duel.player.monsters[i]) destroyMonster('player', i);
                    if (duel.ai.monsters[i]) destroyMonster('ai', i);
                } break;
            case 'destroyST': {
                const sts = [];
                for (let i = 0; i < 5; i++) if (duel.player.spells[i]) sts.push(i);
                if (sts.length > 0) {
                    const ri = sts[Math.floor(Math.random() * sts.length)];
                    duel.player.graveyard.push(duel.player.spells[ri].card);
                    duel.player.spells[ri] = null;
                }
            } break;
        }
    });
    duel.ai.graveyard.push(c);
    renderDuel();
}

function mpRxSetST(d) {
    const dummy = { id: -2, name: '???', type: 'trap', effects: [], rarity: 'common' };
    duel.ai.spells[d.zi] = createFieldCard(dummy, 'atk', false);
    duel.ai.spells[d.zi].turnSet = duel.turn;
    duel.ai.handCount = Math.max(0, (duel.ai.handCount || 1) - 1);
    duelLog('Opponent sets a card.');
    renderDuel();
}

function mpRxFieldSpell(d) {
    const c = CARDS.find(x => x.id === d.cid);
    if (!c) return;
    if (duel.ai.fieldSpell) duel.ai.graveyard.push(duel.ai.fieldSpell.card || duel.ai.fieldSpell);
    duel.ai.fieldSpell = createFieldCard(c, 'atk', true);
    duel.ai.handCount = Math.max(0, (duel.ai.handCount || 1) - 1);
    duelLog('Opponent activates field spell: ' + c.name + '!');
    renderDuel();
}

// ---- Attack resolution (2-phase) ----

function mpRxAtkDeclare(d) {
    // Opponent attacks our monster. We resolve combat.
    const atkFC = duel.ai.monsters[d.from];
    const defFC = duel.player.monsters[d.to];
    if (!atkFC || !defFC) { mpSend({ type: 'atk-res', ok: false }); return; }

    // Flip face-down
    if (!defFC.faceUp) defFC.faceUp = true;

    const atkATK = getFieldATK(atkFC, 'ai');
    const defPos = defFC.position;
    const defVal = defPos === 'atk' ? getFieldATK(defFC, 'player') : getFieldDEF(defFC, 'player');

    let res = { type: 'atk-res', ok: true, from: d.from, to: d.to, defCid: defFC.card.id };

    if (defPos === 'atk') {
        if (atkATK > defVal) {
            res.dd = true; res.ad = false; res.pDmg = atkATK - defVal; res.aDmg = 0;
        } else if (defVal > atkATK) {
            res.dd = false; res.ad = true; res.pDmg = 0; res.aDmg = defVal - atkATK;
        } else {
            res.dd = true; res.ad = true; res.pDmg = 0; res.aDmg = 0;
        }
    } else {
        if (atkATK > defVal) {
            res.dd = true; res.ad = false; res.pDmg = 0; res.aDmg = 0;
        } else if (defVal > atkATK) {
            res.dd = false; res.ad = false; res.pDmg = 0; res.aDmg = defVal - atkATK;
        } else {
            res.dd = false; res.ad = false; res.pDmg = 0; res.aDmg = 0;
        }
    }

    duelLog("Opponent's " + atkFC.card.name + ' attacks ' + defFC.card.name + '!');

    // Send result BEFORE applying (in case game ends)
    mpSend(res);

    // Apply locally (defender perspective: player=us, ai=opponent)
    if (res.dd) destroyMonster('player', d.to);
    if (res.ad) destroyMonster('ai', d.from);
    if (res.pDmg > 0) takeDamage('player', res.pDmg);
    if (res.aDmg > 0) takeDamage('ai', res.aDmg);
    renderDuel();
}

function mpRxAtkResult(d) {
    if (!d.ok) { duel.uiState = 'idle'; renderDuel(); return; }

    // Reveal face-down card
    if (d.defCid > 0) {
        const defFC = duel.ai.monsters[d.to];
        if (defFC && !defFC.faceUp) {
            const rc = CARDS.find(c => c.id === d.defCid);
            if (rc) { defFC.card = rc; defFC.faceUp = true; }
        }
    }

    const atkFC = duel.player.monsters[d.from];
    const defFC = duel.ai.monsters[d.to];
    const atkName = atkFC ? atkFC.card.name : 'Monster';
    const defName = defFC ? defFC.card.name : 'Monster';

    // Apply from attacker perspective:
    // d.dd=defender destroyed → duel.ai[d.to], d.ad=attacker destroyed → duel.player[d.from]
    // d.pDmg=damage to defender → takeDamage('ai'), d.aDmg=damage to attacker → takeDamage('player')
    if (d.dd) destroyMonster('ai', d.to);
    if (d.ad) destroyMonster('player', d.from);
    if (d.pDmg > 0) takeDamage('ai', d.pDmg);
    if (d.aDmg > 0) takeDamage('player', d.aDmg);

    duelLog(atkName + ' attacks ' + defName + '!');
    if (atkFC) { atkFC.attacks = (atkFC.attacks || 0) + 1; if (atkFC.attacks >= atkFC.maxAttacks) atkFC.canAttack = false; }
    duel.uiState = 'idle';
    renderDuel();
}

// ---- Direct attack (2-phase) ----

function mpRxDirDeclare(d) {
    const atkFC = duel.ai.monsters[d.from];
    if (!atkFC) { mpSend({ type: 'dir-res', ok: false }); return; }

    const dmg = getFieldATK(atkFC, 'ai');
    duelLog("Opponent's " + atkFC.card.name + ' attacks directly! (-' + dmg + ' LP)');
    mpSend({ type: 'dir-res', ok: true, from: d.from, dmg: dmg });
    takeDamage('player', dmg);
    renderDuel();
}

function mpRxDirResult(d) {
    if (!d.ok) { duel.uiState = 'idle'; renderDuel(); return; }
    const atkFC = duel.player.monsters[d.from];
    const name = atkFC ? atkFC.card.name : 'Monster';
    duelLog(name + ' attacks directly! (-' + d.dmg + ' LP)');
    takeDamage('ai', d.dmg);
    if (atkFC) { atkFC.attacks = (atkFC.attacks || 0) + 1; if (atkFC.attacks >= atkFC.maxAttacks) atkFC.canAttack = false; }
    duel.uiState = 'idle';
    renderDuel();
}

// ---- End turn ----

function mpRxEndTurn() {
    duel.turn++;
    duel.currentPlayer = 'player';
    duel.phase = 'draw';
    duel.player.hasNormalSummoned = false;
    duel.isFirstTurn = false;

    duel.player.monsters.forEach(m => {
        if (m) {
            m.canAttack = false; m.canChangePos = true;
            m.attacks = 0; m.justSet = false; m.effectUsed = false;
            m.atkMod = 0; m.defMod = 0;
        }
    });

    drawCard('player');
    duel.phase = 'main1';
    duelLog('Your turn! (Turn ' + duel.turn + ')');
    renderDuel();
}

function mpRxChangePos(d) {
    const m = duel.ai.monsters[d.zi];
    if (m) { m.position = d.pos; duelLog('Opponent changes monster position.'); renderDuel(); }
}

function mpRxFlip(d) {
    const c = CARDS.find(x => x.id === d.cid);
    if (!c) return;
    const m = duel.ai.monsters[d.zi];
    if (m) { m.card = c; m.faceUp = true; m.position = 'atk'; duelLog('Opponent flip summons ' + c.name + '!'); renderDuel(); }
}

// ============================================================
// MONKEY-PATCH existing functions for MP broadcasting
// ============================================================

const _mpOrigEndTurn = endTurn;
endTurn = function() {
    if (duel && duel.isMultiplayer) {
        duel.player.monsters.forEach(m => { if (m) { m.atkMod = 0; m.defMod = 0; m.canChangePos = true; m.effectUsed = false; } });
        while (duel.player.hand.length > 6) {
            const d = duel.player.hand.pop();
            duel.player.graveyard.push(d);
            duelLog('Discarded ' + d.name + ' (hand limit).');
        }
        duel.currentPlayer = 'ai';
        duel.turn++;
        duel.isFirstTurn = false;
        duel.uiState = 'idle';
        duel.selectedCard = null;
        mpSend({ type: 'end' });
        duelLog('You end your turn.');
        renderDuel();
        return;
    }
    _mpOrigEndTurn();
};

const _mpOrigPerformAttack = performAttack;
performAttack = function(atkZone, defZone) {
    if (duel && duel.isMultiplayer && duel.currentPlayer === 'player') {
        mpSend({ type: 'atk-dec', from: atkZone, to: defZone });
        duel.uiState = 'mpWaiting';
        duelLog('Attacking...');
        renderDuel();
        return;
    }
    _mpOrigPerformAttack(atkZone, defZone);
};

const _mpOrigDirectAttack = performDirectAttack;
performDirectAttack = function(atkZone) {
    if (duel && duel.isMultiplayer && duel.currentPlayer === 'player') {
        mpSend({ type: 'dir-dec', from: atkZone });
        duel.uiState = 'mpWaiting';
        duelLog('Attacking directly...');
        renderDuel();
        return;
    }
    _mpOrigDirectAttack(atkZone);
};

const _mpOrigDrawCard = drawCard;
drawCard = function(who) {
    const result = _mpOrigDrawCard(who);
    if (duel && duel.isMultiplayer && who === 'player' && !duel._mpInit) {
        mpSend({ type: 'draw' });
    }
    return result;
};

const _mpOrigNormalSummon = normalSummon;
normalSummon = function(handIdx) {
    if (duel && duel.isMultiplayer) {
        const card = duel.player.hand[handIdx];
        const zi = getEmptyMonsterZone('player');
        _mpOrigNormalSummon(handIdx);
        mpSend({ type: 'summon', cid: card.id, zi: zi });
        return;
    }
    _mpOrigNormalSummon(handIdx);
};

const _mpOrigSetMonster = setMonster;
setMonster = function(handIdx) {
    if (duel && duel.isMultiplayer) {
        const zi = getEmptyMonsterZone('player');
        _mpOrigSetMonster(handIdx);
        mpSend({ type: 'set-mon', zi: zi });
        return;
    }
    _mpOrigSetMonster(handIdx);
};

const _mpOrigSetSpellTrap = setSpellTrap;
setSpellTrap = function(handIdx) {
    if (duel && duel.isMultiplayer) {
        const zi = getEmptySpellZone('player');
        _mpOrigSetSpellTrap(handIdx);
        mpSend({ type: 'set-st', zi: zi });
        return;
    }
    _mpOrigSetSpellTrap(handIdx);
};

const _mpOrigActivateSpell = activateSpell;
activateSpell = function(handIdx) {
    if (duel && duel.isMultiplayer) {
        const card = duel.player.hand[handIdx];
        _mpOrigActivateSpell(handIdx);
        mpSend({ type: 'spell', cid: card.id });
        return;
    }
    _mpOrigActivateSpell(handIdx);
};

const _mpOrigActivateFieldSpell = activateFieldSpell;
activateFieldSpell = function(handIdx) {
    if (duel && duel.isMultiplayer) {
        const card = duel.player.hand[handIdx];
        _mpOrigActivateFieldSpell(handIdx);
        mpSend({ type: 'fld-spl', cid: card.id });
        return;
    }
    _mpOrigActivateFieldSpell(handIdx);
};

const _mpOrigChangePosition = changePosition;
changePosition = function(who, zoneIdx) {
    _mpOrigChangePosition(who, zoneIdx);
    if (duel && duel.isMultiplayer && who === 'player') {
        const m = duel.player.monsters[zoneIdx];
        if (m) mpSend({ type: 'pos', zi: zoneIdx, pos: m.position });
    }
};

const _mpOrigFlipSummon = flipSummon;
flipSummon = function(who, zoneIdx) {
    if (duel && duel.isMultiplayer && who === 'player') {
        const card = duel.player.monsters[zoneIdx]?.card;
        _mpOrigFlipSummon(who, zoneIdx);
        if (card) mpSend({ type: 'flip', zi: zoneIdx, cid: card.id });
        return;
    }
    _mpOrigFlipSummon(who, zoneIdx);
};

const _mpOrigConfirmTributes = confirmTributes;
confirmTributes = function() {
    if (duel && duel.isMultiplayer && duel.pendingAction?.type === 'tributeSummon') {
        const tribZones = [...duel.tributeTargets];
        const handIdx = duel.pendingAction.handIdx;
        const card = duel.player.hand[handIdx];
        _mpOrigConfirmTributes();
        const actualZi = duel.player.monsters.findIndex(m => m && m.card.id === card.id);
        mpSend({ type: 'tribute', cid: card.id, zi: actualZi >= 0 ? actualZi : 0, tributes: tribZones });
        return;
    }
    _mpOrigConfirmTributes();
};

const _mpOrigAdvanceToPhase = advanceToPhase;
advanceToPhase = function(target) {
    if (duel && duel.isMultiplayer && duel.currentPlayer !== 'player') return;
    _mpOrigAdvanceToPhase(target);
};

const _mpOrigHandCardClick = handleHandCardClick;
handleHandCardClick = function(handIdx) {
    if (duel && duel.isMultiplayer && duel.currentPlayer !== 'player') return;
    if (duel && duel.isMultiplayer && duel.uiState === 'mpWaiting') return;
    _mpOrigHandCardClick(handIdx);
};

const _mpOrigFieldMonsterClick = handleFieldMonsterClick;
handleFieldMonsterClick = function(who, zoneIdx) {
    if (duel && duel.isMultiplayer && duel.currentPlayer !== 'player' && duel.uiState !== 'selectAttackTarget') return;
    if (duel && duel.isMultiplayer && duel.uiState === 'mpWaiting') return;
    _mpOrigFieldMonsterClick(who, zoneIdx);
};

// Hide surrender button after non-MP duels
const _mpOrigShowScreen = showScreen;
showScreen = function(id) {
    _mpOrigShowScreen(id);
    const sb = document.getElementById('mp-surrender');
    if (sb && id !== 'duel-screen') sb.style.display = 'none';
    if (id === 'title-screen' && mp.active) {
        mp.active = false;
        if (duel) duel.isMultiplayer = false;
    }
};

`;

src = src.substring(0, lastScriptEnd) + MP_JS + src.substring(lastScriptEnd);
console.log('[5/5] Added MP JavaScript');

// ===================================================================
// Write
// ===================================================================
fs.writeFileSync(FILE, src, 'utf8');
const newSize = Buffer.byteLength(src, 'utf8');
console.log(`\nWrote ${FILE}`);
console.log(`New size: ${newSize} bytes (${(newSize/1024).toFixed(1)} KB)`);
console.log(`Delta: +${newSize - origSize} bytes`);
console.log('\nDone. Multiplayer system added.');
