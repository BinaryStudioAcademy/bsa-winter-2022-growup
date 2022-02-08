import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { DomainLevel } from './domainLevel';
import { Skill } from './skill';

@Entity()
export class SkillCategory extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Skill, (skill) => skill.id)
  skill: Skill;

  @ManyToOne(() => DomainLevel, (domainLevel) => domainLevel.id)
  level: DomainLevel;
}
