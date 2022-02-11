import React, { ChangeEvent, FC } from 'react';
import { CloseButton, Form, Button, Modal } from 'react-bootstrap';
import { useDispatch, useState } from 'hooks/hooks';
import { ICompany } from 'common/interfaces/company/company';
import { companyActions } from 'store/company/actions';

import './styles.scss';

interface IAddCompany {
  show: boolean;
  company?: ICompany;
  handleClose: () => void;
}

const AddEditCompany: FC<IAddCompany> = ({ show, handleClose, company }) => {
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

  const send = (): void => {
    let newCompany = {};
    if (company) newCompany = { ...company };

    if (!name || !description) {
      alert('Youhave empty field!!!');
      return;
    }

    newCompany = { ...newCompany, ...{ description, name } };

    if (company) {
      dispatch(companyActions.edit_companyAsync(newCompany as ICompany));
      return;
    }
    dispatch(companyActions.add_companyAsync(newCompany as ICompany));
  };

  return (
    <Modal show={show} onHide={handleClose} centered={true}>
      <Modal.Header className="d-flex justify-content-between align-items-center">
        <Modal.Title>
          {company ? 'Edit company' : 'Create new company'}
        </Modal.Title>
        <CloseButton onClick={handleClose} />
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="CompanyName">
          <Form.Label>Company name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Company name"
            onChange={onChange}
            name="name"
            value={name}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="comapnyDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Description"
            onChange={onChange}
            name="description"
            value={description}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button className="mg-0" variant="gu-pink" type="submit" onClick={send}>
          {company ? 'Edit' : 'Save'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditCompany;
