import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { IOkr } from 'common/interfaces/okr';
import { ActionType } from './common';

type State = {
  okrs: IOkr[];
};

const initialState: State = {
  okrs: [],
};

const { reducer, actions } = createSlice({
  name: ReducerName.OKR,
  initialState,
  reducers: {
    [ActionType.GET_ALL_OKRS]: (state, action: PayloadAction<IOkr[]>) => {
      state.okrs = action.payload;
    },
    [ActionType.UPDATE_OKR_BY_ID]: (state, action: PayloadAction<IOkr>) => {
      const index = state.okrs.findIndex((okr) => okr.id === action.payload.id);
      const newOkrs = [...state.okrs];
      newOkrs[index] = action.payload;
      state.okrs = newOkrs;
    },
  },
});

export { reducer, actions };
