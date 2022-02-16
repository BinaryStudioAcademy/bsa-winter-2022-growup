import { MentorMenteeRoute, UserPayloadKey } from 'common/enums/enums';
import FormInput from 'components/common/form-input/form-input';
import { useAppDispatch, useAppForm, useAppSelector, useCallback, useNavigate } from 'hooks/hooks';
import { Container, FloatingLabel, Form } from 'react-bootstrap';
import { Google } from 'react-bootstrap-icons';
import { NotificationManager } from 'react-notifications';
import { loginUser } from 'store/auth/actions';
import { login as loginValidationSchema } from 'validation-schemas/validation-schemas';
import { DEFAULT_LOGIN_PAYLOAD } from './common/constants';
import './styles.scss';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.auth.isLoading);

  const { control, errors, handleSubmit } = useAppForm({
    defaultValues: DEFAULT_LOGIN_PAYLOAD,
    validationSchema: loginValidationSchema,
  });

  const handleLogin = useCallback(
    loginPayload => dispatch(loginUser(loginPayload)),
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
            className="mb-3"
          >
            <FormInput
              name={UserPayloadKey.PASSWORD}
              control={control}
              errors={errors}
              type="password"
              placeholder="Password"
            />
          </FloatingLabel>

          <Form.Group className="auth-form__checkbox-container mb-4" controlId="authCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
            <p className="auth-form__btn-link">
              <a className="auth-form__link" href="#">Forgot password?</a>
            </p>
          </Form.Group>

          <div className="d-grid gap-2">
            <button className="btn btn-gu-pink text-gu-white" type="submit">
              Sign in
            </button>
            <Form.Text className="mb-1 text-center">or</Form.Text>
            <button className="btn btn-gu-blue" type="submit">
              <Google className="mx-2" /> Sign in with Google
            </button>
          </div>
        </fieldset>
      </Form>
    </Container>
  );
};

export default Login;
