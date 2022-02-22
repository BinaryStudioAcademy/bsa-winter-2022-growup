import { Request, Router } from 'express';
import multer from 'multer';

import { run } from '~/common/helpers/route.helper';
import { fetchUser, updateUserAvatar } from '~/services/user.service';

const router = Router();
const upload = multer();

router.put(
  '/avatar',
  upload.single('avatar'),
  run((req: Request) => updateUserAvatar(req.userId, req.file)),
);

router.get(
  '/',
  run((req: Request) => fetchUser(req.userId)),
);

export default router;
