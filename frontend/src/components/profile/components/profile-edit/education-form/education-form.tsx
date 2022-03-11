import { FloatingLabel, Form } from 'react-bootstrap';
import { useAppForm } from 'hooks/hooks';
import { FormInput, FormInputDate, Modal } from 'components/common/common';
import { DEFAULT_EDUCATION_PAYLOAD } from './common/constants';
import { EducationPayloadKey } from 'common/enums/user/education-payload-key.enum';
import { education as educationValidationSchema } from 'validation-schemas/validation-schemas';
import { IEducation } from '../../../common/interfaces';

type Props = {
  education: IEducation | null;
  onClose: () => void;
  onSubmit: (values: object) => void;
};

const EducationForm: React.FC<Props> = (props) => {
  const { education, onSubmit } = props;

  const { control, errors, handleSubmit } = useAppForm({
    defaultValues: education || DEFAULT_EDUCATION_PAYLOAD,
    validationSchema: educationValidationSchema,
  });

  return (
    <Modal
      {...props}
      show={true}
      footer={true}
      title={education ? 'Edit education' : 'Add education'}
      onSubmit={handleSubmit(onSubmit)}
    >
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
