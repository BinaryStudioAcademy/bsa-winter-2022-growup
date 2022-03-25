import {
  ConnectionLineType,
  MarkerType,
  Position,
  XYPosition,
} from 'react-flow-renderer';
import { ISkills } from '../../common/interfaces';

export interface IUserNodeData {
  icon: JSX.Element;
  title: string;
  subtitle: string | JSX.Element;
}

export interface ILevelNodeData {
  acquiredSkills: number;
  totalSkills: number;
  level: string;
  onClick: () => void;
}

export interface INode {
  id: string;
  type: string;
  data: IUserNodeData | ILevelNodeData;
  position: XYPosition;
  sourcePosition?: Position;
  targetPosition?: Position;
}

export interface IMarkedEnd {
  type: MarkerType;
  color: string;
  width: number;
  height: number;
  strokeWidth: number;
}

export interface IEdge {
  id: string;
  source: string;
  target: string;
  animated: boolean;
  type: ConnectionLineType;
  style: object;
  markerEnd: IMarkedEnd;
}

export interface IInitialSkill {
  name: string;
  skills: ISkills[];
}

export interface IFlowData {
  nodes: INode[];
  edges: IEdge[];
  initialSkill: IInitialSkill;
}

export interface IBase {
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface ICategory extends IBase {
  id: string;
}

export interface IObjective extends IBase {
  id: string;
  name: string;
  category?: ICategory;
}

export interface ILevelSkill extends IBase {
  id: string;
  name: string;
  type: string;
  objectives: IObjective[];
}

export interface ICompany extends IBase {
  id: string;
  name: string;
  description: string;
}

export interface IDomain extends IBase {
  id: string;
  name: string;
  company: ICompany;
}

export interface IData {
  domain: IDomain;
}
