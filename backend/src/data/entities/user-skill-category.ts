import { Entity, PrimaryColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { User } from './user';
import { SkillCategory } from './skill-category';

@Entity()
export class UserSkillCategory extends BaseEntity {
  @PrimaryColumn()
  userId: User;
  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => SkillCategory, (skillCategory) => skillCategory.id, {
    onDelete: 'CASCADE',
    primary: true,
  })
  skillCategory: SkillCategory;

  @Column({ default: false })
  isStarred: boolean;

  @Column({ nullable: true })
  selfRating: number;

  @Column({ nullable: true })
  mentorRating: number;

  @Column({ nullable: true })
  reviewRating: number;
}
