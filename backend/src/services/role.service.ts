import { getCustomRepository } from 'typeorm';
import { RoleType } from '~/common/enums/role-type';

import UserRoleRepository from '../data/repositories/role.repository';

import { User } from '../data/entities/user';
import { UserRole } from '../data/entities/user-role';

export const createRole = async (
  user: User,
  roleType: typeof RoleType[keyof typeof RoleType],
): Promise<UserRole> => {
  const roleRepository = getCustomRepository(UserRoleRepository);

  const roleInstance = roleRepository.create({
    user: user,
    role: roleType,
  });

  const role = await roleInstance.save();
  return role;
};

export const findRole = async (user: User): Promise<UserRole> => {
  const roleRepository = getCustomRepository(UserRoleRepository);
  const role = await roleRepository.findOne({
    user: user,
  });

  return role;
};
