import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Company } from './company';

@Entity()
export class WorkQuiz {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => Company, (company) => company.id)
  company: Company;
}
