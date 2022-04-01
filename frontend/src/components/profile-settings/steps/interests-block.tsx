import { Button } from 'components/common/common';
import { useCallback, useState, useEffect } from 'react';
import { Plus } from 'react-bootstrap-icons';
import './styles.scss';
import { tagsActions, skillActions } from 'store/actions';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import TagModal from 'components/profile/profile-main/tags/modal/tag-modal';

const InterestsBlock: React.FC = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const tags = useAppSelector((state) => state.profile.user?.tags);
  const userTags = useAppSelector((state) => state.tags.userTags);
  const allTags = useAppSelector((state) => state.tags.tags);
  const otherTags = allTags.filter(
    (tag) => !tags?.find((interTag) => interTag.id === tag.id),
  );
  const [connectedTags, setConnectedTags] = useState([]);
  const dispatch = useAppDispatch();

  const hideModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const showModal = (): void => setIsModalVisible(true);

  useEffect(() => {
    dispatch(tagsActions.fetchTags());
    dispatch(skillActions.fetchUserSkills());
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
        tagListed={userTags ? userTags : tags ? tags : []}
        setConnectedTags={setConnectedTags}
        connect={connect}
      />
      <div className="interests add-section bg-white mt-4">
        <div className="interests-header d-flex justify-content-between align-items-center bg-gu-blue">
          <p className="interests-header__title m-0 fw-bold fs-4 text-gu-white">
            Interests
          </p>
          <Button
            variant="outline-gu-white"
            className="interests-header__edit d-flex align-items-center position-relative btn-hover-gu-purple"
            onClick={showModal}
          >
            <Plus className="interests-header__edit-icon" />
            <span>Add Interests</span>
          </Button>
        </div>
        <div className="position-relative add-section-content">{children}</div>
      </div>
    </>
  );
};

export default InterestsBlock;
