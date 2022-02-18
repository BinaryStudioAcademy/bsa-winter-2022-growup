import { Request, Router } from 'express';
import multer from 'multer';

import { run } from '~/common/helpers/route.helper';
import { updateUserAvatar } from '~/services/user.service';

const router = Router();
const upload = multer();

router.put(
  '/avatar',
  upload.single('avatar'),
  run((req: Request) => {
    return updateUserAvatar(req.userId, req.file);
  }),
);

export default router;
