export const validateName = (name: string): string => {
  if (!name.trim()) return 'Name is required';
  return '';
};

export const validateEmail = (email: string): string => {
  if (!email.trim()) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Enter a valid email address';
  return '';
};

export const validatePhone = (phone: string): string => {
  if (!phone.trim()) return 'Phone number is required';
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phone)) return 'Phone must be exactly 10 digits';
  return '';
};

export const validatePassword = (password: string): string => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return '';
};
