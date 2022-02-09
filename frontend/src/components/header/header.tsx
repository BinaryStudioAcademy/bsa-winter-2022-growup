import avatarIcon from 'assets/img/icons/header-icons/avatar-icon.svg';
import notificationIcon from 'assets/img/icons/header-icons/notification-icon.svg';
import notificationPointer from 'assets/img/icons/header-icons/notification-pointer.svg';
import searchIcon from 'assets/img/icons/header-icons/search-icon.svg';
import './header.scss';

const Header: React.FC = () => {

      return (
          <header className="header-section">
              <div className="header-container">
                <form className="form-section" method="get" action="#">
                    <img className="form-section__search-icon search-icon" src={searchIcon} alt="search icon" />
                    <input className="form-section__search-input search-input" placeholder="Search..." type="text" name="search" />
                </form>
                <div className="notification-section">
                    <img className="notification-section__icon notification-icon" src={notificationIcon} alt="notification icon" />
                    <img className="notification-section__notification-pointer notification-pointer" src={notificationPointer} alt="notification pointer" />
                </div>
                <img className="avatar-icon" src={avatarIcon} alt="avatar icon" />
              </div>
          </header>
      );
};

export default Header;
