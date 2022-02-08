import { Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { DomainLevel } from './domain-level';
import { Skill } from './skill';

@Entity()
export class SkillCategory extends AbstractEntity {
  @ManyToOne(() => Skill, (skill) => skill.id)
  skill: Skill;

  @ManyToOne(() => DomainLevel, (domainLevel) => domainLevel.id)
  level: DomainLevel;
}
