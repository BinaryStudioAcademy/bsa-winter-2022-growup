import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { Domain } from './domain';

@Entity()
export class CareerParh extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Domain, (domain) => domain.id)
  domain: Domain;

  @ManyToOne(() => Domain, (domain) => domain.id)
  nextDomain: Domain;
}
