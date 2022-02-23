import { createSlice } from '@reduxjs/toolkit';
import { getAllCareerJourneys } from './actions';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { CareerJourney } from '../../components/profile/components/profile-info/interfaces';

type State = {
  careerJourneys: CareerJourney[];
};

const initialState: State = {
  careerJourneys: [],
};

const { reducer, actions } = createSlice({
  name: ReducerName.CAREER_JOURNEY,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCareerJourneys.fulfilled, (state, action) => {
      state.careerJourneys = action.payload;
    });
  },
});

export { reducer, actions };
