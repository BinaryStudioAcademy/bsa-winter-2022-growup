import { object, number, string } from 'yup';

const createObjectiveSchema = object({
  name: string().required(),
  result: number().required(),
});

const updateObjectiveSchema = object({
  name: string().required(),
  result: number().required(),
});

export { createObjectiveSchema, updateObjectiveSchema };
