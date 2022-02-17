import { RoleType as DefaultRoleType } from 'growup-shared/common/enums';

const RoleType = {
  Admin: DefaultRoleType.Admin,
  Mentor: 'Mentor',
  Mentee: 'Mentee',
} as const;

export { RoleType };
