import {
  ConnectionLineType,
  MarkerType,
  Position,
  XYPosition,
} from 'react-flow-renderer';

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

export interface ICurrentSkill {
  name: string;
  skills: IAllTechnicalSkills[];
  acquiredSkills: number;
  totalSkills: number;
}

export interface IFlowData {
  nodes: INode[];
  edges: IEdge[];
  currentSkill: ICurrentSkill;
}

export interface IBase {
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
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
  isStarred: boolean;
  selfRating: number;
  mentorRating: number;
  reviewRating: number;
  objectives: IObjective[];
}

export interface ICareerPathLevel extends IBase {
  id: string;
  name: string;
  domainName: string;
  skills: ILevelSkill[];
  nextLevels: string[];
}

export interface ILevelMap {
  [key: string]: ICareerPathLevel;
}

export interface ITechnicalSkill {
  skill: string;
  topics: (string | { required: string })[];
}

export interface IAllTechnicalSkills {
  name: string;
  skills: ITechnicalSkill[];
}
