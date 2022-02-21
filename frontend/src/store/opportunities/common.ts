export interface IAddNewOpportunity {
  name?: string;
  organization?: string;
  startData?: string;
  isFollow?: boolean;
  id?: string;
  tags?: string[];
  type?: string;
}

export enum OpportunityActions {
  ADD_OPPORTUNITY = 'ADD_OPPORTUNITY',
  SHOW_MODAL = 'SHOW_MODAL',
  CLOSE_MODAL = 'CLOSE_MODAL',
  SUBSCRIBE_FOLLOW = 'SUBSCRIBE_FOLLOW',
  UNSUBSCRIBE_FOLLOW = 'UNSUBSCRIBE_FOLLOW',
  LOAD_OPPORTUNITIES = 'LOAD_OPPORTUNITIES',
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
