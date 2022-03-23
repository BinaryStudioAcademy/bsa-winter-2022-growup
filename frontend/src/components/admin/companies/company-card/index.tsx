import React, { FC, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Button } from 'components/common/common';
import { ICompany } from 'common/interfaces/company/company';
import AddEditCompany from '../addedit-company';

import './styles.scss';

interface Props {
  company: ICompany;
}

const CompanyCard: FC<Props> = ({ company }) => {
  const [show, setShow] = useState(false);

  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

  return (
    <>
      <Card className="growup-card-secondary company_card mb-2">
        <Card.Body className="d-flex flex-column">
          <div className="card_header">
            <div className="card_header_left">
              <Card.Img src="holder.js/100px180" alt={company.name} />
              <Card.Title className="fs-1">{company.name}</Card.Title>
            </div>
            <Button onClick={handleShow}>edit</Button>
          </div>
          <Card.Text className="mt-2">{company.description}</Card.Text>
        </Card.Body>
      </Card>
      <AddEditCompany show={show} handleClose={handleClose} company={company} />
    </>
  );
};

export default CompanyCard;
