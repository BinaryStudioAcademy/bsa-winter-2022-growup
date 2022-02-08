import { Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { Domain } from './domain';

@Entity()
export class DomainLevel extends AbstractEntity {
  @ManyToOne(() => DomainLevel, (domain) => domain.id, { nullable: true })
  nextLevel: DomainLevel;

  @ManyToOne(() => DomainLevel, (domainLevel) => domainLevel.id, {
    nullable: true,
  })
  prevLevel: DomainLevel;

  @ManyToOne(() => Domain, (domain) => domain.id)
  domain: Domain;
}
