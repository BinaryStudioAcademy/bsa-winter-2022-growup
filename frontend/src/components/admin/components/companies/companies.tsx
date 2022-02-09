import { memo } from 'react';
import { Col } from 'react-bootstrap';

import Company from './company';
import Tags from './tags/tags';

const Companies: React.FC = () => {
  return (
    <>
      <Col sm={8} lg={8} md={8}>
        <Company companyList={[]} />
      </Col>
      <Col sm={4} lg={4} md={4}>
        <Tags tagList={[]} />
      </Col>
    </>
  );
};

export default memo(Companies);
