import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

import type { State } from './common';
import * as actions from './actions';

const Reducer = (builder: ActionReducerMapBuilder<State>): void => {
  builder.addCase(actions.createTags.pending, (state, _) => {
    state.isLoading = true;
  });

  builder.addCase(actions.createTags.fulfilled, (state, action) => {
    state.isLoading = false;
    state.tags = action.payload as State['tags'];
  });

  builder.addCase(actions.createTags.rejected, (state, _) => {
    state.isLoading = false;
  });
};

export default Reducer;
