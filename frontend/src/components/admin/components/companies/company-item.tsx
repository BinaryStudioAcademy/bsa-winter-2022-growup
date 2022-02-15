import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import type { ICompany } from 'common/interfaces/company/company';
import CompanyCard from './company-card';
import AddEditCompany from './addedit-company';

type PropTypes = {
  companyList: ICompany[];
};

const Company: React.FC<PropTypes> = ({ companyList }) => {
  const [show, setShow] = useState(false);

  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

  return (
    <>
      <Card className="growup-card-primary">
        <Card.Header className="d-flex justify-content-end growup-card-header">
          <button
            className="btn btn-outline-gu-white btn-hover-gu-purple border-2 fs-5 fw-bold"
            onClick={handleShow}
          >
            + Add Company
          </button>
        </Card.Header>
        <Card.Body>
          {companyList.length ? (
            companyList.map((company) => (
              <CompanyCard company={company} key={company.id} />
            ))
          ) : (
            <p className="m-0 text-center">No companies here...</p>
          )}
        </Card.Body>
      </Card>
      <AddEditCompany show={show} handleClose={handleClose} />
    </>
  );
};

export default Company;
