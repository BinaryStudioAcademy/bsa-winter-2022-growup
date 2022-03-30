import React, { FC } from 'react';
import { Card } from 'react-bootstrap';
import { ICompany } from 'common/interfaces/company/company';

import Holder from 'assets/img/holder.jpg';

interface Props {
  company: ICompany;
}

const CompanyCard: FC<Props> = ({ company }) => {
  const { avatar } = company;

  return (
    <>
      <Card className="growup-card-secondary mb-2">
        <Card.Body className="d-flex flex-column">
          <div className="d-flex align-items-center gap-2">
            <Card.Img
              src={avatar || Holder}
              alt={company.name}
              style={{ width: '50px', height: '50px' }}
            />
            <Card.Title className="fs-1 m-0">{company.name}</Card.Title>
          </div>
          <Card.Text className="mt-2">{company.description}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default CompanyCard;
