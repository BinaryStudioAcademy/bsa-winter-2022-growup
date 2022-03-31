import { createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { State } from './common';
import domainReducer from './reducer';

const initialState: State = {
  levels: [],
  domains: null,
  isLoading: false,
};

const { reducer, actions } = createSlice({
  name: ReducerName.PROFILE,
  initialState,
  reducers: {},
  extraReducers: domainReducer,
});

export { reducer, actions };
