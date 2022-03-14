import {
  Control,
  useForm,
  UseFormHandleSubmit,
  UseFormReset,
} from 'react-hook-form';
import { Mode } from 'react-hook-form/dist/types/form';
import { joiResolver } from '@hookform/resolvers/joi';
import * as Joi from 'joi';

interface IUseAppForm {
  control: Control<object>;
  errors: object;
  isValid: boolean;
  handleSubmit: UseFormHandleSubmit<object>;
  reset?: UseFormReset<object>;
}

interface IUseAppFormProps {
  defaultValues: object;
  validationSchema: Joi.Schema;
  mode?: Mode;
}

const useAppForm = ({
  defaultValues,
  validationSchema,
  mode = 'onBlur',
}: IUseAppFormProps): IUseAppForm => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues,
    mode,
    resolver: validationSchema ? joiResolver(validationSchema) : undefined,
  });

  return {
    control,
    errors,
    isValid,
    handleSubmit,
    reset,
  };
};

export { useAppForm };
