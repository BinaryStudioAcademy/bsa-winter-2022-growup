import { Entity, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { OKR } from './okr';
import { SkillObjective } from './skill-objective';

@Entity()
export class Objective extends AbstractEntity {
  @Column({ type: 'varchar', length: 50, nullable: true })
  name: string;

  @ManyToOne(() => OKR, (okr) => okr.objectives)
  okr: OKR;

  @ManyToOne(() => SkillObjective, (skillObjective) => skillObjective.id, {
    nullable: true,
  })
  skillObjective: SkillObjective;

  @Column({ type: 'integer' })
  result: string;
}
