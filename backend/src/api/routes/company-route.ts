import { Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import { CompanyResponse } from '~/common/models/responses/company';
import { createCompany, editCompany } from '~/services/company.service';

const router: Router = Router();

router.post(
  '/',
  run((req): Promise<CompanyResponse> => {
    const { userId, userRole, companyId, body } = req;
    const tokenPayload = {
      userId,
      role: userRole,
      companyId,
    };
    const data = { body, tokenPayload };
    return createCompany(data);
  }),
);
router.patch(
  '/:id',
  run((req): Promise<CompanyResponse> => {
    const { id } = req.params;
    const { body, userId, userRole, companyId } = req;
    const tokenPayload = {
      userId,
      role: userRole,
      companyId,
    };
    return editCompany({ id, body, tokenPayload });
  }),
);

export default router;
