import {
  Entity,
  ManyToOne,
  Unique,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { Company } from './company';
import { Opportunity } from './opportunity';
import { User } from './user';

@Unique('company_unique_tags', ['name', 'company'])
@Entity()
export class Tags extends AbstractEntity {
  @Column({ type: 'citext' })
  name: string;

  @ManyToOne(() => Company, (company) => company.id)
  company: Company;

  @ManyToMany(() => Opportunity, (opportunity) => opportunity.tags)
  @JoinTable({
    name: 'tag_opportunity',
    joinColumn: { name: 'tagId', referencedColumnName: 'id' },
  })
  opportunities: Opportunity[];

  @ManyToMany(() => User, (user) => user.tags)
  @JoinTable({
    name: 'tag_user',
    joinColumn: { name: 'tagId', referencedColumnName: 'id' },
  })
  users: User[];
}
