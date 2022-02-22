import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { DomainLevel } from './domain-level';
import { Company } from './company';
import { UserRole } from './user-role';
import { Skill } from './skill';

@Entity()
export class User extends AbstractEntity {
  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  lastName: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  avatar: string;

  @ManyToOne(() => Company, (company) => company.id)
  company: Company;

  @ManyToOne(() => User, (user) => user.id)
  mentor: User;

  @ManyToOne(() => DomainLevel, (domainLevel) => domainLevel.id)
  domain: DomainLevel;

  @OneToMany(() => UserRole, (userRole) => userRole.id)
  role: UserRole;

  @ManyToMany(() => Skill, (skill) => skill.users)
  @JoinTable({
    name: 'user_skill',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
  })
  skills: Skill[];
}
