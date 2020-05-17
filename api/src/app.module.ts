import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import UsersModule from './users/users.module';
import RepoModule from './repo.module';
import RepoService from './repo.service';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [UsersModule, RepoModule, TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [RepoService, AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
