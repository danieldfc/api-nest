import {
  Controller,
  Inject,
  Get,
  UseGuards,
  Body,
  Post,
  Delete,
  Put,
  Param,
} from '@nestjs/common';

import { PermissionService } from './permission.service';

import Roles, { ConstantsRoles } from 'src/auth/decorators/roles.decorator';
import RolesGuard from 'src/auth/guards/role.guard';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';
import ICreatePermissionDTO from './dtos/ICreatePermissionDTO';

import Permission from 'src/entities/permission.entity';

@Controller('admin/permissions')
export class PermissionController {
  constructor(
    @Inject('PermissionService') private permissionService: PermissionService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ConstantsRoles.Administrator)
  @Get()
  async index(): Promise<Permission[]> {
    return this.permissionService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ConstantsRoles.Administrator)
  @Get(':id')
  async show(@Param('id') id: string): Promise<Permission> {
    return this.permissionService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ConstantsRoles.Administrator)
  @Post()
  async create(@Body() permission: ICreatePermissionDTO): Promise<Permission> {
    return this.permissionService.create(permission);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ConstantsRoles.Administrator)
  @Put(':id')
  async update(
    @Param('id') permission_id: string,
    @Body() permission: ICreatePermissionDTO,
  ): Promise<Permission> {
    return this.permissionService.save({ permission_id, ...permission });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ConstantsRoles.Administrator)
  @Delete(':id')
  async delete(@Param('id') permission_id: string): Promise<void> {
    return this.permissionService.delete(permission_id);
  }
}
