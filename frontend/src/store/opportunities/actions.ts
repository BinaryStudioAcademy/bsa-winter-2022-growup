import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ContentType } from 'common/enums/enums';
import { http } from 'services';
import { IOpportunity, IPostOppData, OpportunityActions } from './common';
import { OpportunitiesProps } from './common';

const fetchLoadOpp = createAsyncThunk(
  OpportunityActions.LOAD_OPPORTUNITIES,
  async (_, { rejectWithValue }) => {
    try {
      const result: OpportunitiesProps[] = await http.load(
        'http://localhost:3001/company/opportunities',
        {
          method: 'GET',
          payload: null,
          contentType: ContentType.JSON,
        },
      );
      const opportunities = result.map((item) => {
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
      return opportunities;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
const fetchNewOpp = createAsyncThunk(
  OpportunityActions.ADD_OPPORTUNITY,
  async (data: IOpportunity, { rejectWithValue }) => {
    try {
      const oppData = {
        opportunities: [
          {
            name: data.name,
            organization: data.organization,
            type: data.type,
            startDate: data.startDate,
          },
        ],
      };
      const res: IPostOppData[] = await http.post(
        'http://localhost:3001/company/opportunities',
        {
          method: 'POST',
          payload: JSON.stringify(oppData),
          contentType: ContentType.JSON,
        },
      );

      const newOpp = {
        name: res[0].name,
        organization: res[0].organization,
        type: res[0].type,
        startDate: res[0].startDate,
        id: res[0].id,
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
