import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from 'src/database/database.module';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import PermissionsProvider from './permission.providers';

import Permission from 'src/entities/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permission]), DatabaseModule],
  controllers: [PermissionController],
  providers: [...PermissionsProvider, PermissionService],
  exports: [PermissionService],
})
export default class PermissionModule {}
