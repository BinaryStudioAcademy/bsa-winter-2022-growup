import { Control, useForm, UseFormHandleSubmit } from 'react-hook-form';

interface IUseAppForm {
  control: Control<object, object>;
  errors: object;
  handleSubmit: UseFormHandleSubmit<object>;
}

interface IUseAppFormProps {
  defaultValues: object,
}

const useAppForm = ({ defaultValues }: IUseAppFormProps): IUseAppForm => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues,
  });

  return {
    control,
    errors,
    handleSubmit,
  };
};

export { useAppForm };
