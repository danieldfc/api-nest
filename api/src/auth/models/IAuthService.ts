import User from 'src/entities/user.entity';

export interface IPayloadAuth {
  exp: number;
  iat: number;
  sub: string;
}

export interface IRequestJWTPayload {
  sub: string;
}

export default interface IAuthService {
  validateUser(email: string, password: string): Promise<User | null>;
  validateById(id: string): Promise<User | null>;
  login(payload: IPayloadAuth): Promise<string>;
}
