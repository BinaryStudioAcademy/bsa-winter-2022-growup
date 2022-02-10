import { createAsyncThunk } from '@reduxjs/toolkit';
import { StorageKey } from 'common/enums/app/storage-key.enum';
import { IUserLoginForm, IUserSignUpForm } from 'common/interfaces/user';
import { ThunkApiType } from 'store/store';
import { ActionType } from './common';

const loginUser = createAsyncThunk<string, IUserLoginForm, ThunkApiType>(
  ActionType.LOGIN_USER,
  async (request, { extra: { services } }) => {
    const { token } = await services.auth.loginUser(request);
    services.storage.setItem(StorageKey.TOKEN, token);
    return token;
  },
);

const signUpUser = createAsyncThunk<string, IUserSignUpForm, ThunkApiType>(
  ActionType.SIGN_UP_USER,
  async (request, { extra: { services } }) => {
    const { token } = await services.auth.signUpUser(request);
    services.storage.setItem(StorageKey.TOKEN, token);
    return token;
  },
);

export { loginUser, signUpUser };
