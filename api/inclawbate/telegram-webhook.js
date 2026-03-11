import { kv } from '@vercel/kv';

const MAX_MESSAGES = 200;
const KV_KEY = 'clawsnet:telegram_messages';

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

    const entry = {
      id: msg.message_id,
      text: msg.text,
      from: {
        id: msg.from?.id,
        name: [msg.from?.first_name, msg.from?.last_name].filter(Boolean).join(' '),
        username: msg.from?.username || null,
      },
      replyTo: msg.reply_to_message ? {
        id: msg.reply_to_message.message_id,
        text: msg.reply_to_message.text?.slice(0, 200) || null,
        name: [msg.reply_to_message.from?.first_name, msg.reply_to_message.from?.last_name].filter(Boolean).join(' '),
      } : null,
      timestamp: msg.date * 1000,
      edited: !!update.edited_message,
    };

    const messages = (await kv.get(KV_KEY)) || [];

    if (update.edited_message) {
      const idx = messages.findIndex(m => m.id === entry.id);
      if (idx >= 0) messages[idx] = entry;
      else messages.push(entry);
    } else {
      messages.push(entry);
    }

    while (messages.length > MAX_MESSAGES) messages.shift();

    await kv.set(KV_KEY, messages);

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return res.status(200).json({ ok: true });
  }
}
