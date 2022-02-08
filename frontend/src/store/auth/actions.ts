import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUserLoginForm } from 'common/interfaces/user';
import { AuthApi, Http } from 'services';
import { ActionType } from './common';

const loginUser = createAsyncThunk(
  ActionType.LOGIN_USER,
  async (data: IUserLoginForm) => {
    const api = new AuthApi({ apiPath: '/user', http: new Http() });
    const result = await api.loginUser(data);
    return result;
  },
);

export { loginUser };
