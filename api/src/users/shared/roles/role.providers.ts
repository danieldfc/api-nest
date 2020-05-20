import { Connection } from 'typeorm';
import Role from 'src/entities/role.entity';

import Constants from 'src/config/constants';

const RolesProvider = [
  {
    provide: Constants.ROLE_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Role),
    inject: [Constants.ASYNC_CONNECTION],
  },
];

export default RolesProvider;
