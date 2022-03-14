import { CareerJourneyPayloadKey } from 'common/enums/user/career-journey-payload-key.enum';

const DEFAULT_CAREER_JOURNEY_PAYLOAD = {
  [CareerJourneyPayloadKey.POSITION]: '',
  [CareerJourneyPayloadKey.COMPANY]: '',
  [CareerJourneyPayloadKey.START_DATE]: null,
  [CareerJourneyPayloadKey.END_DATE]: null,
};

export { DEFAULT_CAREER_JOURNEY_PAYLOAD };
