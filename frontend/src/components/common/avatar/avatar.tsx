import { memo } from 'react';
import { Dropdown } from 'react-bootstrap';

import Avatar from 'react-avatar';

import { useAppDispatch, useNavigate } from 'hooks/hooks';
import { actions } from 'store/auth/slice';

import { IUser } from 'common/interfaces/user';

import { AppRoute } from 'common/enums/enums';

type Props = {
  avatar?: IUser['avatar'];
  firstName?: IUser['firstName'];
  lastName?: IUser['lastName'];
  size: string;
};

const UserAvatar: React.FC<Props> = memo(
  ({ avatar, firstName, lastName, size }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onClick = (): void => {
      dispatch(actions.LOGOUT_USER());
      navigate(AppRoute.LOGIN);
    };

    return (
      <Dropdown align="end">
        <Dropdown.Toggle id="user-menu">
          {avatar ? (
            <img
              className="profile__avatar"
              src={avatar}
              alt="Avatar"
              style={{ width: `${size}px`, height: `${size}px` }}
            />
          ) : (
            <Avatar name={`${firstName} ${lastName}`} size={size} />
          )}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={onClick}>Log out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  },
);

export default UserAvatar;
