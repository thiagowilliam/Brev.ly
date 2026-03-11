const API_BASE_URL = 'http://localhost:3333';

export async function api(path: string, init?: RequestInit) {
  const hasBody = init?.body != null;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      ...(hasBody ? { 'Content-Type': 'application/json' } : {}),
      ...init?.headers,
    },
  });

  return response;
}
