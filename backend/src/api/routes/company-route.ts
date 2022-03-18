import { Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import {
  CompanyResponse,
  CompaniesResponse,
} from '~/common/models/responses/company';
import {
  validateBody,
  validatePermissions,
} from '~/api/middlewares/validation-middleware';
import { OKR } from '~/data/entities/okr';
import {
  createCompany,
  editCompany,
  getAllCompanies,
} from '~/services/company.service';
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
import { Objective } from '~/data/entities/objective';

const router: Router = Router();

router
  .get(
    '/',
    validatePermissions([RoleType.ADMIN]),
    run((req): Promise<CompaniesResponse> => {
      const { userId, userRole } = req;
      return getAllCompanies({ userId, userRole });
    }),
  )
  .post(
    '/',
    validatePermissions([RoleType.ADMIN]),
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
  )
  .patch(
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
  )
  .get(
    '/okr',
    validatePermissions([RoleType.MENTEE, RoleType.MENTOR]),
    run((req): Promise<OKR[]> => getAllOkr(req.userId)),
  )
  .get(
    '/okr/:okrId',
    validatePermissions([RoleType.MENTEE, RoleType.MENTOR]),
    run((req): Promise<OKR> => getOkrById(req.params.okrId)),
  )
  .post(
    '/okr',
    validatePermissions([RoleType.MENTEE, RoleType.MENTOR]),
    validateBody(createOkrSchema),
    run((req): Promise<OKR> => {
      const { userId, body } = req;
      const data = { userId, body };
      return createOkr(data);
    }),
  )
  .put(
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
  )
  .post(
    '/okr/:okrId/objective',
    validatePermissions([RoleType.MENTEE, RoleType.MENTOR]),
    validateBody(createObjectiveSchema),
    run((req): Promise<Objective> => {
      const { body } = req;
      const { okrId } = req.params;
      const data = { okrId, body };
      return createObjectiveToOkr(data);
    }),
  )
  .put(
    '/okr/:okrId/objective/:objectiveId',
    validatePermissions([RoleType.MENTEE, RoleType.MENTOR]),
    validateBody(updateObjectiveSchema),
    run((req): Promise<OKR> => {
      const { okrId, objectiveId } = req.params;
      const { body } = req;
      const data = { okrId, objectiveId, body };
      return updateObjectiveById(data);
    }),
  )
  .post(
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
