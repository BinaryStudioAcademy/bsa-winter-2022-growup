import { memo, useState, useCallback } from 'react';
import { Card } from 'react-bootstrap';
import type { ITag } from 'common/interfaces/tag/tag';

import Tag from './common/tag';
import TagModal from './modal/tag-modal';

type PropTypes = {
  tagList: ITag[];
};

const Tags: React.FC<PropTypes> = ({ tagList }) => {
  const [isModalVisible, setIsModalVisible] = useState(true);

  const hideModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);
  const showModal = (): void => setIsModalVisible(true);

  const deleteTag = useCallback((id: ITag['id']) => {
    // eslint-disable-next-line
    console.log('I am deleted', id);
  }, []);

  return (
    <>
      <TagModal show={isModalVisible} onClose={hideModal} />
      <Card className="growup-card-secondary">
        <Card.Header className="growup-card-header">
          <div className="row">
            <div className="col d-flex align-items-center">
              <h3 className="m-0">Tags</h3>
            </div>
            <div className="col d-flex align-items-center justify-content-end">
              <button
                className="btn btn-outline-gu-pink btn-hover-gu-white fw-bold fs-5 border-2"
                onClick={showModal}
              >
                + Add Tag
              </button>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <div className="d-grid">
            {tagList.length ? (
              tagList.map((tag) => <Tag tag={tag} onDelete={deleteTag} />)
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
