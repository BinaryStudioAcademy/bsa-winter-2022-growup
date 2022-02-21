import { Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import {
  getOpportunities,
  createOpportunities,
} from '~/services/opportunity.service';

const router: Router = Router();
router.get(
  '/',
  run((_) => getOpportunities()),
);
router.post(
  '/',
  run((req) => createOpportunities(req.body.opportunities)),
);
export default router;
