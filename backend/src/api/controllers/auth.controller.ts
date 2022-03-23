import { UserLoginForm, UserRegisterForm } from '~/common/forms/user.forms';

import {
  registerUser,
  authenticateUser,
  getUserJWT,
  fetchUser,
} from '~/services/user.service';
import { findRole } from '~/services/role.service';
import { getUserQuiz } from '~/services/work-quiz.service';

import { User } from '~/data/entities/user';
import { UserRole } from '~/data/entities/user-role';
import { RoleType } from 'growup-shared';

type TokenResponse = {
  token: string;
};

type UserWithRole = Omit<User, 'password'> & {
  roleType: UserRole['role'];
  isCompleteTest: boolean;
};

type AuthenticationResponse = TokenResponse & {
  user: UserWithRole;
};

const authenticationController = async (
  user: User,
): Promise<AuthenticationResponse> => {
  const role = await findRole(user);
  const quiz = await getUserQuiz(user);

  const token = await getUserJWT(user, role);

  const { password: _, ...passwordLessUser } = user;
  const userResponse = {
    ...passwordLessUser,
    roleType: role.role,
    isCompleteTest: !!quiz,
  };

  return {
    user: userResponse as UserWithRole,
    token: token.token,
  };
};

const loginController = async (
  data: UserLoginForm,
): Promise<AuthenticationResponse> => {
  const user = await authenticateUser(data);
  return authenticationController(user);
};

const registerAdminController = async (
  data: UserRegisterForm,
): Promise<AuthenticationResponse> => {
  const user = await registerUser(data, RoleType.ADMIN);
  return authenticationController(user);
};

const fetchUserController = async (id: User['id']): Promise<UserWithRole> => {
  const user = await fetchUser(id);
  const response = await authenticationController(user);
  return response.user;
};

export { loginController, registerAdminController, fetchUserController };
