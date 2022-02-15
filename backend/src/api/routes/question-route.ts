import { Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import { getQuestions } from '~/services/question.service';

const router: Router = Router();

router
    .get('/', run(() => getQuestions()));

export default router;
