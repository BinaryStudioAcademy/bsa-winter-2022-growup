import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { FirstStepFormType } from 'components/profile-settings/steps/common/types';
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

const insertPIB = createAsyncThunk(
  ActionType.INSERT_PIB,
  async (data: object, { rejectWithValue }) => {
    try {
      const result: FirstStepFormType = await profile.setPIB(data);
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
