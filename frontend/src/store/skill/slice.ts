import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { ISkill } from '../../components/skills/common/interfaces';
import { ActionType } from './common';

type State = {
  userSkill: ISkill[];
};

const initialState: State = {
  userSkill: [
    {
      id: 1,
      name: 'UX Design',
      userId: 1,
      rating: ['1', '', '1'],
    },
    {
      id: 2,
      name: 'InVision',
      userId: 1,
      rating: ['8', '7', '8'],
    },
    {
      id: 3,
      name: 'UX Design',
      userId: 2,
      rating: ['3', '10', '8'],
    },
    {
      id: 4,
      name: 'Data Visualization',
      userId: 1,
      rating: ['7', '', '7'],
    },
    {
      id: 5,
      name: 'Mathematical',
      userId: 2,
      rating: ['8', '2', '5'],
    },
  ],
};

const { reducer, actions } = createSlice({
  name: ReducerName.SKILLS,
  initialState,
  reducers: {
    [ActionType.ADD_SKILL]: (state, action: PayloadAction<ISkill>) => {
      state.userSkill.push(action.payload);
    },
    [ActionType.REMOVE_SKILL]: (state, action: PayloadAction<number>) => {
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
  },
});

export { reducer, actions };
