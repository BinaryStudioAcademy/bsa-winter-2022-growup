import { Form } from 'react-bootstrap';
import { useAppForm } from 'hooks/hooks';
import { FormInputDate, Modal, TextField } from 'components/common/common';
import { DEFAULT_OKR_PAYLOAD } from './common/constants';
import { okrValidationSchema } from 'validation-schemas/validation-schemas';
import { IOkr } from 'common/interfaces/okr';
import { OkrFormType } from './common/types';

type Props = {
  okr: IOkr | null;
  onClose: () => void;
  onSubmit: (values: OkrFormType) => void;
};

const OkrForm: React.FC<Props> = (props) => {
  const { okr, onSubmit } = props;

  const { control, errors, handleSubmit } = useAppForm<OkrFormType>({
    defaultValues: okr || DEFAULT_OKR_PAYLOAD,
    validationSchema: okrValidationSchema(!!okr),
  });

  return (
    <Modal
      {...props}
      show={true}
      footer={true}
      title={okr ? 'Edit OKR' : 'Add OKR'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Form className="w-100">
        <TextField
          label={'Name'}
          name={'name'}
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

export default OkrForm;
