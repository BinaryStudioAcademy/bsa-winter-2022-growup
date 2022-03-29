import {
  Entity,
  OneToOne,
  PrimaryColumn,
  JoinColumn,
  Column,
  BaseEntity,
} from 'typeorm';
import { User } from './user';
import { SkillCategory } from './skill-category';

@Entity()
export class UserSkillCategory extends BaseEntity {
  @PrimaryColumn()
  userId: User;
  @OneToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @PrimaryColumn()
  skillLevelId: SkillCategory;
  @OneToOne(() => SkillCategory, (skillCategory) => skillCategory.id)
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
