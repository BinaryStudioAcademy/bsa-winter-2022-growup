import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
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
  async (data: Blob, { rejectWithValue }) => {
    try {
      const result = await profile.updateAvatar(data);
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const completeTest = createAction(ActionType.COMPLETE_TEST);
export { fetchProfile, updateAvatar, completeTest };
