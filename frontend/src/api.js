export async function apiGet(path) {
  const base = (process.env.REACT_APP_API_URL || '').replace(/\/$/, '');
  const url = base ? `${base}${path}` : path; // with CRA proxy, base can be empty

  const res = await fetch(url, {
    headers: { Accept: 'application/json' }
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed (${res.status}): ${text}`);
  }

  return res.json();
}

export async function apiPost(path, body) {
  const base = (process.env.REACT_APP_API_URL || '').replace(/\/$/, '');
  const url = base ? `${base}${path}` : path;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed (${res.status}): ${text}`);
  }

  return res.json();
}
