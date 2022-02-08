import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Domain } from './domain';

@Entity()
export class CareerParh {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => Domain, (domain) => domain.id)
  domain: Domain;

  @ManyToOne(() => Domain, (domain) => domain.id)
  nextDomain: Domain;
}
