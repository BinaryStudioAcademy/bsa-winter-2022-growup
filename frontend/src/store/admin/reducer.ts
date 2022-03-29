import { ActionReducerMapBuilder, isAnyOf } from '@reduxjs/toolkit';

import type { State } from './common';
import * as actions from './actions';

const Reducer = (builder: ActionReducerMapBuilder<State>): void => {
  builder.addCase(actions.createTags.fulfilled, (state, action) => {
    state.isLoading = false;
    state.tags.push(...(action.payload?.tags as State['tags']));
  });

  builder.addCase(actions.fetchTags.fulfilled, (state, action) => {
    state.isLoading = false;
    if (action.payload) {
      state.tags = action.payload as State['tags'];
    }
  });

  builder.addCase(actions.deleteTag.fulfilled, (state, action) => {
    state.tags = state.tags.filter((tag) => tag.id !== action.payload);
  });

  builder.addCase(actions.fetchUsers.fulfilled, (state, action) => {
    state.users = action.payload || [];
  });

  builder.addCase(actions.inviteUser.fulfilled, (state, action) => {
    if (action.payload) state.users.push(action.payload);
  });

  builder.addCase(actions.deleteUser.fulfilled, (state, action) => {
    if (action.payload) {
      const id = state.users.findIndex((item) => item.id == action.payload);
      state.users.splice(id, 1);
    }
  });

  builder.addCase(actions.changeUserRole.fulfilled, (state, action) => {
    if (action.payload) {
      const id = state.users.findIndex((user) => user.id === action.payload.id);
      state.users[id].role = action.payload.role;
    }
  });

  builder.addCase(actions.changeUserPosition.fulfilled, (state, action) => {
    if (action.payload) {
      const id = state.users.findIndex((user) => user.id === action.payload.id);
      state.users[id].position = action.payload.position;
      state.users[id].level = action.payload.level;
    }
  });

  builder.addMatcher(
    isAnyOf(actions.createTags.pending, actions.fetchTags.pending),
    (state, _) => {
      state.isLoading = true;
    },
  );

  builder.addMatcher(
    isAnyOf(actions.createTags.rejected, actions.fetchTags.rejected),
    (state, _) => {
      state.isLoading = false;
    },
  );
};

export default Reducer;
