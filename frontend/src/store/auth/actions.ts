import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { StorageKey } from 'common/enums/app/storage-key.enum';
import { ICompany } from 'common/interfaces/company/company';
import {
  IToken,
  IUser,
  IUserLoginForm,
  IUserSignUpForm,
} from 'common/interfaces/user';
import { FirstStepFormType } from 'components/profile-settings/steps/common/types';
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

const verifyRegistrationToken = createAsyncThunk<IToken, string, ThunkApiType>(
  ActionType.VERIFY_REGISTER_TOKEN,
  async (token, { rejectWithValue, extra: { services } }) => {
    try {
      const result = await services.auth.verifyRegistrationToken(token);
      services.storage.setItem(StorageKey.TOKEN, result.token);
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const finishRegistration = createAsyncThunk<
  IUser,
  FirstStepFormType,
  ThunkApiType
>(
  ActionType.FINISH_REGISTRATION,
  async (data, { rejectWithValue, extra: { services } }) => {
    try {
      const result = await services.auth.finishRegistration(data);
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export {
  getCurrentUser,
  loginUser,
  signUpUser,
  verifyRegistrationToken,
  finishRegistration,
  updateUserCompany,
};
