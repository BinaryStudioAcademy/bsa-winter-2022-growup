import { object, string, date } from 'yup';

const createCareerJourneySchema = object({
  startDate: date().required(),
  endDate: date().nullable(),
  company: string().required(),
  position: string().required(),
});

const updateCareerJourneySchema = object({
  id: string().required(),
  startDate: date().required(),
  endDate: date().nullable(),
  company: string().required(),
  position: string().required(),
});

export { createCareerJourneySchema, updateCareerJourneySchema };
