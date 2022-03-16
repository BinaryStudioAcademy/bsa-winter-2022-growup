import { Form } from 'react-bootstrap';
import { useAppForm } from 'hooks/hooks';
import { FormInputDate, Modal, TextField } from 'components/common/common';
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
        <TextField
          label={'Specialization'}
          name={'specialization'}
          control={control}
          errors={errors}
        />
        <TextField
          label={'University'}
          name={'university'}
          control={control}
          errors={errors}
        />
        <TextField
          label={'Degree'}
          name={'degree'}
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

export default EducationForm;
