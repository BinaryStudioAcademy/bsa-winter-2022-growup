import { useEffect, useState } from 'react';
import './input-range.scss';

type Props  = {
  value?: number;
  min?: number;
  max?: number;
  onChange: (n: number) => void;
};

const InputRange: React.FC<Props> = ({ value = 0, min = 0, max = 10, onChange }) => {
  const [tickPositionStyle, setTickPositionStyle] = useState('');

  const getRangePercent = (): number => {
    const relativeValue = value - min;
    const ticks = max - min;
    const percent = relativeValue / ticks;
    return percent;
  };

  const getPositionStyle = (): string => {
    const percent = getRangePercent();
    const left = percent * 100;
    const emAdjust = percent * 3;
    return `calc(${left}% - ${emAdjust}em)`;
  };

  useEffect(() => {
    setTickPositionStyle(getPositionStyle());
  }, [value]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(+e.target.value);
  };

  const getTicksArray = (): number[] => {
    const ticks: number[] = [];

    for (let i = min; i <= max; i++ ){
      ticks.push(i);
    }

    return ticks;
  };

  return (
  <div className="range-slider">
      <div className="range-item">
        <input
          className="range-input"
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleChangeInput}
        />
        <div className="range-ticks">
          {getTicksArray().map((tick, i) => (
            <span key={i} className="range-tick">
              <span className="range-tick__text">{tick}</span>
            </span>
          ))}
        </div>
        <div className="data-range" style={{ left: tickPositionStyle }}>{value}</div>
      </div>
  </div>
);};

export default InputRange;
