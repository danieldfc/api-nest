import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import User from './db/models/user.entity';
import Role from './db/models/role.entity';
import Permission from './db/models/permission.entity';

@Injectable()
export default class RepoService {
  public constructor(
    @InjectRepository(User) public readonly userRepo: Repository<User>,
    @InjectRepository(Role) public readonly roleRepo: Repository<Role>,
    @InjectRepository(Permission)
    public readonly permissionRepo: Repository<Permission>,
  ) {}
}
