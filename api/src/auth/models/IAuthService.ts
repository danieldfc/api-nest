import User from 'src/entities/user.entity';
import { IValidateUser } from '../auth.service';

export default interface IAuthService {
  validateUser(data: IValidateUser): Promise<User | null>;
  login(payload: any): Promise<string>;
}
