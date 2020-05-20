import { Connection } from 'typeorm';
import Permission from 'src/entities/permission.entity';

import Constants from 'src/config/constants';

const PermissionsProvider = [
  {
    provide: Constants.PERMISSION_REPOSITORY,
    useFactory: (connection: Connection) =>
      connection.getRepository(Permission),
    inject: [Constants.ASYNC_CONNECTION],
  },
];

export default PermissionsProvider;
