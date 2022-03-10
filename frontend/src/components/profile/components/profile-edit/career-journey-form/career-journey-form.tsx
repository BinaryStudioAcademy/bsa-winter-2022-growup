import { FloatingLabel, Form } from 'react-bootstrap';
import { useAppForm } from 'hooks/hooks';
import { FormInput, FormInputDate, Modal } from 'components/common/common';
import { CareerJourney } from '../../profile-info/interfaces';
import { DEFAULT_CAREER_JOURNEY_PAYLOAD } from './common/constants';
import { CareerJourneyPayloadKey } from 'common/enums/user/career-journey-payload-key.enum';
import { careerJourney as careerJourneyValidationSchema } from 'validation-schemas/validation-schemas';

type Props = {
  careerJourney: CareerJourney | null;
  onClose: () => void;
  onSubmit: (values: object) => void;
};

const CareerJourneyForm: React.FC<Props> = (props) => {
  const { careerJourney, onSubmit } = props;

  const { control, errors, handleSubmit } = useAppForm({
    defaultValues: careerJourney || DEFAULT_CAREER_JOURNEY_PAYLOAD,
    validationSchema: careerJourneyValidationSchema,
  });

  return (
    <Modal
      {...props}
      show={true}
      title={careerJourney ? 'Edit career journey' : 'Add career journey'}
      onSubmit={handleSubmit(onSubmit)}
    >
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
