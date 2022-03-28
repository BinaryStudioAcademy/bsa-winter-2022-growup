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
  updateObjectiveSchema,
} from '~/common/validations';
import {
  getAllOkr,
  createOkr,
  getOkrById,
  updateOkrById,
  deleteOKR,
} from '~/services/okr.service';
import {
  createObjectiveToOkr,
  deleteObjective,
  updateObjectiveById,
} from '~/services/objective.service';
import {
  addNewKeyresultToObjective,
  deleteKeyResult,
} from '~/services/key-result.service';

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
  .delete(
    '/okr/:id',
    run((req) => {
      return deleteOKR(req.params.id);
    }),
  )
  .post(
    '/okr/:okrId/objective',
    validatePermissions([RoleType.MENTEE, RoleType.MENTOR]),
    run((req) => {
      return createObjectiveToOkr(req.params.okrId, req.body);
    }),
  )
  .delete(
    '/okr/objective/:id',
    run((req) => {
      return deleteObjective(req.params.id);
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
    run((req) => {
      return addNewKeyresultToObjective(
        req.params.okrId,
        req.params.objectiveId,
        req.body,
      );
    }),
  )
  .delete(
    '/okr/objective/keyresult/:id',
    run((req) => {
      return deleteKeyResult(req.params.id);
    }),
  );

export default router;
