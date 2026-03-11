import { api } from '@/lib/http';

export async function deleteLink(id: string): Promise<void> {
  const response = await api(`/links/${id}`, { method: 'DELETE' });

  if (!response.ok) {
    throw new Error('Erro ao deletar o link.');
  }
}
