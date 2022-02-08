import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';

@Entity()
export class Company extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;
}
