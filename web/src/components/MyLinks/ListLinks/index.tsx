import { Button } from '@/components/ui/button';
import { CopyIcon, TrashIcon } from 'lucide-react';
import { toast } from 'sonner';

interface ListLinksProps {
  shortLink: string;
  originalLink: string;
  qntViewed: number;
  onDelete: () => void;
}

export function ListLinks({
  originalLink,
  qntViewed,
  shortLink,
  onDelete,
}: ListLinksProps) {
  function handleCopy() {
    navigator.clipboard.writeText(shortLink);
    toast.success('Link copiado!');
  }

  function handleDelete() {
    onDelete();
    toast.success('Link deletado!');
  }

  return (
    <div className="flex items-center justify-between py-4.5 border-b border-gray-200 last:border-b-0">
      <div className="flex flex-col gap-1">
        <strong className="text-blue-base text-[14px] font-medium">
          {shortLink}
        </strong>
        <p className="text-gray-500 text-[12px] font-normal">{originalLink}</p>
      </div>
      <div className="flex items-center">
        <span className="text-gray-500 text-[12px] font-normal">
          {qntViewed} acessos
        </span>
        <div className="flex gap-1 ml-5">
          <Button
            className="cursor-pointer text-[12px] p-2"
            variant="secondary"
            size="sm"
            onClick={handleCopy}
          >
            <CopyIcon size={16} />
          </Button>
          <Button
            className="cursor-pointer w-8 h-8"
            variant="secondary"
            size="sm"
            onClick={handleDelete}
          >
            <TrashIcon size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
