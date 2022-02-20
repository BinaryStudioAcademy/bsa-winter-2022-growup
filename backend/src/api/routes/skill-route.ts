import { Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import { getSkills, createSkills } from '~/services/skill.service';

const router: Router = Router();

router.get(
  '/',
  run((req) => {
    return getSkills(req.body.userId);
  }),
);

router.post(
  '/',
  run((req) => {
    console.log(req.body);
    return createSkills(req.body);
  }),
);

export default router;
