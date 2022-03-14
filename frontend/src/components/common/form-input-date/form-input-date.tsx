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
}

const FormInputDate: React.FC<Props> = ({
  name,
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
      minDate={null}
      maxDate={null}
      selected={value}
      onChange={onChange}
      placeholderText={placeholder}
      customInput={<CustomInput ref={ref} dateRef={ref} errors={errors} />}
    />
  );
};

export default FormInputDate;
