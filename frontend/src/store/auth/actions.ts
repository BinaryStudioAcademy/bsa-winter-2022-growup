import { createAsyncThunk } from '@reduxjs/toolkit';
import { StorageKey } from 'common/enums/app/storage-key.enum';
import { IUserLoginForm, IUserSignUpForm } from 'common/interfaces/user';
import { ThunkApiType } from 'store/store';
import { ActionType } from './common';
import { parseJwt } from '../../helpers/token/parse-jwt';
import { RoleType } from '../../common/enums/user/roles.enum';

interface ITokenJson {
  userId: string;
  role: RoleType;
  companyId: string;
  iat: number;
  exp: number;
}

interface IResponseType {
  token: string;
  role: RoleType;
}

const loginUser = createAsyncThunk<IResponseType, IUserLoginForm, ThunkApiType>(
  ActionType.LOGIN_USER,
  async (request, { extra: { services } }) => {
    const { token } = await services.auth.loginUser(request);

    const parsedToken = parseJwt<ITokenJson>(token);
    const role = parsedToken.role;

    services.storage.setItem(StorageKey.TOKEN, token);
    return { token, role };
  },
);

const signUpUser = createAsyncThunk<
  IResponseType,
  IUserSignUpForm,
  ThunkApiType
>(ActionType.SIGN_UP_USER, async (request, { extra: { services } }) => {
  const { token } = await services.auth.signUpUser(request);
  services.storage.setItem(StorageKey.TOKEN, token);

  const parsedToken = parseJwt<ITokenJson>(token);
  const role = parsedToken.role;

  return { token, role };
});

export { loginUser, signUpUser };
