import { Request, Router } from 'express';
import multer from 'multer';

import { run } from '~/common/helpers/route.helper';
import {
  fetchUser,
  updateUserAvatar,
  insertFirstNameLastName,
} from '~/services/user.service';

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

router.put(
  '/pib',
  run((req: Request) => insertFirstNameLastName(req.userId, req.body.pibInfo)),
);

export default router;
