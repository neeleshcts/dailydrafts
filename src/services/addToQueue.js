export async function addToQueue(textInput) {
  console.log(`${textInput} inside the addToQueue`);
  const res = await fetch('/api/queue', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input: textInput }),
  });
  if (!res.ok) throw new Error('Failed to save task');
  return res.json();
}

export async function checkOutput() {
  const res = await fetch('/api/queue'); // GET request to your existing endpoint  
  
  if (!res.ok) {
    throw new Response('Failed to load today\'s draft', { status: res.status });
  }
  
  return res.json(); 
}