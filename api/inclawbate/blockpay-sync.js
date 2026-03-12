const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function supaFetch(path, options = {}) {
  return fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: options.prefer || '',
      ...options.headers,
    },
  });
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { wallet, profile, invoices, tokens } = req.body || {};
    if (!wallet || typeof wallet !== 'string' || !wallet.startsWith('0x')) {
      return res.status(400).json({ ok: false, error: 'Valid wallet required' });
    }

    const results = { profile: false, invoices: 0, tokens: 0 };

    // Sync profile
    if (profile) {
      await supaFetch('blockpay_profiles', {
        method: 'POST',
        prefer: 'resolution=merge-duplicates',
        body: JSON.stringify({
          wallet,
          name: profile.name || '',
          email: profile.email || '',
          currency: profile.currency || 'USD',
          accepted_tokens: (tokens || []).filter(t => t.enabled).map(t => t.symbol),
          updated_at: new Date().toISOString(),
        }),
      });
      results.profile = true;
    }

    // Sync invoices
    if (invoices && Array.isArray(invoices)) {
      const rows = invoices.map(inv => ({
        invoice_id: inv.id,
        wallet,
        client: inv.client || '',
        client_email: inv.email || '',
        from_name: inv.fromName || '',
        from_email: inv.fromEmail || '',
        total: inv.total || 0,
        status: inv.status || 'draft',
        due_date: inv.dueDate || null,
        pay_type: inv.payType || 'crypto',
        token: inv.token || 'USDC',
        items: inv.items || [],
        notes: inv.notes || '',
        paid_at: inv.paidAt || null,
        tx_hash: inv.txHash || null,
        created_at: inv.createdAt || new Date().toISOString(),
        updated_at: inv.updatedAt || new Date().toISOString(),
      }));

      if (rows.length) {
        await supaFetch('blockpay_invoices', {
          method: 'POST',
          prefer: 'resolution=merge-duplicates',
          body: JSON.stringify(rows),
        });
        results.invoices = rows.length;
      }
    }

    // Sync tokens
    if (tokens && Array.isArray(tokens)) {
      const tokenRows = tokens.map(t => ({
        wallet,
        symbol: t.symbol,
        enabled: t.enabled,
      }));

      if (tokenRows.length) {
        await supaFetch('blockpay_tokens', {
          method: 'POST',
          prefer: 'resolution=merge-duplicates',
          body: JSON.stringify(tokenRows),
        });
        results.tokens = tokenRows.length;
      }
    }

    return res.status(200).json({ ok: true, synced: results });
  } catch (err) {
    console.error('BlockPay sync error:', err);
    return res.status(500).json({ ok: false, error: 'Sync failed' });
  }
}
