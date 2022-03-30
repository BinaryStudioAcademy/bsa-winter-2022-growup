import { Form } from 'react-bootstrap';

import { useAppDispatch, useState, useAppForm } from 'hooks/hooks';
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
  const [file, setFile] = useState<Blob>();
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { control, errors, handleSubmit } = useAppForm<CompanyForm>({
    defaultValues: {
      name: company?.name || '',
      description: company?.description || '',
    },
    validationSchema: companyValidationSchema,
  });

  const dispatch = useAppDispatch();

  const send = (values: CompanyForm): void => {
    setIsLoading(true);

    dispatch(
      company
        ? companyActions.edit_companyAsync({ ...company, ...values })
        : companyActions.add_companyAsync(values),
    )
      .unwrap()
      .then(() => {
        if (file) {
          dispatch(companyActions.update_companyAvatarAsync(file)).finally(
            () => {
              setIsLoading(false);
              handleClose();
            },
          );
        }
      })
      .finally(() => {
        if (!file) {
          setIsLoading(false);
          handleClose();
        }
      });
  };

  return (
    <Modal
      show={true}
      onClose={handleClose}
      closeButton={true}
      title={company ? 'Edit company' : 'Add company info'}
      className="d-flex flex-column gap-3"
    >
      <EditAvatar
        setFile={setFile}
        company={company}
        setDisable={setIsDisabled}
      />
      <Form onSubmit={handleSubmit(send)} className="d-flex flex-column">
        <TextField
          label="Company name"
          name="name"
          control={control}
          errors={errors}
          disabled={isDisabled}
        />

        <TextField
          label="Company description"
          name="description"
          control={control}
          errors={errors}
          disabled={isDisabled}
          textarea
        />

        <Button
          variant="outline-gu-purple"
          className="btn-hover-gu-white flex-fill"
          type="submit"
          disabled={isLoading || isDisabled}
        >
          {isLoading ? 'Loading...' : 'Save'}
        </Button>
      </Form>
    </Modal>
  );
};

export default AddEditCompany;
