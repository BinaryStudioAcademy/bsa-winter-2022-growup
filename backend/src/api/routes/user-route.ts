import { Request, Router } from 'express';
import multer from 'multer';

import { run } from '~/common/helpers/route.helper';
import { fetchUser, updateUserAvatar } from '~/services/user.service';
import careerJourneyPouter from './career-journey';

const router = Router();
const upload = multer();

router
  .put(
    '/avatar',
    upload.single('avatar'),
    run((req: Request) => {
      return updateUserAvatar(req.userId, req.file);
    }),
  )
  .get(
    '/',
    run((req: Request) => fetchUser(req.userId)),
  );

router.use('/career-journey', careerJourneyPouter);

export default router;
