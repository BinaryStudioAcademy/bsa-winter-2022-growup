import { Request } from 'express';

import { getCompany } from '~/services/company.service';
import { createTags } from '~/services/tag.service';

export const createTagsController = async (
  req: Request,
): Promise<ReturnType<typeof createTags>> => {
  const company = await getCompany(req.companyId);
  return createTags(req.body.tags, company);
};
