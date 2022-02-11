import { useEffect, useState } from 'react';
import './styles.scss';

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
  <div className="range-slider d-flex fs-1">
      <div className="range-item position-relative">
        <input
          className="range-input position-relative d-block"
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleChangeInput}
        />
        <div className="range-ticks d-flex fs-1">
          {getTicksArray().map((tick, i) => (
            <span key={i} className="range-tick d-inline-block fs-5">
              <span className="range-tick__text d-inline-block">{tick}</span>
            </span>
          ))}
        </div>
        <div
          className="data-range position-absolute d-flex align-items-center justify-content-center bg-gu-blue text-gu-white"
          style={{ left: tickPositionStyle }}>{value}
        </div>
      </div>
  </div>
);};

export default InputRange;
