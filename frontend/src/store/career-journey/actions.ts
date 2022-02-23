import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkApiType } from 'store/store';
import { ActionType } from './common';
import { CareerJourney } from '../../components/profile/components/profile-info/interfaces';

const getAllCareerJourneys = createAsyncThunk<
  CareerJourney[],
  void,
  ThunkApiType
>(
  ActionType.GET_ALL_CAREER_JOURNEYS,
  async (request, { extra: { services } }) => {
    return services.careerJourney.getAllCareerJourneys();
  },
);

const createCareerJourney = createAsyncThunk<void, CareerJourney, ThunkApiType>(
  ActionType.CREATE_CAREER_JOURNEY,
  async (request, { extra: { services }, dispatch }) => {
    await services.careerJourney.createCareerJourney(request);
    dispatch(getAllCareerJourneys());
  },
);

const updateCareerJourney = createAsyncThunk<void, CareerJourney, ThunkApiType>(
  ActionType.UPDATE_CAREER_JOURNEY,
  async (request, { extra: { services }, dispatch }) => {
    await services.careerJourney.updateCareerJourney(request);
    dispatch(getAllCareerJourneys());
  },
);

const removeCareerJourney = createAsyncThunk<void, CareerJourney, ThunkApiType>(
  ActionType.REMOVE_CAREER_JOURNEY,
  async (request, { extra: { services }, dispatch }) => {
    await services.careerJourney.removeCareerJourney(request);
    dispatch(getAllCareerJourneys());
  },
);

export {
  createCareerJourney,
  getAllCareerJourneys,
  removeCareerJourney,
  updateCareerJourney,
};
