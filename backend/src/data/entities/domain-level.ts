import {
  Column,
  Entity,
  ManyToOne,
  Tree,
  TreeChildren,
  TreeParent,
  Unique,
} from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { Domain } from './domain';

@Unique('domain_unique_level', ['domain', 'name'])
@Entity()
@Tree('closure-table')
export class DomainLevel extends AbstractEntity {
  @TreeParent()
  prevLevel: DomainLevel;

  @TreeChildren()
  nextLevel: DomainLevel[];

  @ManyToOne(() => Domain, (domain) => domain.id)
  domain: Domain;

  @Column({ type: 'varchar', length: 100 })
  name: string;
}
