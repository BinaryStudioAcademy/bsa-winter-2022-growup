import { createAsyncThunk } from '@reduxjs/toolkit';
import { tags, users } from 'services';

import type { TagCreation } from 'common/types/types';
import { ActionType } from './common';
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
      await users.inviteUser(data);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export { fetchTags, createTags, deleteTag, inviteUser };
