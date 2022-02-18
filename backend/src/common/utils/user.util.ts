import { User } from '~/data/entities/user';
import { UserRole } from '~/data/entities/user-role';

import { IListUser } from '~/common/models/user/user';

const convertForUserList = (userInstance: User, role: UserRole): IListUser => {
  const { password: _password, company, ...user } = userInstance;

  return {
    ...user,
    company: company.id,
    roleType: role.role,
  } as IListUser;
};

export { convertForUserList };
