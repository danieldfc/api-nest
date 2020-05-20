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
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';
import Permission from 'src/entities/permission.entity';
import ICreatePermissionDTO from './dtos/ICreatePermissionDTO';

@Controller('admin/permissions')
export class PermissionController {
  constructor(
    @Inject('PermissionService') private permissionService: PermissionService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async index(): Promise<Permission[]> {
    return this.permissionService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':slug')
  async show(@Param('slug') slug: string): Promise<Permission> {
    return this.permissionService.findBySlug(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() permission: ICreatePermissionDTO): Promise<Permission> {
    return this.permissionService.create(permission);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') permission_id: string,
    @Body() permission: ICreatePermissionDTO,
  ): Promise<Permission> {
    return this.permissionService.save({ permission_id, ...permission });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') permission_id: string): Promise<void> {
    return this.permissionService.delete(permission_id);
  }
}
