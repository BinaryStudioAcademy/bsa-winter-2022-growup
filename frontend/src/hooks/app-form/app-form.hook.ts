import { Control, useForm, UseFormHandleSubmit } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import * as Joi from 'joi';

interface IUseAppForm {
  control: Control<object>;
  errors: object;
  isValid: boolean;
  handleSubmit: UseFormHandleSubmit<object>;
}

interface IUseAppFormProps {
  defaultValues: object;
  validationSchema: Joi.Schema;
}

const useAppForm = ({
  defaultValues,
  validationSchema,
}: IUseAppFormProps): IUseAppForm => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: validationSchema ? joiResolver(validationSchema) : undefined,
  });

  return {
    control,
    errors,
    isValid,
    handleSubmit,
  };
};

export { useAppForm };
