import React, { FC } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import './notFoundStyle.scss';

const NotFound: FC = () => {
  const navigate = useNavigate();

  const onClick = (): void => navigate('/');

  return (
    <div className="not_found">
      <div className="not_found_main">
        <div className="not_found_404">
          <h1>404</h1>
        </div>
        <p className="h1">Page not found.</p>
        <p className="h2">
          The page you are looking for might have been removed.
        </p>
        <Button variant="primary" onClick={onClick}>
          Return to website
        </Button>
      </div>
    </div>
  );
};

export { NotFound };
