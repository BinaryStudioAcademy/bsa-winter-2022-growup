import { Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import { getQuestions, sendResults } from '~/services/work-quiz.service';

const router: Router = Router();

router
  .get(
    '/question',
    run(() => getQuestions()),
  )
  .post(
    '/result',
    run((req) => {
      const { userId, userRole, body } = req;

      const tokenPayload = {
        userId,
        userRole,
      };

      const data = { body, tokenPayload };

      return sendResults(data);
    }),
  );

export default router;
