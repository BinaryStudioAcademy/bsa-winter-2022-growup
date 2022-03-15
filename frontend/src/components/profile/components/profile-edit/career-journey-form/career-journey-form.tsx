import { Form } from 'react-bootstrap';
import { useAppForm } from 'hooks/hooks';
import { FormInputDate, Modal, TextField } from 'components/common/common';
import { DEFAULT_CAREER_JOURNEY_PAYLOAD } from './common/constants';
import { CareerJourneyPayloadKey } from 'common/enums/user/career-journey-payload-key.enum';
import { careerJourney as careerJourneyValidationSchema } from 'validation-schemas/validation-schemas';
import { ICareerJourney } from '../../../common/interfaces';

type Props = {
  careerJourney: ICareerJourney | null;
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
      footer={true}
      title={careerJourney ? 'Edit career journey' : 'Add career journey'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Form className="w-100">
        <TextField
          label={'Position'}
          name={CareerJourneyPayloadKey.POSITION}
          control={control}
          errors={errors}
        />
        <TextField
          label={'Company'}
          name={CareerJourneyPayloadKey.COMPANY}
          control={control}
          errors={errors}
        />
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
