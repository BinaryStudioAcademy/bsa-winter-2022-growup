import { Entity, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { Objective } from './objective';

@Entity()
export class KeyResult extends AbstractEntity {
  @Column({ type: 'varchar', length: 250 })
  name: string;

  @Column({ type: 'integer', default: 0 })
  result: number;

  @ManyToOne(() => Objective, (objective) => objective.id, {
    onDelete: 'CASCADE',
  })
  objective: Objective;
}
