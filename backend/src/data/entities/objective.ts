import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { OKR } from './okr';
import { SkillObjective } from './skill-objective';
import { KeyResult } from './key-result';

@Entity()
export class Objective extends AbstractEntity {
  @Column({ type: 'varchar', length: 50, nullable: true })
  name: string;

  @ManyToOne(() => OKR, (okr) => okr.objectives, { onDelete: 'CASCADE' })
  okr: OKR;

  @ManyToOne(() => SkillObjective, (skillObjective) => skillObjective.id, {
    nullable: true,
  })
  skillObjective: SkillObjective;

  @OneToMany(() => KeyResult, (keyResult) => keyResult.objective)
  keyResults: KeyResult[];

  @Column({ type: 'integer' })
  result: number;
}
