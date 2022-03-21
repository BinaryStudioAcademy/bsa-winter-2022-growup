import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { User } from './user';

@Entity()
export class RegistrationToken extends AbstractEntity {
  @Column({ type: 'uuid', unique: true, nullable: false })
  value: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
