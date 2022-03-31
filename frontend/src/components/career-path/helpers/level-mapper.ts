import { ICareerPathLevel, ILevelMap } from '../common/interfaces';

export const levelMapper = (levels: ICareerPathLevel[]): ILevelMap => {
  return levels.reduce(
    (result, item: ICareerPathLevel) => ({ ...result, [item.id]: item }),
    {},
  );
};
