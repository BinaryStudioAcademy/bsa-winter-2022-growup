import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from './company';
import { PermissionType } from '../../common/enums/permission-type';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => Company, (company) => company.id)
  company: Company;

  @Column({
    type: 'enum',
    enum: PermissionType,
    default: PermissionType.Read,
  })
  name: string;

  @Column({ type: 'varchar', length: 250 })
  type: PermissionType;
}
