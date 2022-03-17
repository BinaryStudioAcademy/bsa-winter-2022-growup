import type { MappedSkill } from '../models/skills/skills';
import { Skill } from '~/data/entities/skill';

export const skillsMapper = (data: Skill): MappedSkill =>
  ({ ...data, company: data.company } as MappedSkill);
