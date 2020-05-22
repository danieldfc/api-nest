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
  Patch,
} from '@nestjs/common';

import { RoleService } from './role.service';

import Roles, { ConstantsRoles } from 'src/auth/decorators/roles.decorator';
import RolesGuard from 'src/auth/guards/role.guard';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';
import ICreateRoleDTO from './dtos/ICreateRoleDTO';

import Role from 'src/entities/role.entity';

@Controller('admin/roles')
export class RoleController {
  constructor(@Inject('RoleService') private roleService: RoleService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ConstantsRoles.Administrator)
  @Get()
  async index(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ConstantsRoles.Administrator)
  @Get(':slug')
  async show(@Param('slug') slug: string): Promise<Role> {
    return this.roleService.findBySlug(slug);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ConstantsRoles.Administrator)
  @Post()
  async create(@Body() role: ICreateRoleDTO) {
    return this.roleService.create(role);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ConstantsRoles.Administrator)
  @Put(':id')
  async update(@Param('id') role_id: string, @Body() role: ICreateRoleDTO) {
    return this.roleService.save({
      role_id,
      ...role,
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ConstantsRoles.Administrator)
  @Patch(':id')
  async updatePermissions(
    @Param('id') role_id: string,
    @Body('permissions') permissions: string[],
  ) {
    return this.roleService.updatePermissionsOfRole({
      role_id,
      permissions,
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ConstantsRoles.Administrator)
  @Delete(':id')
  async delete(@Param('id') role_id: string) {
    return this.roleService.delete(role_id);
  }
}
