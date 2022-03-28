export interface ITechnicalSkill {
  skill: string;
  topics: (string | { required: string })[];
}

export interface IAllTechnicalSkills {
  name: string;
  skills: ITechnicalSkill[];
}
