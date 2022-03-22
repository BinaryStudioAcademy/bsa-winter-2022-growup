const createDate = new Date();

createDate.setDate(createDate.getDate() - 1);
createDate.setHours(23, 59);

const MIN_EDIT_DATE = new Date(0);
const MIN_CREATE_DATE = createDate;
const MAX_DATE = new Date('3000-01-01');

export { MAX_DATE, MIN_CREATE_DATE, MIN_EDIT_DATE };
