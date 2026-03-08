# Inclawbate App Builder — Claude Code Instructions

You are helping build apps for Inclawbate (inclawbate.com), a community app platform on Base.

## Rules

1. **Every app is a single HTML file** — all CSS and JS must be inline (no external files except CDN libraries)
2. **Dark theme always**: `background: #06060b`, `color: #e2e8f0`, font: `Nunito` (from Google Fonts)
3. **Mobile-first** — apps must work on mobile screens
4. **Max 500KB** per app file
5. **No backend** — apps run entirely client-side. Use the SDKs below for storage/multiplayer/payments
6. **Save apps in the `apps/` directory** as `[slug].html`

## App Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>App Name</title>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Nunito', sans-serif;
            background: #06060b;
            color: #e2e8f0;
            min-height: 100vh;
        }
        /* Your styles here */
    </style>
</head>
<body>
    <!-- Your app here -->

    <script>
        // Your code here
    </script>
</body>
</html>
```

## Available SDKs

Three SDKs are **automatically injected** when your app runs on inclawbate.com. You do NOT need to include script tags for them — they appear as `window.AppDB`, `window.CLAWS`, and `window.Realtime` at runtime.

### AppDB — Persistent Storage

Key-value storage. User-scoped (private per user) and global (shared across users).

```javascript
// Wait for SDK to be available
async function waitForAppDB() {
    if (window.AppDB) return;
    return new Promise(resolve => {
        const t = setInterval(() => {
            if (window.AppDB) { clearInterval(t); resolve(); }
        }, 50);
        setTimeout(() => { clearInterval(t); resolve(); }, 5000);
    });
}

// User-scoped (private to each user)
await window.AppDB.set('highscore', 9001);
const score = await window.AppDB.get('highscore');       // 9001
await window.AppDB.delete('highscore');
const allKeys = await window.AppDB.list();                // [{ key, value }, ...]

// Global (shared across ALL users — great for leaderboards)
await window.AppDB.setGlobal('leaderboard', [...]);
const board = await window.AppDB.getGlobal('leaderboard');
await window.AppDB.deleteGlobal('leaderboard');
const allGlobal = await window.AppDB.listGlobal();
```

**Limits:** 100KB per value, 1000 keys per scope.

### CLAWS — Wallet & Payments

Interact with the CLAWS token (Base chain). Requires user to have MetaMask or similar wallet.

```javascript
// Check user's CLAWS balance
const balance = await window.CLAWS.balance();  // number

// Send CLAWS to someone
const txHash = await window.CLAWS.pay(100, '0xRecipientAddress...');

// Tip the app creator
const txHash = await window.CLAWS.tipCreator(50);

// Paywall — user must pay before callback runs
await window.CLAWS.gate(10, (error, txHash) => {
    if (error) return alert('Payment failed');
    // Unlock premium content
});

// Properties
window.CLAWS.address;        // CLAWS token contract address
window.CLAWS.creatorWallet;  // Your wallet (set automatically)
```

### Realtime — Multiplayer

WebSocket-powered rooms for multiplayer apps.

```javascript
// Connect to a room
await window.Realtime.connect('lobby');  // default room is 'lobby'

// Send messages
window.Realtime.send('player-move', { x: 100, y: 200 });

// Receive messages
window.Realtime.on('player-move', (data, senderId) => {
    console.log(`${senderId} moved to`, data.x, data.y);
});

// Player presence
window.Realtime.onJoin(player => console.log('joined:', player.id));
window.Realtime.onLeave(player => console.log('left:', player.id));
window.Realtime.getPlayers();  // [{ id, ...state }]

// Share your state with others
window.Realtime.setMyState({ name: 'Red', score: 42 });

// Your player ID
window.Realtime.me.id;  // 'p_abc123'
```

**Limits:** 20 messages/sec, 8KB max payload per message.

### Reading Wallet from Cookie

If the user is logged into Inclawbate, you can read their wallet:

```javascript
function getWallet() {
    try {
        const match = document.cookie.match(/inclawbate_token=([^;]+)/);
        if (!match) return null;
        const payload = JSON.parse(atob(decodeURIComponent(match[1]).split('.')[1].replace(/-/g,'+').replace(/_/g,'/')));
        return payload.wallet_address || null;
    } catch { return null; }
}
```

### Direct On-Chain Reads (Advanced)

You can query any Base contract directly via RPC:

```javascript
async function getTokenBalance(tokenContract, wallet) {
    const data = '0x70a08231' + wallet.slice(2).toLowerCase().padStart(64, '0');
    const res = await fetch('https://mainnet.base.org', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            jsonrpc: '2.0', id: 1,
            method: 'eth_call',
            params: [{ to: tokenContract, data }, 'latest']
        })
    });
    const json = await res.json();
    return Number(BigInt(json.result || '0x0') / BigInt(1e18));
}
```

## Common CDN Libraries

You can include these via `<script>` or `<link>` tags:

- **Chart.js**: `https://cdn.jsdelivr.net/npm/chart.js`
- **Three.js**: `https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js`
- **Canvas Confetti**: `https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js`
- **Tone.js** (audio): `https://cdn.jsdelivr.net/npm/tone@latest/build/Tone.js`
- **Animate.css**: `https://cdn.jsdelivr.net/npm/animate.css@4/animate.min.css`

## Publishing

When your app is ready:

```bash
node publish.js --slug my-app --name "My App" --category games --description "A fun game"
```

To update an existing app:

```bash
node publish.js --slug my-app --name "My App" --update
```

Your app will be live at: `https://inclawbate.com/s/my-app`

### Categories
`tools` | `games` | `creative` | `finance` | `social` | `other`

## Testing Locally

Open your HTML file directly in a browser to test. The SDKs won't be available locally (they're injected at runtime on inclawbate.com), so wrap SDK calls:

```javascript
if (window.AppDB) {
    await window.AppDB.set('key', value);
} else {
    console.log('[dev] AppDB not available locally');
}
```

## Key Constants

- **CLAWS Token**: `0x7ca47B141639B893C6782823C0b219f872056379`
- **Base Chain ID**: `0x2105` (8453)
- **Base RPC**: `https://mainnet.base.org`
