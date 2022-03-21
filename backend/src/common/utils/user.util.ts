import { User } from '~/data/entities/user';
import { UserRole } from '~/data/entities/user-role';

import { IListUser } from '~/common/models/user/user';

const convertForUserList = (userInstance: User, role: UserRole): IListUser => ({
  firstName: userInstance.firstName,
  lastName: userInstance.lastName,
  email: userInstance.email,
  roleType: [role.role],
  company: userInstance.company.id,
});

export { convertForUserList };
