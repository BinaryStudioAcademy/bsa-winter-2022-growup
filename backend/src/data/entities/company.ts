import { Entity, Column, OneToMany } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { User } from './user';

@Entity()
export class Company extends AbstractEntity {
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 250 })
  description: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  avatar: string;

  @OneToMany(() => User, (user) => user.company, {
    onDelete: 'CASCADE',
  })
  users: User[];
}
