import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user';

@Entity()
export class RefreshToken extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  token: string;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  user: User;
}
