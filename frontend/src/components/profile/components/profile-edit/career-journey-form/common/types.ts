import { ICareerJourney } from 'components/profile/common/interfaces';

export type CareerJourneyFormType = Omit<ICareerJourney, 'id' | 'title'>;
