import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DomainLevel } from './domainLevel';
import { Company } from './company';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  password: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  firsName: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  lastName: string;

  @ManyToOne(() => Company, (company) => company.id)
  company: Company;

  @ManyToOne(() => User, (user) => user.id)
  mentor: User;

  @ManyToOne(() => DomainLevel, (domainLevel) => domainLevel.id)
  domain: DomainLevel;
}
