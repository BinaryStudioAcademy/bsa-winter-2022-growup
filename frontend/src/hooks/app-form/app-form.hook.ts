import { joiResolver } from '@hookform/resolvers/joi';
import * as Joi from 'joi';
import { Control, useForm, UseFormHandleSubmit } from 'react-hook-form';

interface IUseAppForm {
  control: Control<object, object>;
  errors: object;
  handleSubmit: UseFormHandleSubmit<object>;
}

interface IUseAppFormProps {
  defaultValues: object,
  validationSchema: Joi.Schema<any>
}

const useAppForm = ({ defaultValues, validationSchema }: IUseAppFormProps): IUseAppForm => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues,
    resolver: validationSchema ? joiResolver(validationSchema) : undefined,
  });

  return {
    control,
    errors,
    handleSubmit,
  };
};

export { useAppForm };
