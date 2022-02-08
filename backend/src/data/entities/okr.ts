import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { User } from './user';

@Entity()
export class OKR extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column()
  endDate: Date;

  @Column()
  startDate: Date;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
