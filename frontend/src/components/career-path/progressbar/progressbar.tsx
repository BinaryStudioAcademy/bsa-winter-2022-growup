import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface Props {
  percentage?: number;
  textColor?: string;
  textSize?: string | number;
  styles?: string;
}

const Progressbar: React.FC<Props> = ({
  percentage = 0,
  textColor = '',
  textSize = 20,
  styles = '',
}) => (
  <CircularProgressbar
    className={styles}
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
