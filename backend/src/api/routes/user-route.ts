import { Request, Router } from 'express';
import multer from 'multer';

import {
  fetchUser,
  registerUser,
  updateUserAvatar,
} from '~/services/user.service';
import { createDefaultUser } from '~/common/utils/default-user.util';
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

router.post(
  '/',
  run((req: Request) =>
    registerUser(
      createDefaultUser(req.body.email),
      req.body.roleType,
      req.companyId,
    ),
  ),
);

router.get(
  '/',
  run((req: Request) => fetchUser(req.userId)),
);

export default router;
