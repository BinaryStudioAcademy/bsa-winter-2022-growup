import { Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import { getOpportunities } from '~/services/opportunity.service';

const router: Router = Router();

// router.post('/',(req,res)=>{
//     res.send(JSON.stringify({
//         status:201,
//         newOpportunity:req.body
//     }))
// })
router.get('/',run((_)=>getOpportunities()));
export default router;
