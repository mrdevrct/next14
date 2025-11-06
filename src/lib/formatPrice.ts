// utils/formatPrice.ts
export const fmtPrice = (n: number): string => {
  return n.toLocaleString("fa-IR") + " تومان";
};