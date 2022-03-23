import { Router } from 'express';

import { run } from '~/common/helpers/route.helper';

import { createTagsController } from '../controllers/tags.controller';
import { registerUserController } from '../controllers/user-managment.controller';

import { deleteTag, getTags } from '~/services/tag.service';
import {
  getCommonUserList,
  deleteUser,
  changeUserRole,
} from '~/services/user.service';

import { Headers } from '~/common/enums/headers';
import { validatePermissions } from '../middlewares/validation-middleware';
import { RoleType } from '~/common/enums/role-type';

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
    run((req) => getCommonUserList(req.userId)),
  )
  .post(
    '/users',
    run((req) => {
      return registerUserController({
        host: req.headers[Headers.FORWARDED_HOST] as string,
        origin: req.headers[Headers.ORIGIN] as string,
        email: req.body.email,
        roleType: req.body.roleType,
        userId: req.userId,
      });
    }),
  );

router.delete(
  '/users/:id',
  validatePermissions([RoleType.ADMIN]),
  run((req) => deleteUser(req.params.id)),
);

router.put(
  '/users/:id',
  validatePermissions([RoleType.ADMIN]),
  run((req) => changeUserRole(req.params.id, req.body)),
);
export default router;
