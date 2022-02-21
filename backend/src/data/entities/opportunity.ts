import { Entity, Column, ManyToOne, ManyToMany } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { User } from './user';
import { Company } from './company';
import { Tags } from './tags';

@Entity()
export class Opportunity extends AbstractEntity {
    @Column({ type: 'varchar', length: 250 })
    name: string;
    @Column({ type: 'varchar', length: 250 })
    organization: string;
    @Column({ type: 'varchar', length: 250 })
    startDate: string;
    @Column({ type: 'varchar', length: 250 })
    type: string;
    @ManyToOne(() => User, (user) => user.id)
    user: User;
    @ManyToOne(() => Company, (company) => company.id)
    company: Company;
    @ManyToMany(() => Tags, (tag) => tag.opportunities)
    tags: Tags[];
}