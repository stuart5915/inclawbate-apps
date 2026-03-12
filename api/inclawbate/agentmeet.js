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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') return getLogs(req, res);
  if (req.method === 'POST') return saveMeeting(req, res);
  return res.status(405).json({ error: 'Method not allowed' });
}

async function getLogs(req, res) {
  try {
    const q = req.query.q || 'logs';
    const search = req.query.search || '';
    const limit = Math.min(parseInt(req.query.limit) || 30, 100);
    const offset = parseInt(req.query.offset) || 0;

    switch (q) {
      case 'logs': {
        let query = `agentmeet_logs?select=id,title,summary_short,agent_count,speech_count,action_item_count,duration,ended_at&order=ended_at.desc&limit=${limit}&offset=${offset}`;
        if (search) query += `&or=(title.ilike.*${search}*,summary_short.ilike.*${search}*)`;
        const resp = await supaFetch(query);
        const rows = await resp.json();
        return res.status(200).json({ ok: true, count: (rows || []).length, logs: rows || [] });
      }
      case 'meeting': {
        const id = req.query.id;
        if (!id) return res.status(400).json({ ok: false, error: 'id param required' });
        const resp = await supaFetch(`agentmeet_logs?select=*&id=eq.${id}&limit=1`);
        const rows = await resp.json();
        if (!rows || !rows.length) return res.status(404).json({ ok: false, error: 'Meeting not found' });
        return res.status(200).json({ ok: true, meeting: rows[0] });
      }
      case 'search': {
        if (!search) return res.status(400).json({ ok: false, error: 'search param required' });
        // Search across title, summary, and transcript text
        const query = `agentmeet_logs?select=id,title,summary_short,agent_count,duration,ended_at&or=(title.ilike.*${search}*,summary_short.ilike.*${search}*,summary_full.ilike.*${search}*)&order=ended_at.desc&limit=${limit}&offset=${offset}`;
        const resp = await supaFetch(query);
        const rows = await resp.json();
        return res.status(200).json({ ok: true, query: search, count: (rows || []).length, results: rows || [] });
      }
      default:
        return res.status(400).json({ ok: false, error: 'Unknown query: ' + q });
    }
  } catch (err) {
    console.error('AgentMeet GET error:', err);
    return res.status(500).json({ ok: false, error: 'Internal error' });
  }
}

async function saveMeeting(req, res) {
  try {
    const { meeting } = req.body || {};
    if (!meeting || !meeting.id) return res.status(400).json({ ok: false, error: 'meeting object with id required' });

    const speeches = (meeting.transcript || []).filter(e => e.type === 'speech');
    const summaryShort = (meeting.summary || '').split('\n').slice(0, 5).join('\n');

    const row = {
      id: meeting.id,
      title: meeting.title || 'Untitled Meeting',
      status: meeting.status || 'ended',
      started_at: meeting.startedAt || null,
      ended_at: meeting.endedAt || new Date().toISOString(),
      duration: meeting.duration || 0,
      agent_count: (meeting.agents || []).length,
      agents: (meeting.agents || []).map(a => ({ id: a.id, name: a.name, persona: a.persona, avatar: a.avatar })),
      speech_count: speeches.length,
      action_item_count: (meeting.actionItems || []).length,
      action_items: meeting.actionItems || [],
      transcript: meeting.transcript || [],
      summary_short: summaryShort,
      summary_full: meeting.summary || '',
    };

    await supaFetch('agentmeet_logs', {
      method: 'POST',
      prefer: 'resolution=merge-duplicates',
      body: JSON.stringify(row),
    });

    return res.status(200).json({ ok: true, saved: meeting.id });
  } catch (err) {
    console.error('AgentMeet POST error:', err);
    return res.status(500).json({ ok: false, error: 'Save failed' });
  }
}
