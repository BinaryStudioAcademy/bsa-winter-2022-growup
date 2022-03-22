import {
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  useState,
} from 'hooks/hooks';
import { Route, Routes } from 'components/common/common';
import { MentorMenteeRoute, ProfileSettingsRoute } from 'common/enums/enums';
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
  const [lastActiveStep, setLastActiveStep] = useState(activeStep);

  const onNext = (): void => {
    if (activeStep === steps.length) {
      navigate(ProfileSettingsRoute.PROFILE_SETTINGS_ROOT);
      return;
    }
    lastActiveStep <= activeStep ? setLastActiveStep(lastActiveStep + 1) : null;
    navigate(`${MentorMenteeRoute.SETTINGS_PROFILE}/${activeStep + 1}`);
  };

  const changeStep = (num: number): void => {
    navigate(`${MentorMenteeRoute.SETTINGS_PROFILE}/${num + 1}`);
  };

  return (
    <div className="stepper position-relative">
      <Stepper
        steps={steps}
        activeStep={activeStep - 1}
        changeStepClicker={changeStep}
        lastActiveStep={lastActiveStep}
      />
      <div className="stepper__actions d-flex justify-content-center w-100">
        <Routes>
          <Route
            path={ProfileSettingsRoute.PROFILE_SETTINGS_ROOT}
            element={<Outlet />}
          >
            <Route
              path={ProfileSettingsRoute.PROFILE_SETTINGS_STEP_ONE}
              element={<FirstStep onNext={onNext} isDisablePrevious={true} />}
            />
            <Route
              path={ProfileSettingsRoute.PROFILE_SETTINGS_STEP_TWO}
              element={<SecondStep onNext={onNext} />}
            />
            <Route
              path={ProfileSettingsRoute.PROFILE_SETTINGS_STEP_THREE}
              element={<ThirdStep onNext={onNext} />}
            />
            <Route
              path="*"
              element={
                <Navigate to={ProfileSettingsRoute.PROFILE_SETTINGS_STEP_ONE} />
              }
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default ProfileSettings;
