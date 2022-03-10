import { createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { State } from './common';

import tagsReducer from './reducer';

const initialState: State = {
  tags: [],
  isLoading: false,
};

const { reducer, actions } = createSlice({
  name: ReducerName.TAGS,
  initialState,
  reducers: {},
  extraReducers: tagsReducer,
});

export { reducer, actions };
