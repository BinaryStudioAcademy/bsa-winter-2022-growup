import { Form } from 'react-bootstrap';
import { useAppForm, useAppSelector } from 'hooks/hooks';
import { FormInputDate, Modal, TextField } from 'components/common/common';
import { opportunity as opportunityValidationSchema } from 'validation-schemas/validation-schemas';
import { DEFAULT_OPPORTUNITY_PAYLOAD } from './common/constants';
import { OpportunityPayloadKey } from '../../common/enums/enums';
import Multiselect from 'multiselect-react-dropdown';
import { RootState } from 'common/types/types';
import './styles.scss';
import { Types } from './common/enums';

type Props = {
  onClose: () => void;
  onSubmit: (values: object) => void;
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  setType: React.Dispatch<React.SetStateAction<Types>>;
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
        <Form.Select
          aria-label="Select Type"
          className="mb-3 select-type cursor-pointer py-2"
        >
          <option
            className="select-type__item cursor-pointer"
            value={Types.PROGRAMMING}
            onClick={(): void => {
              props.setType(Types.PROGRAMMING);
            }}
          >
            {Types.PROGRAMMING}
          </option>
          <option
            className="select-type__item cursor-pointer"
            value={Types.LEARNING}
            onClick={(): void => {
              props.setType(Types.PROGRAMMING);
            }}
          >
            {Types.LEARNING}
          </option>
          <option
            className="select-type__item cursor-pointer"
            value={Types.BUSINESS}
            onClick={(): void => {
              props.setType(Types.PROGRAMMING);
            }}
          >
            {Types.BUSINESS}
          </option>
        </Form.Select>

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
