import { Empty } from '../Empty';
import { TypographyH1 } from '../ui/typographyH1';

export function MyLinks() {
  return (
    <div className="w-145 min-h-58.5 bg-gray-100 rounded-sm p-8">
      <TypographyH1>Meus links</TypographyH1>
      <div className="w-full min-h-29.5 border-t border-gray-300 mt-6">
        <Empty />
      </div>
    </div>
  );
}
