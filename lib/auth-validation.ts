export interface ValidationErrors {
  [key: string]: string | undefined;
}

export interface FormField {
  value: string;
  error?: string;
  touched: boolean;
}

export interface AuthFormState {
  emailAddress: FormField;
  password: FormField;
  code?: FormField;
}

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password validation requirements
const PASSWORD_REQUIREMENTS = {
  minLength: 8,
  hasUpperCase: true,
  hasLowerCase: true,
  hasNumber: true,
};

export const validateEmail = (email: string): string | undefined => {
  if (!email) {
    return "Email address is required";
  }
  
  if (!EMAIL_REGEX.test(email)) {
    return "Please enter a valid email address";
  }
  
  return undefined;
};

export const validatePassword = (password: string): string | undefined => {
  if (!password) {
    return "Password is required";
  }
  
  if (password.length < PASSWORD_REQUIREMENTS.minLength) {
    return `Password must be at least ${PASSWORD_REQUIREMENTS.minLength} characters`;
  }
  
  if (PASSWORD_REQUIREMENTS.hasUpperCase && !/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }
  
  if (PASSWORD_REQUIREMENTS.hasLowerCase && !/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }
  
  if (PASSWORD_REQUIREMENTS.hasNumber && !/\d/.test(password)) {
    return "Password must contain at least one number";
  }
  
  return undefined;
};

export const validateVerificationCode = (code: string): string | undefined => {
  if (!code) {
    return "Verification code is required";
  }
  
  if (code.length !== 6) {
    return "Verification code must be 6 digits";
  }
  
  if (!/^\d+$/.test(code)) {
    return "Verification code must contain only numbers";
  }
  
  return undefined;
};

export const validateAuthForm = (state: AuthFormState, isSignUp: boolean = false): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  // Validate email
  const emailError = validateEmail(state.emailAddress.value);
  if (emailError) {
    errors.emailAddress = emailError;
  }
  
  // Validate password
  const passwordError = validatePassword(state.password.value);
  if (passwordError) {
    errors.password = passwordError;
  }
  
  // Validate verification code if present
  if (state.code && state.code.value) {
    const codeError = validateVerificationCode(state.code.value);
    if (codeError) {
      errors.code = codeError;
    }
  }
  
  return errors;
};

export const createFormField = (value: string = ""): FormField => ({
  value,
  error: undefined,
  touched: false,
});

export const updateFormField = (
  field: FormField,
  value: string,
  validator?: (val: string) => string | undefined
): FormField => ({
  value,
  error: validator ? validator(value) : undefined,
  touched: true,
});

export const hasFormErrors = (errors: ValidationErrors): boolean => {
  return Object.values(errors).some(error => error !== undefined);
};

export const getFirstErrorMessage = (errors: ValidationErrors): string | undefined => {
  return Object.values(errors).find(error => error !== undefined);
};
