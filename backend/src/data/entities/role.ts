import { Entity, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../abstract/abstract.entity';
import { User } from './user';
import { RoleType } from '../../common/enums/role-type';

@Entity()
export class UserRole extends AbstractEntity {
  @Column({
    type: 'enum',
    enum: RoleType,
    default: RoleType.User,
  })
  role: RoleType;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
