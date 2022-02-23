import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { State } from './common';
import * as actions from './actions';

const opportunityReducer = (builder: ActionReducerMapBuilder<State>): void => {
  builder.addCase(actions.fetchLoadOpp.fulfilled, (state, action) => {
    state.isShowModal = false;
    state.isLoaded = true;
    state.opportunities = action.payload;
  });
  builder.addCase(actions.showModal, (state, _) => {
    state.isShowModal = true;
  });
  builder.addCase(actions.closeModal, (state, _) => {
    state.isShowModal = false;
  });
  builder.addCase(actions.subscribeFollow, (state, action) => {
    const newOpportunities = [...state.opportunities];
    const followIndex = state.opportunities.findIndex(
      (item) => item.id === action.payload.id,
    );
    const followItem = Object.assign(
      {},
      newOpportunities.splice(followIndex, 1)[0],
    );
    followItem.isFollow = true;
    newOpportunities.unshift(followItem);
    state.opportunities = newOpportunities;
  });
  builder.addCase(actions.unSubscribeFollow, (state, action) => {
    const newOpportunities = [...state.opportunities];
    const followIndex = state.opportunities.findIndex(
      (item) => item.id === action.payload.id,
    );
    const followItem = Object.assign(
      {},
      newOpportunities.splice(followIndex, 1)[0],
    );
    followItem.isFollow = false;
    newOpportunities.push(followItem);
    state.opportunities = newOpportunities;
  });
  builder.addCase(actions.fetchNewOpp.fulfilled, (state, action) => {
    state.opportunities = [...state.opportunities, action.payload];
  });
};
export default opportunityReducer;
