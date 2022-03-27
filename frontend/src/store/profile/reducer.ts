import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { State } from './common';
import { finishRegistration } from 'store/auth/actions';
import * as actions from './actions';

const ProfileReducer = (builder: ActionReducerMapBuilder<State>): void => {
  builder.addCase(actions.fetchProfile.pending, (state, _) => {
    state.isLoading = true;
  });

  builder.addCase(actions.fetchProfile.rejected, (state, _) => {
    state.isLoading = false;
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
  builder.addCase(finishRegistration.fulfilled, (state, action) => {
    state.user = {
      ...state.user,
      ...action.payload,
    };
  });
};

export default ProfileReducer;
