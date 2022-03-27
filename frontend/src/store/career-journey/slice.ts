import { createSlice } from '@reduxjs/toolkit';
import { getAllCareerJourneys } from './actions';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { ICareerJourney } from '../../components/profile/common/interfaces';

type State = {
  careerJourneys: ICareerJourney[];
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
