import { EntityRepository, Repository } from 'typeorm';
import { RefreshToken } from '../entities/refresh-token';

@EntityRepository(RefreshToken)
class RefreshTokenRepository extends Repository<RefreshToken> {}

export default RefreshTokenRepository;
