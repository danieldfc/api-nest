import { Repository, EntityRepository } from 'typeorm';
import Permission from 'src/entities/permission.entity';

@EntityRepository(Permission)
export default class PermissionRepository extends Repository<Permission> {}
