import { Form } from 'react-bootstrap';

import { useDispatch, useState, useAppForm } from 'hooks/hooks';
import { companyActions } from 'store/company/actions';

import { ICompany } from 'common/interfaces/company/company';

import { Modal, Button, TextField } from 'components/common/common';
import EditAvatar from './edit-avatar';

import { company as companyValidationSchema } from 'validation-schemas/validation-schemas';

import './styles.scss';

interface Props {
  company?: ICompany;
  handleClose: () => void;
}

type CompanyForm = Pick<ICompany, 'name' | 'description'>;

const AddEditCompany: React.FC<Props> = ({ handleClose, company }) => {
  const [file, setFile] = useState<File>();

  const { control, errors, handleSubmit } = useAppForm<CompanyForm>({
    defaultValues: {
      name: company?.name || '',
      description: company?.description || '',
    },
    validationSchema: companyValidationSchema,
  });

  const dispatch = useDispatch();

  const send = (values: CompanyForm): void => {
    if (file) {
      dispatch(companyActions.update_companyAvatarAsync(file));
    }

    if (company) {
      dispatch(companyActions.edit_companyAsync({ ...company, ...values }));
      return;
    }
    dispatch(companyActions.add_companyAsync(values));
    handleClose();
  };

  return (
    <Modal
      show={true}
      onClose={handleClose}
      title={company ? 'Edit company' : 'Add company info'}
      className="d-flex flex-column gap-3"
    >
      <EditAvatar setFile={setFile} company={company} />
      <Form onSubmit={handleSubmit(send)} className="d-flex flex-column">
        <TextField
          label="Company name"
          name="name"
          control={control}
          errors={errors}
        />

        <TextField
          label="Company description"
          name="description"
          control={control}
          errors={errors}
          textarea
        />

        <Button
          variant="outline-gu-purple"
          className=" btn-hover-gu-white flex-fill"
          type="submit"
        >
          Save
        </Button>
      </Form>
    </Modal>
  );
};

export default AddEditCompany;
