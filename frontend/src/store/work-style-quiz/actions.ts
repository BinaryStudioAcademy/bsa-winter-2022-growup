import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType } from './common';
import { workStyleQuiz } from 'services/index';
import { IQuestion } from 'common/interfaces/user-quiz';

const fetchWorkStyleQuiz = createAsyncThunk(
  ActionType.FETCH,
  async (_, { rejectWithValue }) => {
    try {
      const result = await workStyleQuiz.fetchWorkStyleQuiz();
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const updateWorkStyleQuizQuestion = createAsyncThunk(
  ActionType.UPDATE_QUESTION,
  async (data: IQuestion, { rejectWithValue }) => {
    try {
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const sendWorkStyleQuizResults = createAsyncThunk(
  ActionType.SEND,
  async (data: IQuestion[], { rejectWithValue }) => {
    try {
      const result = await workStyleQuiz.sendWorkStyleResults(data);
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
const getWorkStyleQuizResults = createAsyncThunk(
  ActionType.GET,
  async (_, { rejectWithValue }) => {
    try {
      const result = await workStyleQuiz.getWorkStyleQuizRestult();
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export {
  fetchWorkStyleQuiz,
  updateWorkStyleQuizQuestion,
  sendWorkStyleQuizResults,
  getWorkStyleQuizResults,
};
