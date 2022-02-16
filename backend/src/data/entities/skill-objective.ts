import { Entity, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { SkillCategory } from './skill-category';

@Entity()
export class SkillObjective extends AbstractEntity {
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @ManyToOne(() => SkillCategory, (skillCategory) => skillCategory.id)
  category: SkillCategory;
}
