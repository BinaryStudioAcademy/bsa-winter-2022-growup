import { createSlice } from '@reduxjs/toolkit';
import { getAllEducations } from './actions';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { IEducation } from '../../components/profile/common/interfaces';

type State = {
  educations: IEducation[];
};

const initialState: State = {
  educations: [],
};

const { reducer, actions } = createSlice({
  name: ReducerName.EDUCATION,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllEducations.fulfilled, (state, action) => {
      state.educations = action.payload.map((item) => ({
        ...item,
        startDate: new Date(item.startDate),
        endDate: new Date(item.endDate),
      }));
    });
  },
});

export { reducer, actions };
