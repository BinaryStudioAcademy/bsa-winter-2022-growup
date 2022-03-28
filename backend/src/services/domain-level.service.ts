import { HttpCode, HttpError } from 'growup-shared';
import { getCustomRepository, getManager, getTreeRepository } from 'typeorm';
import DomainLevelRepository from '~/data/repositories/domain-level.repository';

import { DomainLevel } from '~/data/entities/domain-level';
import { asyncForEach } from '~/common/helpers/array.helper';

type DomainLevelCreation = {
  prev: DomainLevel | null;
  name: string;
  domain: DomainLevel['domain'];
};

type ConnectLevelResponse = {
  level: DomainLevel;
  nextLevel: DomainLevel[];
};

type NextLevelIdResponse = {
  nextLevels: DomainLevel['id'][];
};

export const createDomainLevel = async ({
  name,
  domain,
  prev,
}: DomainLevelCreation): Promise<DomainLevel> => {
  const domainLevelRepository = getCustomRepository(DomainLevelRepository);

  const props = { name, domain, prevLevel: prev };

  const target = await domainLevelRepository.findOne(props);
  if (target) return target;

  const level = await domainLevelRepository.create(props).save();

  return level;
};

export const getDomainLevels = async (
  domain: DomainLevel['domain'],
): Promise<DomainLevel> => {
  const domainLevelRepository = getCustomRepository(DomainLevelRepository);
  const lowestLevel = await domainLevelRepository.findOne({
    where: { domain, prevLevel: null },
  });

  if (!lowestLevel)
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: 'No levels found',
    });

  const manager = getManager().getTreeRepository(DomainLevel);
  const tree = await manager.findDescendantsTree(lowestLevel);

  return tree;
};

export const getLevelById = async (
  levelId: DomainLevel['id'],
): Promise<DomainLevel> => {
  const domainLevelRepository = getCustomRepository(DomainLevelRepository);
  const manager = getManager().getTreeRepository(DomainLevel);
  const level = await domainLevelRepository.findOne(
    { id: levelId },
    { relations: ['domain'] },
  );
  const tree = await manager.findDescendantsTree(level, { depth: 1 });

  return tree;
};

export const getLevels = async (
  domain: DomainLevel['domain'],
): Promise<DomainLevel[]> => {
  const domainLevelRepository = getCustomRepository(DomainLevelRepository);
  const levels = await domainLevelRepository.find({ where: { domain } });
  const levelsTree: DomainLevel[] = [];

  const manager = getManager().getTreeRepository(DomainLevel);

  await asyncForEach(async (level) => {
    const tree = await manager.findDescendantsTree(level, {
      relations: ['domain'],
      depth: 1,
    });

    levelsTree.push(tree);
  }, levels);

  return levelsTree;
};

export const getLevelsNextId = async (
  level: DomainLevel,
): Promise<NextLevelIdResponse> => {
  const nextIds: NextLevelIdResponse['nextLevels'] = [];
  const manager = getManager().getTreeRepository(DomainLevel);

  const tree = await manager.findDescendantsTree(level, { depth: 1 });

  if (tree?.nextLevel) {
    await asyncForEach(async (next) => {
      nextIds.push(next.id);
    }, tree.nextLevel);
  }

  return { nextLevels: nextIds };
};

export const updateLevelById = async (
  id: string,
  level: DomainLevel,
): Promise<DomainLevel> => {
  const domainLevelRepository = await getCustomRepository(
    DomainLevelRepository,
  );

  await domainLevelRepository.update({ id }, level);

  const updatedLevel = await domainLevelRepository.findOne({ id });
  const children = await getManager()
    .getTreeRepository(DomainLevel)
    .findDescendants(updatedLevel);
  updatedLevel.nextLevel = children;

  return updatedLevel;
};

export const deleteLevelById = async (
  id: DomainLevel['id'],
): Promise<DomainLevel> => {
  const domainLevelRepository = getCustomRepository(DomainLevelRepository);

  const level = await domainLevelRepository.findOne({ id });
  await domainLevelRepository.delete({ id });

  return level;
};

export const connectDomainLevels = async (
  level: DomainLevel,
  nextLevel: DomainLevel[],
): Promise<ConnectLevelResponse> => {
  const domainLevelRepository = getCustomRepository(DomainLevelRepository);

  const treeRepository = await getTreeRepository(DomainLevel);

  const levelsTree: DomainLevel[] = [];

  await asyncForEach(async (next) => {
    const parent = await domainLevelRepository.findOne(
      { id: next.id },
      { relations: ['domain'] },
    ); // next ??
    const tree = await treeRepository.findDescendantsTree(parent);
    const ancestor = await treeRepository.findAncestorsTree(parent);
    levelsTree.push(tree);

    const isExistConnection = ancestor?.prevLevel?.id === level.id;
    const isExistConnectionReverse = tree?.nextLevel?.find(
      (nextLvl) => nextLvl?.id === level?.id,
    );

    if (isExistConnection || isExistConnectionReverse) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: 'This connection already exists',
      });
    }

    tree.prevLevel = level;
    await tree.save();
  }, nextLevel);

  return { level, nextLevel: levelsTree };
};

export const disconnectDomainLevels = async (
  level: DomainLevel,
  nextLevel: DomainLevel,
): Promise<DomainLevel> => {
  const domainLevelRepository = getCustomRepository(DomainLevelRepository);
  const treeRepository = await getTreeRepository(DomainLevel);

  const parent = await domainLevelRepository.findOne({ id: nextLevel.id });
  const tree = await treeRepository.findDescendantsTree(parent);

  tree.prevLevel = null;
  await tree.save();

  return level;
};
