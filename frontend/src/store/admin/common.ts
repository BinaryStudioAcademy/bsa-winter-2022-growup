import { ITag } from 'common/interfaces/tag/tag';
import { IUser } from 'common/interfaces/user/user';

export type State = {
  tags: ITag[];
  isLoading: boolean;
  users: IUser[];
};

export type SuccessResponse = {
  success: boolean;
  message: string;
};

enum ActionType {
  CREATE_TAGS = 'create-tags',
  FETCH_TAGS = 'fetch-tags',
  DELETE_TAG = 'delete-tag',

  INVITE_USER = 'invite-user',
  FETCH_USERS = 'fetch-users',
  DELETE_USER = 'delete-user',
  CHANGE_ROLE = 'change-role',

  CHANGE_POSITION = 'change-position',

  RESEND_MAIL = 'resend-mail',
  GET_TOKEN = 'get-registration-token',
}

export interface IChangeRole extends Pick<IUser, 'id' | 'role'> {}

export interface IChangePosition
  extends Pick<IUser, 'id' | 'level' | 'position'> {}

export { ActionType };
