import { getCustomRepository } from 'typeorm';

import TagsRepository from '~/data/repositories/tags.repository';
import CompanyRepository from '~/data/repositories/company.repository';

import { Tags } from '~/data/entities/tags';
import { Company } from '~/data/entities/company';

import { asyncForEach } from '~/common/helpers/array.helper';
import { tagsMapper } from '~/common/mappers/tags.mapper';

import type { MappedTag } from '~/common/models/tags/tags';
import type { SuccessResponse } from '~/common/models/responses/success';

export const createTags = async (
  data: Tags['name'][],
  // company: Company,
): Promise<MappedTag | MappedTag[]> => {
  const tagsRepository = getCustomRepository(TagsRepository);
  const companyRepository = getCustomRepository(CompanyRepository);

  const companyInstance: Company = await companyRepository.findOne(
    '592f7b2c-05bd-4009-b31d-c2fe8b029a3b',
  );

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
  return mappedTags.length === 1 ? mappedTags[0] : mappedTags;
};

export const deleteTag = async (id: Tags['id']): Promise<SuccessResponse> => {
  const tagsRepository = getCustomRepository(TagsRepository);
  await tagsRepository.delete({ id });

  return { success: true, message: 'Tag deleted successfully' };
};
