import { Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import { createTagsController } from '../controllers/tags.controller';
import { deleteTag, getTags } from '~/services/tag.service';
import {
  getCommonUserList,
  registerCommonUsers,
} from '~/services/user.service';

import { createDefaultUser } from '~/common/utils/default-user.util';

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
    registerCommonUsers(
      createDefaultUser(req.body.email),
      req.body.roleType,
      req.companyId,
    ),
  ),
);

export default router;
