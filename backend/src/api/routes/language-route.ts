import { Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import {
  getUserLanguages,
  createLanguage,
  addLanguageCertificate,
} from '~/services/language.service';
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
    '/:id/certificate',
    upload.single('certificate'),
    run((req) => {
      return addLanguageCertificate(req.params.id, req.file);
    }),
  );

export default router;
