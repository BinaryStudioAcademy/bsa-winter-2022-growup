import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { opportunities } from 'services';
import {
  IOpportunity,
  IPostOppData,
  OpportunityActions,
  IOpportunityBase,
} from './common';

const fetchLoadOpp = createAsyncThunk(
  OpportunityActions.LOAD_OPPORTUNITIES,
  async (_, { rejectWithValue }) => {
    try {
      const result: IOpportunityBase[] = await opportunities.fetchLoadOpp();
      const opportunitiesData = result.map((item) => {
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
      return opportunitiesData;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
const fetchNewOpp = createAsyncThunk(
  OpportunityActions.ADD_OPPORTUNITY,
  async (data: IOpportunity, { rejectWithValue }) => {
    try {
      const result: IPostOppData[] = await opportunities.fetchNewOpp(data);
      const newOpp = {
        name: result[0].name,
        organization: result[0].organization,
        type: result[0].type,
        startDate: result[0].startDate,
        id: result[0].id,
        tags: [],
        isFollow: false,
      };
      return newOpp;
    } catch (err) {
      return rejectWithValue(err);
    }
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

export {
  subscribeFollow,
  unSubscribeFollow,
  showModal,
  closeModal,
  fetchNewOpp,
  fetchLoadOpp,
};
