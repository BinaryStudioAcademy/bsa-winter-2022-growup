import { FindManyOptions, getCustomRepository } from 'typeorm';
import { HttpError, HttpCode } from 'growup-shared';

import { companies } from '~/data/seed-data/company.data';

import TagsRepository from '~/data/repositories/tags.repository';
import CompanyRepository from '~/data/repositories/company.repository';

import { Tags } from '~/data/entities/tags';
import { Company } from '~/data/entities/company';

import { asyncForEach } from '~/common/helpers/array.helper';
import { tagsMapper } from '~/common/mappers/tags.mapper';

import type { TagsCreationResponse } from '~/common/models/tags/tags';
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
): Promise<TagsCreationResponse> => {
  const tagsRepository = getCustomRepository(TagsRepository);
  const companyRepository = getCustomRepository(CompanyRepository);

  const companyInstance: Company = await companyRepository.findOne({
    name: companies[0].name,
  });

  const targetTags = await tagsRepository.find({ company: companyInstance });
  const tags: Tags[] = [];
  const existingTags: Tags['name'][] = [];

  await asyncForEach(async (name) => {
    const tagName = name.toLowerCase();

    if (targetTags.find((tag) => tag.name.toLowerCase() === tagName)) {
      existingTags.push(name);
      return;
    }

    const tagInstance = tagsRepository.create({
      name,
      company: companyInstance,
    });

    const tag = await tagInstance.save();
    tags.push(tag);
  }, data);

  const mappedTags = tags.map((tag) => tagsMapper(tag));
  return {
    tags: mappedTags,
    existingTags,
  };
};

export const deleteTag = async (id: Tags['id']): Promise<SuccessResponse> => {
  const tagsRepository = getCustomRepository(TagsRepository);
  const tagInstance = await tagsRepository.findOne(id);
  if (!tagInstance)
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: 'Tag with this id does not exist',
    });

  await tagInstance.remove();

  return { success: true, message: 'Tag deleted successfully' };
};
