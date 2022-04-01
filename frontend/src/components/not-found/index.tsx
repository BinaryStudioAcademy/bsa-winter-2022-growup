import { Button } from 'components/common/common';
import React, { FC } from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import './styles.scss';

const NotFound: FC = () => {
  const navigate = useNavigate();

  const onClick = (): void => navigate('/');

  return (
    <Card className="w-100 d-flex align-items-center not_found">
      <Card.Body className="d-flex flex-column align-items-center justify-content-center">
        <Card.Title className="text-center gu-black">404</Card.Title>
        <Card.Text className="mb-2 text-center mt-0 fs-1">
          Page not found.
        </Card.Text>
        <Card.Text className="mb-2 mt-1 text-center fs-3">
          The page you are looking for might have been removed.
        </Card.Text>
        <Button className="text-gu-white mt-3 border-0" onClick={onClick}>
          Return to website
        </Button>
      </Card.Body>
    </Card>
  );
};

export { NotFound };
