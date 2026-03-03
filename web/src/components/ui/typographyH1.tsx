interface TypographyH1Props {
  children: React.ReactNode;
}

export function TypographyH1({ children }: TypographyH1Props) {
  return (
    <h1 className="text-gray-600 text-2xl font-semibold  tracking-tight text-balance">
      {children}
    </h1>
  );
}
