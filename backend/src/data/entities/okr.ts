import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from './user';

@Entity()
export class OKR {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'date' })
  endDate: string;

  @Column({ type: 'date' })
  startDate: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
