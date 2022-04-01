export const determineProgressColor = (percentage: number): string => {
  if (percentage >= 75) {
    return '#1CC336';
  }
  if (percentage >= 50) {
    return '#0070F5';
  }
  if (percentage >= 25) {
    return '#F53126';
  }
  return '#AEB2BB';
};
