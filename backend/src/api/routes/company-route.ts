import { Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import { CompanyResponse } from '~/common/models/responses/company';
import verifyToken from '~/api/middlewares/authorization-middleware';
import { OKR } from '~/data/entities/okr';
import { createCompany, editCompany } from '~/services/company.service';
import {
  getAllOkr,
  createOkr,
  getOkrById,
  updateOkrById,
} from '~/services/okr.service';
import {
  createObjectiveToOkr,
  updateObjectiveById,
} from '~/services/objective.service';
import { addNewKeyresultToObjective } from '~/services/key-result.service';

const router: Router = Router();

router.post(
  '/',
  verifyToken,
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
  verifyToken,
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
  verifyToken,
  run((req): Promise<OKR[]> => getAllOkr(req.userId)),
);

router.get(
  '/okr/:id',
  verifyToken,
  run((req): Promise<OKR> => getOkrById(req.params.id)),
);

router.post(
  '/okr',
  verifyToken,
  run((req): Promise<OKR> => {
    const { userId, body } = req;
    const data = { userId, body };
    return createOkr(data);
  }),
);

router.put(
  '/okr/:id',
  verifyToken,
  run((req): Promise<OKR> => {
    const { id } = req.params;
    const { body } = req;

    const data = {
      okrId: id,
      data: body,
    };
    return updateOkrById(data);
  }),
);

router.post(
  '/okr/:id/objective',
  verifyToken,
  run((req): Promise<OKR> => {
    const { body } = req;
    const { id } = req.params;
    const data = { okrId: id, body };
    return createObjectiveToOkr(data);
  }),
);

router.put(
  '/okr/:id/objective/:id1',
  verifyToken,
  run((req): Promise<OKR> => {
    const { id, id1 } = req.params;
    const { body } = req;
    const data = {
      okrId: id,
      objectiveId: id1,
      body,
    };
    return updateObjectiveById(data);
  }),
);

router.post(
  '/okr/:id/objective/:id1/keyresult',
  verifyToken,
  run((req): Promise<OKR> => {
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
