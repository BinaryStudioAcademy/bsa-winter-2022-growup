import { FloatingLabel, Form } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import {
  useAppDispatch,
  useAppForm,
  useCallback,
  useNavigate,
} from 'hooks/hooks';
import { FormInput, FormInputDate, Modal } from 'components/common/common';
import { createCareerJourney } from 'store/career-journey/actions';
import { DEFAULT_CAREER_JOURNEY_PAYLOAD } from './common/constants';
import { CareerJourneyPayloadKey } from 'common/enums/user/career-journey-payload-key.enum';
import { MentorMenteeRoute } from 'common/enums/mentor-mentee-route/mentor-mentee-route.enum';
import { careerJourney as careerJourneyValidationSchema } from 'validation-schemas/validation-schemas';

type Props = {
  show: boolean;
  title: string;
  onClose: () => void;
};

const CareerJourneyForm: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { control, errors, handleSubmit } = useAppForm({
    defaultValues: DEFAULT_CAREER_JOURNEY_PAYLOAD,
    validationSchema: careerJourneyValidationSchema,
  });

  const handleSave = useCallback(
    (payload) => dispatch(createCareerJourney(payload)),
    [dispatch],
  );

  const onSubmitForm = (values: object): void => {
    handleSave(values)
      .unwrap()
      .then(() => {
        navigate(MentorMenteeRoute.PROFILE);
      })
      .catch((err: Error) => {
        NotificationManager.error(err.message);
      });
  };

  return (
    <Modal {...props} onSubmit={handleSubmit(onSubmitForm)}>
      <Form className="w-100">
        <FloatingLabel
          controlId="career-journey-position"
          label="Position"
          className="mb-3"
        >
          <FormInput
            name={CareerJourneyPayloadKey.POSITION}
            control={control}
            errors={errors}
            type="text"
            placeholder="Position"
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="career-journey-company"
          label="Company"
          className="mb-3"
        >
          <FormInput
            name={CareerJourneyPayloadKey.COMPANY}
            control={control}
            errors={errors}
            type="text"
            placeholder="Company"
          />
        </FloatingLabel>

        <div className="mb-3">
          <FormInputDate
            name={CareerJourneyPayloadKey.START_DATE}
            control={control}
            errors={errors}
            placeholder="Start date"
          />
        </div>

        <FormInputDate
          name={CareerJourneyPayloadKey.END_DATE}
          control={control}
          errors={errors}
          placeholder="End date"
        />
      </Form>
    </Modal>
  );
};

export default CareerJourneyForm;
