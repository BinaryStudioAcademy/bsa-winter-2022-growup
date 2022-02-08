import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { Company } from './company';

@Entity()
export class WorkQuiz extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Company, (company) => company.id)
  company: Company;
}
