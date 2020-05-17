import { Repository, EntityRepository } from 'typeorm';
import User from './users.entity';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  findById = (id: string): Promise<User | undefined> => {
    return this.findOne(id);
  };

  findByEmail = (email: string): Promise<User | undefined> => {
    return this.findOne({
      where: { email },
    });
  };
}
