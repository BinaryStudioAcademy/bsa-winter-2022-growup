import { memo } from 'react';
import { Form } from 'react-bootstrap';

import { IUser } from 'common/interfaces/user/user';
import { useState } from 'hooks/hooks';

import UserTable from './components/user-table';

type Props = {
  list: IUser[];
};

const UserList: React.FC<Props> = memo(({ list }) => {
  const [filter, setFilter] = useState('');

  return (
    <div className="d-grid gap-2">
      <Form.Control
        value={filter}
        onChange={(e): void => setFilter(e.target.value.replace(' ', ''))}
        placeholder="Search"
      />

      <UserTable
        list={list.filter(
          (item) =>
            (item.firstName || '')
              .toLowerCase()
              .startsWith(filter.toLowerCase()) ||
            (item.lastName || '')
              .toLowerCase()
              .startsWith(filter.toLowerCase()),
        )}
      />
    </div>
  );
});

export default UserList;
