import { Entity, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { User } from './user';

@Entity()
export class UserSkill extends AbstractEntity {
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
