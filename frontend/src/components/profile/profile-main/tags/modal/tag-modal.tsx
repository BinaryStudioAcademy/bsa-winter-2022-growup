import { FormEvent, useCallback } from 'react';
import { useAppDispatch, useTagList } from 'hooks/hooks';
import { tagsActions } from 'store/actions';
import { Button, Modal } from 'components/common/common';
import TagForm from './form';
import TagList from './tag-list';
import Multiselect from 'multiselect-react-dropdown';
import { ITag } from 'common/interfaces/tag/tag';

type PropTypes = {
  show: boolean;
  onClose: () => void;
  otherTags: ITag[];
  setConnectedTags:
    | React.Dispatch<React.SetStateAction<string[]>>
    | React.Dispatch<React.SetStateAction<never[]>>;
  connect: () => void;
};

const TagModal: React.FC<PropTypes> = ({
  show,
  onClose,
  otherTags,
  setConnectedTags,
  connect,
}) => {
  const { list: tagList, addItem, deleteItem, clearItems } = useTagList();
  const dispatch = useAppDispatch();
  const tagsName = otherTags.map((tag) => tag.name);

  const clickHandler = useCallback(
    (e: FormEvent): void => {
      e.preventDefault();
      onClose();
      dispatch(tagsActions.createTags(tagList));
      clearItems();
      connect();
    },
    [tagList, onClose, clearItems, dispatch, connect],
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
      <Multiselect
        className={'mb-3 multi-select'}
        isObject={false}
        placeholder={'Select tags'}
        onRemove={(e): void => setConnectedTags(e)}
        onSelect={(e): void => setConnectedTags(e)}
        options={[...tagsName]}
        style={{ backgroundColor: 'rgba(52, 52, 52, 0.1)', color: '#d1d0cf' }}
      />
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
