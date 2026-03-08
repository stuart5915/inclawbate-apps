#!/usr/bin/env node

/**
 * Publish an Inclawbate app to inclawbate.com
 *
 * Usage:
 *   node publish.js --slug my-app --name "My App"
 *   node publish.js --slug my-app --name "My App" --category games --description "A fun game" --tags game,arcade
 *   node publish.js --slug my-app --name "My App" --update
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// ── Defaults ──
const CREATOR_WALLET = '0x18b18E245122f4bDA5F2ee4F25c702E05C241D49';
const CREATOR_X_HANDLE = 'itsEvilDuck';
const PUBLISHER_EMAIL = 'w_18b18e245122@inclawbate.com';
const API_URL = 'https://www.inclawbate.com/api/publish-site';

// ── Parse CLI args ──
function parseArgs() {
    const args = process.argv.slice(2);
    const parsed = {};
    for (let i = 0; i < args.length; i++) {
        if (args[i].startsWith('--')) {
            const key = args[i].slice(2);
            if (key === 'update' || key === 'listed') {
                parsed[key] = true;
            } else if (i + 1 < args.length && !args[i + 1].startsWith('--')) {
                parsed[key] = args[++i];
            }
        }
    }
    return parsed;
}

function printUsage() {
    console.log(`
  Inclawbate App Publisher
  ========================

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

    if (!args.slug || !args.name) {
        printUsage();
        process.exit(1);
    }

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
        email: PUBLISHER_EMAIL,
        description: args.description || '',
        category: args.category || 'other',
        creator_wallet: CREATOR_WALLET,
        creator_x_handle: CREATOR_X_HANDLE,
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
