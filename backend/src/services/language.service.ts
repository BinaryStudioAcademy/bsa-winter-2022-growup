import { getCustomRepository } from 'typeorm';
import { asyncForEach } from '~/common/helpers/array.helper';
import { Language } from '~/data/entities/language';
import { User } from '~/data/entities/user';
import LanguageRepository from '~/data/repositories/language.repository';
import UserRepository from '~/data/repositories/user.repository';

interface ILanguage {
  name: string;
  level: string;
  certificate: string;
  id: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export const getUserLanguages = async (id: string): Promise<Language[]> => {
  const languageRepository = getCustomRepository(LanguageRepository);

  const languageSkillInstance = await languageRepository.find({
    where: {
      user: id,
    },
  });

  return languageSkillInstance;
};

export const createLanguage = async (
  data: Language[],
  userId: string,
): Promise<ILanguage[]> => {
  const languageRepository = getCustomRepository(LanguageRepository);
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findOne({
    where: { id: userId },
  });

  const languages: Language[] = [];
  await asyncForEach(async ({ name, level }: Language) => {
    const language = languageRepository.create({
      name,
      level,
      certificate: 'certificate',
      user: user,
    });
    await language.save();
    languages.push(language);
  }, data);
  await user.save();

  return languages;
};
