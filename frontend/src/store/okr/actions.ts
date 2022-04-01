import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ActionType,
  ICloseOkr,
  ICreateKeyResult,
  ICreateNewObjective,
  IDeleteObjective,
  IUpdateNewObjective,
  StatusType,
} from './common';
import { IOkr } from 'common/interfaces/okr';
import {
  keyResult as keyResultApi,
  objective as objectiveApi,
  okr as okrApi,
} from 'services';

const getAllOkrsByUser_async = createAsyncThunk(
  ActionType.GET_ALL_OKRS,
  async (_, { rejectWithValue }) => {
    try {
      const result = await okrApi.getAllOkr();
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const getOkrById_async = createAsyncThunk(
  ActionType.UPDATE_OKR_BY_ID,
  async (okrId: string, { rejectWithValue }) => {
    try {
      const result = await okrApi.getOkrById(okrId);
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const createOkr_async = createAsyncThunk(
  ActionType.CREATE_OKR,
  async (okrBody: IOkr, { rejectWithValue }) => {
    try {
      const result = await okrApi.createOkr(okrBody);
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const updateOkrById_async = createAsyncThunk(
  ActionType.UPDATE_OKR_BY_ID,
  async (okr: IOkr, { dispatch }) => {
    await okrApi.updateOkr(okr);
    dispatch(getAllOkrsByUser_async());
  },
);

const createObjective_async = createAsyncThunk(
  ActionType.CREATE_OBJECTIVES,
  async (
    { okrId, objectiveBody, keyResults }: ICreateNewObjective,
    { rejectWithValue },
  ) => {
    try {
      const result = await objectiveApi.createObjective({
        okrId,
        objectiveBody,
        keyResults,
      });
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const updateObjective_async = createAsyncThunk(
  ActionType.UPDATE_OBJECTIVE,
  async (
    { okrId, objectiveId, objectiveBody, keyResults }: IUpdateNewObjective,
    { rejectWithValue },
  ) => {
    try {
      const result = await objectiveApi.updateObjective({
        okrId,
        objectiveId,
        objectiveBody,
        keyResults,
      });
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const createKeyResult_async = createAsyncThunk(
  ActionType.UPDATE_OKR_BY_ID,
  async (
    { okrId, objectiveId, keyResultBody }: ICreateKeyResult,
    { rejectWithValue },
  ) => {
    try {
      const result = await keyResultApi.addKeyResult({
        okrId,
        objectiveId,
        keyResultBody,
      });
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const closeOkr = createAsyncThunk(
  ActionType.CLOSE_OKR,
  async ({ okrId }: ICloseOkr, { rejectWithValue }) => {
    try {
      const result = await okrApi.updateOkrStatus(okrId, StatusType.close);
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const deleteOkr = createAsyncThunk(
  ActionType.DELETE_OKR,
  async ({ okrId }: ICloseOkr, { rejectWithValue }) => {
    try {
      await okrApi.deleteOkr(okrId);
      return okrId;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const deleteObjective = createAsyncThunk(
  ActionType.DELETE_OBJECTIVES,
  async ({ objectiveId, okrId }: IDeleteObjective, { rejectWithValue }) => {
    try {
      await objectiveApi.deleteObjective({ objectiveId });
      return { objectiveId, okrId };
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export {
  getAllOkrsByUser_async,
  getOkrById_async,
  createOkr_async,
  updateOkrById_async,
  createObjective_async,
  updateObjective_async,
  createKeyResult_async,
  closeOkr,
  deleteOkr,
  deleteObjective,
};
