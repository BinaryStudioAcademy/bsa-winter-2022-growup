import { memo } from 'react';
import { Row, Col } from 'react-bootstrap';

type PropTypes = {
  tagName: string;
};

const Tag: React.FC<PropTypes> = ({ tagName }) => {
  return (
    <Row>
      <Col>{tagName}</Col>
    </Row>
  );
};

export default memo(Tag);
