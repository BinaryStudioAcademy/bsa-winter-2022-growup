import { createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { State } from './common';

import adminReducer from './reducer';

const initialState: State = {
  tags: [],
  isLoading: false,
  users: [],
};

const { reducer, actions } = createSlice({
  name: ReducerName.ADMIN,
  initialState,
  reducers: {},
  extraReducers: adminReducer,
});

export { reducer, actions };
