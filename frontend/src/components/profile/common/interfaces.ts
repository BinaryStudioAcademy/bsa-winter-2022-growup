interface ICareerJourney {
  id: string;
  title: string;
  position: string;
  company: string;
  startDate: Date;
  endDate: Date;
}

interface IEducation {
  id: string;
  specialization: string;
  university: string;
  degree: string;
  startDate: Date;
  endDate: Date;
}

interface IInterests {
  id: string;
  name: string;
}

interface ISkill {
  id: string;
  name: string;
}

export type { ICareerJourney, IEducation, IInterests, ISkill };
