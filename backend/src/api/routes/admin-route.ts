import { Router } from 'express';

import { run } from '~/common/helpers/route.helper';

import { createTagsController } from '../controllers/tags.controller';
import {
  getActionMailUrl,
  registerUserController,
  resendActivationMailController,
} from '../controllers/user-managment.controller';

import { deleteTag, getTags } from '~/services/tag.service';
import {
  getCommonUserList,
  deleteUser,
  changeUserRole,
} from '~/services/user.service';

import { validatePermissions } from '~/api/middlewares/validation-middleware';

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
    validatePermissions([RoleType.ADMIN]),
    run((req) => deleteTag(req.params.id)),
  )
  .get(
    '/users',
    validatePermissions([RoleType.ADMIN]),
    run((req) => getCommonUserList(req.userId)),
  )
  .get(
    '/users/:id',
    validatePermissions([RoleType.ADMIN]),
    run((req) => resendActivationMailController({ id: req.params.id })),
  )
  .get(
    '/users/token/:id',
    validatePermissions([RoleType.ADMIN]),
    run((req) => getActionMailUrl({ id: req.params.id })),
  )
  .post(
    '/users',
    validatePermissions([RoleType.ADMIN]),
    run((req) =>
      registerUserController({
        email: req.body.email,
        role: req.body.role,
        company: req.companyId,
      }),
    ),
  )
  .delete(
    '/users/:id',
    validatePermissions([RoleType.ADMIN]),
    run((req) => deleteUser(req.params.id)),
  )
  .put(
    '/users/:id',
    validatePermissions([RoleType.ADMIN]),
    run((req) => changeUserRole(req.params.id, req.body.role)),
  );
export default router;
