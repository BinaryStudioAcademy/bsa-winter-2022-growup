import { getCustomRepository } from 'typeorm';
import { HttpError, HttpCode } from 'growup-shared';
import UserRepository from '~/data/repositories/user.repository';
import { badRequestError } from '~/common/errors';
import TagsRepository from '~/data/repositories/tags.repository';

import { Tags } from '~/data/entities/tags';
import { Company } from '~/data/entities/company';

import type { TagsCreationResponse } from '~/common/models/tags/tags';
import type { SuccessResponse } from '~/common/models/responses/success';
import { asyncForEach } from '~/common/helpers/array.helper';

export const getTags = async (userId: string): Promise<Tags[]> => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.getUserById(userId);

  if (!user.company) {
    throw badRequestError('User doesn`t create company!!!');
  }
  const tagsRepository = getCustomRepository(TagsRepository);
  const tags = await tagsRepository.getAllByCompanyId(user.company.id);

  return tags;
};

export const createTags = async (
  data: Tags['name'][],
  company: Company,
  userId: string,
): Promise<TagsCreationResponse> => {
  const tagsRepository = getCustomRepository(TagsRepository);
  const userRepository = getCustomRepository(UserRepository);

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

  const userInstance = await userRepository.findOne({
    where: {
      id: userId,
    },
    relations: ['tags'],
  });

  userInstance.tags.push(...createdTags);

  await userInstance.save();

  return {
    tags: createdTags,
    existingTags,
  };
};

export const connectTags = async (
  data: Tags[],
  userId: string,
): Promise<Tags[]> => {
  const userRepository = getCustomRepository(UserRepository);
  const tagsRepository = getCustomRepository(TagsRepository);

  const userInstance = await userRepository.findOne({
    where: {
      id: userId,
    },
    relations: ['tags'],
  });

  const tags: Tags[] = [];

  await asyncForEach(async ({ id }: Tags) => {
    const tag = await tagsRepository.findOne(id);
    userInstance.tags.push(tag);
    tags.push(tag);
    await userInstance.save();
  }, data);

  return tags;
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
