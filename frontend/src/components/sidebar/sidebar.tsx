import logo from 'assets/img/logo.svg';
import { ReactComponent as HomeIcon } from 'assets/img/icons/sidebar-icons/home-icon.svg';
import { ReactComponent as OpportunitiesIcon } from 'assets/img/icons/sidebar-icons/opportunities-icon.svg';
import { ReactComponent as ProfileIcon } from 'assets/img/icons/sidebar-icons/profile-icon.svg';
import { ReactComponent as OkrIcon } from 'assets/img/icons/sidebar-icons/okr-icon.svg';
import { ReactComponent as CareerPathIcon } from 'assets/img/icons/sidebar-icons/career-path-icon.svg';
import { ReactComponent as MenteeProfileIcon } from 'assets/img/icons/sidebar-icons/mentee-icon.svg';
import { AppRoute } from 'common/enums/enums';
import { Link } from 'components/common/common';
import './sidebar.scss';

const Sidebar: React.FC = () => {
    const isMentor = true;

      return (
          <aside className="sidebar-section h-100 position-fixed bg-gu-blue">
              <div className="sidebar-container d-flex flex-column justify-content-between">
                <a className="logo-section d-flex align-items-center text-decoration-none" href="">
                    <img className="logo-section__icon logo-icon" src={logo} alt="logo" />
                    <span className="logo-section__title logo-title font-weight-bold fs-1 text-gu-white m-0 d-none d-sm-block">Grow Up</span>
                </a>
                <nav className="navigation-section">
                    <ul className="navigation-section__list navigation-list d-flex flex-column m-0 p-0">
                      <li className="navigation-list__item navigation-item">
                          <Link to={AppRoute.HOME}>
                              <span className="navigation-item__link navigation-link d-flex align-items-center fs-4 font-weight-normal text-gu-white">
                                  <HomeIcon className="navigation-link__icon" />
                                  <span className="navigation-link__title d-none d-sm-block">Home</span>
                              </span>
                          </Link>
                      </li>
                      <li className="navigation-list__item navigation-item">
                        <Link to={AppRoute.OPPORTUNITIES}>
                            <span className="navigation-item__link navigation-link d-flex align-items-center fs-4 font-weight-normal text-gu-white">
                                <OpportunitiesIcon className="navigation-link__icon" />
                                <span className="navigation-link__title d-none d-sm-block">Opportunities</span>
                            </span>
                        </Link>
                      </li>
                      <li className="navigation-list__item navigation-item">
                          <Link to={AppRoute.PROFILE}>
                            <span className="navigation-item__link navigation-link d-flex align-items-center fs-4 font-weight-normal text-gu-white">
                                <ProfileIcon className="navigation-link__icon" />
                                <span className="navigation-link__title d-none d-sm-block">Profile</span>
                            </span>
                          </Link>
                      </li>
                      <li className="navigation-list__item navigation-item">
                          <Link to={AppRoute.OKR}>
                            <span className="navigation-item__link navigation-link d-flex align-items-center fs-4 font-weight-normal text-gu-white">
                                <OkrIcon className="navigation-link__icon" />
                                <span className="navigation-link__title d-none d-sm-block">OKR</span>
                            </span>
                          </Link>
                      </li>
                      <li className="navigation-list__item navigation-item">
                          <Link to={AppRoute.CAREER_PATH}>
                            <span className="navigation-item__link navigation-link d-flex align-items-center fs-4 font-weight-normal text-gu-white">
                                <CareerPathIcon className="navigation-link__icon" />
                                <span className="navigation-link__title d-none d-sm-block">Career Path</span>
                            </span>
                          </Link>
                      </li>
                      {isMentor ? <li className="navigation-list__item navigation-item">
                          <Link to={AppRoute.MENTEE_PROFILES}>
                            <span className="navigation-item__link navigation-link d-flex align-items-center fs-4 font-weight-normal text-gu-white">
                                <MenteeProfileIcon className="navigation-link__icon" />
                                <span className="navigation-link__title d-none d-sm-block">Mentee Profiles</span>
                            </span>
                          </Link>
                      </li>: null}
                  </ul>
                </nav>
            </div>
          </aside>
      );
};

export default Sidebar;
