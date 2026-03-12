import { api } from '@/lib/http';

export async function exportLinks(): Promise<string> {
  const response = await api('/links/export', { method: 'POST' });

  if (!response.ok) {
    throw new Error('Erro ao exportar os links.');
  }

  const { url } = await response.json();
  return url;
}
