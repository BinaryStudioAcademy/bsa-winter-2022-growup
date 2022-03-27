import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import * as actions from './actions';
import { State } from './common';

const okrReducer = (builder: ActionReducerMapBuilder<State>): void => {
  builder.addCase(actions.getAllOkrsByUser_async.fulfilled, (state, action) => {
    if (action.payload) {
      state.okrs = action.payload;
    }
  });
  builder.addCase(actions.updateOkrById_async.fulfilled, (state, action) => {
    if (action.payload) {
      state.okrs.push(action.payload);
    }
  });
};
export default okrReducer;

//   [ActionType.UPDATE_OKR_BY_ID]: (state, action: PayloadAction<IOkr>) => {
//     const index = state.okrs.findIndex((okr) => okr.id === action.payload.id);
//     const newOkrs = [...state.okrs];
//     newOkrs[index] = action.payload;
//     state.okrs = newOkrs;
//   }
