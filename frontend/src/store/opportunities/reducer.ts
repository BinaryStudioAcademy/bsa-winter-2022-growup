import { ActionReducerMapBuilder, isAnyOf } from '@reduxjs/toolkit';
import { State, SortOption } from './common';
import * as actions from './actions';

const opportunityReducer = (builder: ActionReducerMapBuilder<State>): void => {
  builder
    .addCase(actions.fetchLoadOpportunities.fulfilled, (state, action) => {
      state.isShowModal = false;
      state.isLoaded = true;
      state.opportunities = action.payload;
    })
    .addCase(actions.showModal, (state, _) => {
      state.isShowModal = true;
    })
    .addCase(actions.closeModal, (state, _) => {
      state.isShowModal = false;
    })
    .addCase(actions.subscribeFollow, (state, action) => {
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
    })
    .addCase(actions.unSubscribeFollow, (state, action) => {
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
    })
    .addCase(actions.fetchNewOpportunity.fulfilled, (state, action) => {
      state.opportunities = [...state.opportunities, action.payload];
      state.isShowModal = false;
    })
    .addMatcher(
      isAnyOf(
        actions.fetchLoadOpportunities.rejected,
        actions.fetchNewOpportunity.rejected,
      ),
      (state, _) => {
        state.isLoaded = false;
      },
    );

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
