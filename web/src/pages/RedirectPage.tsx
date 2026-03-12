import { useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { resolveLink } from '@/http/resolve-link';
import { Logo } from '@/components/Logo';

export function RedirectPage() {
  const { shortCode } = useParams<{ shortCode: string }>();
  const navigate = useNavigate();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!shortCode || hasFetched.current) return;
    hasFetched.current = true;

    resolveLink(shortCode)
      .then(({ originalUrl }) => {
        setTimeout(() => {
          window.location.href = originalUrl;
        }, 1000);
      })
      .catch(() => {
        navigate('/not-found', { replace: true });
      });
  }, [shortCode, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-8 p-5">
      <Logo />
      <div className="bg-white rounded-sm p-10 flex flex-col items-center gap-4 max-w-md w-full text-center shadow-sm">
        <h1 className="text-3xl font-bold text-blue-base">Redirecionando...</h1>
        <p className="text-gray-400 text-sm">
          O link será aberto automaticamente em alguns instantes.
          <br />
          Não foi redirecionado?{' '}
          <Link to="/" className="text-blue-base underline font-medium">
            acesse aqui
          </Link>
        </p>
      </div>
    </div>
  );
}
