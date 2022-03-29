import { memo } from 'react';
import { Table } from 'react-bootstrap';
import { ArrowDown, ArrowUp } from 'react-bootstrap-icons';
import { IUser } from 'common/interfaces/user/user';
import { useState, useEffect } from 'hooks/hooks';

import UserItem from '../user-item';

type SortKeys = ['lastName' | 'firstName' | 'role', boolean];

interface ISort {
  firstName: boolean;
  lastName: boolean;
  role: boolean;
}

type Props = {
  list: IUser[];
};

const UserTable: React.FC<Props> = memo(({ list }) => {
  const [sortedList, setSortedList] = useState<IUser[]>([]);
  const [sort, setSort] = useState<ISort>({
    firstName: false,
    lastName: false,
    role: false,
  });

  useEffect(() => {
    setSortedList(list);
  }, [list]);

  const sortList = ([key, value]: SortKeys): void => {
    const sortBy = (a: IUser, b: IUser): number => {
      if (a[key] < b[key]) {
        return value ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return value ? 1 : -1;
      }

      return 0;
    };
    setSortedList([...list].sort(sortBy));
    setSort({ ...sort, ...{ [key]: value } });
  };

  return (
    <Table responsive="sm">
      <thead>
        <tr>
          <th onClick={(): void => sortList(['lastName', !sort.lastName])}>
            Last name
            {sort.lastName ? <ArrowDown /> : <ArrowUp />}
          </th>
          <th onClick={(): void => sortList(['firstName', !sort.firstName])}>
            First name
            {sort.firstName ? <ArrowDown /> : <ArrowUp />}
          </th>
          <th>Email</th>
          <th onClick={(): void => sortList(['role', !sort.role])}>
            Role
            {sort.role ? <ArrowDown /> : <ArrowUp />}
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedList.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </tbody>
    </Table>
  );
});

export default UserTable;
