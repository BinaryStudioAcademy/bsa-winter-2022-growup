import { Entity, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { User } from './user';

@Entity()
export class CareerJourney extends AbstractEntity {
  @Column()
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: string;

  @Column({ type: 'varchar', length: 250 })
  company: string;

  @Column({ type: 'varchar', length: 250 })
  position: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
