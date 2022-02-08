import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DomainLevel } from './domainLevel';
import { Skill } from './skill';

@Entity()
export class SkillCategory {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => Skill, (skill) => skill.id)
  skill: Skill;

  @ManyToOne(() => DomainLevel, (domainLevel) => domainLevel.id)
  level: DomainLevel;
}
