import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Company } from './company';

@Entity()
export class Tags {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', length: 250 })
  name: string;

  @ManyToOne(() => Company, (company) => company.id)
  company: Company;
}
