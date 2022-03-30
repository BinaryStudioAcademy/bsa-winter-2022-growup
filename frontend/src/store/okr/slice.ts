import { createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { State } from './common';
import okrReducer from './reducer';

const initialState: State = {
  okrs: [],
};

const { reducer, actions } = createSlice({
  name: ReducerName.OKR,
  initialState,
  reducers: {},
  extraReducers: okrReducer,
});

export { reducer, actions };
