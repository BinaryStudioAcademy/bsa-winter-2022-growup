import { Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import { CompanyResponse } from '~/common/models/responses/company';
import { createCompany, editCompany } from '~/services/company.service';

const router: Router = Router();

router.post(
  '/',
  run((req) => createCompany(req.body)),
);
router.patch(
  '/:id',
  run((req): Promise<CompanyResponse> => {
    const { id } = req.params;
    const { body } = req;
    return editCompany({ id, body });
  }),
);

export default router;
