import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { State } from './common';
import * as actions from './actions';

const UserQuizReducer = (builder: ActionReducerMapBuilder<State>): void => {
  builder.addCase(actions.fetchWorkStyleQuiz.pending, (state, _) => {
    state.isLoading = true;
  });

  builder.addCase(actions.fetchWorkStyleQuiz.rejected, (state, _) => {
    state.isLoading = false;
  });

  builder.addCase(actions.fetchWorkStyleQuiz.fulfilled, (state, action) => {
      state.isLoading = false;
      state.questions = action.payload;
  });
};

export default UserQuizReducer;
