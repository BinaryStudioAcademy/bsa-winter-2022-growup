import { Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import {
  getOpportunities,
  createOpportunities,
  connectTagsOpportunity,
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
router.post(
  '/tags',
  run((req) => {
    return connectTagsOpportunity(req.body[0], req.body[1], req.companyId);
  }),
);
export default router;
