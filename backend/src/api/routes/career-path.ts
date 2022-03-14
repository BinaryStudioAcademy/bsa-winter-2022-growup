import { Request, Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import { getCompany } from '~/services/company.service';

import {
  createCareerPath,
  getCareerPath,
} from '../controllers/career-path.controller';

const router = Router();

router.post(
  '/',
  run(async (req: Request) => {
    const company = await getCompany(req.companyId);
    return createCareerPath(req.body, company);
  }),
);

router.get(
  '/:id',
  run(async (req: Request) => getCareerPath(req.params.id)),
);

export default router;
