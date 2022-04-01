import { createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { State } from './common';
import { ActionType } from './common';

import tagsReducer from './reducer';

const initialState: State = {
  tags: [],
  userTags: null,
  isLoading: false,
};

const { reducer, actions } = createSlice({
  name: ReducerName.TAGS,
  initialState,
  reducers: {
    [ActionType.ADD_TAGS]: (state, action) => {
      state.userTags = action.payload;
    },
  },
  extraReducers: tagsReducer,
});

export { reducer, actions };
