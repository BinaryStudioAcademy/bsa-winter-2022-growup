import { Form } from 'react-bootstrap';
import { useAppForm } from 'hooks/hooks';
import { FormInputDate, Modal, TextField } from 'components/common/common';
import { DEFAULT_CAREER_JOURNEY_PAYLOAD } from './common/constants';
import { careerJourney as careerJourneyValidationSchema } from 'validation-schemas/validation-schemas';
import { ICareerJourney } from '../../../common/interfaces';
import { CareerJourneyFormType } from './common/types';

type Props = {
  careerJourney: ICareerJourney | null;
  onClose: () => void;
  onSubmit: (values: CareerJourneyFormType) => void;
};

const CareerJourneyForm: React.FC<Props> = (props) => {
  const { careerJourney, onSubmit } = props;

  const { control, errors, handleSubmit } = useAppForm<CareerJourneyFormType>({
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
          name={'position'}
          control={control}
          errors={errors}
        />
        <TextField
          label={'Company'}
          name={'company'}
          control={control}
          errors={errors}
        />
        <div className="mb-3">
          <FormInputDate
            name={'startDate'}
            control={control}
            errors={errors}
            placeholder="Start date"
          />
        </div>
        <FormInputDate
          name={'endDate'}
          control={control}
          errors={errors}
          placeholder="End date"
        />
      </Form>
    </Modal>
  );
};

export default CareerJourneyForm;
