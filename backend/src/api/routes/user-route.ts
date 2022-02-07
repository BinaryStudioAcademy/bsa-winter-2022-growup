import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import {
  loginUserController,
  registerUserController,
} from '../controllers/user-controllers';

const router: Router = Router();

router
  .post('/login', run(loginUserController))
  .post('/register', run(registerUserController));

export default router;
