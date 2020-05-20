import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import PermissionRepository from './permission.repository';
import Permission from 'src/entities/permission.entity';
import ICreatePermissionDTO from './dtos/ICreatePermissionDTO';
import IPermissionService from './models/IPermissionService';

export interface IRequestUpdatePermission {
  name: string;
  slug: string;
  description: string;
  permission_id: string;
}

@Injectable()
export class PermissionService implements IPermissionService {
  constructor(
    @InjectRepository(PermissionRepository)
    private permissionRepository: PermissionRepository,
  ) {}

  async findAll(): Promise<Permission[]> {
    return this.permissionRepository.find();
  }

  async findBySlug(slug: string): Promise<Permission> {
    const permission = await this.permissionRepository.findOne({
      where: {
        slug,
      },
    });

    if (!permission) {
      throw new BadRequestException('Permission not found');
    }

    return permission;
  }

  async create({
    name,
    slug,
    description,
  }: ICreatePermissionDTO): Promise<Permission> {
    const checkPermission = await this.permissionRepository.findOne({
      where: {
        name,
        slug,
        description,
      },
    });

    if (checkPermission) {
      throw new BadRequestException('Permission already exist');
    }

    const permission = this.permissionRepository.create({
      name,
      slug,
      description,
    });

    return this.permissionRepository.save(permission);
  }

  async save({
    permission_id,
    name,
    slug,
    description,
  }: IRequestUpdatePermission): Promise<Permission> {
    const permission = await this.permissionRepository.findOne(permission_id);

    if (!permission) {
      throw new NotFoundException('Permission not found');
    }

    if (
      (permission && permission.slug !== slug) ||
      permission.name === name ||
      permission.description === description
    ) {
      const checkPermission = await this.permissionRepository.findOne({
        where: {
          name,
          slug,
          description,
        },
      });

      if (checkPermission) {
        throw new BadRequestException('Permission already exists');
      }
    }

    permission.name = name;
    permission.slug = slug;
    permission.description = description;

    return this.permissionRepository.save(permission);
  }

  async delete(permission_id: string): Promise<void> {
    const permission = await this.permissionRepository.findOne(permission_id);

    if (!permission) {
      throw new NotFoundException('Permission not found');
    }

    await this.permissionRepository.delete(permission_id);
  }
}
