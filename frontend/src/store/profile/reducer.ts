import { ActionReducerMapBuilder, isAnyOf } from '@reduxjs/toolkit';
import { State } from './common';
import * as actions from './actions';

const ProfileReducer = (builder: ActionReducerMapBuilder<State>): void => {
  builder.addCase(actions.fetchProfile.pending, (state, _) => {
    state.isLoading = true;
  });

  builder.addCase(actions.fetchProfile.rejected, (state, _) => {
    state.isLoading = false;
  });

  builder.addMatcher(
    isAnyOf(actions.fetchProfile.fulfilled, actions.updateAvatar.fulfilled),
    (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
  );
};

export default ProfileReducer;
