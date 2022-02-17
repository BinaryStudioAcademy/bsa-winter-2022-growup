import { configureStore } from '@reduxjs/toolkit';
import * as services from 'services';
import { rootReducer } from './root-reducer';

export type ServicesType = typeof services;
export type ThunkApiType = {
  extra: {
    services: ServicesType;
  };
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { services },
      },
    }),
});

export { store };
