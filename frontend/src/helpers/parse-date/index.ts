const ordinalSuffix = (i: number): string => {
  const j = i % 10;
  const k = i % 100;
  if (j == 1 && k != 11) {
    return i + 'st';
  }
  if (j == 2 && k != 12) {
    return i + 'nd';
  }
  if (j == 3 && k != 13) {
    return i + 'rd';
  }
  return i + 'th';
};

const parseMonth = (month: number): string => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return monthNames[month].slice(0, 3);
};

export const parseDate = (date: string): string => {
  const newDate = new Date(date);

  const day = ordinalSuffix(newDate.getDay());
  const month = parseMonth(newDate.getMonth());
  const year = newDate.getFullYear();

  const parseDate = `${day} ${month} ${year}`;
  return parseDate;
};
