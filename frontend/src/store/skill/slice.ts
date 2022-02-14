import { createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { ISkill } from './common/interfaces';

type State = {
    UserSkill: ISkill[];
};

const initialState: State = {
    UserSkill: [
        {
            id: 1,
            name: 'UX Design',
            userId: 1,
        },
        {
            id: 2,
            name: 'InVision',
            userId: 1,
        },
        {
            id: 3,
            name: 'UX Design',
            userId: 2,
        },
        {
            id: 4,
            name: 'Data Visualization',
            userId: 1,
        },
        {
            id: 5,
            name: 'Mathematical',
            userId: 2,
        },
    ],
};

const { reducer, actions } = createSlice({
  name: ReducerName.SKILL,
  initialState,
  reducers: {
  },
});

export { reducer, actions };
