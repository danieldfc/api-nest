import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import RoleRepository from './role.repository';
import PermissionRepository from '../permissions/permission.repository';

import ICreateRoleDTO from './dtos/ICreateRoleDTO';
import Role from 'src/entities/role.entity';

export interface IRequestUpdateRole {
  name: string;
  slug: string;
  description: string;
  role_id: string;
  permissions: string[];
}

export interface IRequestPatchPermission {
  role_id: string;
  permissions: string[];
}

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private roleRepository: RoleRepository,
    @InjectRepository(PermissionRepository)
    private permissionRepository: PermissionRepository,
  ) {}

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find({
      relations: ['permissions'],
    });
  }

  async findBySlug(slug: string): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: {
        slug,
      },
    });

    if (!role) {
      throw new BadRequestException('Role not found');
    }

    return role;
  }

  async create({
    name,
    slug,
    description,
    permissions,
  }: ICreateRoleDTO): Promise<Role> {
    const existingRole = await this.roleRepository.findOne({
      where: {
        name,
      },
    });

    if (existingRole) {
      throw new BadRequestException('Role already exist');
    }

    const role = this.roleRepository.create({
      name,
      slug,
      description,
    });

    const findPermission = await this.permissionRepository.findByIds(
      permissions,
    );

    role.permissions = findPermission;

    return this.roleRepository.save(role);
  }

  async updatePermissionsOfRole({
    role_id,
    permissions,
  }: IRequestPatchPermission): Promise<Role> {
    const role = await this.roleRepository.findOne(role_id);

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    const findPermissions = await this.permissionRepository.findByIds(
      permissions,
    );

    role.permissions = findPermissions;

    return await this.roleRepository.save(role);
  }

  async save({
    role_id,
    name,
    slug,
    description,
    permissions,
  }: IRequestUpdateRole): Promise<Role> {
    const role = await this.roleRepository.findOne(role_id);

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    if (
      (role && role.name !== name) ||
      role.description !== description ||
      role.slug !== slug
    ) {
      const checkRole = await this.roleRepository.findOne({
        where: {
          name,
          slug,
          description,
        },
      });

      if (checkRole) {
        throw new BadRequestException('Role already exists');
      }
    }

    const findPermissions = await this.permissionRepository.findByIds(
      permissions,
    );

    role.name = name;
    role.slug = slug;
    role.description = description;
    role.permissions = findPermissions;

    return this.roleRepository.save(role);
  }

  async delete(role_id: string): Promise<void> {
    const role = await this.roleRepository.findOne(role_id);

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    await this.roleRepository.delete(role_id);
  }
}
