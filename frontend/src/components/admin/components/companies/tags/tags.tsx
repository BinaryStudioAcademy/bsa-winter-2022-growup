import { memo } from 'react';
import { Card } from 'react-bootstrap';
import type { ITag } from 'common/interfaces/tag/tag';

import Tag from './tag';

type PropTypes = {
  tagList: ITag[];
};

const Tags: React.FC<PropTypes> = ({ tagList }) => (
  <Card className="growup-card-secondary">
    <Card.Header className="growup-card-header">
      <div className="row">
        <div className="col d-flex align-items-center">
          <h3 className="m-0">Tags</h3>
        </div>
        <div className="col d-flex align-items-center justify-content-end">
          <button className="btn btn-outline-gu-pink btn-hover-gu-white fw-bold fs-5 border-2">
            + Add Tag
          </button>
        </div>
      </div>
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
);

export default memo(Tags);
