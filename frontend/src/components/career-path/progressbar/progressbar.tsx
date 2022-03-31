import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { determineProgressColor } from 'helpers/percentage/progress-color';
import 'react-circular-progressbar/dist/styles.css';

interface Props {
  percentage?: number;
  textSize?: string | number;
  styles?: string;
}

const Progressbar: React.FC<Props> = ({
  percentage = 0,
  textSize = 20,
  styles = '',
}) => {
  const color = determineProgressColor(percentage);

  return (
    <CircularProgressbar
      className={styles}
      value={percentage}
      text={`${percentage}%`}
      styles={buildStyles({
        textSize: textSize,
        textColor: color,
        pathColor: color,
      })}
    />
  );
};

export default Progressbar;
