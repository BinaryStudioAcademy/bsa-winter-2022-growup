import { DeleteResult, getCustomRepository } from 'typeorm';

import TagsRepository from '~/data/repositories/tags.repository';
import { Tags } from '~/data/entities/tags';

import { asyncForEach } from '~/common/helpers/array.helper';
import { Company } from '~/data/entities/company';

export const createTags = async (
  data: Tags['name'][],
  company: Company,
): Promise<Tags[] | Tags> => {
  const tagsRepository = getCustomRepository(TagsRepository);
  const tags: Tags[] = [];

  asyncForEach(async (tagName) => {
    const tagInstance = tagsRepository.create();

    tagInstance.name = tagName;
    tagInstance.company = company;

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
