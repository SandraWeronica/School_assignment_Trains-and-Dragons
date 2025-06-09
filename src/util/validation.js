export const isEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isNotEmpty = (value) => {
  return value.trim() !== "";
};

export const hasMinLength = (value, minLength) => {
  return value.length >= minLength;
};

export const valuesAreEqual = (value1, value2) => {
  return value1 === value2;
};
