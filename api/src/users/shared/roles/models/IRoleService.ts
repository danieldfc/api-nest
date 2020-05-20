import Role from 'src/entities/role.entity';
import ICreateRoleDTO from '../dtos/ICreateRoleDTO';

import { IRequestUpdateRole } from '../role.service';

export default interface IRoleService {
  findAll(): Promise<Role[]>;
  findBySlug(slug: string): Promise<Role>;
  create(data: ICreateRoleDTO): Promise<Role>;
  save(roleUpdate: IRequestUpdateRole): Promise<Role>;
  delete(role_id: string): Promise<void>;
}
