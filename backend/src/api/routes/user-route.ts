import { Request, Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import { authenticateUser, registerUser } from '~/services/user.service';
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
  );

router.put(
  '/avatar',
  upload.single('avatar'),
  run((req: Request) => {
    return updateUserAvatar(req.userId, req.file);
  }),
);

export default router;
