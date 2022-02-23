import { createSlice } from '@reduxjs/toolkit';
import { getAllEducations } from './actions';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { Education } from '../../components/profile/components/profile-info/interfaces';

type State = {
  educations: Education[];
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
      state.educations = action.payload;
    });
  },
});

export { reducer, actions };
