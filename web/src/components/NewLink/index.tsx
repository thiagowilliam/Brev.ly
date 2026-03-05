import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Field, FieldGroup, FieldLabel, FieldSet } from '../ui/field';
import { Input } from '../ui/input';
import { TypographyH1 } from '../ui/typographyH1';

const newLinkSchema = z.object({
  originalLink: z.url('Informe uma URL válida'),
  shortLink: z
    .string()
    .min(3, 'O link encurtado deve ter no mínimo 3 caracteres')
    .regex(/^[a-zA-Z0-9-_]+$/, 'Use apenas letras, números, - ou _'),
});

type NewLinkFormData = z.infer<typeof newLinkSchema>;

export function NewLink() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<NewLinkFormData>({
    resolver: zodResolver(newLinkSchema),
  });

  async function onSubmit(data: NewLinkFormData) {
    const response = await fetch('http://localhost:3333/short', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.status === 409) {
      const { message } = await response.json();
      setError('shortLink', { message });
      return;
    }

    if (!response.ok) {
      setError('root', { message: 'Erro ao criar o link. Tente novamente.' });
      return;
    }

    reset();
  }

  return (
    <div className="w-full md:w-95 min-h-85 bg-gray-100 rounded-sm p-8">
      <TypographyH1>Novo link</TypographyH1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet className="w-full mt-6">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="originalLink">Link original</FieldLabel>
              <Input
                id="originalLink"
                type="text"
                placeholder="www.exemplo.com.br"
                aria-invalid={!!errors.originalLink}
                {...register('originalLink')}
              />
              {errors.originalLink && (
                <p className="text-red-500 text-[12px] mt-1">
                  {errors.originalLink.message}
                </p>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="shortLink">Link encurtado</FieldLabel>
              <Input
                id="shortLink"
                type="text"
                placeholder="brev.ly/"
                {...register('shortLink')}
              />
              {errors.shortLink && (
                <p className="text-red-500 text-[12px] mt-1">
                  {errors.shortLink.message}
                </p>
              )}
            </Field>
            {errors.root && (
              <p className="text-red-500 text-[12px]">{errors.root.message}</p>
            )}
            <Field orientation="horizontal">
              <Button
                className="w-full mt-2 cursor-pointer"
                type="submit"
                disabled={isSubmitting}
              >
                Salvar link
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
}
