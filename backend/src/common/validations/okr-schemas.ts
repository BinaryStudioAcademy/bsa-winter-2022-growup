import { object, string, date } from 'yup';

const createOkrSchema = object({
  name: string().required(),
  type: string().required(),
  endDate: date().required(),
  startDate: date().required(),
});

const updateOkrSchema = object({
  name: string().required(),
  type: string().required(),
  endDate: date().required(),
  startDate: date().required(),
});

export { createOkrSchema, updateOkrSchema };
