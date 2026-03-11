import { DownloadSimpleIcon } from '@phosphor-icons/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { deleteLink } from '@/http/delete-link';
import { getLinks } from '@/http/get-links';
import { Empty } from '../Empty';
import { Button } from '../ui/button';
import { TypographyH1 } from '../ui/typographyH1';
import { ListLinks } from './ListLinks';

export function MyLinks() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['links'],
    queryFn: getLinks,
  });

  const { mutate: handleDelete } = useMutation({
    mutationFn: deleteLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
      toast.success('Link deletado!');
    },
  });

  const links = [...(data?.links ?? [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <section className="w-full md:w-145 bg-gray-100 rounded-sm overflow-y-auto max-h-96">
      <header className="flex justify-between sticky top-0 bg-gray-100 px-8 pt-8 pb-0 z-10">
        <TypographyH1>Meus links</TypographyH1>
        <Button
          className="cursor-pointer text-[12px] p-2"
          variant="secondary"
          size="sm"
        >
          <DownloadSimpleIcon size={16} />
          Baixar CSV
        </Button>
      </header>

      <div className="w-full border-t border-gray-200 mt-6 px-8 pb-8">
        {isLoading ? (
          <p className="text-gray-500 text-[12px] text-center py-4">
            Carregando...
          </p>
        ) : links.length === 0 ? (
          <Empty />
        ) : (
          links.map((link) => (
            <ListLinks
              key={link.id}
              shortLink={`brev.ly/${link.shortCode}`}
              originalLink={link.originalUrl}
              qntViewed={link.accessCount}
              onDelete={() => handleDelete(link.id)}
            />
          ))
        )}
      </div>
    </section>
  );
}
