import { Company } from '~/data/entities/company';
import { Tags } from '~/data/entities/tags';

export type MappedTag = Tags & {
  company: Company['id'];
};
