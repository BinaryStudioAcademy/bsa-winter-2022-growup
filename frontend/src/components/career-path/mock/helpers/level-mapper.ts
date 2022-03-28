import { ILevel, ILevelMap } from '../common/interfaces';

export const levelMapper = (levels: ILevel[]): ILevelMap => {
  return levels.reduce(
    (result, item: ILevel) => ({ ...result, [item.id]: item }),
    {},
  );
};
