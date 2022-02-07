import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../abstract/abstract.entity';

@Entity()
export class User extends AbstractEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  companyId: string;
}
