import Permission from 'src/entities/permission.entity';
import ICreatePermissionDTO from '../dtos/ICreatePermissionDTO';

import { IRequestUpdatePermission } from '../permission.service';

export default interface IPermissionService {
  findAll(): Promise<Permission[]>;
  findBySlug(slug: string): Promise<Permission>;
  create(data: ICreatePermissionDTO): Promise<Permission>;
  save(permissionUpdate: IRequestUpdatePermission): Promise<Permission>;
  delete(permission_id: string): Promise<void>;
}