import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { State } from './common';
import * as actions from './actions';

const ProfileReducer = (builder: ActionReducerMapBuilder<State>): void => {
  builder.addCase(actions.fetchProfile.pending, (state, _) => {
    state.isLoading = true;
  });

  builder.addCase(actions.fetchProfile.rejected, (state, _) => {
    state.isLoading = false;
  });

  builder.addCase(actions.insertPIB.fulfilled, (state, action) => {
    if (state.user) {
      state.user.firstName = action.payload.firstName;
      state.user.lastName = action.payload.lastName;
      state.user.position = action.payload.position;
    }
  });

  builder.addCase(actions.completeTest, (state, _) => {
    if (state.user) {
      state.user.isCompleteTest = true;
    }
  });
  builder.addCase(actions.updateAvatar.fulfilled, (state, action) => {
    state.isLoading = false;
    state.user = action.payload;
    state.user.isCompleteTest = true;
  });
  builder.addCase(actions.fetchProfile.fulfilled, (state, action) => {
    state.isLoading = false;
    state.user = action.payload;
  });
};

export default ProfileReducer;
