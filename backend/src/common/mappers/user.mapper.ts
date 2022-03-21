import { User } from '~/data/entities/user';
import { ShortUser } from '../models/user/user';

export const toShortUser = (user: User): ShortUser => ({
  firstName: user.firstName,
  lastName: user.lastName,
  position: user.position,
});
