import { Entity, ManyToOne, Column, Unique } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { Company } from './company';

@Unique('company_unique_tags', ['name', 'company'])
@Entity()
export class Tags extends AbstractEntity {
  @Column({ type: 'citext' })
  name: string;

  @ManyToOne(() => Company, (company) => company.id)
  company: Company;
}
