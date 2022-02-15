import { Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import { createCompany } from '~/services/company.service';

const router: Router = Router();

router
  .post('/', run(req => createCompany(req.body)));

export default router;
