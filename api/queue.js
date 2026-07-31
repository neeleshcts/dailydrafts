import { redis } from './upstash/redis';

const UNIQUE_ID = process.env.UNIQUE_ID;

function todayKey() {
  const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  return `${UNIQUE_ID}:${date}`;
}

export default async function handler(req, res) {
  const key = todayKey();

  try {
    if (req.method === 'GET') {
        
      const record = await redis.json.get(key);
      return res.status(200).json(record ?? { inputs: [], output: '' });
    }

    if (req.method === 'POST') {
      const { input } = req.body;
      if (!input || typeof input !== 'string') {
        return res.status(400).json({ error: 'Missing "input" string in body' });
      }

      // Only creates the doc if it doesn't already exist — safe to call every time
      await redis.json.set(key, '$', { inputs: [], output: '' }, { nx: true });

      // Now guaranteed to exist, so append is always safe
      await redis.json.arrappend(key, '$.inputs', JSON.stringify(input));

      const updated = await redis.json.get(key);
      return res.status(200).json(updated);
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} not allowed`);
  } catch (error) {
    console.error('Queue endpoint error:', error);
    return res.status(500).json({ error: 'Something went wrong saving your task' });
  }
}