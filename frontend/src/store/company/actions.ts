import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { ICompany } from 'common/interfaces/company/company';
import { StorageKey } from 'common/enums/app/storage-key.enum';
import { company as companyApi } from 'services';

const get_allCompanisesAsync = createAsyncThunk(
  ActionType.GET_ALL_COMPANIES,
  async (_, { dispatch }) => {
    const result = await companyApi.getAllCompamies();
    console.warn(result);
    if (result) {
      const { token, companies } = result;

      window.localStorage.setItem(StorageKey.TOKEN, token);
      dispatch(actions.get_all_companies(companies));
    }
  },
);

const add_companyAsync = createAsyncThunk(
  ActionType.ADD_COMPANY,
  async (newCompany: ICompany, { dispatch }) => {
    const result = await companyApi.addCompany(newCompany);

    if (result) {
      const { token, company } = result;

      window.localStorage.setItem(StorageKey.TOKEN, token);
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

      window.localStorage.setItem(StorageKey.TOKEN, token);
      dispatch(actions.edit_company(company));
    }
  },
);

const companyActions = {
  ...actions,
  get_allCompanisesAsync,
  add_companyAsync,
  edit_companyAsync,
};

export { companyActions };
