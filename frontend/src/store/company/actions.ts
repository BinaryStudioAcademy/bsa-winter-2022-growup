import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './common';
import { ICompany } from 'common/interfaces/company/company';
import { StorageKey } from 'common/enums/app/storage-key.enum';
import { company as companyApi } from 'services';
import { authActions } from 'store/actions';

interface IAddEdit {
  newCompany: ICompany;
  handleClose: () => void;
}

const get_allCompanisesAsync = createAsyncThunk(
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
  async ({ newCompany, handleClose }: IAddEdit, { dispatch }) => {
    const result = await companyApi.addCompany(newCompany);

    if (result) {
      const { token, company } = result;
      dispatch(authActions.updateUserCompany(company));
      window.localStorage.setItem(StorageKey.TOKEN, token);
      dispatch(actions.add_company(company));
      handleClose();
    }
  },
);

const edit_companyAsync = createAsyncThunk(
  ActionType.EDIT_COMPANY,
  async ({ newCompany, handleClose }: IAddEdit, { dispatch }) => {
    const result = await companyApi.editCompany(newCompany);

    if (result) {
      const { token, company } = result;

      window.localStorage.setItem(StorageKey.TOKEN, token);
      dispatch(actions.edit_company(company));
      handleClose();
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
  get_allCompanisesAsync,
  add_companyAsync,
  edit_companyAsync,
  update_companyAvatarAsync,
};

export { companyActions };
