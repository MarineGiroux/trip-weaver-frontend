export type FormFieldConfig = {
  name: string;
  label: string;
  placeholder: string;
  isRequired: boolean;
  minLength?: number;
  type?: string;
  isNestedInPasswords?: boolean;
};

export const REGISTRATION_FORM_FIELDS: FormFieldConfig[] = [
  { name: 'firstname', label: 'Prénom', placeholder: 'Prénom', isRequired: true, minLength: 2 },
  { name: 'lastname', label: 'Nom', placeholder: 'Nom', isRequired: true, minLength: 2 },
  { name: 'email', label: 'Email', placeholder: 'Email', isRequired: true },
  { name: 'password', label: 'Mot de passe', placeholder: 'Mot de passe', isRequired: true, type: 'password', isNestedInPasswords: true },
  {
    name: 'confirmPassword',
    label: 'Confirmer le mot de passe',
    placeholder: 'Confirmer le mot de passe',
    isRequired: true,
    type: 'password',
    isNestedInPasswords: true,
  },
];
