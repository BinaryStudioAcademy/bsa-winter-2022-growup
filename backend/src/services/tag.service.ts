import { DeleteResult, getCustomRepository } from 'typeorm';

import TagsRepository from '~/data/repositories/tags.repository';
import CompanyRepository from '~/data/repositories/company.repository';

import { Tags } from '~/data/entities/tags';

import { asyncForEach } from '~/common/helpers/array.helper';

export const createTags = async (data: Tags['name'][]): Promise<void> => {
  const tagsRepository = getCustomRepository(TagsRepository);
  const companyRepository = getCustomRepository(CompanyRepository);

  const company = await companyRepository.findOne('id');

  asyncForEach(async (tag) => {
    const tagInstance = tagsRepository.create();

    tagInstance.name = tag;
    tagInstance.company = company;

    await tagInstance.save();
  }, data);
};

export const deleteTag = async (id: Tags['id']): Promise<DeleteResult> => {
  const tagsRepository = getCustomRepository(TagsRepository);
  const tagInstance = await tagsRepository.delete({ id });

  return tagInstance;
};
