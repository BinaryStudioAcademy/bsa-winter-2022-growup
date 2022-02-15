import type { MappedTag } from '../models/tags/tags';
import { Tags } from '~/data/entities/tags';

export const tagsMapper = (data: Tags): MappedTag =>
  ({ ...data, company: data.company.id } as MappedTag);
