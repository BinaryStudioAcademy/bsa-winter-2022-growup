import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { User } from './user';

@Entity()
export class Language extends AbstractEntity {
  @Column({ type: 'varchar', length: 250 })
  name: string;

  @Column({ type: 'varchar', length: 250 })
  level: string;

  @Column({ type: 'varchar', length: 250 })
  certificate: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
