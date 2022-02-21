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

const getAllOkrs_async = createAsyncThunk(
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
  async (okrBody: IOkr, { dispatch }) => {
    const result = await okrApi.createOkr(okrBody);

    if (result) {
      dispatch(actions.update_okr_by_id(result));
    }
  },
);

const updateOkrById_async = createAsyncThunk(
  ActionType.UPDATE_OKR_BY_ID,
  async (
    { okrId, okrBody }: { okrId: string; okrBody: IOkr },
    { dispatch },
  ) => {
    const result = await okrApi.updateOkr({ okrId, okrBody });

    if (result) {
      dispatch(actions.update_okr_by_id(result));
    }
  },
);

const createObjective_async = createAsyncThunk(
  ActionType.UPDATE_OKR_BY_ID,
  async (
    { okrId, objectiveBody }: { okrId: string; objectiveBody: IObjective },
    { dispatch },
  ) => {
    const result = await objectiveApi.addObjective({ okrId, objectiveBody });

    if (result) {
      dispatch(actions.update_okr_by_id(result));
    }
  },
);

const updateObjective_async = createAsyncThunk(
  ActionType.UPDATE_OKR_BY_ID,
  async (
    {
      okrId,
      objectivId,
      objectiveBody,
    }: { okrId: string; objectivId: string; objectiveBody: IObjective },
    { dispatch },
  ) => {
    const result = await objectiveApi.updateObjective({
      okrId,
      objectivId,
      objectiveBody,
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
  getAllOkrs_async,
  getOkrById_async,
  createOkr_async,
  updateOkrById_async,
  createObjective_async,
  updateObjective_async,
  createKeyResult_async,
};

export { okrActions };
