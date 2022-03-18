import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { StorageKey } from 'common/enums/app/storage-key.enum';
import { ICompany } from 'common/interfaces/company/company';
import { IUser, IUserLoginForm, IUserSignUpForm } from 'common/interfaces/user';
import { ThunkApiType } from 'store/store';
import { ActionType } from './common';

interface IReturnType {
  token: string;
  user: IUser;
}

const loginUser = createAsyncThunk<IReturnType, IUserLoginForm, ThunkApiType>(
  ActionType.LOGIN_USER,
  async (request, { extra: { services } }) => {
    const { token } = await services.auth.loginUser(request);
    services.storage.setItem(StorageKey.TOKEN, token);
    const user = await services.profile.fetchProfile();

    return { token, user };
  },
);

const signUpUser = createAsyncThunk<IReturnType, IUserSignUpForm, ThunkApiType>(
  ActionType.SIGN_UP_USER,
  async (request, { extra: { services } }) => {
    const { token } = await services.auth.signUpUser(request);
    services.storage.setItem(StorageKey.TOKEN, token);
    const user = await services.profile.fetchProfile();

    return { token, user };
  },
);

const getCurrentUser = createAsyncThunk<IUser, void, ThunkApiType>(
  ActionType.GET_USER,
  async (_, { extra: { services } }) => {
    return services.profile.fetchProfile();
  },
);

const updateUserCompany = createAction(
  ActionType.UPDATE_COMPANY,
  (company: ICompany) => ({ payload: { company } }),
);

export { getCurrentUser, loginUser, signUpUser, updateUserCompany };
