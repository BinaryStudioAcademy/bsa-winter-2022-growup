import { Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import { createCompany, editCompany } from '~/services/company.service';

const router: Router = Router();

router.post(
  '/',
  run((req) => createCompany(req)),
);
router.patch(
  '/:id',
  run((req) => editCompany(req)),
);

export default router;
