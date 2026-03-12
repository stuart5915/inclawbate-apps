const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const TABLE = 'telegram_messages';

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
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const update = req.body;
    const msg = update.message || update.edited_message;
    if (!msg || !msg.text) return res.status(200).json({ ok: true });

    const chatId = String(msg.chat?.id);
    const expectedChat = process.env.TELEGRAM_CHAT_ID;
    if (expectedChat && chatId !== expectedChat) {
      return res.status(200).json({ ok: true });
    }

    const row = {
      message_id: msg.message_id,
      text: msg.text,
      from_id: msg.from?.id,
      from_name: [msg.from?.first_name, msg.from?.last_name].filter(Boolean).join(' '),
      from_username: msg.from?.username || null,
      reply_to_id: msg.reply_to_message?.message_id || null,
      reply_to_text: msg.reply_to_message?.text?.slice(0, 200) || null,
      reply_to_name: msg.reply_to_message ? [msg.reply_to_message.from?.first_name, msg.reply_to_message.from?.last_name].filter(Boolean).join(' ') : null,
      timestamp: msg.date * 1000,
      edited: !!update.edited_message,
    };

    if (update.edited_message) {
      // Upsert on edit
      await supaFetch(TABLE, {
        method: 'POST',
        prefer: 'resolution=merge-duplicates',
        body: JSON.stringify(row),
      });
    } else {
      await supaFetch(TABLE, {
        method: 'POST',
        body: JSON.stringify(row),
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return res.status(200).json({ ok: true });
  }
}
