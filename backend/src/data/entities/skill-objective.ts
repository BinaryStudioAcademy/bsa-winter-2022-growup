import { Entity, Column, ManyToOne, Unique } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { SkillCategory } from './skill-category';

@Unique('skill_unique_objective', ['name', 'category'])
@Entity()
export class SkillObjective extends AbstractEntity {
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @ManyToOne(() => SkillCategory, (skillCategory) => skillCategory.id, {
    onDelete: 'CASCADE',
  })
  category: SkillCategory;
}
