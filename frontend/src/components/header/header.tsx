import avatarIcon from 'assets/img/icons/header-icons/avatar-icon.svg';
import notificationIcon from 'assets/img/icons/header-icons/notification-icon.svg';
import notificationPointer from 'assets/img/icons/header-icons/notification-pointer.svg';
import searchIcon from 'assets/img/icons/header-icons/search-icon.svg';
import './header.scss';

const Header: React.FC = () => {

      return (
          <header className="header-section mw-100 position-relative">
              <div className="header-container d-flex align-items-center justify-content-end pe-5">
                <form className="form-section" method="get" action="#">
                    <img className="form-section__search-icon search-icon position-absolute" src={searchIcon} alt="search icon" />
                    <input className="form-section__search-input search-input fs-7 border-0 gu-black font-weight-normal" placeholder="Search..." type="text" name="search" />
                </form>
                <div className="notification-section position-relative">
                    <img className="notification-section__icon notification-icon" src={notificationIcon} alt="notification icon" />
                    <img className="notification-section__notification-pointer notification-pointer position-absolute" src={notificationPointer} alt="notification pointer" />
                </div>
                <img className="avatar-icon" src={avatarIcon} alt="avatar icon" />
              </div>
          </header>
      );
};

export default Header;
