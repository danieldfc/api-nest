import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { hash, compare } from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';

import UsersRepository from './users.repository';
import RoleRepository from './shared/roles/role.repository';
import IUserService, { IRequestPatchProfile } from './models/IUserService';
import ICreateUserDTO from './dtos/ICreateUserDTO';
import ILoginDTO from './dtos/IloginDTO';

import User from '../entities/user.entity';

export interface IRequestUpdateProfile {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@Injectable()
export default class UsersService implements IUserService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    @InjectRepository(RoleRepository)
    private readonly roleRepository: RoleRepository,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: ['id', 'name', 'email'],
      relations: ['roles', 'permissions'],
    });
  }

  async validateLoginWithRoles(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email },
      relations: ['roles', 'permissions'],
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const comparePassword = await compare(password, user.password);

    if (!comparePassword) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async validateIdWithRoles(id: string): Promise<User> {
    return this.usersRepository.findOne(id, {
      relations: ['roles', 'permissions'],
    });
  }

  async findByLogin({ email, password }: ILoginDTO): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const comparePassword = await compare(password, user.password);

    if (!comparePassword) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async findById(user_logged_id: string, id: string): Promise<User> {
    const findUserLogged = await this.usersRepository.findOne({
      where: { id: user_logged_id },
      select: ['id', 'name', 'email'],
      relations: ['roles', 'permissions'],
    });

    const userExist = await this.usersRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email'],
      relations: ['roles', 'permissions'],
    });

    if (!userExist) {
      throw new NotFoundException('User not found');
    }

    if (findUserLogged.id !== id) {
      const findRoleByName = userExist.roles.map(role => ({
        name: role.name,
      }));

      const [verifyUserAdmin] = findRoleByName.filter(
        role => role.name === 'Administrator',
      );

      if (verifyUserAdmin.name === 'Administrator') {
        throw new BadRequestException();
      }
    }

    return userExist;
  }

  async findByEmail(email: string): Promise<User> {
    const userExist = await this.usersRepository.findOne({
      where: { email },
    });

    if (!userExist) {
      throw new NotFoundException('User not found');
    }

    return userExist;
  }

  async create({ roles, ...user }: ICreateUserDTO): Promise<User> {
    const userExist = await this.usersRepository.findOne({
      where: { email: user.email },
    });

    if (userExist) {
      throw new BadRequestException('User already exist');
    }

    user.password = await hash(user.password, 8);

    const createUser = this.usersRepository.create(user);
    const findRoles = await this.roleRepository.findByIds(roles, {
      relations: ['permissions'],
    });

    if (!findRoles) {
      throw new BadRequestException('Roles not found');
    }

    const [findPermissions] = findRoles.map(role => ({
      permissions: role.permissions,
    }));

    if (findPermissions.permissions) {
      createUser.permissions = findPermissions.permissions;
    }

    createUser.roles = findRoles;

    return this.usersRepository.save(createUser);
  }

  async save({
    user_id,
    email,
    name,
    old_password,
    password,
  }: IRequestUpdateProfile): Promise<User> {
    const user = await this.usersRepository.findOne(user_id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const duplicatedEmail = await this.usersRepository.findOne({
      where: { email },
    });

    if (duplicatedEmail && duplicatedEmail.id !== user_id) {
      throw new UnauthorizedException('E-mail is already in use.');
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new BadRequestException(
        'You need to inform the old password to set a new password.',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new BadRequestException('Old password does not match.');
      }

      user.password = await hash(password, 8);
    }

    return this.usersRepository.save(user);
  }

  async updateRoles({
    user_id: id,
    roles,
  }: IRequestPatchProfile): Promise<User> {
    const user = await this.usersRepository.findOne(id, {
      relations: ['roles', 'permissions'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const findRoles = await this.roleRepository.findByIds(roles, {
      relations: ['permissions'],
    });

    if (!findRoles) {
      throw new BadRequestException('Roles not found');
    }

    user.roles = findRoles;
    const [findPermissions] = findRoles.map(role => ({
      permissions: role.permissions,
    }));

    if (findPermissions.permissions) {
      user.permissions = findPermissions.permissions;
    }

    return this.usersRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    const userExist = await this.usersRepository.findOne(id);

    if (!userExist) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository.delete(id);
  }
}
