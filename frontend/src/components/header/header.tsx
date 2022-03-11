import { BookmarkFill } from 'react-bootstrap-icons';

import { useAppDispatch, useAppSelector } from 'hooks/store/store.hooks';
import { profileActions } from 'store/actions';
import notificationIcon from 'assets/img/icons/header-icons/notification-icon.svg';
import notificationPointer from 'assets/img/icons/header-icons/notification-pointer.svg';
import searchIcon from 'assets/img/icons/header-icons/search-icon.svg';

import { UserAvatar } from 'components/common/common';

import './styles.scss';
import { useEffect } from 'hooks/hooks';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.profile.user);

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
        <UserAvatar
          avatar={user?.avatar}
          firstName={user?.firstName}
          lastName={user?.lastName}
          size="50"
          dropdown
        />
      </div>
    </header>
  );
};

export default Header;
