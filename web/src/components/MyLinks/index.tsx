import { DownloadSimpleIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { Empty } from '../Empty';
import { Button } from '../ui/button';
import { TypographyH1 } from '../ui/typographyH1';
import { ListLinks } from './ListLinks';

const initialLinks = [
  {
    id: 1,
    shortLink: 'brev.ly/react',
    originalLink: 'https://react.dev/learn',
    qntViewed: 42,
  },
  {
    id: 2,
    shortLink: 'brev.ly/tailwind',
    originalLink: 'https://tailwindcss.com/docs',
    qntViewed: 17,
  },
  {
    id: 3,
    shortLink: 'brev.ly/vite',
    originalLink: 'https://vite.dev/guide',
    qntViewed: 8,
  },
];

export function MyLinks() {
  const [links, setLinks] = useState(initialLinks);

  function handleDelete(id: number) {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  }

  return (
    <section className="w-145 bg-gray-100 rounded-sm p-8">
      <header className="flex justify-between">
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

      <div className="w-full border-t border-gray-200 mt-6">
        {links.length === 0 ? (
          <Empty />
        ) : (
          links.map((link) => (
            <ListLinks
              key={link.id}
              shortLink={link.shortLink}
              originalLink={link.originalLink}
              qntViewed={link.qntViewed}
              onDelete={() => handleDelete(link.id)}
            />
          ))
        )}
      </div>
    </section>
  );
}
