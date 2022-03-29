import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { IUser } from 'common/interfaces/user';
import {
  getCurrentUser,
  loginUser,
  signUpUser,
  updateUserCompany,
  finishRegistration,
  verifyRegistrationToken,
} from './actions';
import { ActionType } from './common';
import { StorageKey } from 'common/enums/app/storage-key.enum';
import { storage } from 'services';

type State = {
  user: IUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isReject: boolean;
};

const initialState: State = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  isReject: false,
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
    builder
      .addCase(finishRegistration.fulfilled, (state, action) => {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      })
      .addCase(verifyRegistrationToken.fulfilled, (state, _) => {
        state.isAuthenticated = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(updateUserCompany, (state, action) => {
        if (state.user) {
          const { company } = action.payload;
          state.user.company = company;
        }
      })
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
          state.isReject = true;
        },
      );
  },
});

export { reducer, actions };
