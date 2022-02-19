import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { State } from './common';
import * as actions from './actions';

const WorkStyleQuizReducer = (
  builder: ActionReducerMapBuilder<State>,
): void => {
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

  builder.addCase(
    actions.updateWorkStyleQuizQuestion.fulfilled,
    (state, action) => {
      const question = state.questions?.find(
        (item) => item.id === action.payload.id,
      );
      if (question) {
        question.answers = action.payload.answers;
      }
    },
  );

  builder.addCase(
    actions.sendWorkStyleQuizResults.fulfilled,
    (state, action) => {
      state.result = action.payload;
    },
  );
};

export default WorkStyleQuizReducer;
