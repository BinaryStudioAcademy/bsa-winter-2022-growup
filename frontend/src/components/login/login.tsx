import { UserPayloadKey } from 'common/enums/enums';
import FormInput from 'components/common/form-input/form-input';
import { useAppForm, useDispatch } from 'hooks/hooks';
import { useCallback, useState } from 'react';
import { Button, Container, FloatingLabel, Form } from 'react-bootstrap';
import { Google } from 'react-bootstrap-icons';
import { NotificationManager } from 'react-notifications';
import { loginUser } from 'store/auth/actions';
import { login as loginValidationSchema } from 'validation-schemas/validation-schemas';
import { DEFAULT_LOGIN_PAYLOAD } from './common/constants';
import './styles.scss';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const { control, errors, handleSubmit } = useAppForm({
    defaultValues: DEFAULT_LOGIN_PAYLOAD,
    validationSchema: loginValidationSchema,
  });

  const handleLogin = useCallback(
    loginPayload => dispatch(loginUser(loginPayload)),
    [dispatch],
  );

  const onLogin = (values: object): void => {
    setIsLoading(true);

    handleLogin(values)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
      .unwrap()
      .then(() => {
        window.location.href = '/';
      })
      .catch((err: Error) => {
        NotificationManager.error(err.message);
        setIsLoading(false);
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
            <Button variant="danger" type="submit" size="lg">
              Sign in
            </Button>
            <Form.Text className="mb-1 text-center">or</Form.Text>
            <Button variant="primary" type="submit" size="lg">
              <Google className="mx-2" /> Sign in with Google
            </Button>
          </div>
        </fieldset>
      </Form>
    </Container>
  );
};

export default Login;
