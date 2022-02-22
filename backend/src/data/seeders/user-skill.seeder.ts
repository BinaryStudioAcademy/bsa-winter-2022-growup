import { getCustomRepository } from 'typeorm';
import SkillRepository from '../repositories/skill.repository';
import UserRepository from '../repositories/user.repository';
import { skills } from '../seed-data/skills.data';
import { users } from '../seed-data/user.data';

export default class UserSkillSeeder {
  public static async execute(): Promise<void> {
    const skillRepository = getCustomRepository(SkillRepository);
    const userRepository = getCustomRepository(UserRepository);
    for (let i = 0; i < skills.length; i++) {
      const skill = await skillRepository.findOne({
        name: skills[i].name,
      });
      const user = await userRepository.findOne({
        firstName: users[i].firstName,
      });
      skill.users = [];
      user.skills = [];
      skill.users.push(user);
      user.skills.push(skill);
      await user.save();
      await skill.save();
    }
  }
}
