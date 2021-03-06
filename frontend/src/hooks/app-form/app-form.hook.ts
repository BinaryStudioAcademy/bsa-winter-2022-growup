import {
  Control,
  DeepPartial,
  FieldErrors,
  UnpackNestedValue,
  useForm,
  UseFormHandleSubmit,
  UseFormReset,
} from 'react-hook-form';
import { Mode } from 'react-hook-form/dist/types/form';
import { joiResolver } from '@hookform/resolvers/joi';
import * as Joi from 'joi';

interface IUseAppForm<T> {
  control: Control<T>;
  errors: FieldErrors<T>;
  isValid: boolean;
  handleSubmit: UseFormHandleSubmit<T>;
  reset?: UseFormReset<T>;
}

interface IUseAppFormProps<T> {
  defaultValues: UnpackNestedValue<DeepPartial<T>>;
  validationSchema: Joi.ObjectSchema<T>;
  mode?: Mode;
}

const useAppForm = <T>({
  defaultValues,
  validationSchema,
  mode = 'onBlur',
}: IUseAppFormProps<T>): IUseAppForm<T> => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<T>({
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
