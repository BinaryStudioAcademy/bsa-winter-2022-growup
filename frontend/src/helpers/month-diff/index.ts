const monthDiff = (dateFrom: Date, dateTo: Date): string => {
  const start = new Date(dateFrom);
  const end = new Date(dateTo);

  const monthsDifference =
    end.getMonth() -
    start.getMonth() +
    12 * (end.getFullYear() - start.getFullYear());

  const years = Math.floor(monthsDifference / 12);
  const months = monthsDifference % 12;

  let yearsString = '';
  let monthsString = '';

  if (years === 1) {
    yearsString = '1 year';
  } else if (years > 1) {
    yearsString = `${years} years`;
  }

  if (months === 0) {
    monthsString = 'less month';
  } else if (months === 1) {
    monthsString = '1 month';
  } else if (months >= 1) {
    monthsString = `${monthsDifference % 12} months`;
  }

  return `${yearsString} ${monthsString}`;
};

export { monthDiff };
