import { Request, Router } from 'express';
import multer from 'multer';

import { run } from '../../common/helpers/route.helper';
import { updateUserAvatar, registerUser } from '~/services/user.service';
import { createDefaultUser } from '~/common/utils/default-user.util';

const router = Router();
const upload = multer();

router.put(
  '/avatar',
  upload.single('avatar'),
  run((req: Request) => {
    return updateUserAvatar(req.userId, req.file);
  }),
);

router.post(
  '/',
  run((req: Request) =>
    registerUser(
      createDefaultUser(req.body.email),
      req.body.roleType,
      req.body.companyId,
    ),
  ),
);

export default router;
