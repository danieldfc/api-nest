import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import Permission from 'src/entities/permission.entity';
import { DatabaseModule } from 'src/database/database.module';
import PermissionsProvider from './permission.providers';

@Module({
  imports: [TypeOrmModule.forFeature([Permission]), DatabaseModule],
  controllers: [PermissionController],
  providers: [...PermissionsProvider, PermissionService],
  exports: [PermissionService],
})
export default class PermissionModule {}
