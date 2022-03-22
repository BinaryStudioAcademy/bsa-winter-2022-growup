import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import type { ICompany } from 'common/interfaces/company/company';
import { useAppSelector } from 'hooks/hooks';
import CompanyCard from './company-card';
import AddEditCompany from './addedit-company';
import { Button } from 'components/common/common';

type Props = {
  companyList: ICompany[];
};

const Company: React.FC<Props> = ({ companyList }) => {
  const { user } = useAppSelector((state) => state.auth);

  const [isDisabled, setIsDisabled] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const companyId = user?.company?.id;

    if (companyId) {
      const company = companyList.filter((company) => company.id === companyId);

      if (company.length) {
        setIsDisabled(true);
      }
    }
  }, [companyList]);

  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

  return (
    <>
      <Card className="growup-card-primary">
        <Card.Header className="d-flex justify-content-end growup-card-header">
          <Button
            className="btn-outline-gu-white btn-hover-gu-purple border-2 fs-5 fw-bold"
            onSubmit={handleShow}
            disabled={isDisabled}
          >
            + Add Company
          </Button>
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
