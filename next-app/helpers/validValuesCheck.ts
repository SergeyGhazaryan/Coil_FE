export const validValuesCheck = (
  value: string | number,
  minLimit: string | number,
  maxLimit: string | number
): boolean => {
  return value > maxLimit || value < minLimit;
};
