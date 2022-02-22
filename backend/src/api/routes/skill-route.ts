import { Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import {
  getSkills,
  createSkills,
  deleteSkill,
  updateSkill,
} from '~/services/skill.service';

const router: Router = Router();

router
  .get(
    '/',
    run((req) => {
      return getSkills(req.companyId);
    }),
  )
  .post(
    '/',
    run((req) => {
      return createSkills(req.body, req.userId, req.companyId);
    }),
  )
  .delete(
    '/:id',
    run((req) => {
      console.log(req.params.id);
      return deleteSkill(req.params.id);
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
