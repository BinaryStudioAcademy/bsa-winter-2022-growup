import { Entity, ManyToOne, Column, BaseEntity } from 'typeorm';
import { User } from './user';
import { Skill } from './skill';

@Entity()
export class UserSkill extends BaseEntity {
  @Column({ default: false })
  isStarred: boolean;

  @Column({ nullable: true })
  selfRating: number;

  @Column({ nullable: true })
  mentorRating: number;

  @Column({ nullable: true })
  reviewRating: number;

  @ManyToOne(() => User, (user) => user.userSkills, {
    primary: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Skill, (skill) => skill.userSkills, {
    primary: true,
    onDelete: 'CASCADE',
  })
  skill: Skill;
}
