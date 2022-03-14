import {
  AppRoute,
  MentorMenteeRoute,
  UserPayloadKey,
} from 'common/enums/enums';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useCallback,
  useNavigate,
  useState,
} from 'hooks/hooks';
import { FormInput } from 'components/common/common';
import { Container, FloatingLabel, Form } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import { loginUser } from 'store/auth/actions';
import { Link } from '../common/common';
import { login as loginValidationSchema } from 'validation-schemas/validation-schemas';
import { DEFAULT_LOGIN_PAYLOAD } from './common/constants';
import './styles.scss';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  const [isHiddenPassword, setIsHiddenPassword] = useState(true);

  const { control, errors, handleSubmit } = useAppForm({
    defaultValues: DEFAULT_LOGIN_PAYLOAD,
    validationSchema: loginValidationSchema,
  });

  const handleLogin = useCallback(
    (loginPayload) => dispatch(loginUser(loginPayload)),
    [dispatch],
  );

  const onLogin = (values: object): void => {
    handleLogin(values)
      .unwrap()
      .then(() => {
        navigate(MentorMenteeRoute.HOME);
      })
      .catch((err: Error) => {
        NotificationManager.error(err.message);
      });
  };

  return (
    <Container>
      <Form className="auth-form w-100" onSubmit={handleSubmit(onLogin)}>
        <p className="fs-1 text-center mb-4">Sign in</p>

        <fieldset disabled={isLoading}>
          <FloatingLabel
            controlId="authEmail"
            label="Email address"
            className="mb-3"
          >
            <FormInput
              name={UserPayloadKey.EMAIL}
              control={control}
              errors={errors}
              type="email"
              placeholder="Email address"
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="authPassword"
            label="Password"
            className="mb-3 d-flex flex-wrap"
          >
            <FormInput
              name={UserPayloadKey.PASSWORD}
              control={control}
              errors={errors}
              type={isHiddenPassword ? 'password' : 'text'}
              placeholder="Password"
            />
            <button
              type="button"
              className="auth-form__icon input-group-text position-absolute"
              onClick={(): void => setIsHiddenPassword(!isHiddenPassword)}
            >
              {isHiddenPassword ? <EyeSlash /> : <Eye />}
            </button>
          </FloatingLabel>

          <Form.Group
            className="auth-form__checkbox-container mb-4"
            controlId="authCheckbox"
          >
            <Form.Check type="checkbox" label="Remember me" />
            <p className="auth-form__btn-link">
              <a className="auth-form__link" href="#">
                Forgot password?
              </a>
            </p>
          </Form.Group>

          <div className="d-grid gap-2">
            <button className="btn btn-gu-pink text-gu-white" type="submit">
              Sign in
            </button>
            <Form.Text className="mt-2 text-center fs-5">
              Don't have a GrowUp account?
              <Link to={AppRoute.SIGN_UP}>
                <b className="text-decoration-underline text-gu-blue mx-2">
                  Sign up
                </b>
              </Link>
            </Form.Text>
          </div>
        </fieldset>
      </Form>
    </Container>
  );
};

export default Login;
