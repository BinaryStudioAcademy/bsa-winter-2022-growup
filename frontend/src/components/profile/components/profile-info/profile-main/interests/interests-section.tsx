import { useState, useCallback, useEffect } from 'hooks/hooks';
import TagModal from '../tags/modal/tag-modal';
import { PencilFill } from 'react-bootstrap-icons';
import { tagsActions } from 'store/actions';
import { useAppDispatch } from 'hooks/store/store.hooks';
import Tag from '../tags/common/tag';
import type { ITag } from 'common/interfaces/tag/tag';

type PropTypes = {
  tagList: ITag[];
};

const Interests: React.FC<PropTypes> = ({ tagList }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useAppDispatch();

  const hideModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const showModal = (): void => setIsModalVisible(true);

  useEffect(() => {
    dispatch(tagsActions.fetchTags());
  }, [dispatch]);

  const deleteTag = useCallback((id: ITag['id']) => {
    dispatch(tagsActions.deleteTag(id));
  }, []);

  return (
    <>
      <TagModal show={isModalVisible} onClose={hideModal} />
      <div className="edit-section bg-white">
        <div className="edit-section-header d-flex justify-content-between align-items-center">
          <h3 className="edit-section-header__title m-0 fw-bold fs-4">
            Interests
          </h3>
          <button
            className="edit-section-header__edit fw-bold bg-transparent d-flex align-items-center fs-5"
            onClick={showModal}
          >
            <PencilFill className="edit-section-header__edit-icon me-2" />
            <span>Edit</span>
          </button>
        </div>
        <div className="edit-section-content d-flex flex-wrap align-items-start">
          {tagList.length ? (
            tagList.map((tag) => (
              <Tag key={tag.id} tag={tag} onDelete={deleteTag} />
            ))
          ) : (
            <p className="m-0 text-center">No tags here...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Interests;
