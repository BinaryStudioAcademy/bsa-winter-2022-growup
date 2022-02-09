import { memo } from 'react';
import { Card, Button, Col } from 'react-bootstrap';

const CareerPath: React.FC = () => (
  <Col sm={12} md={12} lg={12}>
    <Card className="growup-card-primary">
      <Card.Header className="d-flex justify-content-end growup-card-header">
        <Button variant="growup-outline-white">+ Add Career Path</Button>
      </Card.Header>
      <Card.Body>
        <p className="m-0 text-center">No career path here...</p>
      </Card.Body>
    </Card>
  </Col>
);

export default memo(CareerPath);
