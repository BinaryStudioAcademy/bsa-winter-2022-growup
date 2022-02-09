import React, { FC } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import './styles.scss';

const NotFound: FC = () => {
  const navigate = useNavigate();

  const onClick = (): void => navigate('/');

  return (
    <Card>
      <Card.Body>
        <Card.Title>404</Card.Title>
        <Card.Text className="h1">Page not found.</Card.Text>
        <Card.Text className="h2">
          The page you are looking for might have been removed.
        </Card.Text>
        <Button variant="primary" onClick={onClick}>
          Return to website
        </Button>
      </Card.Body>
    </Card>
  );
};

export { NotFound };
