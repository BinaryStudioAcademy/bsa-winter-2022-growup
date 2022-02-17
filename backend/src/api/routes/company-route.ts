import { Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import { CompanyResponse } from '~/common/models/responses/company';
import { OKR } from '~/data/entities/okr';
import { Objective } from '~/data/entities/objective';
import { KeyResult } from '~/data/entities/key-result';
import { createCompany, editCompany } from '~/services/company.service';
import {
  getAllOkr,
  createOkr,
  addNewObjectiveToOkr,
} from '~/services/okr.service';
import { addNewKeyresultToObjective } from '~/services/objective.service';

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

router.get(
  '/okr',
  run((req): Promise<OKR[]> => getAllOkr(req.userId)),
);

router.post(
  '/okr',
  run((req): Promise<OKR> => {
    const { userId, body } = req;
    const data = { userId, body };
    return createOkr(data);
  }),
);

router.post(
  '/okr/:id/objective',
  run((req): Promise<Objective> => {
    const { body } = req;
    const { id } = req.params;
    const data = { okrId: id, body };
    return addNewObjectiveToOkr(data);
  }),
);

router.post(
  '/company/okr/:id/objective/:id1/keyresult',
  run((req): Promise<KeyResult> => {
    const { id, id1 } = req.params;

    const data = {
      okrId: id,
      objectiveId: id1,
      body: req.body,
    };
    return addNewKeyresultToObjective(data);
  }),
);

export default router;
