import { FormEvent } from 'react';
import { useAppDispatch, useTagList } from 'hooks/hooks';
import { tagsActions } from 'store/actions';
import { Button, Modal } from 'components/common/common';

import TagForm from './form';
import TagList from './tag-list';

type Props = {
  show: boolean;
  onClose: () => void;
};

const TagModal: React.FC<Props> = ({ show, onClose }) => {
  const { list: tagList, addItem, deleteItem, clearItems } = useTagList();

  const dispatch = useAppDispatch();

  const clickHandler = (e: FormEvent): void => {
    e.preventDefault();
    onClose();
    clearItems();
    dispatch(tagsActions.createTags(tagList));
  };

  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Add Tags"
      closeButton={true}
      className="d-flex flex-column gap-4"
    >
      <TagForm onSubmit={addItem} />
      {!!tagList.length && <TagList tagList={tagList} onDelete={deleteItem} />}

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
