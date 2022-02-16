import { Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import { getOpportunities } from '~/services/opportunity.service';

const router: Router = Router();
router.get('/',run((_)=>getOpportunities()));
export default router;
