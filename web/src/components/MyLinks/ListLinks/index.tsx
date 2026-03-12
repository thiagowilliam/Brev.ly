import { CopyIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';

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
  const [confirmOpen, setConfirmOpen] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(originalLink);
    toast.success('Link copiado!');
  }

  return (
    <div className="flex items-center justify-between py-4.5 border-b border-gray-200 last:border-b-0">
      <div className="flex flex-col gap-1">
        <a
          href={shortLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-base text-[14px] font-medium hover:underline"
        >
          {shortLink}
        </a>
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
            onClick={() => setConfirmOpen(true)}
          >
            <TrashIcon size={16} />
          </Button>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Deletar link"
        description="Tem certeza que deseja deletar este link? Esta ação não pode ser desfeita."
        onConfirm={() => {
          setConfirmOpen(false);
          onDelete();
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
