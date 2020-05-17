import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RepoService from './repo.service';
import User from './db/models/user.entity';
import Role from './db/models/role.entity';
import Permission from './db/models/permission.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Permission])],
  providers: [RepoService],
  exports: [RepoService],
})
export default class RepoModule {}
