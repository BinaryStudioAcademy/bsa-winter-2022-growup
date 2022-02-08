import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SkillCategory } from './skillCategory';

@Entity()
export class SkillObjective {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @ManyToOne(() => SkillCategory, (skillCategory) => skillCategory.id)
  categoty: SkillCategory;
}
