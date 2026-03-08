# Inclawbate Apps

Build and publish apps to [inclawbate.com](https://inclawbate.com) using Claude Code.

## Setup

1. **Install Node.js** — https://nodejs.org (LTS version)
2. **Install Git** — https://git-scm.com
3. **Install Claude Code:**
   ```bash
   npm install -g @anthropic-ai/claude-code
   ```
4. **Clone this repo:**
   ```bash
   git clone https://github.com/stuart5915/inclawbate-apps
   cd inclawbate-apps
   ```
5. **Start building:**
   ```bash
   claude
   ```

## Building Apps

Talk to Claude and tell it what to build:

> "Build me an arcade game with 5 mini-games"

> "Create a CLAWS token dashboard that shows my balance and transaction history"

> "Make a multiplayer drawing game"

Claude will create the app as a single HTML file in the `apps/` directory.

## Publishing

Once your app is ready:

```bash
# Publish a new app
node publish.js --slug my-app --name "My App" --category games --description "Description here"

# Update an existing app
node publish.js --slug my-app --name "My App" --update

# Show in app store listing
node publish.js --slug my-app --name "My App" --listed
```

Your app will be live at: `https://inclawbate.com/s/my-app`

### Categories

`tools` · `games` · `creative` · `finance` · `social` · `other`

## Project Structure

```
inclawbate-apps/
├── CLAUDE.md          ← Instructions for Claude Code (SDK docs, rules)
├── publish.js         ← Publish script
├── apps/              ← Your app HTML files go here
│   └── hello-world.html
├── templates/
│   └── starter.html   ← Starter template to copy from
└── README.md
```

## SDKs (auto-injected on inclawbate.com)

| SDK | Global | What it does |
|-----|--------|-------------|
| **AppDB** | `window.AppDB` | Key-value storage (user-scoped + global) |
| **CLAWS** | `window.CLAWS` | Wallet payments, tips, token balance |
| **Realtime** | `window.Realtime` | Multiplayer rooms, presence, messaging |

Full SDK docs are in `CLAUDE.md` — Claude reads these automatically.

## Testing Locally

Open any HTML file in your browser to test layout and logic. SDKs won't work locally (they're injected when served from inclawbate.com), but everything else will.
