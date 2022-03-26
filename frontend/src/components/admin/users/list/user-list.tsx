import { memo, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { ArrowDown, ArrowUp } from 'react-bootstrap-icons';
import { useState } from 'hooks/hooks';
import { IUser } from 'common/interfaces/user/user';
import UserItem from './user-item';

type Props = {
  list: IUser[];
};

interface ISort {
  firstName: boolean;
  lastName: boolean;
  role: boolean;
}

const UserList: React.FC<Props> = memo(({ list }) => {
  const [sortedList, setSortedList] = useState<IUser[]>([]);
  const [sort, setSort] = useState<ISort>({
    firstName: false,
    lastName: false,
    role: false,
  });

  useEffect(() => {
    setSortedList(list);
  }, [list]);

  const sortList = ([key, value]: [key: keyof IUser, value: boolean]): void => {
    const sortBy = (a: any, b: any): number => {
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
    <Table>
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

export default UserList;
