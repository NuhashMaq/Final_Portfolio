export async function apiGet(path) {
  const envBase = (process.env.REACT_APP_API_URL || '').trim().replace(/\/$/, '');
  let base = envBase;

  // Safety fallback for static hosting: if the build-time env var isn't set,
  // use the deployed Worker API in production-like environments.
  // Local dev stays on relative paths so CRA proxy continues to work.
  if (!base && typeof window !== 'undefined') {
    const host = window.location.hostname;
    const isLocal = host === 'localhost' || host === '127.0.0.1';
    if (!isLocal) {
      base = 'https://clickupproject-api.mashfiqnaushad28.workers.dev';
    }
  }
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
  const envBase = (process.env.REACT_APP_API_URL || '').trim().replace(/\/$/, '');
  let base = envBase;

  if (!base && typeof window !== 'undefined') {
    const host = window.location.hostname;
    const isLocal = host === 'localhost' || host === '127.0.0.1';
    if (!isLocal) {
      base = 'https://clickupproject-api.mashfiqnaushad28.workers.dev';
    }
  }
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
