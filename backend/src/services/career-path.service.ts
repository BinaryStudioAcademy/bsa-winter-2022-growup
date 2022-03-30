import { HttpCode, HttpError } from 'growup-shared';
import { getCustomRepository } from 'typeorm';
import { CareerParh } from '~/data/entities/career-parh';
import CareerParhRepository from '~/data/repositories/career-path.repository';

export const createCareerPath = async (
  domain: CareerParh['domain'],
  nextDomain: CareerParh['nextDomain'],
): Promise<CareerParh> => {
  const careerPathRepository = getCustomRepository(CareerParhRepository);
  const target = await careerPathRepository.findOne({ domain, nextDomain });

  if (target) {
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: 'Domains are already connected',
    });
  }

  const notConnectedTarget = await careerPathRepository.findOne({
    domain,
    nextDomain: null,
  });

  if (notConnectedTarget) {
    notConnectedTarget.nextDomain = nextDomain;
    await notConnectedTarget.save();
    await careerPathRepository
      .create({ domain: nextDomain, nextDomain: null })
      .save();
    return notConnectedTarget;
  }

  await careerPathRepository
    .create({ domain: null, nextDomain: domain })
    .save();
  const path = await careerPathRepository.create({ domain, nextDomain }).save();
  await careerPathRepository
    .create({ domain: nextDomain, nextDomain: null })
    .save();
  return path;
};

export const getPath = async (
  domain: CareerParh['domain'],
  nextDomain: CareerParh['nextDomain'],
): Promise<CareerParh> => {
  const careerPathRepository = getCustomRepository(CareerParhRepository);
  const target = await careerPathRepository.findOne(
    { domain, nextDomain },
    { relations: ['domain'] },
  );
  if (target) {
    target.domain = domain;
    target.nextDomain = nextDomain;
  }

  return target;
};

export const getPathByDomain = async (
  domain: CareerParh['domain'],
): Promise<CareerParh> => {
  const careerPathRepository = getCustomRepository(CareerParhRepository);
  const target = await careerPathRepository
    .createQueryBuilder('careerPath')
    .innerJoinAndSelect('careerPath.domain', 'domain')
    .innerJoinAndSelect('careerPath.nextDomain', 'nextDomain')
    .where('careerPath.domain = :id', { id: domain.id })
    .getOne();

  return target;
};

export const deleteCareerPath = async (
  domain: CareerParh['domain'],
  nextDomain: CareerParh['nextDomain'],
): Promise<CareerParh> => {
  const careerPathRepository = getCustomRepository(CareerParhRepository);

  await careerPathRepository.delete({ domain, nextDomain });

  return { domain, nextDomain } as CareerParh;
};
