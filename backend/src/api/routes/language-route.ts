import { Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import { getUserLanguages, createLanguage } from '~/services/language.service';

const router: Router = Router();

router
  .get(
    '/',
    run((req) => {
      return getUserLanguages(req.userId);
    }),
  )
  .post(
    '/',
    run((req) => {
      return createLanguage(req.body, req.userId);
    }),
  );

export default router;
