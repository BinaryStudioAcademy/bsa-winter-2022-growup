import { memo } from 'react';
import { Card, OverlayTrigger } from 'react-bootstrap';

import { useAppSelector, useEffect } from 'hooks/hooks';
import { useState, useCallback, useAppDispatch } from 'hooks/hooks';

import type { ITag } from 'common/interfaces/tag/tag';

import { adminActions } from 'store/actions';

import Tag from './tag-item/tag-item';
import TagModal from './modal/tag-modal';
import { Button } from 'components/common/common';
import { tooltip } from 'components/admin/common';

type Props = {
  tagList: ITag[];
};

const Tags: React.FC<Props> = ({ tagList }) => {
  const { user } = useAppSelector((state) => state.auth);

  const [isDisabled, setIsDisabled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user && !user.company) {
      setIsDisabled(true);
    }
  }, [user]);

  const hideModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const showModal = (): void => setIsModalVisible(true);
  const deleteTag = useCallback((id: ITag['id']) => {
    dispatch(adminActions.deleteTag(id));
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
              <OverlayTrigger overlay={tooltip(isDisabled)}>
                <span className="d-inline-block">
                  <Button
                    variant="outline-gu-pink"
                    className="btn-responsive btn-hover-gu-white"
                    onClick={showModal}
                    disabled={isDisabled}
                  >
                    + Add Tag
                  </Button>
                </span>
              </OverlayTrigger>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <div className="d-flex flex-wrap gap-2">
            {tagList.length ? (
              tagList.map((tag) => (
                <Tag key={tag.id} tag={tag} onDelete={deleteTag} />
              ))
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
