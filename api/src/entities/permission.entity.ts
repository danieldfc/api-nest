import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';

import Role from './role.entity';
import User from './user.entity';

@Entity('permissions')
export default class Permission {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  description: string;

  @Column()
  role_id: string;

  @ManyToMany(
    () => User,
    user => user.permissions,
  )
  users: User[];

  @ManyToMany(
    () => Role,
    role => role.permissions,
  )
  roles: Role[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
