import { Entity, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { SkillCategory } from './skillCategory';

@Entity()
export class SkillObjective extends AbstractEntity {
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @ManyToOne(() => SkillCategory, (skillCategory) => skillCategory.id)
  categoty: SkillCategory;
}
