import { RoleType } from 'growup-shared';

interface IRoute {
  path: string;
  element: JSX.Element;
  role?: RoleType;
}

export type { IRoute };
