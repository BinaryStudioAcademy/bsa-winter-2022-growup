import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { IUser } from 'common/interfaces/user';
import { loginUser } from './actions';
import { ActionType } from './common';

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
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, _) => {
      state.isLoading = true;
    });

    builder.addCase(loginUser.fulfilled, (state) => {
      state.isAuthenticated = true;
      state.isLoading = false;
    });

    builder.addCase(loginUser.rejected, (state, _) => {
      state.isLoading = false;
    });
  },
});

export { reducer, actions };
