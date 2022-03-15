import { Form } from 'react-bootstrap';
import { useAppForm } from 'hooks/hooks';
import { FormInputDate, Modal, TextField } from 'components/common/common';
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
        <TextField
          label={'Specialization'}
          name={EducationPayloadKey.SPECIALIZATION}
          control={control}
          errors={errors}
        />
        <TextField
          label={'University'}
          name={EducationPayloadKey.UNIVERSITY}
          control={control}
          errors={errors}
        />
        <TextField
          label={'Degree'}
          name={EducationPayloadKey.DEGREE}
          control={control}
          errors={errors}
        />
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
