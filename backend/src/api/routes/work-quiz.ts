import { Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import {
  getQuestions,
  sendResults,
  getResults,
} from '~/services/work-quiz.service';
import { ITokenPayload } from '~/common/models/middlewares/token-payload';

const router: Router = Router();

router
  .get(
    '/question',
    run((req) => {
      return getQuestions(req.companyId);
    }),
  )
  .get(
    '/result',
    run((req) => {
      return getResults(req.userId);
    }),
  )
  .post(
    '/result',
    run((req) => {
      const { userId, userRole, companyId, body } = req;

      const tokenPayload: ITokenPayload = {
        userId,
        role: userRole,
        companyId,
      };

      const data = { body, tokenPayload };

      return sendResults(data);
    }),
  );

export default router;
