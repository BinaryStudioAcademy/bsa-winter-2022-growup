import { EntityRepository, Repository } from 'typeorm';
import { Tags } from '../entities/tags';

@EntityRepository(Tags)
class TagsRepository extends Repository<Tags> {}

export default TagsRepository;
