import {
  Entity,
  Column,
} from 'typeorm';
import { AbstractEntity } from '../abstract/abstract.entity';

@Entity()
export class User extends AbstractEntity {
  @Column()
    fullName: string;
}
