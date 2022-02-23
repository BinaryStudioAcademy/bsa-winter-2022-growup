import { Column, Entity, ManyToOne, Unique, OneToMany } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { Company } from './company';
import { SkillType } from '~/common/enums/skill-type';
import { UserSkill } from './user-skill';
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

  @OneToMany(() => UserSkill, (userSkill) => userSkill.user)
  userSkills: UserSkill[];
}
