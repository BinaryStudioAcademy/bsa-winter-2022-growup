import { Request, Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import { authenticateUser, registerUser, refreshToken } from '~/services/user.service';
import multer from 'multer';
import { updateUserAvatar, fetchUser } from '~/services/user.service';

const router = Router();
const upload = multer();

router.get(
  '/',
  run((req: Request) => fetchUser(req.userId)),
);

router
  .post(
    '/login',
    run(async (req: Request) => await authenticateUser(req.body)),
  )
  .post(
    '/register',
    run(async (req: Request) => await registerUser(req.body)),
  )
  .post(
    '/auth/refresh',
    run(async (req: Request) => await refreshToken(req.body)),
  );

router.put(
  '/avatar',
  upload.single('avatar'),
  run((req: Request) => {
    return updateUserAvatar(req.userId, req.file);
  }),
);

export default router;
