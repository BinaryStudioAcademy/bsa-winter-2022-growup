import { ICareerJourney } from '../../../../common/interfaces';

export type CareerJourneyFormType = Omit<ICareerJourney, 'id' | 'title'>;
