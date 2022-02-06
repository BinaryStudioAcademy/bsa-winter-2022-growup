import * as yup from 'yup';

export const loginSchema = yup
  .object()
  .strict(true)
  .required()
  .noUnknown(true)
  .shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });
