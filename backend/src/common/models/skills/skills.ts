import { Company } from '~/data/entities/company';
import { Skill } from '~/data/entities/skill';

export type MappedSkill = Skill & {
  company: Company['id'];
};

export type SkillsCreationResponse = {
  skills: MappedSkill[];
};
