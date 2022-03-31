export const calculatePercentage = (min: number, max: number): number => {
  return max === 0 ? 0 : Math.trunc((min / max) * 100);
};
