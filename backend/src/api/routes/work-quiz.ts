import { Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import { getQuestions, sendResults } from '~/services/work-quiz.service';

const router: Router = Router();

router
    .get('/question', run(() => getQuestions()))
    .post('/result', run((req) => sendResults(req.body)));

export default router;
