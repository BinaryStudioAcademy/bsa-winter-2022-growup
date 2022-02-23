import { FloatingLabel, Form } from 'react-bootstrap';
import { useAppForm } from 'hooks/hooks';
import { DatePicker, FormInput, Modal } from 'components/common/common';
import { DEFAULT_EDUCATION_PAYLOAD } from './common/constants';
import { EducationPayloadKey } from 'common/enums/user/education-payload-key.enum';
import { education as educationValidationSchema } from 'validation-schemas/validation-schemas';

type Props = {
  show: boolean;
  title: string;
  onClose: () => void;
};

const EducationForm: React.FC<Props> = (props) => {
  const { control, errors, handleSubmit } = useAppForm({
    defaultValues: DEFAULT_EDUCATION_PAYLOAD,
    validationSchema: educationValidationSchema,
  });

  const onSubmitForm = (): void => {
    alert('submit education form');
  };

  return (
    <Modal {...props}>
      <Form className="w-100" onSubmit={handleSubmit(onSubmitForm)}>
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

export default EducationForm;
