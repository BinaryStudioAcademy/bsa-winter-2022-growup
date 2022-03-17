import type { IUser as IUserDefault } from 'growup-shared/common/interfaces';
import { RoleType } from 'common/enums/user/roles.enum';
import {
  ICareerJourney,
  IEducation,
} from '../../../components/profile/common/interfaces';

interface IUser extends IUserDefault {
  firstName: string;
  lastName: string;
  avatar: string | null;
  companyId: string;
  position: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  isCompleteTest: boolean;
  roleType: RoleType;
  careerJourneys: ICareerJourney[];
  educations: IEducation[];
}

export type { IUser };
