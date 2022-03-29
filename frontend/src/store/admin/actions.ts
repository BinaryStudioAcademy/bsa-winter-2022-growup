import { createAsyncThunk } from '@reduxjs/toolkit';
import { tags, users } from 'services';

import type { TagCreation } from 'common/types/types';
import { ActionType, IChangeRole } from './common';
import { ITag } from 'common/interfaces/tag/tag';
import { IUser } from 'common/interfaces/user';

const fetchTags = createAsyncThunk(
  ActionType.FETCH_TAGS,
  async (_, { rejectWithValue }) => {
    try {
      const result = await tags.fetchTags();
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const createTags = createAsyncThunk(
  ActionType.CREATE_TAGS,
  async (data: TagCreation[], { rejectWithValue }) => {
    try {
      const result = await tags.createTags(data.map((tag) => tag.name));
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const deleteTag = createAsyncThunk(
  ActionType.DELETE_TAG,
  async (data: ITag['id'], { rejectWithValue }) => {
    try {
      await tags.deleteTag(data);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const inviteUser = createAsyncThunk(
  ActionType.INVITE_USER,
  async (data: Pick<IUser, 'email' | 'role'>, { rejectWithValue }) => {
    try {
      return await users.inviteUser(data);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const resendMail = createAsyncThunk(
  ActionType.RESEND_MAIL,
  async (id: IUser['id'], { rejectWithValue }) => {
    try {
      return await users.resendActivationMail({ id });
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const getToken = createAsyncThunk(
  ActionType.GET_TOKEN,
  async (id: IUser['id'], { rejectWithValue }) => {
    try {
      return await users.getUrl({ id });
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const fetchUsers = createAsyncThunk(
  ActionType.FETCH_USERS,
  async (_, { rejectWithValue }) => {
    try {
      return await users.fetchUsers();
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const deleteUser = createAsyncThunk(
  ActionType.DELETE_USER,
  async (id: string, { rejectWithValue }) => {
    try {
      await users.deleteUser(id);
      return id;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const changeUserRole = createAsyncThunk(
  ActionType.CHANGE_ROLE,
  async (data: IChangeRole, { rejectWithValue }) => {
    try {
      const result = await users.changeUserRole(data);
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export {
  fetchTags,
  createTags,
  deleteTag,
  inviteUser,
  fetchUsers,
  deleteUser,
  changeUserRole,
  resendMail,
  getToken,
};
