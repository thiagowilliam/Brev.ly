import { Dialog } from 'radix-ui';
import { Button } from './button';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  description,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-sm bg-white p-8 shadow-lg flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Dialog.Title className="text-lg font-semibold text-gray-600">
              {title}
            </Dialog.Title>
            <Dialog.Description className="text-sm text-gray-400">
              {description}
            </Dialog.Description>
          </div>
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" size="sm" onClick={onCancel}>
              Cancelar
            </Button>
            <Button variant="destructive" size="sm" onClick={onConfirm}>
              Deletar
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
