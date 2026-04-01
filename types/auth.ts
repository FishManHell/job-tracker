export type ActionState = { error?: string } | undefined;

export interface ProfileFormValues {
  name:  string;
  email: string;
}

export interface PasswordChangeFormValues {
  currentPassword: string;
  newPassword:     string;
  confirmPassword: string;
}
