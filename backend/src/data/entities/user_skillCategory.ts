import { Entity, OneToOne, PrimaryColumn, JoinColumn, Column } from 'typeorm';
import { User } from './user';
import { SkillCategory } from './skillCategory';

@Entity()
export class UserSkillCategory {
  @PrimaryColumn()
  userId: User;
  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;

  @PrimaryColumn()
  skillLevelId: SkillCategory;
  @OneToOne(() => SkillCategory, (skillCategory) => skillCategory.id)
  @JoinColumn({ name: 'skillLevelId' })
  skillCategory: SkillCategory;

  @Column({ type: 'boolean' })
  isApproved: boolean;
}
