import { Request, Router } from 'express';

import { run } from '../../common/helpers/route.helper';
import { authenticateUser, registerUser } from '~/services/user.service';

const router: Router = Router();

router
  .post(
    '/login',
    run(async (req: Request) => await authenticateUser(req.body)),
  )
  .post(
    '/register',
    run(async (req: Request) => await registerUser(req.body)),
  );

export default router;
