import { EntityRepository, Repository } from 'typeorm';
import { CareerParh } from '../entities/career-parh';

@EntityRepository(CareerParh)
class CareerParhRepository extends Repository<CareerParh> {}

export default CareerParhRepository;
