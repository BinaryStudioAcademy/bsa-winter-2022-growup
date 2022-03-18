import { Router } from 'express';

import { run } from '~/common/helpers/route.helper';

import { createTagsController } from '../controllers/tags.controller';
import { registerUserController } from '../controllers/user-managment.controller';

import { deleteTag, getTags } from '~/services/tag.service';
import { getCommonUserList } from '~/services/user.service';

const router: Router = Router();

router.get(
  '/tags',
  run((_) => getTags()),
);

router.post('/tags', run(createTagsController));

router.delete(
  '/tags/:id',
  run((req) => deleteTag(req.params.id)),
);

router.get(
  '/users',
  run((req) => getCommonUserList(req.companyId)),
);

router.post(
  '/users',
  run((req) =>
    registerUserController({
      email: req.body.email,
      roleType: req.body.roleType,
      companyId: req.companyId,
    }),
  ),
);

export default router;
