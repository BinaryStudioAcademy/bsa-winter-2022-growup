import { createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { State } from './common';
import CareerPathReducer from './reducer';

const initialState: State = {
  levels: [],
  domains: null,
  isLoading: false,
};

const { reducer, actions } = createSlice({
  name: ReducerName.CAREER_PATH,
  initialState,
  reducers: {},
  extraReducers: CareerPathReducer,
});

export { reducer, actions };
