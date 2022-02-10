import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';

const incrementAsync = createAsyncThunk(
  ActionType.INCREMENT_BY_AMOUNT,
  (amount: number, { dispatch }) => {
    setTimeout(() => {
      dispatch(actions.incrementByAmount(amount));
    }, 1000);
  },
);

const counterActions = {
  ...actions,
  incrementAsync,
};

export { counterActions };
