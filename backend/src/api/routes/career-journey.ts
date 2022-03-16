import { Request, Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import {
  validateBody,
  validatePermissions,
} from '~/api/middlewares/validation-middleware';
import {
  createCareerJourney,
  getAllCareerJourneys,
  updateCareerJourney,
  deleteCareerJourney,
} from '~/services/career-journey.service';
import {
  createCareerJourneySchema,
  updateCareerJourneySchema,
} from '~/common/validations';
import { RoleType } from '~/common/enums/role-type';

const router = Router();

router
  .get(
    '/',
    validatePermissions([RoleType.MENTEE, RoleType.MENTOR]),
    run(async (req: Request) => {
      const { userId } = req;
      return getAllCareerJourneys(userId);
    }),
  )
  .post(
    '/',
    validatePermissions([RoleType.MENTEE, RoleType.MENTOR]),
    validateBody(createCareerJourneySchema),
    run(async (req: Request) => {
      const { body, userId } = req;
      body.user = userId;
      return createCareerJourney(body);
    }),
  )
  .put(
    '/:id',
    validatePermissions([RoleType.MENTEE, RoleType.MENTOR]),
    validateBody(updateCareerJourneySchema),
    run(async (req: Request) => {
      const { id } = req.params;
      const { body } = req;
      const data = { id, body };
      return updateCareerJourney(data);
    }),
  )
  .delete(
    '/:id',
    validatePermissions([RoleType.MENTEE, RoleType.MENTOR]),
    run(async (req: Request) => {
      const { id } = req.params;
      return deleteCareerJourney(id);
    }),
  );

export default router;
