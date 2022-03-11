import { getCustomRepository } from 'typeorm';
import EducationRepository from '../data/repositories/education.service.repository';

import { Education } from '../data/entities/education';
import { badRequestError } from '~/common/errors';

export const getAllEducations = async (
  userId: string,
): Promise<Education[]> => {
  const educationRepository = getCustomRepository(EducationRepository);
  const educationInstance = await educationRepository.getAllEducationsByUserId(
    userId,
  );
  return educationInstance;
};

export const createEducation = async (data: Education): Promise<Education> => {
  const educationRepository = getCustomRepository(EducationRepository);
  const educationInstance = await educationRepository.save(data);
  return educationInstance;
};

export const updateEducation = async (data: Education): Promise<Education> => {
  const { id } = data;
  const educationRepository = getCustomRepository(EducationRepository);
  const education = await educationRepository.findOne({ id });

  if (education) {
    const newEducation = Object.assign(education, data);
    await newEducation.save();
    return newEducation;
  }
  throw badRequestError('Education isn`t exist!!!');
};

export const deleteEducation = async (
  id: string,
): Promise<void | { message: string }> => {
  const educationRepository = getCustomRepository(EducationRepository);
  const result = await educationRepository.delete({ id });

  if (result.affected === 1) {
    return { message: 'Education successfully deleted!!!' };
  }
  throw badRequestError('Education isn`t exist!!!');
};
