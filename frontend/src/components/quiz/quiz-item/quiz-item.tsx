import { useState } from 'react';
import InputRange from '../input-range/input-range';
import './styles.scss';

type Props = {
  title: string;
  level: number;
};

const QuizItem: React.FC<Props> = ({ title, level }) => {
  const [levelValue, setLevelValue] = useState(level);

  const handleChangeLevel = (level: number): void => {
    setLevelValue(level);
  };

  return (
    <div className="quiz">
      <h2 className="quiz__title">{title}</h2>
      <div className="range d-flex align-items-center justify-content-center">
        <span className="range__start-title fs-5">Beginner</span>
        <InputRange
          value={levelValue}
          onChange={(level: number): void => handleChangeLevel(level)}
        />
        <span className="range__end-title fs-5">Professional</span>
      </div>
    </div>
  );
};

export default QuizItem;
