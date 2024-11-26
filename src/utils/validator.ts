import validator from 'validator';

interface ValidationErrors {
  email?: string;
  username?: string;
  password?: string;
}

function validateUserInput(username: string, email: string, password: string): string {
  const errors: ValidationErrors = {};

  if (!validator.isEmail(email)) {
    return 'Invalid email';
    
  }

  if (!validator.isLength(username, { min: 1, max: 255 })) {
    return 'Username must be between 1 and 255 characters';
  }

  if (!validator.isLength(password, { min: 8 })) {
    return 'Password must be at least 8 characters';
  }

  return "";
}

function sanitizeInput(input: string): string {
  return input.trim();
}

export { validateUserInput, sanitizeInput };