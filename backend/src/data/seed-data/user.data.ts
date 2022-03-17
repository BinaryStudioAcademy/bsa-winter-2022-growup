import { RoleType } from '~/common/enums/role-type';

export const users = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'test@test.com',
    password: 'test',
    role: RoleType.ADMIN,
    position: 'Junior',
  },
  {
    firstName: 'Rick',
    lastName: 'Sanchez',
    email: 'mentor@mentor.com',
    password: 'test',
    role: RoleType.MENTOR,
    position: 'Junior',
  },
  {
    firstName: 'Morty',
    lastName: 'Smith',
    email: 'mentee@mentee.com',
    password: 'test',
    role: RoleType.MENTEE,
    position: 'Junior',
  },
];
