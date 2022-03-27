import { Request, Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import { getCompany } from '~/services/company.service';
import { getDomainById } from '~/services/domain.service';

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
  connectLevels,
  disconnectLevels,
  getDomainTree,
  getLevelAndNextId,
  // createPath,
  // getCareerPath,
  // deletePath,
} from '../controllers/career-path.controller';

const router = Router();

// // CAREER-PATH
// // get career-path
// router.get(
//   '/',
//   run(async (req: Request) => {
//     const company = await getCompany(req.companyId);

//     return getCareerPath(company);
//   }),
// );

// // delete career-path (delete chain of connections started from domainId)
// router.delete(
//   '/delete/:domainId',
//   run(async (req: Request) => {
//     const { domainId } = req.params;

//     return deletePath(domainId);
//   }),
// );

// // create career-path (create connections)
// router.post(
//   '/:domainId/connect/:nextDomainId',
//   run(async (req: Request) => {
//     const { domainId, nextDomainId } = req.params;

//     return createPath(domainId, nextDomainId);
//   }),
// );

// DOMAINS
router.post(
  '/domain',
  run(async (req: Request) => createDomainTree(req.body, req.userId)),
);

router.get(
  '/domain',
  run(async (req: Request) => getDomainTrees(req.userId)),
);

router.get(
  '/domain/:id',
  run(async (req: Request) => {
    const { id } = req.params;
    const domain = await getDomainById(id);

    return getDomainTree(domain);
  }),
);

router.put(
  '/domain/:id',
  run(async (req: Request) => {
    const { id } = req.params;

    return updateDomain(id, req.body);
  }),
);

router.delete(
  '/domain/:id',
  run(async (req: Request) => {
    const { id } = req.params;

    return deleteDomain(id);
  }),
);

// DOMAIN LEVELS
router.post(
  '/domain/:domainId/level',
  run(async (req: Request) => {
    const { domainId } = req.params;
    const level = req.body;

    return createLevel(domainId, level);
  }),
);

router.put(
  '/level/:id',
  run(async (req: Request) => {
    const { id } = req.params;
    const level = req.body;

    return updateLevel(id, level);
  }),
);

router.get(
  '/level/:id',
  run(async (req: Request) => {
    const { id } = req.params;

    return getLevelAndNextId(id);
  }),
);

router.delete(
  '/level/:id',
  run(async (req: Request) => {
    const { id } = req.params;

    return deleteLevel(id);
  }),
);

// LEVEL SKILLS
router.post(
  '/level/:levelId/skill',
  run(async (req: Request) => {
    const company = await getCompany(req.companyId);
    const { levelId } = req.params;
    const skill = req.body;

    return createSkill(company, levelId, skill);
  }),
);

router.put(
  '/skill/:id',
  run(async (req: Request) => {
    const { id } = req.params;
    const skill = req.body;

    return updateSkill(id, skill);
  }),
);

router.delete(
  '/skill/:id',
  run(async (req: Request) => {
    const { id } = req.params;

    return deleteSkill(id);
  }),
);

// LEVEL OBJECTIVES
router.post(
  '/level/:levelId/skill/:skillId/objective',
  run(async (req: Request) => {
    const { levelId, skillId } = req.params;

    return createObjective(levelId, skillId, req.body);
  }),
);

router.put(
  '/objective/:id',
  run(async (req: Request) => {
    const { id } = req.params;

    return updateObjective(id, req.body);
  }),
);

router.delete(
  '/objective/:id',
  run(async (req: Request) => {
    const { id } = req.params;

    return deleteObjective(id);
  }),
);

// LEVEL CONNECTIONS
router.post(
  '/levels-connection/:levelId',
  run(async (req: Request) => {
    const { levelId } = req.params;
    const { nextLevelId } = req.body;

    return connectLevels(levelId, nextLevelId);
  }),
);

router.delete(
  '/levels-connection/:levelId/delete/:nextLevelId',
  run(async (req: Request) => {
    const { levelId, nextLevelId } = req.params;

    return disconnectLevels(levelId, nextLevelId);
  }),
);

export default router;
