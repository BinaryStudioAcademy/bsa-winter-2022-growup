import type { Request } from 'express';
import { HttpCode, HttpError } from 'growup-shared';

import type {
  UserLoginForm,
  UserRegisterForm,
} from '../../common/forms/user.forms';
import {
  authenticateUser,
  registerUser,
  getUserJWT,
} from '../../services/user.service';

type TokenResponse = {
  token: string;
};

const loginUserController = async (req: Request): Promise<TokenResponse> => {
  const userCredentials: UserLoginForm = req.body;
  const user = await authenticateUser(userCredentials);

  if (!user)
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: 'Wrong credentials',
    });

  const token = await getUserJWT(user);
  return { token };
};

const registerUserController = async (req: Request): Promise<TokenResponse> => {
  const userCredentials: UserRegisterForm = req.body;
  const user = await registerUser(userCredentials);

  if (!user)
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: 'User with this email already exists',
    });

  const token = await getUserJWT(user);
  return { token };
};

export { loginUserController, registerUserController };
