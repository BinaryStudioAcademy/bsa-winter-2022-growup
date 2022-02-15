import { EntityRepository, Repository } from 'typeorm';
import { UserRole } from '../entities/role';

@EntityRepository(UserRole)
class UserRoleRepository extends Repository<UserRole> {}

export default UserRoleRepository;
