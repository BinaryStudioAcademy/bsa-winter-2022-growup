import { Request, Router } from 'express';
import multer from 'multer';

import { fetchUser, updateUserAvatar } from '~/services/user.service';
import { run } from '~/common/helpers/route.helper';

const router = Router();
const upload = multer();

router.put(
  '/avatar',
  upload.single('avatar'),
  run((req: Request) => {
    return updateUserAvatar(req.userId, req.file);
  }),
);

router.get(
  '/',
  run((req: Request) => fetchUser(req.userId)),
);

export default router;
