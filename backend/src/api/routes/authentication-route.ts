import { Request, Router } from 'express';

import { run } from '../../common/helpers/route.helper';
import {
  authenticateUser,
  registerUserAdmin,
  refreshToken,
} from '~/services/user.service';

const router: Router = Router();

router
  .post(
    '/login',
    run(async (req: Request) => await authenticateUser(req.body)),
  )
  .post(
    '/register',
    run(
      async (req: Request) => await registerUserAdmin(req.body, req.companyId),
    ),
  )
  .post(
    '/auth/refresh',
    run(async (req: Request) => await refreshToken(req.body)),
  );

export default router;
