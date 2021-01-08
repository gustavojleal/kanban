import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('projects')
class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  createdBy_id: string;

  @ManyToOne(() => User)

  @JoinColumn({ name: 'createdBy_id' })
  provider: User;

  @Column()
  responsable_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'responsable_id' })
  user: User;

  @Column()
  structure: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Project;
