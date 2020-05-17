import { createConnection } from 'typeorm';

import Constants from '../config/constants';

export const databaseProviders = {
  provide: Constants.ASYNC_CONNECTION,
  useFactory: async () => await createConnection(),
};
