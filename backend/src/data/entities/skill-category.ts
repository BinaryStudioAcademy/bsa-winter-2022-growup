import { Entity, ManyToOne, OneToMany, Unique } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { DomainLevel } from './domain-level';
import { Skill } from './skill';
import { UserSkillCategory } from './user-skill-category';

@Unique('skill_unique_category', ['skill', 'level'])
@Entity()
export class SkillCategory extends AbstractEntity {
  @ManyToOne(() => Skill, (skill) => skill.id)
  skill: Skill;

  @ManyToOne(() => DomainLevel, (domainLevel) => domainLevel.id, {
    onDelete: 'CASCADE',
  })
  level: DomainLevel;

  @OneToMany(
    () => UserSkillCategory,
    (userSkillCategory) => userSkillCategory.skillCategory,
  )
  userSkillCategories: UserSkillCategory[];
}
