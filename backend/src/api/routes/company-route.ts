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
  validatePermissions([RoleType.Admin, RoleType.User]),
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
  validatePermissions([RoleType.Admin, RoleType.User]),
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
  validatePermissions([RoleType.Admin, RoleType.User]),
  run((req): Promise<OKR[]> => getAllOkr(req.userId)),
);

router.get(
  '/okr/:id',
  validatePermissions([RoleType.Admin, RoleType.User]),
  run((req): Promise<OKR> => getOkrById(req.params.id)),
);

router.post(
  '/okr',
  validatePermissions([RoleType.Admin, RoleType.User]),
  validateBody(createOkrSchema),
  run((req): Promise<OKR> => {
    const { userId, body } = req;
    const data = { userId, body };
    return createOkr(data);
  }),
);

router.put(
  '/okr/:id',
  validatePermissions([RoleType.Admin, RoleType.User]),
  validateBody(updateOkrSchema),
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
  validatePermissions([RoleType.Admin, RoleType.User]),
  validateBody(createObjectiveSchema),
  run((req): Promise<OKR> => {
    const { body } = req;
    const { id } = req.params;
    const data = { okrId: id, body };
    return createObjectiveToOkr(data);
  }),
);

router.put(
  '/okr/:id/objective/:id1',
  validatePermissions([RoleType.Admin, RoleType.User]),
  validateBody(updateObjectiveSchema),
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
  validatePermissions([RoleType.Admin, RoleType.User]),
  validateBody(createKeyResultSchema),
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
