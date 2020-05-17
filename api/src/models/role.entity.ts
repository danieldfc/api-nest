import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import User from '../users/users.entity';
import Permission from './permission.entity';

@Entity('roles')
export default class Role {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  type: string;

  @Column()
  user_id: string;

  @OneToMany(
    () => Permission,
    permission => permission.role,
  )
  permission: Permission;

  @ManyToOne(
    () => User,
    user => user.role,
    { eager: true },
  )
  @JoinColumn({ name: 'user_id' })
  user: Promise<User>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
