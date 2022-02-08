import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType } from './common';
import { AuthApi } from 'services';

import { IUserLoginForm } from 'common/interfaces/user';

const loginUser = createAsyncThunk(
  ActionType.LOGIN_USER,
  async (data: IUserLoginForm, { rejectWithValue }) => {
    const api = new AuthApi();
    try {
      const result = await api.loginUser(data);
      return result;
    } catch (err) {
      rejectWithValue(err);
    }
  },
);

export { loginUser };
