import { User } from '~/data/entities/user';

import { IListUser } from '~/common/models/user/user';

const convertForUserList = (userInstance: User): IListUser => ({
  level: userInstance.level?.id || null,
  position: userInstance.position,
  firstName: userInstance.firstName,
  lastName: userInstance.lastName,
  email: userInstance.email,
  role: userInstance.role,
  company: userInstance.company.id,
  id: userInstance.id,
});

export { convertForUserList };
