import { Entity, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { User } from './user';

@Entity()
export class Education extends AbstractEntity {
  @Column({ type: 'varchar', length: 250 })
  specialization: string;

  @Column({ type: 'varchar', length: 250 })
  university: string;

  @Column({ type: 'varchar', length: 250 })
  degree: string;

  @Column()
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
