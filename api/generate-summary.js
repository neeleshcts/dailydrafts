import { redis } from './upstash/redis.js';

const UNIQUE_ID = process.env.UNIQUE_ID;
const GROQ_API_KEY = process.env.GROQ_KEY;

function todayKey() {
  const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  return `${UNIQUE_ID}:${date}`;
}

export default async function handler(req, res) {
    const authHeader = req.headers['authorization'];

  if (authHeader !== `Bearer ${process.env.DRAFT_AUTH_KEY}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const key = todayKey();

  try {
    const record = await redis.json.get(key, '$');
    const doc = Array.isArray(record) ? record[0] : record;

    if (!doc || !doc.inputs || doc.inputs.length === 0) {
      return res.status(200).json({ message: 'No inputs to summarize today.' });
    }

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'user',
            content: `Summarize these tasks into a clean daily draft:\n${doc.inputs.join('\n')}. The format should be like as someone is giving the summary of his/her task of whole day. It should be in numeric bullet points. Do not add anything else`,
          },
        ],
      }),
    });


    
    if (!groqRes.ok) {
      const errText = await groqRes.text();
      throw new Error(`Groq API error: ${errText}`);
    }

    const groqData = await groqRes.json();
    const summary = groqData.choices[0].message.content;

    await redis.json.set(key, '$.output', JSON.stringify(summary));

    return res.status(200).json({ message: 'Summary generated.', summary });

  } catch (error) {
    console.error('generate-summary error:', error);
    return res.status(500).json({ error: 'Failed to generate summary' });
  }
}