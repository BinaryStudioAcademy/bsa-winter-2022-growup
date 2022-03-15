import { FloatingLabel, Form } from 'react-bootstrap';
import { useAppForm } from 'hooks/hooks';
import { FormInput, FormInputDate, Modal } from 'components/common/common';
import { DEFAULT_EDUCATION_PAYLOAD } from './common/constants';
import { education as educationValidationSchema } from 'validation-schemas/validation-schemas';
import { IEducation } from '../../../common/interfaces';
import { EducationFormType } from './common/types';

type Props = {
  education: IEducation | null;
  onClose: () => void;
  onSubmit: (values: EducationFormType) => void;
};

const EducationForm: React.FC<Props> = (props) => {
  const { education, onSubmit } = props;

  const { control, errors, handleSubmit } = useAppForm<EducationFormType>({
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
            name={'specialization'}
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
            name={'university'}
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
            name={'degree'}
            control={control}
            errors={errors}
            type="text"
            placeholder="Degree"
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

export default EducationForm;
