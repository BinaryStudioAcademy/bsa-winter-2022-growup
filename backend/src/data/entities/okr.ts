import { Entity, ManyToOne, Column, OneToMany } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { User } from './user';
import { Objective } from './objective';

@Entity()
export class OKR extends AbstractEntity {
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  type: string;

  @Column()
  endDate: Date;

  @Column()
  startDate: Date;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @OneToMany(() => Objective, (objective) => objective.okr)
  objectives: Objective[];
}
