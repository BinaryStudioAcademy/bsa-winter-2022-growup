const start = new Date();

start.setDate(start.getDate() - 1);
start.setHours(23, 59);

const MIN_DATE = start;
const MAX_DATE = new Date('3000-01-01');

export { MAX_DATE, MIN_DATE };
