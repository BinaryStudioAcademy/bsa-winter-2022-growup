import { getEdge } from './get-edge';
import { getUserNode } from './get-user-node';
import { getLevelNode } from './get-level-node';
import { ISkills } from '../../common/interfaces';
import { IEdge, IFlowData, IInitialSkill, INode } from '../common/interfaces';
import { getSkill } from './get-skills';

export const getFlowData = (
  data: any,
  position: string,
  onClick: (e: ISkills[], level: string) => void,
): IFlowData => {
  const nodes: INode[] = [];
  const edges: IEdge[] = [];

  const user: INode = getUserNode(position);
  nodes.push(user);

  for (let i = 0; i < data[0].levels.length; i++) {
    const lastNode = nodes[nodes.length - 1];
    const skills = getSkill(i, data);
    const level = data[0].levels[i].name;
    const levelNode = getLevelNode(
      level,
      i === 0 ? 0 : lastNode.position.y + 120,
      30 / (i + 1),
      35,
      () => {
        onClick(skills, level);
      },
    );

    nodes.push(levelNode);
  }

  for (let i = 1; i < nodes.length; i++) {
    const edge = getEdge(nodes[0].id, nodes[i].id, '');
    edges.push(edge);
  }

  const initialSkill: IInitialSkill = {
    name: data[0].levels[0].name,
    skills: getSkill(0, data),
  };

  return { nodes, edges, initialSkill };
};
