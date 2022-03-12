import { object, string, date } from 'yup';

const createEducationSchema = object({
  specialization: string().required(),
  university: string().required(),
  degree: string().required(),
  startDate: date().required(),
  endDate: date().nullable(),
});

const updateEducationSchema = object({
  specialization: string().required(),
  university: string().required(),
  degree: string().required(),
  startDate: date().required(),
  endDate: date().nullable(),
});

export { createEducationSchema, updateEducationSchema };
