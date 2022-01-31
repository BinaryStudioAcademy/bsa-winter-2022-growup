import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { IUser } from 'common/interfaces/user';
import { ActionType } from './common';

type State = {
  user: IUser | null;
};

const initialState: State = {
  user: null,
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
});

export { reducer, actions };
