import { useMutation, useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ConflictError, createShortLink } from '@/http/create-short-link';
import { Button } from '../ui/button';
import { Field, FieldGroup, FieldLabel, FieldSet } from '../ui/field';
import { Input } from '../ui/input';
import { TypographyH1 } from '../ui/typographyH1';

const newLinkSchema = z.object({
  originalLink: z
    .string()
    .transform(val => (val.match(/^https?:\/\//) ? val : `https://${val}`))
    .pipe(z.url('Informe uma URL válida')),
  shortLink: z
    .string()
    .min(3, 'O link encurtado deve ter no mínimo 3 caracteres')
    .regex(/^[a-zA-Z0-9-_]+$/, 'Use apenas letras, números, - ou _'),
});

type NewLinkFormData = z.infer<typeof newLinkSchema>;

export function NewLink() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<NewLinkFormData>({
    resolver: zodResolver(newLinkSchema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createShortLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
    },
  });

  async function onSubmit(data: NewLinkFormData) {
    try {
      await mutateAsync(data);
      reset();
    } catch (error) {
      if (error instanceof ConflictError) {
        setError('shortLink', { message: error.message });
      } else {
        setError('root', { message: 'Erro ao criar o link. Tente novamente.' });
      }
    }
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
              <div className={`flex items-center min-h-12 rounded-md border bg-transparent shadow-xs focus-within:ring-[1px] ${errors.shortLink ? 'border-destructive focus-within:ring-destructive/20' : 'border-input focus-within:border-ring'}`}>
                <span className="pl-3 text-sm text-gray-400 select-none whitespace-nowrap">
                  brev.ly/
                </span>
                <input
                  id="shortLink"
                  type="text"
                  placeholder="meu-link"
                  className="flex-1 min-w-0 bg-transparent px-1 py-1 text-gray-600 text-sm outline-none placeholder:text-muted-foreground"
                  {...register('shortLink')}
                />
              </div>
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
                disabled={isPending}
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
