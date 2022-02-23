import { useState } from 'hooks/hooks';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CommonDatePicker: React.FC = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date): void => setStartDate(date)}
    />
  );
};

export default CommonDatePicker;
