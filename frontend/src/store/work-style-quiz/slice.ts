import { createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { State } from './common';
import workStyleQuizReducer from './reducer';

const initialState: State = {
  questions: null,
  isLoading: true,
};

const { reducer, actions } = createSlice({
  name: ReducerName.USER_QUIZ,
  initialState,
  reducers: {  },
  extraReducers: workStyleQuizReducer,
});

export { reducer, actions };
