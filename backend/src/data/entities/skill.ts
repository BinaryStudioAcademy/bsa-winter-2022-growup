import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { Company } from './company';
import { PermissionType } from '../../common/enums/permission-type';

@Entity()
export class Skill extends AbstractEntity {
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
