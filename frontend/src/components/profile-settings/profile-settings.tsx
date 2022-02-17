import { Navigate, Outlet, useLocation, useNavigate } from '../../hooks/hooks';
import { Route, Routes } from '../common/common';
import { AppRoute, ProfileSettingsRoute } from '../../common/enums/enums';
import { steps } from './steps/steps';
import Stepper from './stepper';
import FirstStep from './steps/first-step';
import SecondStep from './steps/second-step';
import ThirdStep from './steps/third-step';
import './styles.scss';

const ProfileSettings: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const activeStep = Number(pathname[pathname.length - 1]);

  const onNext = (): void => {
    if (activeStep === steps.length) {
      navigate(ProfileSettingsRoute.PROFILE_SETTINGS_ROOT);
    } else {
      navigate(`${AppRoute.PROFILE_SETTINGS}/${activeStep + 1}`);
    }
  };

  const onPrevious = (): void => {
    navigate(`${AppRoute.PROFILE_SETTINGS}/${activeStep - 1}`);
  };

  return (
    <div className="stepper">
      <Stepper steps={steps} activeStep={activeStep - 1} />
      <div className="stepper__actions w-100">
        <Routes>
          <Route path={ProfileSettingsRoute.PROFILE_SETTINGS_ROOT} element={<Outlet />}>
            <Route path={ProfileSettingsRoute.PROFILE_SETTINGS_STEP_ONE} element={<FirstStep onNext={onNext} onPrevious={onPrevious} isDisablePrevious={true} />} />
            <Route path={ProfileSettingsRoute.PROFILE_SETTINGS_STEP_TWO} element={<SecondStep onNext={onNext} onPrevious={onPrevious} />} />
            <Route path={ProfileSettingsRoute.PROFILE_SETTINGS_STEP_THREE} element={<ThirdStep onNext={onNext} onPrevious={onPrevious} />} />
            <Route path="*" element={<Navigate to={ProfileSettingsRoute.PROFILE_SETTINGS_STEP_ONE} />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default ProfileSettings;
