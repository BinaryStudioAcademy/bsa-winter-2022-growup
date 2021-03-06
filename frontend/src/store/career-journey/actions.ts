import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkApiType } from 'store/store';
import { ActionType } from './common';
import { ICareerJourney } from '../../components/profile/common/interfaces';

const getAllCareerJourneys = createAsyncThunk<
  ICareerJourney[],
  void,
  ThunkApiType
>(ActionType.GET_ALL_CAREER_JOURNEYS, (request, { extra: { services } }) => {
  return services.careerJourney.getAllCareerJourneys();
});

const createCareerJourney = createAsyncThunk<
  void,
  ICareerJourney,
  ThunkApiType
>(
  ActionType.CREATE_CAREER_JOURNEY,
  async (request, { extra: { services }, dispatch }) => {
    await services.careerJourney.createCareerJourney(request);
    dispatch(getAllCareerJourneys());
  },
);

const updateCareerJourney = createAsyncThunk<
  void,
  ICareerJourney,
  ThunkApiType
>(
  ActionType.UPDATE_CAREER_JOURNEY,
  async (request, { extra: { services }, dispatch }) => {
    await services.careerJourney.updateCareerJourney(request);
    dispatch(getAllCareerJourneys());
  },
);

const removeCareerJourney = createAsyncThunk<
  void,
  ICareerJourney,
  ThunkApiType
>(
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
