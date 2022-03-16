import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './styles.scss';

interface Props {
  percentage?: number;
  textColor?: string;
  textSize?: string;
}

const Progressbar: React.FC<Props> = ({
  percentage = 0,
  textColor = '',
  textSize = '',
}) => (
  <CircularProgressbar
    className="progressbar"
    value={percentage}
    text={`${percentage}%`}
    styles={buildStyles({
      textSize: textSize,
      textColor: textColor,
      pathColor: textColor,
    })}
  />
);

export default Progressbar;
