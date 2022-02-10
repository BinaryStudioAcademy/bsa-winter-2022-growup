import { memo, useState, useCallback } from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import type { ITag } from 'common/interfaces/tag/tag';

import Tag from './tag';
import TagModal from './modal/tag-modal';

type PropTypes = {
  tagList: ITag[];
};

const Tags: React.FC<PropTypes> = ({ tagList }) => {
  const [isModalVisible, setIsModalVisible] = useState(true);

  const hideModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  return (
    <>
      <TagModal show={isModalVisible} onClose={hideModal} />
      <Card className="growup-card-secondary">
        <Card.Header className="growup-card-header">
          <Row>
            <Col className="d-flex align-items-center">
              <h3 className="m-0">Tags</h3>
            </Col>
            <Col className="d-flex align-items-center justify-content-end">
              <Button variant="growup-outline-secondary">+ Add Tag</Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <div className="d-grid">
            {tagList.length ? (
              tagList.map((tag) => <Tag tagName={tag.name} />)
            ) : (
              <p className="m-0 text-center">No tags here...</p>
            )}
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default memo(Tags);
