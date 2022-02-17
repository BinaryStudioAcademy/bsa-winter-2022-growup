import { Request, Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import { getCompany } from '~/services/company.service';

import {
  createCareerPath,
  getDomainAndLevels,
} from '../controllers/career-path.controller';

const router = Router();

router.post(
  '/',
  run(async (req: Request) => {
    const company = await getCompany();
    return createCareerPath(req.body, company);
  }),
);

router.get(
  '/:id',
  run(async (req: Request) => getDomainAndLevels(req.params.id)),
);

export default router;
