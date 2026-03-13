import { Link } from 'react-router-dom';
import logo from '../assets/404.svg';

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-8 p-5">
      <div className="bg-white rounded-sm p-10 flex flex-col items-center gap-4 max-w-md w-full text-center shadow-sm">
        <img src={logo} width="194px" height="85px" alt='Brev.ly' />
        <h1 className="text-2xl font-bold text-gray-600">
          Link não encontrado
        </h1>
        <p className="text-gray-400 text-sm">
          O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. Saiba mais em brev.ly.
          <br />
          <Link to="/" className="text-blue-base underline font-medium mt-3 block">
            Voltar para a página inicial
          </Link>
        </p>
      </div>
    </div>
  );
}
