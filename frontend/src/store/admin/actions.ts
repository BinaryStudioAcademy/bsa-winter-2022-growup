import { createAsyncThunk } from '@reduxjs/toolkit';
import { TagsApi } from 'services';

import type { TagCreation } from 'common/types/types';
import { ActionType } from './common';
import { ITag } from 'common/interfaces/tag/tag';

const fetchTags = createAsyncThunk(
  ActionType.FETCH_TAGS,
  async (_, { rejectWithValue }) => {
    try {
      const result = await TagsApi.fetchTags();
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
      const result = await TagsApi.createTags(data.map((tag) => tag.name));
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
      await TagsApi.deleteTag(data);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export { fetchTags, createTags, deleteTag };
