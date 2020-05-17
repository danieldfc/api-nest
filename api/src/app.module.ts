import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import UsersModule from './users/users.module';

import { DatabaseModule } from './database/database.module';
import { Connection } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(), DatabaseModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(public readonly connection: Connection) {}
}
