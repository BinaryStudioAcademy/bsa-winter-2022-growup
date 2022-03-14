import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { State, SortOption } from './common';
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
    state.isShowModal = false;
  });

  builder.addCase(actions.sortOpportunities, (state, action) => {
    if (action.payload.by === SortOption.DATE) {
      state.opportunities = state.opportunities.sort(
        (a, b) =>
          new Date(a.startDate || '').getTime() -
          new Date(b.startDate || '').getTime(),
      );

      return;
    }

    if (action.payload.by === SortOption.ORGANIZATION) {
      state.opportunities = state.opportunities.sort((a, b) => {
        if ((a.organization || '') < (b.organization || '')) return -1;
        if ((a.organization || '') > (b.organization || '')) return 1;
        return 0;
      });

      return;
    }

    state.opportunities = state.opportunities.sort((a, b) => {
      if ((a.name || '') < (b.name || '')) return -1;
      if ((a.name || '') < (b.name || '')) return 1;
      return 0;
    });
  });
};
export default opportunityReducer;
