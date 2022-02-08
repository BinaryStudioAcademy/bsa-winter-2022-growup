import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user';

@Entity()
export class RefreshToken {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  token: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
