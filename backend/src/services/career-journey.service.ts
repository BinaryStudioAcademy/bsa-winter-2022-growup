import { getCustomRepository } from 'typeorm';
import CareerJourneyRepository from '../data/repositories/career-journey.service.repository';

import { CareerJourney } from '../data/entities/career-journey';
import { badRequestError, successRequest } from '~/common/errors';

export const getAllCareerJourneys = async (
  userId: string,
): Promise<CareerJourney[]> => {
  const careerJourneyRepository = getCustomRepository(CareerJourneyRepository);
  const companyInstance =
    await careerJourneyRepository.getAllCareerJourneyByUserId(userId);
  return companyInstance;
};

export const createCareerJourney = async (
  body: CareerJourney,
): Promise<CareerJourney> => {
  const careerJourneyRepository = getCustomRepository(CareerJourneyRepository);
  const companyInstance = await careerJourneyRepository.save(body);
  return companyInstance;
};

export const updateCareerJourney = async (
  body: CareerJourney,
): Promise<CareerJourney> => {
  const { id } = body;
  const careerJourneyRepository = getCustomRepository(CareerJourneyRepository);
  const careerJourney = await careerJourneyRepository.findOne({ id });

  if (careerJourney) {
    const newCareerJourney = Object.assign(careerJourney, body);
    await newCareerJourney.save();
    return newCareerJourney;
  }
  throw badRequestError('Career journey isn`t exist!!!');
};

export const deleteCareerJourney = async (id: string): Promise<void> => {
  const careerJourneyRepository = getCustomRepository(CareerJourneyRepository);
  const result = await careerJourneyRepository.delete({ id });

  if (result.affected === 1) {
    throw successRequest('Career journey successfully deleted!!!');
  }
  throw badRequestError('Career journey isn`t exist!!!');
};
