import User from 'src/entities/user.entity';
import { IValidateUser, IAccessToken } from '../auth.service';
import { IRequestPayload } from '../strategies/jwt.strategy';

export default interface IAuthService {
  validateUser(data: IValidateUser): Promise<User | null>;
  login(data: IRequestPayload): Promise<IAccessToken>;
}
