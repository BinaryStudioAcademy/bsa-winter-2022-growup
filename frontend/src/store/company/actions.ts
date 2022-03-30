import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { ICompany } from 'common/interfaces/company/company';
import { StorageKey } from 'common/enums/app/storage-key.enum';
import { company as companyApi } from 'services';
import { authActions } from 'store/actions';

const get_allCompaniesAsync = createAsyncThunk(
  ActionType.GET_ALL_COMPANIES,
  async (_, { dispatch }) => {
    const result = await companyApi.getAllCompamies();
    if (result) {
      const { token, companies } = result;

      window.localStorage.setItem(StorageKey.TOKEN, token);
      dispatch(actions.get_all_companies(companies));
    }
  },
);

const add_companyAsync = createAsyncThunk(
  ActionType.ADD_COMPANY,
  async (data: ICompany, { dispatch }) => {
    const result = await companyApi.addCompany(data);

    if (result) {
      const { token, company } = result;
      dispatch(authActions.updateUserCompany(company));
      window.localStorage.setItem(StorageKey.TOKEN, token);
      dispatch(actions.add_company(company));
    }
  },
);

const edit_companyAsync = createAsyncThunk(
  ActionType.EDIT_COMPANY,
  async (data: ICompany, { dispatch }) => {
    const result = await companyApi.editCompany(data);

    if (result) {
      const { token, company } = result;

      window.localStorage.setItem(StorageKey.TOKEN, token);
      dispatch(authActions.updateUserCompany(company));
      dispatch(actions.edit_company(company));
    }
  },
);

const update_companyAvatarAsync = createAsyncThunk(
  ActionType.UPDATE_AVATAR,
  async (data: Blob, { dispatch, rejectWithValue }) => {
    try {
      const result = await companyApi.updateCompanyAvatar(data);

      if (result) {
        dispatch(authActions.updateUserCompany(result));
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const companyActions = {
  ...actions,
  get_allCompaniesAsync,
  add_companyAsync,
  edit_companyAsync,
  update_companyAvatarAsync,
};

export { companyActions };
