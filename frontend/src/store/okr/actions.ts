import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { IOkr } from 'common/interfaces/okr';
import { IObjective } from 'common/interfaces/objective';
import { IKeyResult } from 'common/interfaces/key-result';
import {
  okr as okrApi,
  objective as objectiveApi,
  keyResult as keyResultApi,
} from 'services';

const getAllOkrsByUser_async = createAsyncThunk(
  ActionType.GET_ALL_OKRS,
  async (_, { dispatch }) => {
    const result = await okrApi.getAllOkr();

    if (result) {
      dispatch(actions.get_all_by_user(result));
    }
  },
);

const getOkrById_async = createAsyncThunk(
  ActionType.UPDATE_OKR_BY_ID,
  async (okrId: string, { dispatch }) => {
    const result = await okrApi.getOkrById(okrId);

    if (result) {
      dispatch(actions.update_okr_by_id(result));
    }
  },
);

const createOkr_async = createAsyncThunk(
  ActionType.UPDATE_OKR_BY_ID,
  async (
    okrBody: { name: string; endDate: Date; startDate: Date },
    { dispatch },
  ) => {
    const result = await okrApi.createOkr(okrBody);

    if (result) {
      dispatch(actions.update_okr_by_id(result));
    }
  },
);

const updateOkrById_async = createAsyncThunk(
  ActionType.UPDATE_OKR_BY_ID,
  async (okr: IOkr, { dispatch }) => {
    const result = await okrApi.updateOkr(okr);

    if (result) {
      dispatch(actions.update_okr_by_id(result));
    }
  },
);

const createObjective_async = createAsyncThunk(
  ActionType.UPDATE_OKR_BY_ID,
  async (
    {
      okrId,
      objectiveBody,
    }: { okrId: string; objectiveBody: { name: string; result: number } },
    { dispatch },
  ) => {
    const result = await objectiveApi.createObjective({ okrId, objectiveBody });

    if (result) {
      dispatch(actions.update_okr_by_id(result));
    }
  },
);

const updateObjective_async = createAsyncThunk(
  ActionType.UPDATE_OKR_BY_ID,
  async (
    { okrId, objective }: { okrId: string; objective: IObjective },
    { dispatch },
  ) => {
    const result = await objectiveApi.updateObjective({
      okrId,
      objective,
    });

    if (result) {
      dispatch(actions.update_okr_by_id(result));
    }
  },
);

const createKeyResult_async = createAsyncThunk(
  ActionType.UPDATE_OKR_BY_ID,
  async (
    {
      okrId,
      objectiveId,
      keyResultBody,
    }: {
      okrId: string;
      objectiveId: string;
      keyResultBody: IKeyResult;
    },
    { dispatch },
  ) => {
    const result = await keyResultApi.addKeyResult({
      okrId,
      objectiveId,
      keyResultBody,
    });

    if (result) {
      dispatch(actions.update_okr_by_id(result));
    }
  },
);
const okrActions = {
  ...actions,
  getAllOkrsByUser_async,
  getOkrById_async,
  createOkr_async,
  updateOkrById_async,
  createObjective_async,
  updateObjective_async,
  createKeyResult_async,
};

export { okrActions };