import { useState, useCallback, useEffect } from 'hooks/hooks';
import TagModal from '../tags/modal/tag-modal';
import { tagsActions } from 'store/actions';
import { useAppDispatch } from 'hooks/store/store.hooks';
import Tag from '../tags/tag/tag';
import type { ITag } from 'common/interfaces/tag/tag';
import { PencilFill } from 'react-bootstrap-icons';
import { Button } from 'components/common/common';

type PropTypes = {
  tagList: ITag[];
  otherTags: ITag[];
};

const Interests: React.FC<PropTypes> = ({ tagList, otherTags }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [connectedTags, setConnectedTags] = useState([]);
  const dispatch = useAppDispatch();

  const hideModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const showModal = (): void => setIsModalVisible(true);

  useEffect(() => {
    dispatch(tagsActions.fetchTags());
  }, [dispatch]);

  function connect(): void {
    const newTags = otherTags.filter((tag) =>
      connectedTags.find((el) => el === tag.name),
    );
    dispatch(tagsActions.connectTags(newTags));
  }

  return (
    <>
      <TagModal
        show={isModalVisible}
        onClose={hideModal}
        otherTags={otherTags}
        tagListed={tagList}
        setConnectedTags={setConnectedTags}
        connect={connect}
      />
      <div className="edit-section bg-white">
        <div className="edit-section-header d-flex justify-content-between align-items-center">
          <h3 className="edit-section-header__title m-0 fw-bold fs-4">
            Interests
          </h3>
          <Button
            variant="outline-gu-pink"
            className="edit-section-header__edit d-flex align-items-center"
            onClick={showModal}
          >
            <PencilFill className="edit-section-header__edit-icon me-2" />
            <span>Edit</span>
          </Button>
        </div>
        <div className="edit-section-content d-flex flex-wrap align-items-start">
          {tagList.length ? (
            tagList.map((tag) => <Tag key={tag.id} tag={tag} />)
          ) : (
            <p className="m-0 text-center">No tags here...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Interests;
