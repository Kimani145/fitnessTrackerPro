
const API_URL = import.meta.env.VITE_API_URL || '';

export async function handleFetchResponse(res: Response) {
  const contentType = (res.headers.get('content-type') || '').toLowerCase();

  if (res.ok) {
    if (contentType.includes('application/json')) {
      return res.json();
    }
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  }

  if (contentType.includes('application/json')) {
    try {
      const data = await res.json();
      const msg = data?.message || data?.error || JSON.stringify(data);
      throw new Error(msg || res.statusText || 'Request failed');
    } catch (e: any) {
      throw new Error(e?.message || res.statusText || 'Request failed');
    }
  }

  const text = await res.text();
  const stripped = text.replace(/<[^>]*>/g, '').trim();
  throw new Error(stripped || res.statusText || 'Request failed');
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  const url = `${API_URL}${path}`;
  const res = await fetch(url, options);
  return handleFetchResponse(res);
}
