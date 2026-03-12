import { Link } from 'react-router-dom';
import { Logo } from '@/components/Logo';

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-8 p-5">
      <Logo />
      <div className="bg-white rounded-sm p-10 flex flex-col items-center gap-4 max-w-md w-full text-center shadow-sm">
        <span className="text-5xl font-bold text-blue-base">404</span>
        <h1 className="text-2xl font-bold text-gray-600">
          Link não encontrado
        </h1>
        <p className="text-gray-400 text-sm">
          O link que você tentou acessar não existe ou foi removido.
          <br />
          <Link to="/" className="text-blue-base underline font-medium">
            Voltar para a página inicial
          </Link>
        </p>
      </div>
    </div>
  );
}
