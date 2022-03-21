import { Request, Router } from 'express';

import { run } from '~/common/helpers/route.helper';
import { refreshToken } from '~/services/user.service';

import {
  loginController,
  registrationController,
} from '../controllers/auth.controller';

import {
  verifyRegistrationTokenController,
  updateUserMissingDataController,
} from '../controllers/user-managment.controller';

const router: Router = Router();

router
  .post(
    '/login',
    run(async (req: Request) => await loginController(req.body)),
  )
  .post(
    '/register',
    run(
      async (req: Request) =>
        await registrationController(req.body, req.companyId),
    ),
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
