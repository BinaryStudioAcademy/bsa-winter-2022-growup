import { Request, Router } from 'express';

import { run } from '../../common/helpers/route.helper';
import {
  authenticateUser,
  registerUser,
  refreshToken,
} from '~/services/user.service';
import { RoleType } from 'growup-shared';

const router: Router = Router();

router
  .post(
    '/login',
    run(async (req: Request) => await authenticateUser(req.body)),
  )
  .post(
    '/register',
    run(async (req: Request) => await registerUser(req.body, RoleType.Admin)),
  )
  .post(
    '/auth/refresh',
    run(async (req: Request) => await refreshToken(req.body)),
  );

export default router;
