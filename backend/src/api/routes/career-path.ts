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
} from '../controllers/career-path.controller';

const router = Router();

router.post(
  '/',
  run(async (req: Request) => {
    const company = await getCompany(req.companyId);

    return createDomainTree(req.body, company);
  }),
);

router.get(
  '/domain',
  run(async (req: Request) => {
    const company = await getCompany(req.companyId);
    return getDomainTrees(company);
  }),
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

export default router;
