import { FloatingLabel, Form } from 'react-bootstrap';
import { useAppForm } from 'hooks/hooks';
import { FormInput, FormInputDate, Modal } from 'components/common/common';
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
        <FloatingLabel
          controlId="career-journey-position"
          label="Position"
          className="mb-3"
        >
          <FormInput
            name={'position'}
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
            name={'company'}
            control={control}
            errors={errors}
            type="text"
            placeholder="Company"
          />
        </FloatingLabel>

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
