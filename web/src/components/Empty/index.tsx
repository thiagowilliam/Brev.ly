import { LinkIcon } from '@phosphor-icons/react';

export function Empty() {
  return (
    <div className=" w-full flex flex-col items-center justify-center gap-3 p-4 mt-4">
      <LinkIcon size={32} color="var(--color-gray-500)" />
      <p className="text-gray-500 text-sm uppercase font-light">
        Ainda não existem links cadastrados
      </p>
    </div>
  );
}
