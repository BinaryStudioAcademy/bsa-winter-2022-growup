import { createAsyncThunk } from '@reduxjs/toolkit';
import { ISkill } from 'common/interfaces/skill/skill';
import { skills } from 'services';
import { ActionType } from './common';

const fetchSkills = createAsyncThunk(
  ActionType.FETCH_SKILL,
  async (_, { rejectWithValue }) => {
    try {
      const result = await skills.fetchSkill();
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const createSkill = createAsyncThunk(
  ActionType.CREATE_SKILLS,
  async (data: ISkill[], { rejectWithValue }) => {
    try {
      const result = await skills.createSkill(data);
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const deleteSkill = createAsyncThunk(
  ActionType.DELETE_SKILL,
  async (data: string, { rejectWithValue }) => {
    try {
      await skills.deleteSkill(data);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const updateSkill = createAsyncThunk(
  ActionType.UPDATE_SKILL,
  async (data: ISkill[], { rejectWithValue }) => {
    try {
      const result = await skills.updateSkill(data);
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export { fetchSkills, createSkill, deleteSkill, updateSkill };
