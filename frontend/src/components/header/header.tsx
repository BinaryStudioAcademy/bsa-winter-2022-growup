import { Dropdown } from 'react-bootstrap';
import { BookmarkFill } from 'react-bootstrap-icons';

import { useAppDispatch, useAppSelector } from 'hooks/store/store.hooks';
import { actions } from 'store/auth/slice';
import { profileActions } from 'store/actions';
import notificationIcon from 'assets/img/icons/header-icons/notification-icon.svg';
import notificationPointer from 'assets/img/icons/header-icons/notification-pointer.svg';
import searchIcon from 'assets/img/icons/header-icons/search-icon.svg';

import './styles.scss';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from 'common/enums/enums';
import { useEffect } from 'hooks/hooks';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.profile.user);
  const onClick = (): void => {
    dispatch(actions.LOGOUT_USER());
    navigate(AppRoute.LOGIN);
  };
  useEffect(() => {
    dispatch(profileActions.fetchProfile());
  }, [dispatch]);
  return (
    <header className="header-section w-100 position-fixed">
      <div className="header-container d-flex align-items-center justify-content-end pe-4 py-2 pe-md-4 py-md-3">
        <form className="form-section" method="get" action="#">
          <img
            className="form-section__search-icon search-icon ms-3 ms-md-4 position-absolute"
            src={searchIcon}
            alt="search icon"
          />
          <input
            className="form-section__search-input search-input me-4 ps-5 py-4 fs-7 border-0 gu-black font-weight-normal"
            placeholder="Search..."
            type="text"
            name="search"
          />
        </form>
        <div className="notification-section position-relative">
          <img
            className="notification-section__icon notification-icon me-4"
            src={notificationIcon}
            alt="notification icon"
          />
          <BookmarkFill className="notification-section__icon following-opportunities-icon rounded-1 me-4 px-1 py-1" />

          <img
            className="notification-section__notification-pointer notification-pointer position-absolute"
            src={notificationPointer}
            alt="notification pointer"
          />
        </div>
        <Dropdown>
          <Dropdown.Toggle id="user-menu">
            {user?.avatar ? (
              <img
                className="avatar-icon rounded-circle"
                src={user.avatar}
                alt="avatar icon"
              ></img>
            ) : (
              <div
                className={`avatar-icon bg-gu-pink text-gu-white rounded-circle d-flex justify-content-center align-items-center ${
                  user?.firstName ? 'bg-gu-pink' : 'bg-gu-black'
                } `}
              >
                {user?.firstName ? (
                  <span>{user.firstName[0] + user.lastName[0]}</span>
                ) : (
                  <span></span>
                )}
              </div>
            )}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={onClick}>Log out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
