import { EntityRepository, Repository } from 'typeorm';
import { RegistrationToken } from '~/data/entities/registration-token';

@EntityRepository(RegistrationToken)
class RegistrationTokenRepository extends Repository<RegistrationToken> {}

export default RegistrationTokenRepository;
