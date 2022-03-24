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
      return getOpportunitiesById(req.params.id);
    }),
  )
  .post(
    '/',
    run((req) => {
      const { companyId, userId } = req;
      return createOpportunities(
        req.body.opportunities,
        req.body.opportunities[0].tags,
        userId,
        companyId,
      );
    }),
  );

export default router;
