export enum EmailType {
  Activation,
  PasswordReset,
}

export interface EmailTemplate {
  type: EmailType;
  subject: string;
  template: string;
  replaceTokens: string[];
}

export const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    type: EmailType.Activation,
    subject: 'Nightwood - activate your account',
    template: 'activation-email.html',
    replaceTokens: ['$user_name', '$activation_code_1', '$activation_code_2'],
  },
];

export interface EmailReplaceToken {
  token: string;
  value: string;
}
