export const thousandFormat = (value: number | string): string => {
  if (value === null || value === undefined) return "";

  const number = Number(value);
  if (isNaN(number)) return String(value);

  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
