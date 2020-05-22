import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from 'src/database/database.module';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import RoleProvider from './role.providers';

import Role from 'src/entities/role.entity';
import Permission from 'src/entities/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission]), DatabaseModule],
  controllers: [RoleController],
  providers: [...RoleProvider, RoleService],
  exports: [RoleService],
})
export default class RoleModule {}
