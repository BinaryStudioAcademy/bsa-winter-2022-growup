import { memo } from 'react';
import { Table } from 'react-bootstrap';

import { IUser } from 'common/interfaces/user/user';
import UserItem from './user-item';

type Props = {
  list: IUser[];
};

const UserList: React.FC<Props> = memo(({ list }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Last name</th>
          <th>First name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {list.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </tbody>
    </Table>
  );
});

export default UserList;
