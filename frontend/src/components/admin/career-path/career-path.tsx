import { memo } from 'react';
import { Card } from 'react-bootstrap';
import { Button } from 'components/common/common';

const CareerPath: React.FC = () => (
  <div className="col">
    <Card className="growup-card-primary">
      <Card.Header className="d-flex justify-content-end growup-card-header">
        <Button
          props={
            'btn-outline-gu-white btn-hover-gu-purple fw-bold fs-5 border-2'
          }
        >
          + Add Career Path
        </Button>
      </Card.Header>
      <Card.Body>
        <p className="m-0 text-center">No career path here...</p>
      </Card.Body>
    </Card>
  </div>
);

export default memo(CareerPath);
