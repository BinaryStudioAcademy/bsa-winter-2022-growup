import React, { FC } from 'react';
import { Card } from 'react-bootstrap';
import { ICompany } from 'common/interfaces/company/company';

import './styles.scss';

interface Props {
  company: ICompany;
}

const CompanyCard: FC<Props> = ({ company }) => {
  const { avatar } = company;

  return (
    <>
      <Card className="growup-card-secondary company_card mb-2">
        <Card.Body className="d-flex flex-column">
          <div className="card_header">
            <div className="card_header_left">
              <Card.Img
                src={avatar ? avatar : 'holder.js/100px180'}
                alt={company.name}
              />
              <Card.Title className="fs-1">{company.name}</Card.Title>
            </div>
          </div>
          <Card.Text className="mt-2">{company.description}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default CompanyCard;
