import { memo } from 'react';

import { IUser } from 'common/interfaces/user';

type Props = {
  user: IUser;
};

const UserItem: React.FC<Props> = memo(({ user }) => {
  return (
    <tr>
      <td>{user.lastName}</td>
      <td>{user.firstName}</td>
      <td>{user.email}</td>
      <td>{user.roleType}</td>
    </tr>
  );
});

export default UserItem;
