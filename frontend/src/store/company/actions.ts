import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { ICompany } from 'common/interfaces/company/company';
import { companyApi } from 'services/company-api';

const add_companyAsync = createAsyncThunk(
  ActionType.ADD_COMPANY,
  async (company: ICompany, { dispatch }) => {
    const result = await companyApi.addCompany(company);
    if (result) {
      dispatch(actions.add_company(result));
    }
  },
);

const edit_companyAsync = createAsyncThunk(
  ActionType.EDIT_COMPANY,
  async (company: ICompany, { dispatch }) => {
    const result = await companyApi.editCompany(company);
    if (result) {
      dispatch(actions.edit_company(result));
    }
  },
);

const companyActions = {
  ...actions,
  add_companyAsync,
  edit_companyAsync,
};

export { companyActions };
