import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Control,
  DeepMap,
  FieldError,
  FieldPath,
  FieldValues,
  Path,
  useController,
  UseControllerReturn,
} from 'react-hook-form';
import CustomInput from './custom-input';
import './styles.scss';

interface Props<T> {
  name: FieldPath<T>;
  errors: DeepMap<FieldValues, FieldError>;
  control: Control<T>;
  placeholder: string;
  minDate?: Date;
  maxDate?: Date;
}

function FormInputDate<T>({
  name,
  minDate,
  maxDate,
  errors,
  control,
  placeholder,
}: Props<T>): JSX.Element {
  const {
    field,
  }: UseControllerReturn<T, Path<T>> = useController<T>({ name, control });
  const { ref, value, onChange } = field;
  return (
    <DatePicker
      isClearable
      name={name}
      dateFormat="dd.MM.yyyy"
      customInputRef="dateRef"
      minDate={minDate}
      maxDate={maxDate}
      selected={
        typeof value === 'string' && value !== ''
          ? new Date(value)
          : value === ''
          ? null
          : value
      }
      onChange={onChange}
      placeholderText={placeholder}
      customInput={<CustomInput ref={ref} dateRef={ref} errors={errors} />}
    />
  );
}

export default FormInputDate;
