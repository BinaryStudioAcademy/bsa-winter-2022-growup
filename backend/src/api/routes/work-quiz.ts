import { Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import { getQuestions, sendResults } from '~/services/work-quiz.service';
import { ITokenPayload } from '~/common/models/middlewares/token-payload';
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

      const tokenPayload: ITokenPayload = {
        userId,
        role: userRole,
        companyId: null,
      };

      const data = { body, tokenPayload };

      return sendResults(data);
    }),
  );

export default router;
