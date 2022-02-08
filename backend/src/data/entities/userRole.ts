import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user';
import { RoleType } from '../../common/enums/role-type';

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    type: 'enum',
    enum: RoleType,
    default: RoleType.User,
  })
  role: RoleType;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
