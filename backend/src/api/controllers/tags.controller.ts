import { Request } from 'express';
import { getCustomRepository } from 'typeorm';
import UserRepository from '~/data/repositories/user.repository';
import { badRequestError } from '~/common/errors';
import { getCompany } from '~/services/company.service';
import { createTags } from '~/services/tag.service';

export const createTagsController = async (
  req: Request,
): Promise<ReturnType<typeof createTags>> => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.geUserById(req.userId);

  if (!user.company) {
    throw badRequestError('User doesn`t create company!!!');
  }

  const company = await getCompany(req.companyId);
  return createTags(req.body.tags, company);
};
