import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import User from './user.entity';
import Permission from './permission.entity';

@Entity('roles')
export default class Role {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  description: string;

  @ManyToMany(
    () => Permission,
    permission => permission.roles,
  )
  @JoinTable()
  permissions: Permission[];

  @ManyToMany(
    () => User,
    user => user.roles,
  )
  users: User[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
