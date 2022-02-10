import React, { FC } from 'react';
import { CloseButton, Form, Button, Modal } from 'react-bootstrap';

import './styles.scss';

interface IAddCompany {
  show: boolean;
  handleClose: () => void;
}

const AddCompany: FC<IAddCompany> = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered={true}>
      <Modal.Header>
        <Modal.Title>Create new company</Modal.Title>
        <CloseButton onClick={handleClose} />
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Company name</Form.Label>
          <Form.Control type="text" placeholder="Company name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder="Description" />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="gu-pink" type="submit">
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCompany;
