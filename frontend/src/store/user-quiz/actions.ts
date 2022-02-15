import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType } from './common';
import { userQuiz } from 'services/index';

const fetchWorkStyleQuiz = createAsyncThunk(
  ActionType.CREATE,
  async (_, { rejectWithValue }) => {
    try {
      const result = await userQuiz.fetchWorkStyleQuiz();
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export { fetchWorkStyleQuiz };
