#!/usr/bin/env node

/**
 * Publish an Inclawbate app to inclawbate.com
 *
 * First-time setup:  node publish.js --setup
 *
 * Usage:
 *   node publish.js --slug my-app --name "My App"
 *   node publish.js --slug my-app --name "My App" --category games --description "A fun game" --tags game,arcade
 *   node publish.js --slug my-app --name "My App" --update
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const readline = require('readline');

const CONFIG_FILE = path.join(__dirname, '.publisher.json');
const API_URL = 'https://www.inclawbate.com/api/publish-site';

// ── Parse CLI args ──
function parseArgs() {
    const args = process.argv.slice(2);
    const parsed = {};
    for (let i = 0; i < args.length; i++) {
        if (args[i].startsWith('--')) {
            const key = args[i].slice(2);
            if (key === 'update' || key === 'listed' || key === 'setup') {
                parsed[key] = true;
            } else if (i + 1 < args.length && !args[i + 1].startsWith('--')) {
                parsed[key] = args[++i];
            }
        }
    }
    return parsed;
}

function ask(rl, question) {
    return new Promise(resolve => rl.question(question, resolve));
}

async function setup() {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    console.log('\n  Inclawbate Publisher Setup');
    console.log('  =========================\n');

    const wallet = await ask(rl, '  Your wallet address (0x...): ');
    const x_handle = await ask(rl, '  Your X/Twitter handle (without @): ');
    const email = await ask(rl, '  Your publisher email (or press Enter for auto): ');

    const config = {
        creator_wallet: wallet.trim(),
        creator_x_handle: x_handle.trim().replace('@', ''),
        publisher_email: email.trim() || `w_${wallet.trim().slice(2, 16).toLowerCase()}@inclawbate.com`,
    };

    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
    console.log(`\n  Saved to .publisher.json`);
    console.log(`  Wallet:  ${config.creator_wallet}`);
    console.log(`  Handle:  ${config.creator_x_handle}`);
    console.log(`  Email:   ${config.publisher_email}\n`);
    rl.close();
}

function loadConfig() {
    if (!fs.existsSync(CONFIG_FILE)) {
        console.error('\n  No .publisher.json found. Run: node publish.js --setup\n');
        process.exit(1);
    }
    return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
}

function printUsage() {
    console.log(`
  Inclawbate App Publisher
  ========================

  First-time setup:
    node publish.js --setup

  Usage:
    node publish.js --slug <slug> --name "App Name" [options]

  Required:
    --slug <slug>          URL slug (lowercase, hyphens ok). App goes to inclawbate.com/s/<slug>
    --name <name>          Display name of the app

  Optional:
    --file <path>          Path to HTML file (default: apps/<slug>.html)
    --description <desc>   App description
    --category <cat>       Category: tools, games, creative, finance, social, other (default: other)
    --tags <t1,t2,...>     Comma-separated tags (max 10)
    --update               Update an existing app instead of creating new
    --listed               Show in app store listing

  Examples:
    node publish.js --slug clawcade --name "ClawCade" --category games --description "Arcade mini-games"
    node publish.js --slug clawcade --name "ClawCade" --update
`);
}

function post(url, body) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(body);
        const parsed = new URL(url);
        const req = https.request({
            hostname: parsed.hostname,
            path: parsed.pathname,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data),
            },
        }, (res) => {
            let chunks = '';
            res.on('data', c => chunks += c);
            res.on('end', () => {
                try {
                    resolve({ status: res.statusCode, body: JSON.parse(chunks) });
                } catch {
                    resolve({ status: res.statusCode, body: chunks });
                }
            });
        });
        req.on('error', reject);
        req.write(data);
        req.end();
    });
}

async function main() {
    const args = parseArgs();

    if (args.setup) {
        await setup();
        return;
    }

    if (!args.slug || !args.name) {
        printUsage();
        process.exit(1);
    }

    const config = loadConfig();
    const slug = args.slug.toLowerCase().trim();
    const filePath = args.file || path.join('apps', `${slug}.html`);

    if (!fs.existsSync(filePath)) {
        console.error(`\n  Error: File not found: ${filePath}`);
        console.error(`  Make sure your app HTML is saved at: apps/${slug}.html\n`);
        process.exit(1);
    }

    const code = fs.readFileSync(filePath, 'utf-8');

    if (code.length > 512 * 1024) {
        console.error(`\n  Error: File too large (${(code.length / 1024).toFixed(0)}KB). Max is 500KB.\n`);
        process.exit(1);
    }

    if (!code.includes('<!DOCTYPE') && !code.includes('<!doctype')) {
        console.error('\n  Error: File must start with <!DOCTYPE html>\n');
        process.exit(1);
    }

    const tags = args.tags ? args.tags.split(',').map(t => t.trim()).filter(Boolean) : [];

    const payload = {
        slug,
        name: args.name,
        code,
        email: config.publisher_email,
        description: args.description || '',
        category: args.category || 'other',
        creator_wallet: config.creator_wallet,
        creator_x_handle: config.creator_x_handle,
        tags,
        is_listed: !!args.listed,
        source: 'claude-code',
    };

    if (args.update) {
        payload.update = true;
    }

    console.log(`\n  ${args.update ? 'Updating' : 'Publishing'} "${args.name}" (${slug})...`);

    try {
        const res = await post(API_URL, payload);

        if (res.status === 200 && res.body.success) {
            console.log(`  Done! Your app is live at:\n`);
            console.log(`    ${res.body.url}\n`);
        } else {
            console.error(`\n  Publish failed (${res.status}):`);
            console.error(`  ${res.body.error || JSON.stringify(res.body)}\n`);
            process.exit(1);
        }
    } catch (err) {
        console.error(`\n  Network error: ${err.message}\n`);
        process.exit(1);
    }
}

main();
