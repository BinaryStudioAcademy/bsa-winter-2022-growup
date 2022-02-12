import { Request, Router } from 'express';
import { UploadedFile } from 'express-fileupload';
import { run } from '~/common/helpers/route.helper';
import { updateUserAvatar } from '~/services/user.service';

const router = Router();

router.put(
  '/avatar',
  run((req: Request) =>
    updateUserAvatar(req.userId, req.files.avatar as UploadedFile),
  ),
);

export default router;
