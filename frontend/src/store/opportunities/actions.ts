import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  IOpportunity,
  IOpportunityBase,
  OpportunityActions,
  SortOption,
} from './common';
import { ThunkApiType } from '../store';

const fetchLoadOpportunities = createAsyncThunk<
  IOpportunityBase[],
  void,
  ThunkApiType
>(
  OpportunityActions.LOAD_OPPORTUNITIES,
  async (request, { extra: { services } }) => {
    const result: IOpportunityBase[] =
      await services.opportunities.fetchLoadOpportunities();
    console.warn(result);

    return result.map((item) => {
      const tags = item.tags?.map((item) => item.name);
      return {
        id: item.id,
        name: item.name,
        organization: item.organization,
        startDate: item.startDate,
        isFollow: false,
        tagsData: tags,
        type: item.type,
      };
    });
  },
);

const fetchNewOpportunity = createAsyncThunk<
  IOpportunity,
  IOpportunityBase,
  ThunkApiType
>(
  OpportunityActions.ADD_OPPORTUNITY,
  async (request, { extra: { services } }) => {
    const result = await services.opportunities.fetchNewOpportunity(request);

    return result.length
      ? {
          name: result[0].name,
          organization: result[0].organization,
          type: result[0].type,
          startDate: result[0].startDate,
          id: result[0].id,
          tags: result[0].tags,
          isFollow: false,
        }
      : {};
  },
);

const showModal = createAction(OpportunityActions.SHOW_MODAL);

const closeModal = createAction(OpportunityActions.CLOSE_MODAL);

const subscribeFollow = createAction(
  OpportunityActions.SUBSCRIBE_FOLLOW,
  (id?: string) => {
    return {
      payload: {
        id,
      },
    };
  },
);

const unSubscribeFollow = createAction(
  OpportunityActions.UNSUBSCRIBE_FOLLOW,
  (id?: string) => {
    return {
      payload: {
        id,
      },
    };
  },
);

const sortOpportunities = createAction(
  OpportunityActions.SORT_OPPORTUNITIES,
  (by: SortOption) => ({ payload: { by } }),
);

export {
  subscribeFollow,
  unSubscribeFollow,
  showModal,
  closeModal,
  fetchNewOpportunity,
  fetchLoadOpportunities,
  sortOpportunities,
};
