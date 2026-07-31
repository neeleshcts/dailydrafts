export async function addToQueue(textInput) {
  const res = await fetch('/api/queue', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input: textInput }),
  });
  if (!res.ok) throw new Error('Failed to save task');
  return res.json();
}