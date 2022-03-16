import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Control, useController } from 'react-hook-form';
import CustomInput from './custom-input';
import './styles.scss';

interface Props {
  name: string;
  errors: object;
  control: Control;
  placeholder: string;
  minDate?: Date;
  maxDate?: Date;
}

const FormInputDate: React.FC<Props> = ({
  name,
  minDate,
  maxDate,
  errors,
  control,
  placeholder,
}) => {
  const { field } = useController({ name, control });
  const { ref, value, onChange } = field;

  return (
    <DatePicker
      isClearable
      name={name}
      dateFormat="dd.MM.yyyy"
      customInputRef="dateRef"
      minDate={minDate}
      maxDate={maxDate}
      selected={value}
      onChange={onChange}
      placeholderText={placeholder}
      customInput={<CustomInput ref={ref} dateRef={ref} errors={errors} />}
    />
  );
};

export default FormInputDate;
