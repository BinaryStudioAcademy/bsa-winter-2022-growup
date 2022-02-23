import type { IUser as IUserDefault } from 'growup-shared/common/interfaces';
import { RoleType } from 'common/enums/user/roles.enum';
import {
  CareerJourney,
  Education,
} from 'components/profile/components/profile-info/interfaces';

interface IUser extends IUserDefault {
  firstName: string;
  lastName: string;
  avatar: string | null;
  companyId: string;

  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;

  roleType: RoleType;
  careerJourneys: CareerJourney[];
  educations: Education[];
}

export type { IUser };
