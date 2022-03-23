import { Form } from 'react-bootstrap';
import { useAppForm, useAppSelector } from 'hooks/hooks';
import { FormInputDate, Modal, TextField } from 'components/common/common';
import { opportunity as opportunityValidationSchema } from 'validation-schemas/validation-schemas';
import { DEFAULT_OPPORTUNITY_PAYLOAD } from './common/constants';
import { OpportunityPayloadKey } from '../../common/enums/enums';
import Multiselect from 'multiselect-react-dropdown';
import { RootState } from 'common/types/types';

type Props = {
  onClose: () => void;
  onSubmit: (values: object) => void;
};

const OpportunityForm: React.FC<Props> = (props) => {
  const { tags } = useAppSelector((state: RootState) => state.tags);
  const tagsName = tags.map((tag) => tag.name);
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
        <Multiselect
          className={'mb-3'}
          isObject={false}
          placeholder={'Select tags'}
          onRemove={(e): void => console.warn(e)}
          onSelect={(e): void => console.warn(e)}
          options={[...tagsName]}
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
