import { createAsyncThunk } from '@reduxjs/toolkit';

import { profile } from 'services/index';
import { ActionType } from './common';

const fetchProfile = createAsyncThunk(
  ActionType.FETCH,
  async (_, { rejectWithValue }) => {
    try {
      const result = await profile.fetchProfile();
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const updateAvatar = createAsyncThunk(
  ActionType.UPDATE_AVATAR,
  async (data: File, { rejectWithValue }) => {
    try {
      const result = await profile.updateAvatar(data);
      return result;
    } catch (err) {
      // eslint-disable-next-line
      console.log(err);
      return rejectWithValue(err);
    }
  },
);

export { fetchProfile, updateAvatar };
