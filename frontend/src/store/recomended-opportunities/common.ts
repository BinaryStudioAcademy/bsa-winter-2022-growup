export interface IAddNewOpportunity {
  name?: string;
  organization?: string;
  startData?: string;
  isFollow?: boolean;
  id?: string;
  tags?: string[];
  type?: string;
}

export enum RecomendeOpportunitiesActions {
  LOAD_RECOMENDED_OPPORTUNITIES = 'LOAD_RECOMENDED_OPPORTUNITIES',
}

export interface opportunitiesAction {
  type: string;
  payload?: any;
}
export interface OpportunitiesProps {
  id?: string;
  name?: string;
  organization?: string;
  startDate?: string;
  isFollow?: string;
  tags?: string[];
}
export interface loadAction extends opportunitiesAction {
  payload: OpportunitiesProps[];
}
