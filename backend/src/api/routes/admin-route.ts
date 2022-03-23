import { Router } from 'express';

import { run } from '~/common/helpers/route.helper';

import { createTagsController } from '../controllers/tags.controller';
import { registerUserController } from '../controllers/user-managment.controller';

import { deleteTag, getTags } from '~/services/tag.service';
import { getCommonUserList } from '~/services/user.service';

import { Headers } from '~/common/enums/headers';

const router: Router = Router();

router
  .get(
    '/tags',
    run((req) => getTags(req.userId)),
  )
  .post('/tags', run(createTagsController))
  .delete(
    '/tags/:id',
    run((req) => deleteTag(req.params.id)),
  )
  .get(
    '/users',
    run((req) => getCommonUserList(req.companyId)),
  )
  .post(
    '/users',
    run((req) => {
      return registerUserController({
        host: req.headers[Headers.FORWARDED_HOST] as string,
        origin: req.headers[Headers.ORIGIN] as string,
        email: req.body.email,
        roleType: req.body.roleType,
        companyId: req.companyId,
      });
    }),
  );

export default router;
