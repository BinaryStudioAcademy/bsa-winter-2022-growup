import { Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import { CompanyResponse } from '~/common/models/responses/company';
import { createCompany, editCompany } from '~/services/company.service';
import { createOkr } from '~/services/okr.service';

const router: Router = Router();

router.post(
  '/',
  run((req): Promise<CompanyResponse> => {
    const { userId, userRole, body } = req;
    const tokenPayload = {
      userId,
      userRole,
    };
    const data = { body, tokenPayload };
    return createCompany(data);
  }),
);
router.patch(
  '/:id',
  run((req): Promise<CompanyResponse> => {
    const { id } = req.params;
    const { body, userId, userRole } = req;
    const tokenPayload = {
      userId,
      userRole,
    };
    return editCompany({ id, body, tokenPayload });
  }),
);

router.post(
  '/okr',
  run((req) => createOkr(req.userId)),
);

export default router;
