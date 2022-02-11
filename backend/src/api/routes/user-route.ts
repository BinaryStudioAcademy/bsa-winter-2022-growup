import { Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import { updateUserAvatar } from '~/services/user.service';

const router: Router = Router();

router.put(
  '/',
  run((req) => updateUserAvatar(req.userId, req.body.url)),
);

export default router;
