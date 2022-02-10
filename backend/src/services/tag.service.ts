import { DeleteResult, getCustomRepository } from 'typeorm';

import TagsRepository from '~/data/repositories/tags.repository';
import CompanyRepository from '~/data/repositories/company.repository';

import { Tags } from '~/data/entities/tags';
import { Company } from '~/data/entities/company';

import { asyncForEach } from '~/common/helpers/array.helper';

export const createTags = async (
  data: Tags['name'][],
  // company: Company,
): Promise<Tags[] | Tags> => {
  const tagsRepository = getCustomRepository(TagsRepository);
  const companyRepository = getCustomRepository(CompanyRepository);

  const companyInstance: Company = await companyRepository.findOne(
    'db1a7aed-9e49-420f-8ba9-fc2c83f2191a',
  );

  const tags: Tags[] = [];

  asyncForEach(async (tagName) => {
    const tagInstance = tagsRepository.create();

    tagInstance.name = tagName;
    tagInstance.company = companyInstance;

    const tag = await tagInstance.save();
    tags.push(tag);
  }, data);

  return tags.length === 1 ? tags[0] : tags;
};

export const deleteTag = async (id: Tags['id']): Promise<DeleteResult> => {
  const tagsRepository = getCustomRepository(TagsRepository);
  const tagInstance = await tagsRepository.delete({ id });

  return tagInstance;
};
