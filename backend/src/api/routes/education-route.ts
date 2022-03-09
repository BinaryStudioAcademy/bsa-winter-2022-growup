import { Request, Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import {
  validateBody,
  validatePermissions,
} from '~/api/middlewares/validation-middleware';
import {
  createEducation,
  deleteEducation,
  getAllEducations,
  updateEducation,
} from '~/services/education-service';
import {
  createEducationSchema,
  updateEducationSchema,
} from '~/common/validations';
import { RoleType } from '~/common/enums/role-type';

const router = Router();

router
  .get(
    '/',
    validatePermissions([RoleType.MENTEE, RoleType.MENTOR]),
    run(async (req: Request) => {
      const { userId } = req;
      return getAllEducations(userId);
    }),
  )
  .post(
    '/',
    validatePermissions([RoleType.MENTEE, RoleType.MENTOR]),
    validateBody(createEducationSchema),
    run(async (req: Request) => {
      const { body } = req;
      const { userId } = req;
      body.user = userId;
      return createEducation(body);
    }),
  )
  .put(
    '/:id',
    validatePermissions([RoleType.MENTEE, RoleType.MENTOR]),
    validateBody(updateEducationSchema),
    run(async (req: Request) => {
      const { body } = req;
      const { id } = req.params;
      body.id = id;
      return updateEducation(body);
    }),
  )
  .delete(
    '/:id',
    validatePermissions([RoleType.MENTEE, RoleType.MENTOR]),
    run(async (req: Request) => {
      const { id } = req.params;
      return deleteEducation(id);
    }),
  );

export default router;
