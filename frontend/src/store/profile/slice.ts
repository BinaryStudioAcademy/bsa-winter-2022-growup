import { createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { State } from './common';
import profileReducer from './reducer';

const initialState: State = {
  user: null,
  isLoading: false,
};

const { reducer, actions } = createSlice({
  name: ReducerName.PROFILE,
  initialState,
  reducers: {},
  extraReducers: profileReducer,
});

export { reducer, actions };
