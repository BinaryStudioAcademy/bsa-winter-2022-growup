import { Card, Button } from 'react-bootstrap';

const CareerPath: React.FC = () => {
  return (
    <Card className="growup-card-primary">
      <Card.Header className="d-flex justify-content-end growup-card-header">
        <Button variant="growup-outline-white">+ Add Career Path</Button>
      </Card.Header>
      <Card.Body>
        <p className="m-0 text-center">No career path here...</p>
      </Card.Body>
    </Card>
  );
};

export default CareerPath;
