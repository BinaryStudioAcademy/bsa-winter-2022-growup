import { Request, Router } from 'express';
import multer from 'multer';

import { run } from '~/common/helpers/route.helper';

import {
  fetchUser,
  updateUserAvatar,
  insertFirstNameLastName,
} from '~/services/user.service';
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
    run((req: Request) => fetchUser(req.userId)),
  )
  .use('/career-journey', careerJourneyRoute)
  .use('/education', educationRoute);

router.put(
  '/pib',
  run((req: Request) => insertFirstNameLastName(req.userId, req.body.pibInfo)),
);

export default router;
