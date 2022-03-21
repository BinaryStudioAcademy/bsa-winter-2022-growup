import { createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { HomePageState, NotificationTypes } from './common';
import homepageReducer from './reducer';

const initialState: HomePageState = {
  opportunities: [
    {
      name: 'Learning JS',
      organization: 'Data System Opp',
      startDate: new Date(2022, 2, 20).toISOString(),
      type: 'Project/Lecture',
      tagsData: ['Programming'],
    },
    {
      name: 'QA Testing Like God',
      organization: 'Company Query',
      startDate: new Date(2022, 2, 22).toISOString(),
      type: 'Lectury/HomeWork',
      tagsData: ['Testing'],
    },
    {
      name: 'How to improve your bussiness skills',
      organization: 'Imporove Yourself',
      startDate: new Date(2022, 2, 12).toISOString(),
      type: 'Lecture',
      tagsData: ['Bussiness'],
    },
  ],
  notifications: [
    {
      title: 'Notification__item',
      type: NotificationTypes.approve_skills,
    },
    {
      title: 'Notification__item',
      type: NotificationTypes.opportunities,
    },
    {
      title: 'Notification__item',
      type: NotificationTypes.okr,
    },
    {
      title: 'Notification__item',
      type: NotificationTypes.okr,
    },
    {
      title: 'Notification__item',
      type: NotificationTypes.opportunities,
    },
  ],
};

const { reducer, actions } = createSlice({
  name: ReducerName.HOME_PAGE,
  initialState,
  reducers: {},
  extraReducers: homepageReducer,
});

export { reducer, actions };
