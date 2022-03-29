import { Request, Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import { getCompany } from '~/services/company.service';

import {
  createDomainTree,
  getDomainTrees,
  updateDomain,
  deleteDomain,
  createLevel,
  updateLevel,
  createSkill,
  updateSkill,
  createObjective,
  updateObjective,
  deleteLevel,
  deleteSkill,
  deleteObjective,
} from '../controllers/career-path.controller';

const router = Router();

router.post(
  '/',
  run(async (req: Request) => createDomainTree(req.body, req.userId)),
);

router.get(
  '/domain',
  run(async (req: Request) => getDomainTrees(req.userId)),
);

router.delete(
  '/domain/:domainId',
  run(async (req: Request) => {
    const { domainId } = req.params;

    return deleteDomain(domainId);
  }),
);

router.put(
  '/domain/:domainId',
  run(async (req: Request) => {
    const { domainId } = req.params;

    return updateDomain(domainId, req.body);
  }),
);

router.post(
  '/domain/:domainId/level',
  run(async (req: Request) => {
    const { domainId } = req.params;
    const level = req.body;

    return createLevel(domainId, level);
  }),
);

router.put(
  '/level/:levelId',
  run(async (req: Request) => {
    const { levelId } = req.params;
    const level = req.body;

    return updateLevel(levelId, level);
  }),
);

router.delete(
  '/level/:levelId',
  run(async (req: Request) => {
    const { levelId } = req.params;

    return deleteLevel(levelId);
  }),
);

router.post(
  '/domain/:domainId/level/:levelId/skill',
  run(async (req: Request) => {
    const company = await getCompany(req.companyId);
    const { levelId } = req.params;
    const skill = req.body;

    return createSkill(company, levelId, skill);
  }),
);

router.put(
  '/skill/:skillId',
  run(async (req: Request) => {
    const { skillId } = req.params;
    const skill = req.body;

    return updateSkill(skillId, skill);
  }),
);

router.delete(
  '/skill/:skillId',
  run(async (req: Request) => {
    const { skillId } = req.params;

    return deleteSkill(skillId);
  }),
);

router.post(
  '/domain/:domainId/level/:levelId/skill/:skillId/objective',
  run(async (req: Request) => {
    const { levelId, skillId } = req.params;

    return createObjective(levelId, skillId, req.body);
  }),
);

router.put(
  '/objective/:objectiveId',
  run(async (req: Request) => {
    const { objectiveId } = req.params;

    return updateObjective(objectiveId, req.body);
  }),
);

router.delete(
  '/objective/:objectiveId',
  run(async (req: Request) => {
    const { objectiveId } = req.params;

    return deleteObjective(objectiveId);
  }),
);

export default router;
