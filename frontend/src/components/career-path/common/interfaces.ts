export interface ITechnicalSkill {
  skill: string;
  topics: (string | { required: string })[];
}

export interface ISkills {
  name: string;
  skills: ITechnicalSkill[];
}
