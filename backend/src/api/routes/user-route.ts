import { Request, Router } from 'express';

import { run } from '../../common/helpers/route.helper';
import {
  authenticateUser,
  getUserJWT,
  registerUser,
} from '~/services/user.service';

const router: Router = Router();

router
  .post(
    '/login',
    run(async (req: Request) => {
      const user = await authenticateUser(req.body);
      const token = await getUserJWT(user);

      return { token };
    }),
  )
  .post(
    '/register',
    run(async (req: Request) => {
      const user = await registerUser(req.body);
      const token = await getUserJWT(user);

      return { token };
    }),
  );

export default router;
