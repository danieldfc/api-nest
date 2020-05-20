import { Connection } from 'typeorm';
import User from '../entities/user.entity';

import Constants from '../config/constants';

const UsersProvider = [
  {
    provide: Constants.USER_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: [Constants.ASYNC_CONNECTION],
  },
];

export default UsersProvider;
