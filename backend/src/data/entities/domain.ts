import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { Company } from './company';

@Entity()
export class Domain extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ManyToOne(() => Company, (company) => company.id)
  company: Company;
}
