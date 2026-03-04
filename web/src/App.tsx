import { Header } from './components/Header';
import { MyLinks } from './components/MyLinks';
import { NewLink } from './components/NewLink';
import { Toaster } from './components/ui/sonner';

export function App() {
  return (
    <>
      <Toaster position="top-center" duration={1000} />
      <main className="flex flex-col items-center justify-center min-h-screen max-w-5xl p-5 m-auto">
        <Header />
        <section className="flex flex-row gap-5 w-full items-start">
          <NewLink />
          <MyLinks />
        </section>
      </main>
    </>
  );
}
