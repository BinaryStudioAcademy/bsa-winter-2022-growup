import { ISkill } from 'common/interfaces/skill/skill';

export type SkillProps = Pick<ISkill, 'company' | 'name' | 'type'>;
