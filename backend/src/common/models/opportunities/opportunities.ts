import { Company } from '~/data/entities/company';
import { Opportunity } from '~/data/entities/opportunity';
import { User } from '~/data/entities/user';

export type MappedOpportunity = Opportunity & {
  company: Company;
  user: User;
};
