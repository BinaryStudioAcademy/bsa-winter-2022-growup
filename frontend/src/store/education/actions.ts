import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkApiType } from 'store/store';
import { ActionType } from './common';
import { Education } from '../../components/profile/components/profile-info/interfaces';

const getAllEducations = createAsyncThunk<Education[], void, ThunkApiType>(
  ActionType.GET_ALL_EDUCATIONS,
  async (request, { extra: { services } }) => {
    return services.education.getAllEducations();
  },
);

const createEducation = createAsyncThunk<void, Education, ThunkApiType>(
  ActionType.CREATE_EDUCATION,
  async (request, { extra: { services }, dispatch }) => {
    await services.education.createEducation(request);
    dispatch(getAllEducations());
  },
);

const updateEducation = createAsyncThunk<void, Education, ThunkApiType>(
  ActionType.UPDATE_EDUCATION,
  async (request, { extra: { services }, dispatch }) => {
    await services.education.updateEducation(request);
    dispatch(getAllEducations());
  },
);

const removeEducation = createAsyncThunk<void, Education, ThunkApiType>(
  ActionType.REMOVE_EDUCATION,
  async (request, { extra: { services }, dispatch }) => {
    await services.education.removeEducation(request);
    dispatch(getAllEducations());
  },
);

export { createEducation, getAllEducations, removeEducation, updateEducation };
