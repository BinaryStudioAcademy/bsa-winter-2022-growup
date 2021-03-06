import { OkrTypes } from 'common/interfaces/okr';

interface IUser {
  id: number;
  email: string;
  password: number;
  firstname: string;
  lastname: string;
  companyId: number;
  mentorId: number;
  domenLevelId: number;
}

export type ObjectiveValues = {
  name: string;
  keyResults: {
    name: string;
    result: number;
  }[];
};

interface IOkr {
  id: number;
  name: string;
  type: OkrTypes;
  startDate: string;
  endDate: string;
  userId: number;
  objective: IObjective[];
  keyResult: IKeyResult[];
}

interface IObjective {
  id: number;
  name: string;
  skillObjectiveId: number;
  okrId: number;
  result: number;
}

interface IKeyResult {
  id: number;
  name: string;
  objectiveId: number;
}

export type { IUser, IOkr };
