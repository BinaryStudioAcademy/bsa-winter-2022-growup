import { FormEvent, useCallback } from 'react';
import { useAppDispatch, useTagList } from 'hooks/hooks';
import { tagsActions } from 'store/actions';
import { Button, Modal } from 'components/common/common';
import TagForm from './form';
import TagList from './tag-list';

type PropTypes = {
  show: boolean;
  onClose: () => void;
};

const TagModal: React.FC<PropTypes> = ({ show, onClose }) => {
  const { list: tagList, addItem, deleteItem, clearItems } = useTagList();
  const dispatch = useAppDispatch();

  const clickHandler = useCallback(
    (e: FormEvent): void => {
      e.preventDefault();
      onClose();
      dispatch(tagsActions.createTags(tagList));
      clearItems();
    },
    [tagList, onClose, clearItems, dispatch],
  );

  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Add Tags"
      closeButton={true}
      className="d-flex flex-column gap-4"
    >
      <TagForm onSubmit={addItem} />
      {tagList && <TagList tagList={tagList} onDelete={deleteItem} />}
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
