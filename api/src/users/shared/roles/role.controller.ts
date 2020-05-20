import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  UseGuards,
  Inject,
  Body,
  Param,
} from '@nestjs/common';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';

import Role from 'src/entities/role.entity';
import { RoleService } from './role.service';

import ICreateRoleDTO from './dtos/ICreateRoleDTO';

@Controller('admin/role')
export class RoleController {
  constructor(@Inject('RoleService') private roleService: RoleService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async index(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':slug')
  async show(@Param('slug') slug: string): Promise<Role> {
    return this.roleService.findBySlug(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() role: ICreateRoleDTO) {
    return this.roleService.create(role);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') role_id: string, @Body() role: ICreateRoleDTO) {
    return this.roleService.save({
      role_id,
      ...role,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') role_id: string) {
    return this.roleService.delete(role_id);
  }
}
