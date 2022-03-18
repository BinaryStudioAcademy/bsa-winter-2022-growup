import { Form } from 'react-bootstrap';
import { useAppForm } from 'hooks/hooks';
import { FormInputDate, Modal, TextField } from 'components/common/common';
import { opportunity as opportunityValidationSchema } from 'validation-schemas/validation-schemas';
import { DEFAULT_OPPORTUNITY_PAYLOAD } from './common/constants';
import { OpportunityPayloadKey } from '../../common/enums/enums';

type Props = {
  onClose: () => void;
  onSubmit: (values: object) => void;
};

const OpportunityForm: React.FC<Props> = (props) => {
  const { onSubmit } = props;

  const { control, errors, handleSubmit } = useAppForm({
    defaultValues: DEFAULT_OPPORTUNITY_PAYLOAD,
    validationSchema: opportunityValidationSchema,
  });

  return (
    <Modal
      {...props}
      show={true}
      footer={true}
      title={'Add opportunity'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Form className="w-100">
        <TextField
          label={'Name'}
          name={OpportunityPayloadKey.NAME}
          control={control}
          errors={errors}
        />
        <TextField
          label={'Organization'}
          name={OpportunityPayloadKey.ORGANIZATION}
          control={control}
          errors={errors}
        />
        <TextField
          label={'Type'}
          name={OpportunityPayloadKey.TYPE}
          control={control}
          errors={errors}
        />
        <FormInputDate
          name={OpportunityPayloadKey.START_DATE}
          control={control}
          errors={errors}
          placeholder="Start date"
        />
      </Form>
    </Modal>
  );
};

export default OpportunityForm;
