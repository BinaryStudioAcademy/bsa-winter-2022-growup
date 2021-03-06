import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

import { useAppSelector } from 'hooks/hooks';
import CompanyCard from './company-card';
import AddEditCompany from './addedit-company';
import { Button } from 'components/common/common';

const Company: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [show, setShow] = useState(false);

  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

  return (
    <>
      <Card className="growup-card-primary">
        <Card.Header className="d-flex justify-content-end growup-card-header">
          <Button
            variant="outline-gu-white"
            className="btn-hover-gu-purple"
            onClick={handleShow}
          >
            {user && user.company ? 'Edit Company' : '+ Add Company'}
          </Button>
        </Card.Header>
        <Card.Body>
          {user && user.company ? (
            <CompanyCard company={user.company} />
          ) : (
            <p className="m-0 text-center">No company here...</p>
          )}
        </Card.Body>
      </Card>
      {show && (
        <AddEditCompany company={user?.company} handleClose={handleClose} />
      )}
    </>
  );
};

export default Company;
