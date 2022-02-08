import { Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import { getSomething } from '~/services/user.service';

const router: Router = Router();

router
  .get('/', run(req => getSomething(req.query)));

export default router;
