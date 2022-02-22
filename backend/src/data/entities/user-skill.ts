import { Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { Skill } from './skill';
import { User } from './user';

@Entity()
export class UserSkill extends AbstractEntity {
  @ManyToOne(() => Skill, (skill) => skill.id)
  skill: Skill;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
