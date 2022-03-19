import { Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import { getUserLanguages, createLanguage } from '~/services/language.service';
import multer from 'multer';

const router: Router = Router();
const upload = multer();

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
  )
  .put(
    '/certificate',
    upload.single('certificate'),
    run((req: any) => {
      console.warn(req);
      // return addLanguageCertificate(req.userId, req.file);
      return null;
    }),
  );

export default router;
