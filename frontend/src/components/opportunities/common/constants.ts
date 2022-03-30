import { OpportunityPayloadKey } from 'common/enums/enums';

const DEFAULT_OPPORTUNITY_PAYLOAD = {
  [OpportunityPayloadKey.NAME]: '',
  [OpportunityPayloadKey.ORGANIZATION]: '',
  [OpportunityPayloadKey.START_DATE]: null,
};

export { DEFAULT_OPPORTUNITY_PAYLOAD };
