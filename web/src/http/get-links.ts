import { api } from '@/lib/http';

export interface Link {
  id: string;
  originalUrl: string;
  shortCode: string;
  accessCount: number;
  createdAt: string;
}

interface GetLinksResponse {
  links: Link[];
}

export async function getLinks(): Promise<GetLinksResponse> {
  const response = await api('/links');

  if (!response.ok) {
    throw new Error('Erro ao buscar os links.');
  }

  return response.json();
}
