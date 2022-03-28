import { Entity, ManyToOne, Column, OneToMany } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { User } from './user';
import { Objective } from './objective';

enum OkrTypes {
  MY_OKR = 'my_okr',
  TEAM_OKR = 'team_okr',
}

export enum StatusType {
  open = 'open',
  close = 'close',
}

@Entity()
export class OKR extends AbstractEntity {
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({
    type: 'enum',
    enum: OkrTypes,
    default: OkrTypes.MY_OKR,
  })
  type: OkrTypes;

  @Column({
    type: 'enum',
    enum: StatusType,
    default: StatusType.open,
  })
  status: StatusType;

  @Column()
  endDate: Date;

  @Column()
  startDate: Date;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => Objective, (objective) => objective.okr)
  objectives: Objective[];
}
