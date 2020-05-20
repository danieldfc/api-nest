import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ICreateRoleDTO from './dtos/ICreateRoleDTO';
import RoleRepository from './role.repository';
import Role from 'src/entities/role.entity';

export interface IRequestUpdateRole {
  name: string;
  slug: string;
  description: string;
  role_id: string;
}

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private roleRepository: RoleRepository,
  ) {}

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find();
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

  async create({ name, slug, description }: ICreateRoleDTO): Promise<Role> {
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

    return this.roleRepository.save(role);
  }

  async save({
    role_id,
    name,
    slug,
    description,
  }: IRequestUpdateRole): Promise<Role> {
    const role = await this.roleRepository.findOne(role_id);

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    if (
      (role && role.slug !== slug) ||
      role.name === name ||
      role.description === description
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

    role.name = name;
    role.slug = slug;
    role.description = description;

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
