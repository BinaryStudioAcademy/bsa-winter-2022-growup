import { AppRoute, MentorMenteeRoute } from 'common/enums/enums';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useCallback,
  useNavigate,
  useState,
} from 'hooks/hooks';
import { Button, TextField } from 'components/common/common';
import { Container, Form } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import { signUpUser } from 'store/auth/actions';
import { Link } from '../common/common';
import { IUserSignUpForm } from 'common/interfaces/user';
import { signUp as signUpValidationSchema } from 'validation-schemas/validation-schemas';
import { DEFAULT_SIGN_UP_PAYLOAD } from './common/constants';
import '../login/styles.scss';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  const [isHiddenPassword, setIsHiddenPassword] = useState(true);

  const { control, errors, handleSubmit } = useAppForm<IUserSignUpForm>({
    defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
    validationSchema: signUpValidationSchema,
  });

  const handleSignUp = useCallback(
    (loginPayload) => dispatch(signUpUser(loginPayload)),
    [dispatch],
  );

  const onSignUp = (values: IUserSignUpForm): void => {
    handleSignUp(values)
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
      <Form className="auth-form w-100" onSubmit={handleSubmit(onSignUp)}>
        <p className="fs-1 text-center mb-4">Sign up</p>
        <fieldset disabled={isLoading}>
          <TextField
            label={'Email address'}
            name={'email'}
            control={control}
            errors={errors}
            type="email"
          />
          <TextField
            label={'First name'}
            name={'firstName'}
            control={control}
            errors={errors}
          />
          <TextField
            label={'Last name'}
            name={'lastName'}
            control={control}
            errors={errors}
          />
          <TextField
            label={'Password'}
            name={'password'}
            control={control}
            errors={errors}
            type={isHiddenPassword ? 'password' : 'text'}
            floatingLabelStyles={'d-flex flex-wrap'}
            children={
              <Button
                props={'auth-form__icon input-group-text position-absolute'}
                type={'button'}
                onSubmit={(): void => setIsHiddenPassword(!isHiddenPassword)}
              >
                {isHiddenPassword ? <EyeSlash /> : <Eye />}
              </Button>
            }
          />

          <div className="d-grid gap-2">
            <Button props={'btn-gu-pink text-gu-white'} type={'submit'}>
              Sign up
            </Button>
            <Form.Text className="mt-2 text-center fs-5">
              Already have an account?
              <Link to={AppRoute.LOGIN}>
                <b className="text-decoration-underline text-gu-blue mx-2">
                  Login here
                </b>
              </Link>
            </Form.Text>
          </div>
        </fieldset>
      </Form>
    </Container>
  );
};

export default SignUp;
