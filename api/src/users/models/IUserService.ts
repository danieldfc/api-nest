import User from 'src/entities/user.entity';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

import { IRequestUpdateProfile } from '../users.service';

export default interface IRoleService {
  findAll(): Promise<User[]>;
  findById(user_id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  create(data: ICreateUserDTO): Promise<User>;
  save(userUpdate: IRequestUpdateProfile): Promise<User>;
  delete(user_id: string): Promise<void>;
}
