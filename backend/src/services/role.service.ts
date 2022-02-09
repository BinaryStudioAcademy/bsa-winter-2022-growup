import { getCustomRepository } from 'typeorm';
import { RoleType } from 'growup-shared';

import UserRoleRepository from '../data/repositories/role.repository';

import { User } from '../data/entities/user';
import { UserRole } from '../data/entities/role';

export const createRole = async (
  user: User,
  roleType: RoleType,
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
