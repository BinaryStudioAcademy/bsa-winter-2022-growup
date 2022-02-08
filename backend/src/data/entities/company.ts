import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';

@Entity()
export class Company extends AbstractEntity {
  @Column({ type: 'varchar', length: 50 })
  name: string;
}
