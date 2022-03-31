import { ActionReducerMapBuilder, isAnyOf } from '@reduxjs/toolkit';

import type { State } from './common';
import * as actions from './actions';

const Reducer = (builder: ActionReducerMapBuilder<State>): void => {
  builder.addCase(actions.createTags.fulfilled, (state, action) => {
    state.isLoading = false;
    state.tags = [...state.tags, ...(action.payload?.tags as State['tags'])];
  });

  builder.addCase(actions.connectTags.fulfilled, (state, action) => {
    console.warn(action.payload);
    // state.tags = [...state.tags, ...(action.payload as State['tags'])];
  });

  builder.addCase(actions.fetchTags.fulfilled, (state, action) => {
    state.isLoading = false;
    if (action.payload) {
      state.tags = action.payload as State['tags'];
    }
  });

  builder.addCase(actions.deleteTag.fulfilled, (state, action) => {
    state.tags = state.tags.filter((tag) => tag.id !== action.payload);
  });

  builder.addMatcher(
    isAnyOf(actions.createTags.pending, actions.fetchTags.pending),
    (state, _) => {
      state.isLoading = true;
    },
  );

  builder.addMatcher(
    isAnyOf(actions.createTags.rejected, actions.fetchTags.rejected),
    (state, _) => {
      state.isLoading = false;
    },
  );
};

export default Reducer;
