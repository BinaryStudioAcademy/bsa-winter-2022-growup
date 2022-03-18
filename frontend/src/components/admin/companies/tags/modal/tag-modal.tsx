import { FormEvent, useCallback } from 'react';
import { useAppDispatch, useAppSelector, useTagList } from 'hooks/hooks';
import { tagsActions } from 'store/actions';
import { Button, Modal } from 'components/common/common';
import { ITag } from 'common/interfaces/tag/tag';

import TagForm from './form';
import TagList from './tag-list';

type Props = {
  show: boolean;
  onClose: () => void;
};

const TagModal: React.FC<Props> = ({ show, onClose }) => {
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
      <TagList tagList={tags} onDelete={deleteTag} />

      <Button
        props={'btn-outline-gu-purple btn-hover-gu-white fw-bold fs-5 border-2'}
        onSubmit={clickHandler}
      >
        Save
      </Button>
    </Modal>
  );
};

export default TagModal;
