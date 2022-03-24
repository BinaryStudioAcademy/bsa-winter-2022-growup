import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';

import { RoleType } from '~/common/enums/role-type';
import { AbstractEntity } from '~/data/abstract/abstract.entity';

import { DomainLevel } from './domain-level';
import { Company } from './company';
import { UserSkill } from './user-skill';
import { CareerJourney } from './career-journey';
import { Education } from './education';

@Entity()
export class User extends AbstractEntity {
  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar', length: 100, select: false, nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  lastName: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  avatar: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  position: string;

  @Column({ type: 'enum', enum: RoleType })
  role: RoleType;

  @ManyToOne(() => Company, (company) => company.id)
  company: Company;

  @ManyToOne(() => User, (user) => user.id)
  mentor: User;

  @ManyToOne(() => DomainLevel, (domainLevel) => domainLevel.id)
  domain: DomainLevel;

  @OneToMany(() => UserSkill, (userSkill) => userSkill.user)
  userSkills: UserSkill[];

  @OneToMany(() => CareerJourney, (careerJourney) => careerJourney.user, {
    cascade: true,
    eager: true,
  })
  careerJourneys: CareerJourney[];

  @OneToMany(() => Education, (education) => education.user, {
    cascade: true,
    eager: true,
  })
  educations: Education[];
}
