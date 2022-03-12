import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { profile } from 'services/index';
import { ActionType, NameAndPosition } from './common';

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
      return rejectWithValue(err);
    }
  },
);

const insertPIB = createAsyncThunk(
  ActionType.INSERT_PIB,
  async (data: object, { rejectWithValue }) => {
    try {
      const result: NameAndPosition = await profile.setPIB(data);
      return {
        firstName: result.firstName,
        lastName: result.lastName,
        position: result.position,
      };
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const completeTest = createAction(ActionType.COMPLETE_TEST);
export { fetchProfile, updateAvatar, insertPIB, completeTest };
