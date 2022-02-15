import { FindManyOptions, getCustomRepository } from 'typeorm';
import { companies } from '~/data/seed-data/company.data';

import TagsRepository from '~/data/repositories/tags.repository';
import CompanyRepository from '~/data/repositories/company.repository';

import { Tags } from '~/data/entities/tags';
import { Company } from '~/data/entities/company';

import { asyncForEach } from '~/common/helpers/array.helper';
import { tagsMapper } from '~/common/mappers/tags.mapper';

import type { MappedTag } from '~/common/models/tags/tags';
import type { SuccessResponse } from '~/common/models/responses/success';

export const getTags = async (): Promise<Tags[]> => {
  const tagsRepository = getCustomRepository(TagsRepository);
  const companyRepository = getCustomRepository(CompanyRepository);

  const companyInstance: Company = await companyRepository.findOne({
    name: companies[0].name,
  });

  const tags = await tagsRepository.find({
    company: companyInstance,
    relations: ['company'],
  } as FindManyOptions);

  return tags.map((tag) => tagsMapper(tag));
};

export const createTags = async (
  data: Tags['name'][],
): Promise<MappedTag[]> => {
  const tagsRepository = getCustomRepository(TagsRepository);
  const companyRepository = getCustomRepository(CompanyRepository);

  const companyInstance: Company = await companyRepository.findOne({
    name: companies[0].name,
  });

  const tags: Tags[] = [];

  await asyncForEach(async (tagName) => {
    const tagInstance = tagsRepository.create({
      name: tagName,
      company: companyInstance,
    });

    const tag = await tagInstance.save();
    tags.push(tag);
  }, data);

  const mappedTags = tags.map((tag) => tagsMapper(tag));
  return mappedTags;
};

export const deleteTag = async (id: Tags['id']): Promise<SuccessResponse> => {
  const tagsRepository = getCustomRepository(TagsRepository);
  await tagsRepository.delete({ id });

  return { success: true, message: 'Tag deleted successfully' };
};
