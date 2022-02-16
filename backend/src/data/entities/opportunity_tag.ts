import { Entity, OneToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { AbstractEntity } from '../abstract/abstract.entity';
import { Opportunity } from './opportunity';
import { Tags } from './tags';

@Entity()
export class Opportunity_Tag extends AbstractEntity {
  @PrimaryColumn()
  opportunityId: Opportunity;
  @OneToOne(() => Opportunity, (opportunity) => opportunity.id)
  @JoinColumn({ name: 'opportunityId' })
  opportunity: Opportunity;

  @PrimaryColumn()
  tagsId: Tags;
  @OneToOne(() => Tags, (tags) => tags.id)
  @JoinColumn({ name: 'tagsId' })
  tags: Tags;

}
