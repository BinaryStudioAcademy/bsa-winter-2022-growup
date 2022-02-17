import { RoleType as DefaultRoleType } from 'growup-shared/common/enums';

const RoleType = {
  ...DefaultRoleType,
  Mentor: 'Mentor',
  Mentee: 'Menteee',
} as const;

export { RoleType };
