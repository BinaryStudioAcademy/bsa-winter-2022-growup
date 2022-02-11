import { memo } from 'react';
import { Card } from 'react-bootstrap';

const CareerPath: React.FC = () => (
  <div className="col">
    <Card className="growup-card-primary">
      <Card.Header className="d-flex justify-content-end growup-card-header">
        <button className="btn btn-outline-gu-white btn-hover-gu-purple fw-bold fs-5 border-2">
          + Add Career Path
        </button>
      </Card.Header>
      <Card.Body>
        <p className="m-0 text-center">No career path here...</p>
      </Card.Body>
    </Card>
  </div>
);

export default memo(CareerPath);
