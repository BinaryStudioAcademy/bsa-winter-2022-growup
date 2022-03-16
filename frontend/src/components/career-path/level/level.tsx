import Progressbar from '../progressbar/progressbar';
import './styles.scss';

interface Props {
  acquiredSkills: number;
  totalSkills: number;
  level: number;
  progressColor?: string;
}

const Level: React.FC<Props> = ({
  acquiredSkills,
  totalSkills,
  level,
  progressColor,
}) => {
  const percentage = Math.trunc((acquiredSkills / totalSkills) * 100);

  return (
    <div className="level__container d-flex justify-content-center align-items-center">
      <Progressbar percentage={percentage} textColor={progressColor} />
      <div className="d-grid ps-3">
        <span className="fs-5 fw-bold">Level {level}</span>
        <span className="level__text fs-6">
          {acquiredSkills} / {totalSkills} skill archived
        </span>
      </div>
    </div>
  );
};

export default Level;
