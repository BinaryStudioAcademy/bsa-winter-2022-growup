import { Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import { createTags, deleteTag } from '~/services/tag.service';

const router: Router = Router();

router.post(
  '/',
  run((req) => createTags(req.body.tags)),
);

router.delete(
  '/:id',
  run((req) => deleteTag(req.params.id)),
);

export default router;
