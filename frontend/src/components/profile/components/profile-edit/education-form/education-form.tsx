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
import { DEFAULT_EDUCATION_PAYLOAD } from './common/constants';
import { EducationPayloadKey } from 'common/enums/user/education-payload-key.enum';
import { MentorMenteeRoute } from 'common/enums/mentor-mentee-route/mentor-mentee-route.enum';
import { education as educationValidationSchema } from 'validation-schemas/validation-schemas';

type Props = {
  show: boolean;
  title: string;
  onClose: () => void;
};

const EducationForm: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { control, errors, handleSubmit } = useAppForm({
    defaultValues: DEFAULT_EDUCATION_PAYLOAD,
    validationSchema: educationValidationSchema,
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
          controlId="education-specialization"
          label="Specialization"
          className="mb-3"
        >
          <FormInput
            name={EducationPayloadKey.SPECIALIZATION}
            control={control}
            errors={errors}
            type="text"
            placeholder="Specialization"
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="education-university"
          label="University"
          className="mb-3"
        >
          <FormInput
            name={EducationPayloadKey.UNIVERSITY}
            control={control}
            errors={errors}
            type="text"
            placeholder="University"
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="education-degree"
          label="Degree"
          className="mb-3"
        >
          <FormInput
            name={EducationPayloadKey.DEGREE}
            control={control}
            errors={errors}
            type="text"
            placeholder="Degree"
          />
        </FloatingLabel>

        <div className="mb-3">
          <FormInputDate
            name={EducationPayloadKey.START_DATE}
            control={control}
            errors={errors}
            placeholder="Start date"
          />
        </div>

        <FormInputDate
          name={EducationPayloadKey.END_DATE}
          control={control}
          errors={errors}
          placeholder="End date"
        />
      </Form>
    </Modal>
  );
};

export default EducationForm;
