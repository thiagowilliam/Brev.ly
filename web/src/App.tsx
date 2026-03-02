import { Button } from './components/ui/button';

export function App() {
  return (
    <>
      <h1>Hello World</h1>

      <button className="bg-blue-base text-white hover:bg-blue-dark">
        Primário
      </button>

      <span className="text-danger">Campo obrigatório</span>
      <p className="text-gray-500">Texto secundário</p>

      <div className="flex min-h-svh flex-col items-center justify-center">
        <Button>Click me</Button>
      </div>
    </>
  );
}
