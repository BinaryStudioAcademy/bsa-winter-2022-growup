export interface ITestTypeData {
  name: string;
  value: number;
}

export interface IRelations {
  title: string;
  points: string[];
}
export interface IManaging {
  Motivate: string;
  Compliment: string;
  Counsel: string;
  Correct: string;
  Delegate: string;
}

export interface ITypeInfo {
  type: string;
  preDescription: string;
  general: string[];
  Relationship: IRelations;
  Managing: IManaging;
}

export interface DataOutPut {
  preDescription: string;
  general: string[];
  managing: IManaging;
  relationship: IRelations;
}

export interface ITab {
  text: string;
}
