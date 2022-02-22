import { Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import {
  getOpportunities,
  createOpportunities,
} from '~/services/opportunity.service';

const router: Router = Router();

router.get(
  '/',
  run((req) => {
    const { companyId } = req;
    return getOpportunities(companyId);
  }),
);
router.post(
  '/',
  run((req) => {
    const { companyId, userId } = req;
    return createOpportunities(req.body.opportunities, userId, companyId);
  }),
);
export default router;
