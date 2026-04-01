export type ActionState = { error?: string } | undefined;

export interface LoginValues {
  email:    string;
  password: string;
}

export interface RegisterValues {
  name:            string;
  email:           string;
  password:        string;
  confirmPassword: string;
}

export interface ProfileFormValues {
  name:  string;
  email: string;
}

export interface PasswordChangeFormValues {
  currentPassword: string;
  newPassword:     string;
  confirmPassword: string;
}
