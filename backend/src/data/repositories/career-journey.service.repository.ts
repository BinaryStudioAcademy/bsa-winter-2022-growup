import { EntityRepository, Repository } from 'typeorm';
import { CareerJourney } from '../entities/career-journey';

@EntityRepository(CareerJourney)
class CareerJourneyRepository extends Repository<CareerJourney> {
  getAllCareerJourneyByUserId(userId: string): Promise<CareerJourney[]> {
    return this.createQueryBuilder('career_journey')
      .select()
      .where({ user: userId })
      .getMany();
  }
}

export default CareerJourneyRepository;
