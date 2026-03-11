import { kv } from '@vercel/kv';

const KV_KEY = 'clawsnet:telegram_messages';
const TELEGRAM_API = 'https://api.telegram.org/bot';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') return getMessages(req, res);
  if (req.method === 'POST') return sendMessage(req, res);
  return res.status(405).json({ error: 'Method not allowed' });
}

async function getMessages(req, res) {
  try {
    const since = parseInt(req.query.since) || 0;
    const limit = Math.min(parseInt(req.query.limit) || 50, 200);

    const messages = (await kv.get(KV_KEY)) || [];

    const filtered = since
      ? messages.filter(m => m.timestamp > since)
      : messages.slice(-limit);

    return res.status(200).json({ ok: true, messages: filtered });
  } catch (err) {
    console.error('Get messages error:', err);
    return res.status(500).json({ ok: false, error: 'Failed to fetch messages' });
  }
}

async function sendMessage(req, res) {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) {
      return res.status(500).json({ ok: false, error: 'Bot not configured' });
    }

    const { text, senderName, replyToId } = req.body || {};
    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ ok: false, error: 'Text is required' });
    }
    if (text.length > 1000) {
      return res.status(400).json({ ok: false, error: 'Text too long (max 1000)' });
    }

    const displayName = (senderName || 'Anonymous').replace(/[<>&]/g, '');
    const formatted = `<b>${displayName}</b> (via ClawsNet):\n${text.trim().replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]))}`;

    const body = {
      chat_id: chatId,
      text: formatted,
      parse_mode: 'HTML',
    };
    if (replyToId) body.reply_to_message_id = replyToId;

    const resp = await fetch(`${TELEGRAM_API}${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await resp.json();
    if (!data.ok) {
      console.error('Telegram send error:', data);
      return res.status(502).json({ ok: false, error: 'Telegram rejected the message' });
    }

    return res.status(200).json({ ok: true, messageId: data.result?.message_id });
  } catch (err) {
    console.error('Send message error:', err);
    return res.status(500).json({ ok: false, error: 'Failed to send message' });
  }
}
