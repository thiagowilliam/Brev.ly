import { Button } from '../ui/button';
import { Field, FieldGroup, FieldLabel, FieldSet } from '../ui/field';
import { Input } from '../ui/input';
import { TypographyH1 } from '../ui/typographyH1';

export function NewLink() {
  return (
    <div className="w-95 min-h-85 bg-gray-100 rounded-sm p-8">
      <TypographyH1>Novo link</TypographyH1>
      <FieldSet className="w-full max-w-xs mt-6">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="originalLink">Link original</FieldLabel>
            <Input
              id="originalLink"
              type="text"
              placeholder="www.exemplo.com.br"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="shortLink">Link encurtado</FieldLabel>
            <Input id="shortLink" type="text" placeholder="brev.ly/" />
          </Field>
          <Field orientation="horizontal">
            <Button className="w-full mt-2 cursor-pointer" type="submit">
              Salvar link
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
