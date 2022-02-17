import { defaultSkillLvlCount } from '../constants';
import ProgressActive from './progress-active';
import ProgressPassive from './progress-passive';

interface ValueTypes {
  value: string;
}

function arraylength(count: number, rating: string): number {
  if (count === 0) {
    return rating ? Number(rating) : 0;
  } else {
    return rating ? count - Number(rating) : count;
  }
}

const RatingValue = (props: ValueTypes): React.ReactElement => {
  return (
    <div className="container-progress-bar">
      <div className="b-progress-bar position-relative text-center overflow-hidden">
        {[...Array(arraylength(0, props.value))].map((value, index) => (
          <ProgressActive key={index} />
        ))}
        {[...Array(arraylength(defaultSkillLvlCount, props.value))].map(
          (value, index) => (
            <ProgressPassive key={index} />
          ),
        )}
        {props.value !== '' ? (
          <span className="fs-4 d-inline-block align-middle position-absolute fw-bold">
            {Number(props.value)}
          </span>
        ) : (
          <span className="fs-4 text-gu-blue d-inline-block align-middle position-absolute fw-bold">
            +
          </span>
        )}
      </div>
    </div>
  );
};

export default RatingValue;
