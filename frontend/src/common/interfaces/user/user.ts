import type { IUser as IUserDefault } from 'growup-shared/common/interfaces';
import { RoleType } from 'common/enums/user/roles.enum';
import {
  ICareerJourney,
  IEducation,
  ILevel,
} from 'components/profile/common/interfaces';
import type { ICompany } from 'common/interfaces/company/company';
import { ITag } from '../tag/tag';

interface IUser extends IUserDefault {
  firstName: string;
  lastName: string;
  avatar: string | null;
  company?: ICompany;
  position: string;
  level: ILevel | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  isCompleteTest: boolean;
  role: RoleType;
  careerJourneys: ICareerJourney[];
  educations: IEducation[];
  tags: ITag[];
  domainName?: string;
  name?: string;
}

export type { IUser };
