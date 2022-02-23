import { FloatingLabel, Form } from 'react-bootstrap';
import { useAppForm } from 'hooks/hooks';
import { DatePicker, FormInput, Modal } from 'components/common/common';
import { DEFAULT_CAREER_JOURNEY_PAYLOAD } from './common/constants';
import { CareerJourneyPayloadKey } from 'common/enums/user/career-journey-payload-key.enum';
import { careerJourney as careerJourneyValidationSchema } from 'validation-schemas/validation-schemas';

type Props = {
  show: boolean;
  title: string;
  onClose: () => void;
};

const CareerJourneyForm: React.FC<Props> = (props) => {
  const { control, errors, handleSubmit } = useAppForm({
    defaultValues: DEFAULT_CAREER_JOURNEY_PAYLOAD,
    validationSchema: careerJourneyValidationSchema,
  });

  const onSubmitForm = (): void => {
    alert('submit career journey form');
  };

  return (
    <Modal {...props}>
      <Form className="w-100" onSubmit={handleSubmit(onSubmitForm)}>
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
          <Form.Label>Start date</Form.Label>
          <DatePicker />
        </div>

        <div>
          <Form.Label>End date</Form.Label>
          <DatePicker />
        </div>
      </Form>
    </Modal>
  );
};

export default CareerJourneyForm;
