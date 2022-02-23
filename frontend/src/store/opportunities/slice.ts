import { createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { State } from './common';
import opportunityReducer from './reducer';

const initialState: State = {
  opportunities: [],
  isShowModal: false,
  isLoaded: false,
};

const { reducer, actions } = createSlice({
  name: ReducerName.OPPORTUNITY,
  initialState,
  reducers: {},
  extraReducers: opportunityReducer,
});

export { reducer, actions };
