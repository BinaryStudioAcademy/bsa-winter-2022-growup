import React, { ChangeEvent, FC } from 'react';
import { Form, Modal, Card } from 'react-bootstrap';
import { Button } from 'components/common/common';
import { useDispatch, useState } from 'hooks/hooks';
import { ICompany } from 'common/interfaces/company/company';
import { companyActions } from 'store/company/actions';

import './styles.scss';

interface Props {
  show: boolean;
  company?: ICompany;
  handleClose: () => void;
}

const AddEditCompany: FC<Props> = ({ show, handleClose, company }) => {
  const [name, setName] = useState<string>(company ? company.name : '');
  const [description, setDescription] = useState<string>(
    company?.description ? company.description : '',
  );

  const dispatch = useDispatch();

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;
    if (name === 'name') setName(value);
    if (name === 'description') setDescription(value);
  };

  const onCloseCancel = (): void => {
    setName('');
    setDescription('');
    handleClose();
  };

  const send = (): void => {
    let newCompany = {};
    if (company) newCompany = { ...company };

    if (!name || !description) {
      alert('You have empty field!!!');
      return;
    }

    newCompany = { ...newCompany, ...{ description, name } };

    const data = {
      newCompany: newCompany as ICompany,
      handleClose,
    };

    if (company) {
      dispatch(companyActions.edit_companyAsync(data));
      return;
    }
    dispatch(companyActions.add_companyAsync(data));
  };

  return (
    <Modal show={show} onHide={onCloseCancel} centered={true}>
      <Modal.Header className="d-flex justify-content-between align-items-center">
        <Modal.Title>
          {company ? 'Edit company' : 'Add company info'}
        </Modal.Title>
      </Modal.Header>
      <Card.Img
        className="modal-company-image"
        variant="top"
        src="holder.js/100px180"
        alt={company?.name}
      />
      <Modal.Body>
        <Form.Group className="mb-3" controlId="CompanyName">
          <Form.Label>Company name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            onChange={onChange}
            name="name"
            value={name}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="companyDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Description"
            onChange={onChange}
            name="description"
            value={description}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer className="border-0 justify-content-between">
        <Button className={'btn gu-blue mg-0'} onClick={send}>
          {company ? 'Edit' : 'Save'}
        </Button>
        <Button className={'btn gu-pink mg-0'} onClick={onCloseCancel}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditCompany;
