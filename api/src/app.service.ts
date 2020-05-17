import { Injectable } from '@nestjs/common';
import RepoService from './repo.service';

@Injectable()
export class AppService {
  constructor(protected readonly repoService: RepoService) {}

  async getHello(): Promise<string> {
    return `Total roles are ${await this.repoService.roleRepo.count()}`;
  }
}
