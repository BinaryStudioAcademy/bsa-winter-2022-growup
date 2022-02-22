import { object, string } from 'yup';

const createKeyResultSchema = object({
  name: string().required(),
});

export { createKeyResultSchema };
