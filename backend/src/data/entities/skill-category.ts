import { Entity, ManyToOne, Unique } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { DomainLevel } from './domain-level';
import { Skill } from './skill';

@Unique('skill_unique_category', ['skill', 'level'])
@Entity()
export class SkillCategory extends AbstractEntity {
  @ManyToOne(() => Skill, (skill) => skill.id)
  skill: Skill;

  @ManyToOne(() => DomainLevel, (domainLevel) => domainLevel.id, {
    onDelete: 'CASCADE',
  })
  level: DomainLevel;
}
