import { Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import { getSkills, createSkills } from '~/services/skill.service';

const router: Router = Router();

router.get(
  '/',
  run((req) => {
    return getSkills(req.companyId);
  }),
);

router.post(
  '/',
  run((req) => {
    return createSkills(req.body, req.userId, req.companyId);
  }),
);

export default router;
