import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Role from './role.entity';

@Entity('permissions')
export default class Permission {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  role_id: string;

  @ManyToOne(
    () => Role,
    role => role.permission,
    { eager: true },
  )
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
