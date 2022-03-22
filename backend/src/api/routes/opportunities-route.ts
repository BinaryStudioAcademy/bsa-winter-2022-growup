import { Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import {
  getOpportunities,
  getOpportunitiesById,
  createOpportunities,
} from '~/services/opportunity.service';

const router: Router = Router();

router
  .get(
    '/',
    run((req) => {
      const { companyId } = req;
      return getOpportunities(companyId);
    }),
  )
  .get(
    '/:id',
    run((req) => {
      return getOpportunitiesById(req.companyId);
    }),
  )
  .post(
    '/',
    run((req) => {
      const { companyId, userId } = req;
      return createOpportunities(req.body.opportunities, userId, companyId);
    }),
  );
export default router;
