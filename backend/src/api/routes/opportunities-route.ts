import { Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import {
  getOpportunities,
  getOpportunitiesById,
  createOpportunities,
  connectTagsOpportunity,
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
      return createOpportunities(req.body.opportunities, userId, companyId);
    }),
  )
  .post(
    '/tags',
    run((req) => {
      return connectTagsOpportunity(req.body[0], req.body[1], req.companyId);
    }),
  );

export default router;
