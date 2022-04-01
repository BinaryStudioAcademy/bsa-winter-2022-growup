import { levelMapper } from './level-mapper';
import { getEdge } from './get-edge';
import { getLevelSkills } from './get-level-skills';
import { getUserNode } from './get-user-node';
import { getLevelNode } from './get-level-node';
import { getAcquiredSkills } from './get-acquired-skills';
import { IUser } from 'common/interfaces/user';
import {
  ICareerPathLevel,
  ICurrentSkill,
  IEdge,
  IFlowData,
  ILevelMap,
  INode,
} from '../common/interfaces';

export const getFlowData = (
  data: ICareerPathLevel[],
  levelId: string,
  currentUser: IUser | null,
  onClick: (id: string) => void,
): IFlowData => {
  const nodes: INode[] = [];
  const edges: IEdge[] = [];

  const levelMap: ILevelMap = levelMapper(data);
  const currentLevel: ICareerPathLevel = levelMap[levelId];

  if (!currentLevel) {
    return {
      nodes: [],
      edges: [],
      currentSkill: {
        name: '',
        skills: [],
        acquiredSkills: 0,
        totalSkills: 0,
      },
    };
  }

  const userNode: INode = getUserNode(
    currentLevel.domainName,
    currentLevel.name,
    currentUser,
  );
  nodes.push(userNode);

  const nextLevels = currentLevel.nextLevels.map((id) => levelMap[id]);
  nextLevels.forEach((item, index) => {
    const levelNode: INode = getLevelNode(
      item.name,
      index * 120,
      getAcquiredSkills(item.skills),
      item.skills.length,
      () => {
        onClick(item.id);
      },
    );
    nodes.push(levelNode);
  });

  for (let i = 1; i < nodes.length; i++) {
    const edge = getEdge(userNode.id, nodes[i].id, '#6b6293');
    edges.push(edge);
  }

  const currentSkill: ICurrentSkill = {
    name: currentLevel.name,
    skills: getLevelSkills(currentLevel),
    acquiredSkills: getAcquiredSkills(currentLevel.skills),
    totalSkills: currentLevel.skills.length,
  };

  return { nodes, edges, currentSkill };
};
