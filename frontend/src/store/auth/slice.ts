import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { IUser } from 'common/interfaces/user';
import {
  finishRegistration,
  getCurrentUser,
  loginUser,
  signUpUser,
  verifyRegistrationToken,
} from './actions';
import { ActionType } from './common';
import { StorageKey } from '../../common/enums/app/storage-key.enum';
import { storage } from '../../services';

type State = {
  user: IUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
};

const initialState: State = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
};

const { reducer, actions } = createSlice({
  name: ReducerName.AUTH,
  initialState,
  reducers: {
    [ActionType.SET_USER]: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    [ActionType.REMOVE_USER]: (state) => {
      state.user = null;
    },
    [ActionType.LOGOUT_USER]: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      storage.removeItem(StorageKey.TOKEN);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    });
    builder
      .addCase(finishRegistration.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(verifyRegistrationToken.fulfilled, (state, _) => {
        state.isAuthenticated = true;
      });

    builder
      .addMatcher(
        isAnyOf(loginUser.pending, signUpUser.pending, getCurrentUser.pending),
        (state, _) => {
          state.isLoading = true;
        },
      )
      .addMatcher(
        isAnyOf(loginUser.fulfilled, signUpUser.fulfilled),
        (state, action) => {
          state.isAuthenticated = true;
          state.isLoading = false;

          const { user } = action.payload;
          state.user = user;
        },
      )
      .addMatcher(
        isAnyOf(
          loginUser.rejected,
          signUpUser.rejected,
          getCurrentUser.rejected,
        ),
        (state, _) => {
          state.isLoading = false;
        },
      );
  },
});

export { reducer, actions };
