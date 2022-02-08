import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { User } from './user';

@Entity()
export class CareerJourney extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
