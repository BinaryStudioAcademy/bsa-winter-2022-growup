import { v4 as uuidv4 } from 'uuid';
import { INode } from '../common/interfaces';

// const acquired = (y: number): number => {
//   if (y === 0) return 32;
//   if (y === 120) return 25;
//   if (y === 240) return 16;
//   return 5;
// };

export const getLevelNode = (
  level: string,
  y: number,
  acquiredSkills: number,
  totalSkills: number,
  onClick: () => void,
): INode => {
  return {
    id: uuidv4(),
    type: 'levelNode',
    data: {
      acquiredSkills,
      totalSkills,
      level,
      onClick,
    },
    position: {
      x: 500,
      y,
    },
  };
};
