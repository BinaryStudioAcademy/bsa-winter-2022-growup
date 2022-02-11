import { AppRoute, UserPayloadKey } from 'common/enums/enums';
import FormInput from 'components/common/form-input/form-input';
import { useAppDispatch, useAppForm, useAppSelector, useCallback, useNavigate } from 'hooks/hooks';
import { Container, FloatingLabel, Form } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import { signUpUser } from 'store/auth/actions';
import { signUp as signUpValidationSchema } from 'validation-schemas/validation-schemas';
import '../login/styles.scss';
import { DEFAULT_SIGN_UP_PAYLOAD } from './common/constants';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.auth.isLoading);

  const { control, errors, handleSubmit } = useAppForm({
    defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
    validationSchema: signUpValidationSchema,
  });

  const handleSignUp = useCallback(
    loginPayload => dispatch(signUpUser(loginPayload)),
    [dispatch],
  );

  const onSignUp = (values: object): void => {
    handleSignUp(values)
      .unwrap()
      .then(() => {
        navigate(AppRoute.ROOT);
      })
      .catch((err: Error) => {
        NotificationManager.error(err.message);
      });
  };

  return (
    <Container>
      <Form className="auth-form w-100" onSubmit={handleSubmit(onSignUp)}>
        <p className="fs-1 text-center mb-4">Sign up</p>
        <fieldset disabled={isLoading}>
          <FloatingLabel
            controlId="signUpEmail"
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
            controlId="signUpFirstName"
            label="First name"
            className="mb-3"
          >
            <FormInput
              name={UserPayloadKey.FIRST_NAME}
              control={control}
              errors={errors}
              type="text"
              placeholder="First name"
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="signUpLastName"
            label="Last name"
            className="mb-3"
          >
            <FormInput
              name={UserPayloadKey.LAST_NAME}
              control={control}
              errors={errors}
              type="text"
              placeholder="Last name"
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="signUpPassword"
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

          <button className="btn btn-gu-pink text-gu-white form-control" type="submit">
            Sign up
          </button>
        </fieldset>
      </Form>
    </Container>
  );
};

export default SignUp;
