import { Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import { CompanyResponse } from '~/common/models/responses/company';
import {
  validateBody,
  validatePermissions,
} from '~/api/middlewares/validation-middleware';
import { OKR } from '~/data/entities/okr';
import { createCompany, editCompany } from '~/services/company.service';
import { RoleType } from '~/common/enums/role-type';
import {
  createOkrSchema,
  updateOkrSchema,
  createObjectiveSchema,
  updateObjectiveSchema,
  createKeyResultSchema,
} from '~/common/validations';
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
  // validatePermissions([RoleType.ADMIN]),
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
  validatePermissions([RoleType.ADMIN]),
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

router.get(
  '/okr',
  validatePermissions([RoleType.MENTEE, RoleType.MENTOR]),
  run((req): Promise<OKR[]> => getAllOkr(req.userId)),
);

router.get(
  '/okr/:okrId',
  validatePermissions([RoleType.MENTEE, RoleType.MENTOR]),
  run((req): Promise<OKR> => getOkrById(req.params.okrId)),
);

router.post(
  '/okr',
  validatePermissions([RoleType.MENTEE, RoleType.MENTOR]),
  validateBody(createOkrSchema),
  run((req): Promise<OKR> => {
    const { userId, body } = req;
    const data = { userId, body };
    return createOkr(data);
  }),
);

router.put(
  '/okr/:okrId',
  validatePermissions([RoleType.MENTEE, RoleType.MENTOR]),
  validateBody(updateOkrSchema),
  run((req): Promise<OKR> => {
    const { okrId } = req.params;
    const { body } = req;

    const data = {
      okrId,
      data: body,
    };
    return updateOkrById(data);
  }),
);

router.post(
  '/okr/:okrId/objective',
  validatePermissions([RoleType.MENTEE, RoleType.MENTOR]),
  validateBody(createObjectiveSchema),
  run((req): Promise<OKR> => {
    const { body } = req;
    const { okrId } = req.params;
    const data = { okrId, body };
    return createObjectiveToOkr(data);
  }),
);

router.put(
  '/okr/:okrId/objective/:objectiveId',
  validatePermissions([RoleType.MENTEE, RoleType.MENTOR]),
  validateBody(updateObjectiveSchema),
  run((req): Promise<OKR> => {
    const { okrId, objectiveId } = req.params;
    const { body } = req;
    const data = { okrId, objectiveId, body };
    return updateObjectiveById(data);
  }),
);

router.post(
  '/okr/:okrId/objective/:objectiveId/keyresult',
  validatePermissions([RoleType.MENTEE, RoleType.MENTOR]),
  validateBody(createKeyResultSchema),
  run((req): Promise<OKR> => {
    const { okrId, objectiveId } = req.params;
    const { body } = req;
    const data = { okrId, objectiveId, body };
    return addNewKeyresultToObjective(data);
  }),
);

export default router;
