import { createAsyncThunk } from '@reduxjs/toolkit';
import { TagsApi } from 'services';

import type { TagCreation } from 'common/types/types';
import { ActionType } from './common';

const createTags = createAsyncThunk(
  ActionType.CREATE_TAGS,
  async (data: TagCreation[], _) => {
    // eslint-disable-next-line
    try {
      const result = await TagsApi.createTags(data);
      // eslint-disable-next-line
      console.log(result);
      return result;
    } catch (err) {
      // eslint-disable-next-line
      console.log(err);
    }
  },
);

export { createTags };
