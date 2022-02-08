import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { IUser } from 'common/interfaces/user';
import { ActionType } from './common';

import { loginUser } from './actions';

type State = {
  user: IUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  token: string | null;
};

const initialState: State = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  token: localStorage.getItem('user_token'),
};

const { reducer, actions } = createSlice({
  name: ReducerName.AUTH,
  initialState,
  reducers: {
    [ActionType.SetUser]: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    [ActionType.RemoveUser]: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload!.accessToken;

      localStorage.setItem('user_token', action.payload!.accessToken);
    });

    builder.addCase(loginUser.rejected, (state, _) => {
      state.isLoading = false;
      state.token = null;

      localStorage.removeItem('user_token');
    });
  },
});

export { reducer, actions };
