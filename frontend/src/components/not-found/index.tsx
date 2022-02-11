import React, { FC } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import './styles.scss';

const NotFound: FC = () => {
  const navigate = useNavigate();

  const onClick = (): void => navigate('/');

  return (
    <Card className="w-100 d-flex align-items-center ">
      <Card.Body className="d-flex flex-column align-items-center justify-content-center">
        <Card.Title className="text-center gu-black">404</Card.Title>
        <Card.Text className="mb-2 text-center mt-0 fs-1">
          Page not found.
        </Card.Text>
        <Card.Text className="mb-2 mt-1 text-center fs-3">
          The page you are looking for might have been removed.
        </Card.Text>
        <Button className="mt-3" variant="primary" onClick={onClick}>
          Return to website
        </Button>
      </Card.Body>
    </Card>
  );
};

export { NotFound };
