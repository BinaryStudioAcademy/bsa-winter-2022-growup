import { createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { IUser, IOkr } from '../common/interfaces';

type State = {
    user: IUser,
    okr: IOkr[],
};

const initialState: State = {
    user: {
        id: 1,
        email: 'rui@gmail.com',
        password: 123,
        firstname: 'Rui',
        lastname: 'Tachibana',
        companyId: 0,
        mentorId: 0,
        domenLevelId: 0,
    },
    okr: [
        {
            id: 1,
            name: 'Q1',
            startDate: `${new Date().getDate()}th ${new Date().getMonth()} ${new Date().getFullYear()}`,
            endDate: `${new Date().getDate()}th ${new Date().getMonth()} ${new Date().getFullYear()}`,
            userId: 1,
            objective: [
                {
                    id: 1,
                    name: 'Object1',
                    skillObjectiveId: 1,
                    okrId: 1,
                    result: 58,
                },
                {
                    id: 2,
                    name: 'Object2',
                    skillObjectiveId: 2,
                    okrId: 1,
                    result: 87,
                },
                {
                    id: 3,
                    name: 'Object3',
                    skillObjectiveId: 3,
                    okrId: 1,
                    result: 51,
                },
            ],
            keyResult: [
                {
                    id: 1,
                    name: 'Result1',
                    objectiveId: 1,
                },
                {
                    id: 3,
                    name: 'Result3',
                    objectiveId: 1,
                },
                {
                    id: 5,
                    name: 'Result5',
                    objectiveId: 2,
                },
                {
                    id: 4,
                    name: 'Result4',
                    objectiveId: 3,
                },
            ],
        },
        {
            id: 2,
            name: 'Q2',
            startDate: `${new Date().getDate()}th ${new Date().getMonth()} ${new Date().getFullYear()}`,
            endDate: `${new Date().getDate()}th ${new Date().getMonth()} ${new Date().getFullYear()}`,
            userId: 2,
            objective: [
                {
                    id: 4,
                    name: 'Object4',
                    skillObjectiveId: 4,
                    okrId: 2,
                    result: 23,
                },
            ],
            keyResult: [
                {
                    id: 2,
                    name: 'Result2',
                    objectiveId: 4,
                },
            ],
        },
        {
            id: 3,
            name: 'Q3',
            startDate: `${new Date().getDate()}th ${new Date().getMonth()} ${new Date().getFullYear()}`,
            endDate: `${new Date().getDate()}th ${new Date().getMonth()} ${new Date().getFullYear()}`,
            userId: 1,
            objective: [],
            keyResult: [],
        },
        {
            id: 4,
            name: 'Q4',
            startDate: `${new Date().getDate()}th ${new Date().getMonth()} ${new Date().getFullYear()}`,
            endDate: `${new Date().getDate()}th ${new Date().getMonth()} ${new Date().getFullYear()}`,
            userId: 1,
            objective: [],
            keyResult: [],
        },
        {
            id: 5,
            name: 'Q5',
            startDate: `${new Date().getDate()}th ${new Date().getMonth()} ${new Date().getFullYear()}`,
            endDate: `${new Date().getDate()}th ${new Date().getMonth()} ${new Date().getFullYear()}`,
            userId: 2,
            objective: [],
            keyResult: [],
        },
        {
            id: 6,
            name: 'Q6',
            startDate: `${new Date().getDate()}th ${new Date().getMonth()} ${new Date().getFullYear()}`,
            endDate: `${new Date().getDate()}th ${new Date().getMonth()} ${new Date().getFullYear()}`,
            userId: 1,
            objective: [],
            keyResult: [],
        },
    ],
};

const { reducer, actions } = createSlice({
  name: ReducerName.OKR,
  initialState,
  reducers: {
  },
});

export { reducer, actions };
