import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';

@Entity()
export class CarereeJournay {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'date' })
  startDate: string;

  @Column({ type: 'date', nullable: true })
  endDate: string;

  @Column({ type: 'varchar', length: 250 })
  company: string;

  @Column({ type: 'varchar', length: 250 })
  position: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
