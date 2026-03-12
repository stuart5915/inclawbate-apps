const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function supaFetch(path) {
  return fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
    },
  });
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'public, max-age=30');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ ok: false, error: 'Read-only API. Use GET.' });

  const wallet = req.query.wallet;
  const route = req.query.q || 'invoices';

  if (!wallet) {
    return res.status(400).json({
      ok: false,
      error: 'wallet param required',
      usage: {
        base: '/api/inclawbate/blockpay?wallet=0x...',
        endpoints: {
          'q=invoices': 'List all invoices (default). Filters: status, token, limit',
          'q=invoice&id=INV-XXX': 'Get a single invoice by ID',
          'q=stats': 'Dashboard stats: earned, outstanding, counts',
          'q=tokens': 'List accepted tokens and enabled status',
          'q=profile': 'Public profile: name, wallet, accepted tokens',
          'q=schema': 'Full API schema for agent discovery',
        }
      }
    });
  }

  try {
    switch (route) {
      case 'invoices': return await getInvoices(req, res, wallet);
      case 'drafts': return await getInvoices(req, res, wallet, 'draft');
      case 'published': return await getInvoices(req, res, wallet, 'published');
      case 'invoice': return await getInvoice(req, res, wallet);
      case 'stats': return await getStats(req, res, wallet);
      case 'tokens': return await getTokens(req, res, wallet);
      case 'profile': return await getProfile(req, res, wallet);
      case 'schema': return getSchema(req, res);
      default: return res.status(400).json({ ok: false, error: 'Unknown query: ' + route });
    }
  } catch (err) {
    console.error('BlockPay API error:', err);
    return res.status(500).json({ ok: false, error: 'Internal error' });
  }
}

async function getInvoices(req, res, wallet, scope) {
  const status = req.query.status;
  const token = req.query.token;
  const limit = Math.min(parseInt(req.query.limit) || 50, 200);

  let query = `blockpay_invoices?select=invoice_id,client,client_email,total,status,due_date,pay_type,token,notes,created_at,updated_at&wallet=eq.${wallet}&order=created_at.desc&limit=${limit}`;
  if (scope === 'draft') query += `&status=eq.draft`;
  else if (scope === 'published') query += `&status=neq.draft`;
  else if (status) query += `&status=eq.${status}`;
  if (token) query += `&token=eq.${token}`;

  const resp = await supaFetch(query);
  const rows = await resp.json();

  return res.status(200).json({
    ok: true,
    wallet,
    scope: scope || 'all',
    count: rows.length,
    invoices: (rows || []).map(formatInvoiceRow)
  });
}

async function getInvoice(req, res, wallet) {
  const id = req.query.id;
  if (!id) return res.status(400).json({ ok: false, error: 'id param required' });

  const resp = await supaFetch(`blockpay_invoices?select=*&wallet=eq.${wallet}&invoice_id=eq.${id}&limit=1`);
  const rows = await resp.json();

  if (!rows || !rows.length) return res.status(404).json({ ok: false, error: 'Invoice not found' });

  const r = rows[0];
  return res.status(200).json({
    ok: true,
    invoice: {
      ...formatInvoiceRow(r),
      fromName: r.from_name,
      fromEmail: r.from_email,
      fromWallet: r.wallet,
      clientEmail: r.client_email,
      items: r.items || [],
      notes: r.notes,
      paidAt: r.paid_at,
      txHash: r.tx_hash,
    }
  });
}

async function getStats(req, res, wallet) {
  const resp = await supaFetch(`blockpay_invoices?select=total,status&wallet=eq.${wallet}`);
  const rows = await resp.json() || [];

  const paid = rows.filter(r => r.status === 'paid');
  const pending = rows.filter(r => r.status === 'pending' || r.status === 'overdue');

  return res.status(200).json({
    ok: true,
    wallet,
    totalEarned: paid.reduce((s, r) => s + (r.total || 0), 0),
    outstanding: pending.reduce((s, r) => s + (r.total || 0), 0),
    paidCount: paid.length,
    pendingCount: pending.length,
    overdueCount: rows.filter(r => r.status === 'overdue').length,
    draftCount: rows.filter(r => r.status === 'draft').length,
    totalInvoices: rows.length,
  });
}

async function getTokens(req, res, wallet) {
  const resp = await supaFetch(`blockpay_tokens?select=symbol,enabled&wallet=eq.${wallet}`);
  const rows = await resp.json() || [];

  return res.status(200).json({
    ok: true,
    wallet,
    tokens: rows.map(r => ({ symbol: r.symbol, enabled: r.enabled }))
  });
}

async function getProfile(req, res, wallet) {
  const resp = await supaFetch(`blockpay_profiles?select=*&wallet=eq.${wallet}&limit=1`);
  const rows = await resp.json() || [];

  if (!rows.length) return res.status(404).json({ ok: false, error: 'Profile not found' });

  const p = rows[0];
  return res.status(200).json({
    ok: true,
    profile: {
      name: p.name,
      wallet: p.wallet,
      currency: p.currency,
      acceptedTokens: p.accepted_tokens || [],
    }
  });
}

function getSchema(req, res) {
  return res.status(200).json({
    ok: true,
    api: 'BlockPay Read-Only API',
    version: '1.0',
    base: 'https://www.inclawbate.com/api/inclawbate/blockpay',
    auth: 'None — public read-only. Scoped by wallet address.',
    endpoints: [
      { q: 'invoices', params: ['wallet*', 'status', 'token', 'limit'], description: 'List all invoices' },
      { q: 'drafts', params: ['wallet*', 'limit'], description: 'List only draft (agent-created) invoices' },
      { q: 'published', params: ['wallet*', 'limit'], description: 'List only human-confirmed invoices (pending/paid/overdue)' },
      { q: 'invoice', params: ['wallet*', 'id*'], description: 'Get single invoice with full details + line items' },
      { q: 'stats', params: ['wallet*'], description: 'Dashboard stats' },
      { q: 'tokens', params: ['wallet*'], description: 'Accepted token list' },
      { q: 'profile', params: ['wallet*'], description: 'Public profile' },
      { q: 'schema', params: [], description: 'This schema' },
    ],
    statuses: ['draft', 'pending', 'paid', 'overdue'],
    permissions: {
      agentSafe: ['draftInvoice', 'suggestTerms', 'proposeTokens', 'generateSummary', 'listInvoices', 'getInvoice', 'getStats', 'getSettings', 'listTokens', 'exportData'],
      humanOnly: ['sendInvoice', 'markPaid', 'deleteInvoice', 'connectWallet', 'updateWallet', 'refund'],
      note: 'Agents can only create drafts. Humans must confirm, send, pay, delete, and manage wallets.'
    },
    custodyPolicy: {
      version: '1.0',
      rules: [
        'Agents MUST NOT hold private keys or seed phrases.',
        'Agents MUST NOT sign transactions or call wallet providers.',
        'Agents MUST NOT trigger any on-chain write (pay, transfer, refund).',
        'All send, pay, refund, and delete actions are human-only.',
        'Agents can only observe and draft — humans confirm before funds move.',
        'Wallet addresses are never exposed in agent-facing API responses.',
      ],
      enforcement: 'Human-only methods return {ok:false, scope:"human-only"}. This API is read-only by design.'
    },
    note: 'All monetary values are numbers (not formatted strings). Timestamps are ISO 8601. Draft invoices are agent-created and await human review.',
  });
}

function formatInvoiceRow(r) {
  return {
    id: r.invoice_id,
    client: r.client,
    total: r.total,
    status: r.status,
    dueDate: r.due_date,
    payType: r.pay_type,
    token: r.token,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}
