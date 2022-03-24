import { Entity, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { User } from './user';
import { RoleType } from '../../common/enums/role-type';

@Entity()
export class UserRole extends AbstractEntity {
  @Column({
    type: 'enum',
    enum: RoleType,
  })
  role: RoleType;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  user: User;
}
