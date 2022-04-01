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
    .addCase(actions.createObjective_async.fulfilled, (state, action) => {
      if (action.payload) {
        const index = state.okrs.findIndex(
          (okr) => okr.id === action.payload?.okr?.id.toString(),
        );
        state.okrs[index].objectives?.push({
          ...action.payload,
        });
      }
    })
    .addCase(actions.createOkr_async.fulfilled, (state, action) => {
      if (action.payload) {
        state.okrs.push(action.payload);
      }
    })
    .addCase(actions.updateObjective_async.fulfilled, (state, action) => {
      if (action.payload) {
        const index = state.okrs.findIndex(
          (okr) => okr.id === action.payload?.okr?.id.toString(),
        );
        const indexObjective = state.okrs[index].objectives?.findIndex(
          (objective) => objective.id === action.payload?.id.toString(),
        ) as number;
        state.okrs[index].objectives[indexObjective] = action.payload;
      }
    })
    .addCase(actions.closeOkr.fulfilled, (state, action) => {
      if (action.payload) {
        const index = state.okrs.findIndex(
          (item) => item.id === action.payload?.id,
        );
        state.okrs[index].status = action.payload.status;
      }
    })
    .addCase(actions.deleteOkr.fulfilled, (state, action) => {
      if (action.payload) {
        const index = state.okrs.findIndex(
          (item) => item.id === action.payload,
        );
        state.okrs.splice(index, 1);
      }
    })
    .addCase(actions.deleteObjective.fulfilled, (state, action) => {
      if (action.payload) {
        const okrIndex = state.okrs.findIndex(
          (item) => item.id === action.payload.okrId,
        );
        const objectiveIndex = state.okrs[okrIndex].objectives?.findIndex(
          (item) => item.id === action.payload.objectiveId,
        ) as number;
        state.okrs[okrIndex]?.objectives?.splice(objectiveIndex, 1);
      }
    });
};
export default okrReducer;
