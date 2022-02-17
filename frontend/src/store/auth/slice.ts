import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { IUser } from 'common/interfaces/user';
import { loginUser, signUpUser } from './actions';
import { ActionType } from './common';
import { RoleType } from '../../common/enums/user/roles.enum';

type PartialUserType = Partial<IUser> & {
  roleType: typeof RoleType[keyof typeof RoleType];
};

const createUser = (userShape: PartialUserType): IUser => {
  return Object.assign(
    {
      firstName: '',
      lastName: '',
      avatar: '',
      companyId: '',
      createdAt: '',
      updatedAt: '',
      deletedAt: '',
      id: '',
      fullName: '',
      email: '',
    },
    userShape,
  );
};

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
    builder
      .addMatcher(
        isAnyOf(loginUser.pending, signUpUser.pending),
        (state, _) => {
          state.isLoading = true;
        },
      )
      .addMatcher(
        isAnyOf(loginUser.fulfilled, signUpUser.fulfilled),
        (state, action) => {
          state.isAuthenticated = true;
          state.isLoading = false;
          state.user = createUser({ roleType: action.payload.role });
        },
      )
      .addMatcher(
        isAnyOf(loginUser.rejected, signUpUser.rejected),
        (state, _) => {
          state.isLoading = false;
        },
      );
  },
});

export { reducer, actions };
