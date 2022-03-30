import {
  Entity,
  PrimaryColumn,
  JoinColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { User } from './user';
import { SkillCategory } from './skill-category';

@Entity()
export class UserSkillCategory extends BaseEntity {
  @PrimaryColumn()
  userId: User;
  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @PrimaryColumn()
  skillLevelId: SkillCategory;
  @ManyToOne(() => SkillCategory, (skillCategory) => skillCategory.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'skillLevelId' })
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
