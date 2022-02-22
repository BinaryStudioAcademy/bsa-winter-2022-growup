import { Column, Entity, ManyToMany, ManyToOne, Unique } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { Company } from './company';
import { SkillType } from '~/common/enums/skill-type';
import { User } from './user';
@Unique('company_unique_skill', ['type', 'name', 'company'])
@Entity()
export class Skill extends AbstractEntity {
  @ManyToOne(() => Company, (company) => company.id)
  company: Company;

  @Column({
    type: 'enum',
    enum: SkillType,
  })
  type: SkillType;

  @Column({ type: 'varchar', length: 250 })
  name: string;

  @ManyToMany(() => User, (user) => user.skills)
  users: User[];
}
