import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { AuthApi } from 'services';

const login = createAsyncThunk(
  ActionType.SetUser,
  // eslint-disable-next-line
  async (loginPayload: any, { dispatch }) => {
    const loginResponse = await new AuthApi().loginUser(loginPayload);
    dispatch(actions.setUser(loginResponse));
  },
);

const authActions = {
  ...actions,
  login,
};

export {
  authActions,
};
