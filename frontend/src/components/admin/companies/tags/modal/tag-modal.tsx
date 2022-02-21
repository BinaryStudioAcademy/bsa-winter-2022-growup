import { FormEvent } from 'react';

import { NotificationManager } from 'react-notifications';
import { useAppDispatch, useTagList } from 'hooks/hooks';
import { adminActions } from 'store/actions';

import { Modal } from 'components/common/common';

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
    dispatch(adminActions.createTags(tagList))
      .unwrap()
      .then((result) => {
        NotificationManager.error(
          `Tags already exist ${result?.existingTags.join(', ')}`,
        );
      });
  };

  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Add Tags"
      className="d-flex flex-column gap-4"
    >
      <TagForm onSubmit={addItem} />
      <TagList tagList={tagList} onDelete={deleteItem} />

      <button
        className="btn btn-outline-gu-purple btn-hover-gu-white fw-bold fs-5 border-2"
        onClick={clickHandler}
      >
        Save
      </button>
    </Modal>
  );
};

export default TagModal;
