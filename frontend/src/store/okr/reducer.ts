import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import * as actions from './actions';
import { State } from './common';

const okrReducer = (builder: ActionReducerMapBuilder<State>): void => {
  builder
    .addCase(actions.getAllOkrsByUser_async.fulfilled, (state, action) => {
      if (action.payload) {
        state.okrs = action.payload;
      }
    })
    .addCase(actions.updateOkrById_async.fulfilled, (state, action) => {
      if (action.payload) {
        state.okrs.push(action.payload);
      }
    })
    .addCase(actions.createObjective_async.fulfilled, (state, action) => {
      if (action.payload && state.okrs[0].objectives && action.payload.okr) {
        const index = state.okrs.findIndex(
          (okr) => okr.id === action.payload?.okr?.id.toString(),
        );
        state.okrs[index].objectives?.push({
          ...action.payload,
          keyResults: [],
        });
      }
    })
    .addCase(actions.closeOkr.fulfilled, (state, action) => {
      if (action.payload) {
        const index = state.okrs.findIndex(
          (item) => item.id === action.payload?.id,
        );
        state.okrs[index].status = action.payload.status;
      }
    });
};
export default okrReducer;
