import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { ActionType } from './common';

type State = {
  value: number;
};

const initialState: State = {
  value: 0,
};

const { reducer, actions } = createSlice({
  name: ReducerName.COUNTER,
  initialState,
  reducers: {
    [ActionType.INCREMENT]: (state) => {
      state.value += 1;
    },
    [ActionType.DECREMENT]: (state) => {
      state.value -= 1;
    },
    [ActionType.INCREMENT_BY_AMOUNT]: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export { reducer, actions };
