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
          <aside className="sidebar-section position-fixed h-100 bg-gu-blue">
              <div className="sidebar-container d-flex flex-column pt-2 pt-md-3">
                <a className="logo-section d-flex align-items-center text-decoration-none px-2 ps-md-4" href="">
                    <img className="logo-section__icon logo-icon me-md-3" src={logo} alt="logo" />
                    <span className="logo-section__title logo-title fs-1 text-gu-white m-0 d-none d-md-block">Grow Up</span>
                </a>
                <nav className="navigation-section px-md-3">
                    <ul className="navigation-section__list navigation-list d-flex flex-column m-0 p-0">
                      <li className="navigation-list__item navigation-item mb-4">
                          <Link to={AppRoute.HOME}>
                              <span className="navigation-item__link navigation-link d-flex align-items-center p-2 ps-md-4 fs-4 font-weight-normal text-gu-white">
                                  <HomeIcon className="navigation-link__icon me-md-3" />
                                  <span className="navigation-link__title d-none d-md-block">Home</span>
                              </span>
                          </Link>
                      </li>
                      <li className="navigation-list__item navigation-item mb-4">
                        <Link to={AppRoute.OPPORTUNITIES}>
                            <span className="navigation-item__link navigation-link d-flex align-items-center p-2 ps-md-4 fs-4 font-weight-normal text-gu-white">
                                <OpportunitiesIcon className="navigation-link__icon me-md-3" />
                                <span className="navigation-link__title d-none d-md-block">Opportunities</span>
                            </span>
                        </Link>
                      </li>
                      <li className="navigation-list__item navigation-item mb-4">
                          <Link to={AppRoute.PROFILE}>
                            <span className="navigation-item__link navigation-link d-flex align-items-center p-2 ps-md-4 fs-4 font-weight-normal text-gu-white">
                                <ProfileIcon className="navigation-link__icon me-md-3" />
                                <span className="navigation-link__title d-none d-md-block">Profile</span>
                            </span>
                          </Link>
                      </li>
                      <li className="navigation-list__item navigation-item mb-4">
                          <Link to={AppRoute.OKR}>
                            <span className="navigation-item__link navigation-link d-flex align-items-center p-2 ps-md-4 fs-4 font-weight-normal text-gu-white">
                                <OkrIcon className="navigation-link__icon me-md-3" />
                                <span className="navigation-link__title d-none d-md-block">OKR</span>
                            </span>
                          </Link>
                      </li>
                      <li className="navigation-list__item navigation-item mb-4">
                          <Link to={AppRoute.CAREER_PATH}>
                            <span className="navigation-item__link navigation-link d-flex align-items-center p-2 ps-md-4 fs-4 font-weight-normal text-gu-white">
                                <CareerPathIcon className="navigation-link__icon me-md-3" />
                                <span className="navigation-link__title d-none d-md-block">Career Path</span>
                            </span>
                          </Link>
                      </li>
                      {isMentor ?
                        <li className="navigation-list__item navigation-item mb-4">
                            <Link to={AppRoute.MENTEE_PROFILES}>
                                <span className="navigation-item__link navigation-link d-flex align-items-center p-2 ps-md-4 fs-4 font-weight-normal text-gu-white">
                                    <MenteeProfileIcon className="navigation-link__icon me-md-3" />
                                    <span className="navigation-link__title d-none d-md-block">Mentee Profiles</span>
                                </span>
                            </Link>
                        </li> : null}
                  </ul>
                </nav>
            </div>
          </aside>
      );
};

export default Sidebar;
