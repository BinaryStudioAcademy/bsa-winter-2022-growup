import { v4 as uuidv4 } from 'uuid';
import { INode } from '../common/interfaces';

export const getLevelNode = (
  position: string,
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
      level: `${level} ${position}`,
      onClick,
    },
    position: {
      x: 550,
      y,
    },
  };
};
