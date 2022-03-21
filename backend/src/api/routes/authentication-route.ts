import { Request, Router } from 'express';

import { run } from '~/common/helpers/route.helper';
import { refreshToken } from '~/services/user.service';

import {
  loginController,
  registrationController,
} from '../controllers/auth.controller';

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
    run(async (req: Request) => await refreshToken(req.body)),
  );

export default router;
