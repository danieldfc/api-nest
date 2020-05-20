import 'dotenv/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import AuthModule from './auth/auth.module';
import UsersModule from './users/users.module';
import PermissionModule from './users/shared/permissions/permission.module';
import RoleModule from './users/shared/roles/role.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    DatabaseModule,
    UsersModule,
    AuthModule,
    PermissionModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(public readonly connection: Connection) {}
}
