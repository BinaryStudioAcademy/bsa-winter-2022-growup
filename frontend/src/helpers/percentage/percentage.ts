export const calculatePercentage = (min: number, max: number): number => {
  return Math.trunc((min / max) * 100);
};
