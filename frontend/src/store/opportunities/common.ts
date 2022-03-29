export interface IOpportunity extends IOpportunityBase {
  isFollow?: boolean;
  tagsData?: ITagsData[] | string[];
}

export enum OpportunityActions {
  ADD_OPPORTUNITY = 'ADD_OPPORTUNITY',
  SHOW_MODAL = 'SHOW_MODAL',
  CLOSE_MODAL = 'CLOSE_MODAL',
  SUBSCRIBE_FOLLOW = 'SUBSCRIBE_FOLLOW',
  UNSUBSCRIBE_FOLLOW = 'UNSUBSCRIBE_FOLLOW',
  LOAD_OPPORTUNITIES = 'LOAD_OPPORTUNITIES',
  SORT_OPPORTUNITIES = 'SORT_OPPORTUNITIES',
}

export interface IPostOpportunityData extends IOpportunityBase {
  createdAt: string;
  updatedAt: string;
  deletedAt?: null | string;
}

export interface IOpportunityBase {
  id?: string;
  name?: string;
  organization?: string;
  startDate?: string | Date;
  tags?: ITagsData[];
  type?: string;
}

export interface State {
  opportunities: IOpportunity[];
  isShowModal?: boolean;
  isLoaded?: boolean;
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

export interface IOpportunitiesAction {
  type: string;
  isLoaded: boolean | undefined;
  isShowModal: boolean | undefined;
  payload?: ILoadAction;
}

export enum SortOption {
  ORGANIZATION = 'Organization',
  PROGRAM = 'Program',
  DATE = 'Date',
}
