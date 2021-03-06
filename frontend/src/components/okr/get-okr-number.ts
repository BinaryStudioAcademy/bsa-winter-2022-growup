import { IOkr } from 'common/interfaces/okr';

const getOkrNumber = (okr: IOkr): number => {
  if (okr.objectives) {
    const objectives = okr.objectives.map((item) => item.result) as number[];
    const sum = objectives.length
      ? (objectives.reduce((prev, next) => {
          return (prev += next);
        }, 0) as number)
      : 0;

    const score = objectives.length
      ? Math.round(+(sum / objectives.length))
      : 0;

    return score;
  }
  return 0;
};
export default getOkrNumber;
