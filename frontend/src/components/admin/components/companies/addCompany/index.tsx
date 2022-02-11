import React, { ChangeEvent, FC, useState } from 'react';
import { CloseButton, Form, Button, Modal } from 'react-bootstrap';
import { ICompany } from 'common/interfaces/company/company';
import { companyApi } from 'services/company-api';

import './styles.scss';

interface IAddCompany {
  show: boolean;
  handleClose: () => void;
}

const AddCompany: FC<IAddCompany> = ({ show, handleClose }) => {
  const [company, setCompany] = useState<ICompany | unknown>({});

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;
    const newCompany = Object.assign(company, { [name]: value });
    setCompany(newCompany);
  };

  const send = (): void => {
    const arr = Object.entries(company as ICompany);
    const index = arr.findIndex((val: [string, string]) => val[1] === '');

    if (index === -1) {
      companyApi.addCompany(company as ICompany);
      return;
    }

    alert('Field ' + arr[index] + ' is empty!!!');
  };

  return (
    <Modal show={show} onHide={handleClose} centered={true}>
      <Modal.Header className="d-flex justify-content-between align-items-center">
        <Modal.Title>Create new company</Modal.Title>
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
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="comapnyDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Description"
            onChange={onChange}
            name="description"
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button className="mg-0" variant="gu-pink" type="submit" onClick={send}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCompany;
