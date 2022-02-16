import { Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import { CompanyResponse } from '~/common/models/responses/company';
import { OKR } from '~/data/entities/okr';
import { Objective } from '~/data/entities/objective';
import { createCompany, editCompany } from '~/services/company.service';
import { createOkr, addNewObjectiveToOkr } from '~/services/okr.service';

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
  run((req): Promise<OKR> => createOkr(req.userId)),
);

router.post(
  '/okr/:id/objective',
  run((req): Promise<Objective> => addNewObjectiveToOkr(req.params.id)),
);

export default router;
