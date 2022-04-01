import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IConnectLevelsSetting,
  IDisconnectLevelsSetting,
  IDomainSetting,
  ILevelSetting,
  IObjectiveSetting,
  ISkillSetting,
} from 'common/interfaces/career-path';
import { careerPath } from 'services/index';
import { ActionType } from './common';
import { ThunkApiType } from '../store';
import { ICareerPathLevel } from 'components/career-path/common/interfaces';

const fetchDomains = createAsyncThunk(
  ActionType.FETCH_DOMAINS,
  async (_, { rejectWithValue }) => {
    try {
      const result = await careerPath.fetchDomains();
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const createDomain = createAsyncThunk(
  ActionType.ADD_DOMAIN,
  async (domain: IDomainSetting, { rejectWithValue }) => {
    try {
      const result = await careerPath.createDomain(domain);
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const updateDomain = createAsyncThunk(
  ActionType.UPDATE_DOMAIN,
  async (domain: IDomainSetting & { id: string }, { rejectWithValue }) => {
    try {
      const result = await careerPath.updateDomain(domain);
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const deleteDomain = createAsyncThunk(
  ActionType.DELETE_DOMAIN,
  async (id: string, { rejectWithValue }) => {
    try {
      const result = await careerPath.deleteDomain(id);
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const fetchAllLevels = createAsyncThunk<
  ICareerPathLevel[],
  string,
  ThunkApiType
>(ActionType.FETCH_ALL_LEVELS, async (initialId, { extra: { services } }) => {
  const levels = [];
  const levelIds = [initialId];

  while (levelIds.length) {
    const currentId = levelIds.shift();
    if (!currentId) continue;

    const level = await services.careerPath.fetchLevel(currentId);
    levelIds.push(...level.nextLevels);
    levels.push(level);
  }

  return levels;
});

const fetchLevel = createAsyncThunk<ICareerPathLevel, string, ThunkApiType>(
  ActionType.FETCH_LEVEL,
  (id, { extra: { services } }) => {
    return services.careerPath.fetchLevel(id);
  },
);

const createLevel = createAsyncThunk(
  ActionType.ADD_LEVEL,
  async (level: ILevelSetting, { rejectWithValue }) => {
    try {
      const result = await careerPath.createLevel(level);
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const updateLevel = createAsyncThunk(
  ActionType.UPDATE_LEVEL,
  async (level: ILevelSetting & { id: string }, { rejectWithValue }) => {
    try {
      const result = await careerPath.updateLevel(level);
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const deleteLevel = createAsyncThunk(
  ActionType.DELETE_LEVEL,
  async (level: ILevelSetting & { id: string }, { rejectWithValue }) => {
    try {
      const result = await careerPath.deleteLevel(level.id);
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const createSkill = createAsyncThunk(
  ActionType.ADD_SKILL,
  async (skill: ISkillSetting, { rejectWithValue }) => {
    try {
      const result = await careerPath.createSkill(skill);
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const updateSkill = createAsyncThunk(
  ActionType.UPDATE_SKILL,
  async (skill: ISkillSetting & { id: string }, { rejectWithValue }) => {
    try {
      const result = await careerPath.updateSkill(skill);
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const deleteSkill = createAsyncThunk(
  ActionType.DELETE_SKILL,
  async (skill: ISkillSetting & { id: string }, { rejectWithValue }) => {
    try {
      const result = await careerPath.deleteSkill(skill.id);
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const createObjective = createAsyncThunk(
  ActionType.ADD_OBJECTIVE,
  async (objective: IObjectiveSetting, { rejectWithValue }) => {
    try {
      const result = await careerPath.createObjective(objective);
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const updateObjective = createAsyncThunk(
  ActionType.UPDATE_OBJECTIVE,
  async (
    objective: IObjectiveSetting & { id: string },
    { rejectWithValue },
  ) => {
    try {
      const result = await careerPath.updateObjective(objective);
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const deleteObjective = createAsyncThunk(
  ActionType.DELETE_OBJECTIVE,
  async (
    objective: IObjectiveSetting & { id: string },
    { rejectWithValue },
  ) => {
    try {
      const result = await careerPath.deleteObjective(objective.id);
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const connectLevels = createAsyncThunk(
  ActionType.CONNECT_LEVELS,
  async (
    { levelId, nextLevelId }: IConnectLevelsSetting,
    { rejectWithValue },
  ) => {
    try {
      const result = await careerPath.connectLevels(levelId, nextLevelId);
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const disconnectLevels = createAsyncThunk(
  ActionType.DISCONNECT_LEVELS,
  async (
    { levelId, nextLevelId }: IDisconnectLevelsSetting,
    { rejectWithValue },
  ) => {
    try {
      const result = await careerPath.disconnectLevels(levelId, nextLevelId);
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

// const connectDomains  = createAsyncThunk(
//   ActionType.CONNECT_DOMAINS,
//   async ({ domainId, nextDomainId }: IConnectDomainsSetting, { rejectWithValue }) => {
//     try {
//       const result = await careerPath.connectDomains(domainId, nextDomainId);
//       return result;
//     } catch (err) {
//       return rejectWithValue(err);
//     }
//   },
// );

// const disconnectDomains  = createAsyncThunk(
//   ActionType.DISCONNECT_DOMAINS,
//   async ({ domainId } : { domainId: IConnectDomainsSetting['domainId'] }, { rejectWithValue }) => {
//     try {
//       const result = await careerPath.disconnectDomains(domainId);
//       return result;
//     } catch (err) {
//       return rejectWithValue(err);
//     }
//   },
// );

export {
  fetchDomains,
  createDomain,
  updateDomain,
  deleteDomain,
  createLevel,
  updateLevel,
  deleteLevel,
  fetchAllLevels,
  fetchLevel,
  createSkill,
  updateSkill,
  deleteSkill,
  createObjective,
  updateObjective,
  deleteObjective,
  connectLevels,
  disconnectLevels,
  // connectDomains,
  // disconnectDomains,
};
