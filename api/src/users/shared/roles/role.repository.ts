import { Repository, EntityRepository } from 'typeorm';

import Role from 'src/entities/role.entity';

@EntityRepository(Role)
export default class RoleRepository extends Repository<Role> {}
