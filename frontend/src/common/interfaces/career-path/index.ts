// interfaces for fetched Domain object
interface IObjective {
  id: string;
  name: string;
}

interface ISkill {
  id: string;
  name: string;
  type: string;
  objectives: IObjective[];
}

interface ILevel {
  id: string;
  name: string;
  skills: ISkill[];
}

interface IDomainBase {
  id: string;
  name: string;
}

interface IDomain {
  domain: IDomainBase;
  levels: ILevel[];
}

// interfaces to intract with objects of Domain

interface IDomainSetting {
  name: string;
}

interface ILevelSetting {
  domainId: string;
  name: ILevel['name'];
}

interface ISkillSetting {
  domainId: string;
  levelId: string;
  name: ISkill['name'];
}

interface IObjectiveSetting {
  domainId: string;
  levelId: string;
  skillId: string;
  name: IObjective['name'];
}

export type {
  IObjective,
  ISkill,
  ILevel,
  IDomain,
  IDomainSetting,
  ILevelSetting,
  ISkillSetting,
  IObjectiveSetting,
};
