import { Router } from 'express';
import { run } from '~/common/helpers/route.helper';
import { Company } from '~/data/entities/company';
import { createCompany, editCompany } from '~/services/company.service';

const router: Router = Router();

router.post(
  '/',
  run((req) => createCompany(req.body)),
);
router.patch(
  '/:id',
  run((req): Promise<Company> => {
    const { id } = req.params;
    const { body } = req;
    return editCompany({ id, body });
  }),
);

export default router;
