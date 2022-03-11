import { Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import {
  getSkills,
  getUserSkills,
  createSkills,
  deleteSkill,
  updateSkill,
  connectSkills,
} from '~/services/skill.service';

const router: Router = Router();

router
  .get(
    '/',
    run((req) => {
      console.log(req.companyId);
      return getSkills(req.companyId);
    }),
  )
  .get(
    '/user',
    run((req) => {
      return getUserSkills(req.userId);
    }),
  )
  .post(
    '/',
    run((req) => {
      return createSkills(req.body, req.userId, req.companyId);
    }),
  )
  .post(
    '/user',
    run((req) => {
      return connectSkills(req.body, req.userId, req.companyId);
    }),
  )
  .delete(
    '/:id',
    run((req) => {
      return deleteSkill(req.params.id, req.userId);
    }),
  )
  .patch(
    '/:id',
    run((req) => {
      console.log(req.params.id);
      console.log(req.body);
      return updateSkill(req.params.id, req.body);
    }),
  );

export default router;
