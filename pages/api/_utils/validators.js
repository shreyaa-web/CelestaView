// pages/api/_utils/validators.js
export function isValidEmail(email = "") {
  const e = String(email).trim().toLowerCase();
  // simple but effective
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

export function isStrongPassword(pw = "") {
  const s = String(pw);
  const hasMinLen = s.length >= 8;
  const hasNumber = /\d/.test(s);
  const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(s);
  return hasMinLen && hasNumber && hasSpecial;
}

export function cleanName(name = "") {
  return String(name).trim();
}
