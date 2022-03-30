import { Form } from 'react-bootstrap';
import { useAppForm, useAppSelector } from 'hooks/hooks';
import { FormInputDate, Modal, TextField } from 'components/common/common';
import { opportunity as opportunityValidationSchema } from 'validation-schemas/validation-schemas';
import { DEFAULT_OPPORTUNITY_PAYLOAD, types } from './common/constants';
import { OpportunityPayloadKey } from '../../common/enums/enums';
import Multiselect from 'multiselect-react-dropdown';
import { RootState } from 'common/types/types';
import './styles.scss';
import Select from 'react-select';

type Props = {
  onClose: () => void;
  onSubmit: (values: object) => void;
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  setType: React.Dispatch<React.SetStateAction<string>>;
};

const OpportunityForm: React.FC<Props> = (props) => {
  const { tags } = useAppSelector((state: RootState) => state.tags);
  const tagsName = tags.map((tag) => tag.name);
  const { onSubmit } = props;
  const options = [
    { value: types.PROGRAMMING, label: types.PROGRAMMING },
    { value: types.LEARNING, label: types.LEARNING },
    { value: types.BUSINESS, label: types.BUSINESS },
  ];
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
        <Select
          options={options}
          onChange={(value): void => {
            props.setType(value ? value.value : types.PROGRAMMING);
          }}
          defaultValue={options[0]}
          className="mb-3 select cursor-pointer "
        />

        <Multiselect
          className={'mb-3 multi-select'}
          isObject={false}
          placeholder={'Select tags'}
          onRemove={(e): void => props.setTags(e)}
          onSelect={(e): void => props.setTags(e)}
          options={[...tagsName]}
          style={{ backgroundColor: 'rgba(52, 52, 52, 0.1)', color: '#d1d0cf' }}
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
