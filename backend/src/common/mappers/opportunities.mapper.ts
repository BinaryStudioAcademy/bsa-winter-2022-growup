import type { MappedOpportunity } from '../models/opportunities/opportunities';
import { Opportunity } from '~/data/entities/opportunity';

export const opportunityMapper = (data: Opportunity): MappedOpportunity =>
  ({
    ...data,
    company: data.company.id,
    user: data.user.id,
  } as MappedOpportunity);
