import { levelMapper } from './level-mapper';
import { getEdge } from './get-edge';
import { getSkills } from './get-skills';
import { getUserNode } from './get-user-node';
import { getLevelNode } from './get-level-node';
import {
  IAllTechnicalSkills,
  ICareerPathLevel,
  IEdge,
  IFlowData,
  IInitialSkill,
  ILevelMap,
  INode,
} from '../common/interfaces';

export const getFlowData = (
  data: ICareerPathLevel[],
  levelId: string,
  onClick: (e: IAllTechnicalSkills[], id: string, level: string) => void,
): IFlowData => {
  const nodes: INode[] = [];
  const edges: IEdge[] = [];

  const levelMap: ILevelMap = levelMapper(data);
  const currentLevel: ICareerPathLevel = levelMap[levelId];

  if (!currentLevel) {
    return {
      nodes: [],
      edges: [],
      initialSkill: {
        name: '',
        skills: [],
      },
    };
  }

  const userNode: INode = getUserNode(
    currentLevel.domainName,
    currentLevel.name,
  );
  nodes.push(userNode);

  const nextLevels = currentLevel.nextLevels.map((id) => levelMap[id]);
  nextLevels.forEach((item) => {
    const levelNode: INode = getLevelNode(
      item.name,
      0,
      0,
      item.skills.length,
      () => {
        onClick(getSkills(item), item.id, item.name);
      },
    );
    nodes.push(levelNode);
  });

  for (let i = 1; i < nodes.length; i++) {
    const edge = getEdge(nodes[0].id, nodes[i].id, '#6b6293');
    edges.push(edge);
  }

  const initialSkill: IInitialSkill = {
    name: levelMap[levelId].name,
    skills: getSkills(levelMap[levelId]),
  };

  return { nodes, edges, initialSkill };
};