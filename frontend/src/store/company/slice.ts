import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReducerName } from 'common/enums/app/reducer-name.enum';
import { ICompany } from 'common/interfaces/company/company';
import { ActionType } from './common';

type State = {
  companies: ICompany[];
};

const initialState: State = {
  companies: [],
};

const { reducer, actions } = createSlice({
  name: ReducerName.COMPANIES,
  initialState,
  reducers: {
    [ActionType.ADD_COMPANY]: (state, action: PayloadAction<ICompany>) => {
      const newCompanies = [...state.companies];
      newCompanies.push(action.payload);
      state.companies = newCompanies;
    },
    [ActionType.EDIT_COMPANY]: (state, action: PayloadAction<ICompany>) => {
      const index = state.companies.findIndex(
        (company) => company.id === action.payload.id,
      );
      const newCompanies = [...state.companies];
      newCompanies[index] = action.payload;
      state.companies = newCompanies;
    },
  },
});

export { reducer, actions };
