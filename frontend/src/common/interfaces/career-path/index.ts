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

interface IDomainBase {
  id: string;
  name: string;
}

interface INextLevel {
  id: string;
  name: string;
  skills: ISkill[];
  domain: IDomainBase;
}
interface ILevel {
  id: string;
  name: string;
  skills: ISkill[];
  nextLevel: INextLevel[];
}

interface IDomain {
  domain: IDomainBase;
  levels: ILevel[];
  nextDomain: IDomain['domain'] | null;
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
interface IConnectLevels {
  level: ILevel;
  nextLevel: INextLevel[];
}
interface IConnectLevelsSetting {
  domainId: IDomainBase['id'];
  levelId: ILevel['id'];
  nextLevelId: ILevel['id'][];
}

interface IDisconnectLevelsSetting {
  domainId: IDomainBase['id'];
  levelId: ILevel['id'];
  nextLevelId: ILevel['id'];
}

// interface ICareerPath {
//   id: string;
//   nextDomain: IDomain['domain'];
// }

// interface IConnectDomainsSetting {
//   domainId: IDomainBase['id'];
//   nextDomainId: IDomainBase['id'];
// }

// interface IDisconnectDomainsSetting {
//   domainId: IDomainBase['id'];
//   levelId: ILevel['id'];
//   nextLevelId: ILevel['id'];
// }

export type {
  IObjective,
  ISkill,
  ILevel,
  INextLevel,
  IDomain,
  IDomainSetting,
  ILevelSetting,
  ISkillSetting,
  IObjectiveSetting,
  IConnectLevels,
  IConnectLevelsSetting,
  IDisconnectLevelsSetting,
  // ICareerPath,
  // IConnectDomainsSetting,
};
