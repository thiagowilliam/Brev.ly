import { api } from '@/lib/http';

interface CreateShortLinkInput {
  originalLink: string;
  shortLink: string;
}

interface CreateShortLinkResponse {
  shortLink: string;
}

export async function createShortLink(
  data: CreateShortLinkInput
): Promise<CreateShortLinkResponse> {
  const response = await api('/short', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (response.status === 409) {
    const { message } = await response.json();
    throw new ConflictError(message);
  }

  if (!response.ok) {
    throw new Error('Erro ao criar o link. Tente novamente.');
  }

  return response.json();
}

export class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConflictError';
  }
}
