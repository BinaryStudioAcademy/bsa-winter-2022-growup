import logo from 'assets/img/logo.svg';
import homeIcon from 'assets/img/icons/sidebar-icons/home-icon.svg';
import exploreIcon from 'assets/img/icons/sidebar-icons/explore-icon.svg';
import opportunitiesIcon from 'assets/img/icons/sidebar-icons/opportunities-icon.svg';
import profileIcon from 'assets/img/icons/sidebar-icons/profile-icon.svg';
import okrIcon from 'assets/img/icons/sidebar-icons/okr-icon.svg';
import careerPathIcon from 'assets/img/icons/sidebar-icons/career-path-icon.svg';
import menteeProfileIcon from 'assets/img/icons/sidebar-icons/mentee-icon.svg';
import { AppRoute } from 'common/enums/enums';
import { Link } from 'components/common/common';
import './sidebar.scss';

const Sidebar: React.FC = () => {

      return (
          <aside className="sidebar-section">
              <div className="sidebar-container">
                <a className="logo-section" href="">
                    <img className="logo-section__icon logo-icon" src={logo} alt="logo" />
                    <span className="logo-section__title logo-title">Grow Up</span>
                </a>
                <nav className="navigation-section">
                    <ul className="navigation-section__list navigation-list">
                      <li className="navigation-list__item navigation-item">
                          <Link to={AppRoute.HOME}>
                            <a className="navigation-item__link navigation-link" href="">
                                <img className="navigation-link__icon" src={homeIcon} alt="home icon"  />
                                <span className="navigation-link__title">Home</span>
                            </a>
                          </Link>
                      </li>
                      <li className="navigation-list__item  navigation-item">
                        <a className="navigation-item__link--active navigation-link" href="">
                            <img className="navigation-link__icon" src={exploreIcon} alt="explore icon"  />
                            <span className="navigation-link__title">Explore</span>
                        </a>
                      </li>
                      <li className="navigation-list__item navigation-item">
                        <Link to={AppRoute.OPPORTUNITIES}>
                            <a className="navigation-item__link navigation-link" href="">
                                <img className="navigation-link__icon" src={opportunitiesIcon} alt="opportunities icon"  />
                                <span className="navigation-link__title">Opportunities</span>
                            </a>
                        </Link>
                      </li>
                      <li className="navigation-list__item navigation-item">
                          <Link to={AppRoute.PROFILE}>
                            <a className="navigation-item__link navigation-link" href="">
                                <img className="navigation-link__icon" src={profileIcon} alt="profile icon"  />
                                <span className="navigation-link__title">Profile</span>
                            </a>
                          </Link>
                      </li>
                      <li className="navigation-list__item navigation-item">
                          <Link to={AppRoute.OKR}>
                            <a className="navigation-item__link navigation-link" href="">
                                <img className="navigation-link__icon" src={okrIcon} alt="okr icon"  />
                                <span className="navigation-link__title">OKR</span>
                            </a>
                          </Link>
                      </li>
                      <li className="navigation-list__item navigation-item">
                          <Link to={AppRoute.CAREER_PATH}>
                            <a className="navigation-item__link navigation-link" href="">
                                <img className="navigation-link__icon" src={careerPathIcon} alt="career path icon"  />
                                <span className="navigation-link__title">Career Path</span>
                            </a>
                          </Link>
                      </li>
                      <li className="navigation-list__item navigation-item">
                          <Link to={AppRoute.MENTEE_PROFILES}>
                            <a className="navigation-item__link navigation-link" href="">
                                <img className="navigation-link__icon" src={menteeProfileIcon} alt="mentee profile icon"  />
                                <span className="navigation-link__title">Mentee Profiles</span>
                            </a>
                          </Link>
                      </li>
                  </ul>
                </nav>
            </div>
          </aside>
      );
};

export default Sidebar;
