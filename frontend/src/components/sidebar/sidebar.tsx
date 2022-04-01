import logo from 'assets/img/logo.svg';
import { ReactComponent as HomeIcon } from 'assets/img/icons/sidebar-icons/home-icon.svg';
import { ReactComponent as OpportunitiesIcon } from 'assets/img/icons/sidebar-icons/opportunities-icon.svg';
import { ReactComponent as ProfileIcon } from 'assets/img/icons/sidebar-icons/profile-icon.svg';
import { ReactComponent as OkrIcon } from 'assets/img/icons/sidebar-icons/okr-icon.svg';
import { ReactComponent as CareerPathIcon } from 'assets/img/icons/sidebar-icons/career-path-icon.svg';
import { ReactComponent as MenteeProfileIcon } from 'assets/img/icons/sidebar-icons/mentee-icon.svg';
import { MentorMenteeRoute } from 'common/enums/enums';
import { Link } from 'components/common/common';
import './styles.scss';
import { useAppSelector, useEffect, useState } from 'hooks/hooks';
import { RoleType } from 'growup-shared';
import { ChevronLeft } from 'react-bootstrap-icons';

const Sidebar: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const isBlockedButton = user?.firstName && user?.isCompleteTest;
  const [isBurgerActive, setIsBurgerActive] = useState(true);
  // const [isFirstTime, setIsFirstTime] = useState(true);

  const burgerClickHandler = (): void => {
    // setIsFirstTime(false);
    isBurgerActive ? setIsBurgerActive(false) : setIsBurgerActive(true);
  };

  useEffect(() => {
    const rootElement = document.querySelector('.wrapper') as Element;
    const headerElement = document.querySelector('.header-section') as Element;
    if (isBurgerActive) {
      rootElement.classList.add('wrapper__burger-active');
      headerElement.classList.add('header-section--burger-active');
    } else {
      rootElement.classList.remove('wrapper__burger-active');
      headerElement.classList.remove('header-section--burger-active');
    }
  }, [isBurgerActive]);

  return (
    <aside className="sidebar-section position-fixed h-100 bg-gu-blue">
      <div
        className={`sidebar-container d-flex flex-column pt-2 pt-md-3
        ${isBurgerActive ? 'sidebar-container--small-version' : ''}
      `}
      >
        <div
          className={`d-flex   ${
            isBurgerActive ? 'flex-column-reverse align-items-center' : ''
          }`}
        >
          <div
            className={` sidebar__burger d-none d-md-block cursor-pointer  rounded-circle position-absolute bg-gu-blue ${
              isBurgerActive ? 'sidebar__burger--active' : ''
            }`}
            onClick={(): void => {
              burgerClickHandler();
            }}
          >
            <ChevronLeft className="isBurgerActive text-gu-white position-absolute top-50 start-50 translate-middle" />
          </div>

          <Link to={MentorMenteeRoute.HOME}>
            <div className="logo-section d-flex align-items-center text-decoration-none px-2 ps-md-4">
              <img
                className="logo-section__icon logo-icon me-md-3"
                src={logo}
                alt="logo"
              />
              <span className="logo-section__title logo-title fs-1 text-gu-white m-0 title-anim">
                Grow Up
              </span>
            </div>
          </Link>
        </div>
        <nav
          className={`navigation-section px-md-3 ${
            isBurgerActive ? 'navigation-section__burger-active' : 'mt-5'
          }`}
        >
          <ul
            className={`navigation-section__list navigation-list d-flex flex-column m-0 p-0 ${
              isBurgerActive ? 'align-items-center' : ''
            }`}
          >
            <li
              className={`navigation-list__item navigation-item mb-4 ${
                isBlockedButton ? '' : 'navigation-list-item--blocked'
              }
            `}
            >
              <Link to={MentorMenteeRoute.HOME}>
                <span
                  className={`navigation-item__link navigation-link d-flex
                  ${isBurgerActive ? '' : ' ps-md-4'}
                  p-2 align-items-center  fs-4 font-weight-normal
                  text-gu-white`}
                >
                  <HomeIcon
                    className={`navigation-link__icon  ${
                      isBurgerActive ? '' : 'me-md-3'
                    }`}
                  />
                  <span className="navigation-link__title title-anim">
                    Home
                  </span>
                </span>
              </Link>
            </li>
            <li
              className={`navigation-list__item navigation-item mb-4 ${
                isBlockedButton ? '' : 'navigation-list-item--blocked'
              }
            `}
            >
              <Link to={MentorMenteeRoute.OPPORTUNITIES}>
                <span
                  className={`navigation-item__link navigation-link d-flex
                  ${
                    isBurgerActive ? '' : ' ps-md-4'
                  } p-2 align-items-center  fs-4 font-weight-normal
                  text-gu-white`}
                >
                  <OpportunitiesIcon
                    className={`navigation-link__icon  ${
                      isBurgerActive ? '' : 'me-md-3'
                    }`}
                  />
                  <span className="navigation-link__title title-anim">
                    Opportunities
                  </span>
                </span>
              </Link>
            </li>
            <li className={`navigation-list__item navigation-item mb-4 ${''}`}>
              <Link to={MentorMenteeRoute.PROFILE}>
                <span
                  className={`navigation-item__link navigation-link d-flex
                  ${
                    isBurgerActive ? '' : ' ps-md-4'
                  } p-2 align-items-center  fs-4 font-weight-normal
                  text-gu-white`}
                >
                  <ProfileIcon
                    className={`navigation-link__icon  ${
                      isBurgerActive ? '' : 'me-md-3'
                    }`}
                  />
                  <span className="navigation-link__title title-anim">
                    Profile
                  </span>
                </span>
              </Link>
            </li>
            <li
              className={`navigation-list__item navigation-item mb-4 ${
                isBlockedButton ? '' : 'navigation-list-item--blocked'
              }
            `}
            >
              <Link to={MentorMenteeRoute.OKR}>
                <span
                  className={`navigation-item__link navigation-link d-flex
                  ${
                    isBurgerActive ? '' : ' ps-md-4'
                  } p-2 align-items-center  fs-4 font-weight-normal
                  text-gu-white`}
                >
                  <OkrIcon
                    className={`navigation-link__icon  ${
                      isBurgerActive ? '' : 'me-md-3'
                    }`}
                  />
                  <span className="navigation-link__title title-anim">OKR</span>
                </span>
              </Link>
            </li>
            <li
              className={`navigation-list__item navigation-item mb-4 ${
                isBlockedButton ? '' : 'navigation-list-item--blocked'
              }
            `}
            >
              <Link to={MentorMenteeRoute.CAREER_PATH}>
                <span
                  className={`navigation-item__link navigation-link d-flex
                  ${
                    isBurgerActive ? '' : ' ps-md-4'
                  } p-2 align-items-center  fs-4 font-weight-normal
                  text-gu-white`}
                >
                  <CareerPathIcon
                    className={`navigation-link__icon  ${
                      isBurgerActive ? '' : 'me-md-3'
                    }`}
                  />
                  <span className="navigation-link__title title-anim">
                    Career Path
                  </span>
                </span>
              </Link>
            </li>
            {user?.role === RoleType.MENTOR && (
              <li
                className={`navigation-list__item navigation-item mb-4 ${
                  isBlockedButton ? '' : 'navigation-list-item--blocked'
                }
              `}
              >
                <Link to={MentorMenteeRoute.MENTEE_PROFILES}>
                  <span
                    className={`navigation-item__link navigation-link d-flex
                  ${
                    isBurgerActive ? '' : ' ps-md-4'
                  } p-2 align-items-center  fs-4 font-weight-normal
                  text-gu-white`}
                  >
                    <MenteeProfileIcon
                      className={`navigation-link__icon  ${
                        isBurgerActive ? '' : 'me-md-3'
                      }`}
                    />
                    <span className="navigation-link__title title-anim">
                      Mentee Profiles
                    </span>
                  </span>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
