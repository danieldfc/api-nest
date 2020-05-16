import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';

describe('Users Controller', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  xit('should be defined', () => {
    console.log(controller);
    expect(controller).toBeDefined();
  });
});
