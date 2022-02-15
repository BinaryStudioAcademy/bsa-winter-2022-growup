import { Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import { getAnswers } from '~/services/answer.service';

const router: Router = Router();

router
    .get('/', run(() => getAnswers()));

export default router;
