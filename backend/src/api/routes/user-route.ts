import { Request, Router } from 'express';
import multer from 'multer';

import { run } from '~/common/helpers/route.helper';

import { updateUserAvatar } from '~/services/user.service';
import { fetchUserController } from '../controllers/auth.controller';

import careerJourneyRoute from './career-journey';
import educationRoute from './education-route';

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
    run((req: Request) => fetchUserController(req.userId)),
  )
  .use('/career-journey', careerJourneyRoute)
  .use('/education', educationRoute);

export default router;
