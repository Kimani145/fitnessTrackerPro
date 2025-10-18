export async function handleFetchResponse(res: Response) {
  const contentType = (res.headers.get('content-type') || '').toLowerCase();

  // Successful responses
  if (res.ok) {
    if (contentType.includes('application/json')) {
      return res.json();
    }
    // not JSON — try to return text (or parse JSON from text)
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  }

  // Error responses
  if (contentType.includes('application/json')) {
    try {
      const data = await res.json();
      const msg = data?.message || data?.error || JSON.stringify(data);
      throw new Error(msg || res.statusText || 'Request failed');
    } catch (e: any) {
      throw new Error(e?.message || res.statusText || 'Request failed');
    }
  }

  // Non-JSON error (HTML or plain text) — return stripped text
  const text = await res.text();
  const stripped = text.replace(/<[^>]*>/g, '').trim();
  throw new Error(stripped || res.statusText || 'Request failed');
}
