import { FindManyOptions, getCustomRepository } from 'typeorm';
import { HttpError, HttpCode } from 'growup-shared';
import UserRepository from '~/data/repositories/user.repository';
import { badRequestError } from '~/common/errors';
import TagsRepository from '~/data/repositories/tags.repository';
import CompanyRepository from '~/data/repositories/company.repository';

import { Tags } from '~/data/entities/tags';
import { Company } from '~/data/entities/company';

import { tagsMapper } from '~/common/mappers/tags.mapper';

import type { TagsCreationResponse } from '~/common/models/tags/tags';
import type { SuccessResponse } from '~/common/models/responses/success';

export const getTags = async (userId: string): Promise<Tags[]> => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.geUserById(userId);

  if (!user.company) {
    throw badRequestError('User doesn`t create company!!!');
  }
  const tagsRepository = getCustomRepository(TagsRepository);
  const companyRepository = getCustomRepository(CompanyRepository);
  const companyInstance: Company = await companyRepository.findOne({
    id: user.company.id,
  });
  const tags = await tagsRepository.find({
    company: companyInstance,
    relations: ['company'],
  } as FindManyOptions);

  return tags.map((tag) => tagsMapper(tag));
};

export const createTags = async (
  data: Tags['name'][],
  company: Company,
): Promise<TagsCreationResponse> => {
  const tagsRepository = getCustomRepository(TagsRepository);

  const tags = Array.from(new Set(data));

  const alreadyExistingTags = (
    await tagsRepository.find({
      relations: ['company'],
      where: { company },
    })
  ).map((tag) => tag.name);

  await tagsRepository.bulkCreate(
    tags.map((name) => ({
      name,
      company,
    })),
  );

  const tagInstances = await tagsRepository.find({
    relations: ['company'],
    where: { company },
  });

  const createdTags = tagInstances.filter(
    (tag) => tags.includes(tag.name) && !alreadyExistingTags.includes(tag.name),
  );
  const existingTags = tagInstances
    .filter(
      (tag) =>
        tags.filter(
          (tagName) => tagName.toLowerCase() === tag.name.toLowerCase(),
        ).length &&
        alreadyExistingTags.filter(
          (existingTag) => existingTag.toLowerCase() === tag.name.toLowerCase(),
        ).length,
    )
    .map((tag) => tag.name);

  return {
    tags: createdTags,
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
