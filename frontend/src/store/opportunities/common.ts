export interface IOpportunity extends OpportunitiesProps {
  isFollow?: boolean;
  tagsData?: string[];
}

export enum OpportunityActions {
  ADD_OPPORTUNITY = 'ADD_OPPORTUNITY',
  SHOW_MODAL = 'SHOW_MODAL',
  CLOSE_MODAL = 'CLOSE_MODAL',
  SUBSCRIBE_FOLLOW = 'SUBSCRIBE_FOLLOW',
  UNSUBSCRIBE_FOLLOW = 'UNSUBSCRIBE_FOLLOW',
  LOAD_OPPORTUNITIES = 'LOAD_OPPORTUNITIES',
}

export interface IPostOppData extends OpportunitiesProps {
  createdAt: string;
  updatedAt: string;
  deletedAt?: null | string;
}

export interface OpportunitiesProps {
  id?: string;
  name?: string;
  organization?: string;
  startDate?: string;
  tags?: ITagsData[];
  type?: string;
}

export interface State {
  opportunities: IOpportunity[];
  isShowModal: boolean;
  isLoaded: boolean;
}

export interface ITagsData {
  id: string;
  name: string;
  createdAt: string;
  deletedAt: null | string;
  updateAt: string;
}

interface ILoadAction {
  payload: {
    opportunities: IOpportunity[];
  };
}

export interface opportunitiesAction {
  type: string;
  isLoaded: boolean;
  isShowModal: boolean;
  payload?: ILoadAction;
}