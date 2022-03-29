import type { IUser as IUserDefault } from 'growup-shared/common/interfaces';
import { RoleType } from 'common/enums/user/roles.enum';
import {
  ICareerJourney,
  IEducation,
} from 'components/profile/common/interfaces';
import type { ICompany } from 'common/interfaces/company/company';

interface IUser extends IUserDefault {
  firstName: string;
  lastName: string;
  avatar: string | null;
  company?: ICompany;
  position: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  isCompleteTest: boolean;
  role: RoleType;
  careerJourneys: ICareerJourney[];
  educations: IEducation[];
}

export type { IUser };
