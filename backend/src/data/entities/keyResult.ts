import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Objective } from './objective';

@Entity()
export class KeyResult {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', length: 250 })
  name: string;

  @ManyToOne(() => Objective, (objective) => objective.id)
  objective: Objective;
}
