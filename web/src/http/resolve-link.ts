import { api } from '@/lib/http';

interface ResolveLinkResponse {
  originalUrl: string;
}

export async function resolveLink(
  shortCode: string
): Promise<ResolveLinkResponse> {
  const response = await api(`/${shortCode}`);

  if (response.status === 404) {
    throw new Error('Link não encontrado.');
  }

  if (!response.ok) {
    throw new Error('Erro ao buscar o link.');
  }

  return response.json();
}
