import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Domain } from './domain';

@Entity()
export class DomainLevel {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => DomainLevel, (domain) => domain.id, { nullable: true })
  nextLevel: DomainLevel;

  @ManyToOne(() => DomainLevel, (domainLevel) => domainLevel.id, {
    nullable: true,
  })
  prevLevel: DomainLevel;

  @ManyToOne(() => Domain, (domain) => domain.id)
  domain: Domain;
}
