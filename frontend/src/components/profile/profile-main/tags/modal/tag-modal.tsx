import { FormEvent, useCallback } from 'react';
import { useAppDispatch, useAppSelector, useTagList } from 'hooks/hooks';
import { tagsActions } from 'store/actions';
import { Button, Modal } from 'components/common/common';
import TagForm from './form';
import TagList from './tag-list';
import InterestsTagList from './interests-tag-list';
import { ITag } from 'common/interfaces/tag/tag';

type PropTypes = {
  show: boolean;
  onClose: () => void;
};

const TagModal: React.FC<PropTypes> = ({ show, onClose }) => {
  const { tags } = useAppSelector((state) => state.tags);
  const { list: tagList, addItem, deleteItem, clearItems } = useTagList();
  const dispatch = useAppDispatch();
  const clickHandler = (e: FormEvent): void => {
    e.preventDefault();
    onClose();
    clearItems();
    dispatch(tagsActions.createTags(tagList));
  };

  const deleteTag = useCallback((id: ITag['id']) => {
    dispatch(tagsActions.deleteTag(id));
  }, []);

  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Add Tags"
      className="d-flex flex-column gap-4"
    >
      <TagForm onSubmit={addItem} />
      <TagList tagList={tagList} onDelete={deleteItem} />
      <InterestsTagList tagList={tags} onDelete={deleteTag} />
      <Button
        variant="outline-gu-purple"
        className="btn-hover-gu-white"
        onClick={clickHandler}
      >
        Save
      </Button>
    </Modal>
  );
};

export default TagModal;
