import User from 'src/entities/user.entity';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

import { IRequestUpdateProfile } from '../users.service';

export interface IRequestPatchProfile {
  user_id: string;
  roles: string[];
}

export default interface IUserService {
  findAll(): Promise<User[]>;
  validateLoginWithRoles(email: string, password: string): Promise<User>;
  validateIdWithRoles(id: string): Promise<User>;
  findById(user_logged_id: string, id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  create(data: ICreateUserDTO): Promise<User>;
  save(userUpdate: IRequestUpdateProfile): Promise<User>;
  updateRoles(data: IRequestPatchProfile): Promise<User>;
  delete(user_id: string): Promise<void>;
}
