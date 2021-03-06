import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { ISkill } from 'components/skills/common/interfaces';
import { ActionType } from './common';
import SkillReducer from './reducer';

type State = {
  userSkill: ISkill[];
  allSkills: ISkill[];
  careerPathSkills: ISkill[];
};

const initialState: State = {
  userSkill: [],
  allSkills: [],
  careerPathSkills: [],
};

const { reducer, actions } = createSlice({
  name: ReducerName.SKILLS,
  initialState,
  reducers: {
    [ActionType.ADD_SKILL]: (state, action: PayloadAction<ISkill>) => {
      state.userSkill.push(action.payload);
    },
    [ActionType.REMOVE_SKILL]: (state, action: PayloadAction<string>) => {
      state.userSkill = state.userSkill.filter(
        (skill) => skill.id !== action.payload,
      );
    },
    [ActionType.EDIT_SKILL]: (state, action: PayloadAction<ISkill>) => {
      state.userSkill = state.userSkill.map((skill) => {
        if (skill.id === action.payload.id) {
          return action.payload;
        }
        return skill;
      });
    },
    [ActionType.SORT_NAME]: (state, action: PayloadAction<ISkill[]>) => {
      state.userSkill = action.payload;
    },
    [ActionType.MERGE_SKILLS]: (state, action: PayloadAction<ISkill[]>) => {
      state.userSkill = state.userSkill.concat(action.payload);
    },
  },
  extraReducers: SkillReducer,
});

export { reducer, actions };
