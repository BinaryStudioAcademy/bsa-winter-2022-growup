import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { ICompany } from 'common/interfaces/company/company';
import { company as companyApi } from 'services';

const add_companyAsync = createAsyncThunk(
  ActionType.ADD_COMPANY,
  async (newCompany: ICompany, { dispatch }) => {
    const result = await companyApi.addCompany(newCompany);

    if (result) {
      const { token, company } = result;

      window.localStorage.setItem('companytoken', token);
      dispatch(actions.add_company(company));
    }
  },
);

const edit_companyAsync = createAsyncThunk(
  ActionType.EDIT_COMPANY,
  async (newCompany: ICompany, { dispatch }) => {
    const result = await companyApi.editCompany(newCompany);

    if (result) {
      const { token, company } = result;

      window.localStorage.setItem('companytoken', token);
      dispatch(actions.edit_company(company));
    }
  },
);

const companyActions = {
  ...actions,
  add_companyAsync,
  edit_companyAsync,
};

export { companyActions };
