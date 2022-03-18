import { Request, Router } from 'express';

import { run } from '~/common/helpers/route.helper';
import {
  authenticateUser,
  registerUserAdmin,
  refreshToken,
} from '~/services/user.service';
import {
  verifyRegistrationTokenController,
  updateUserMissingDataController,
} from '../controllers/user-managment.controller';

const router: Router = Router();

router
  .post(
    '/login',
    run((req: Request) => authenticateUser(req.body)),
  )
  .post(
    '/register',
    run((req: Request) => registerUserAdmin(req.body, req.companyId)),
  )
  .post(
    '/auth/refresh',
    run((req: Request) => refreshToken(req.body)),
  )
  .get(
    '/register/verify/:token',
    run((req) => verifyRegistrationTokenController(req.params.token)),
  )
  .patch(
    '/register/finish',
    run((req: Request) =>
      updateUserMissingDataController(req.userId, req.body),
    ),
  );

export default router;
