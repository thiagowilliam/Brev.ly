import { DownloadSimpleIcon } from '@phosphor-icons/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { deleteLink } from '@/http/delete-link';
import { exportLinks } from '@/http/export-links';
import { getLinks } from '@/http/get-links';
import { Empty } from '../Empty';
import { Button } from '../ui/button';
import { TypographyH1 } from '../ui/typographyH1';
import { ListLinks } from './ListLinks';
import { Loader } from 'lucide-react';

export function MyLinks() {
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching } = useQuery({
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

  const { mutate: handleExport, isPending: isExporting } = useMutation({
    mutationFn: exportLinks,
    onSuccess: (url) => {
      window.open(url, '_blank');
    },
    onError: () => {
      toast.error('Erro ao exportar os links.');
    },
  });

  const links = [...(data?.links ?? [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <section className="w-full md:w-145 bg-gray-100 rounded-sm overflow-y-auto max-h-96 relative">
      <header className="flex justify-between sticky top-0 bg-gray-100 px-8 pt-8 pb-0 z-10">
        <TypographyH1>Meus links</TypographyH1>
        <Button
          className="cursor-pointer text-[12px] p-2"
          variant="secondary"
          size="sm"
          disabled={isExporting}
          onClick={() => handleExport()}
        >
          
          {isExporting ? 
            <><Loader className="animate-spin inline-block mr-1" />Exportando...</> : 
            <> <DownloadSimpleIcon size={16} /> Baixar CSV</>
          }
        </Button>
      </header>

      <div className="w-full border-t border-gray-200 mt-6 px-8 pb-8">
        {isFetching && !isLoading && (
          <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden z-20">
            <div className="h-full w-1/3 bg-blue-base animate-slide-x" />
          </div>
        )}
        {isLoading ? (
          <p className="text-gray-500 text-[12px] text-center py-4 h-8 flex items-center justify-center">
            <Loader className="animate-spin inline-block mr-1" /> Carregando...
          </p>
        ) : links.length === 0 ? (
          <Empty />
        ) : (
          links.map((link) => (
            <ListLinks
              key={link.id}
              shortLink={`http://localhost:5173/${link.shortCode}`}
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
