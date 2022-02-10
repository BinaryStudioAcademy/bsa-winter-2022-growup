import { useState, useCallback } from 'react';

import { ITag } from 'common/interfaces/tag/tag';
import { Modal } from 'components/common/common';

import TagForm from './form';
import TagList from './tag-list';

type PropTypes = {
  show: boolean;
  onClose: () => void;
};

const TagModal: React.FC<PropTypes> = ({ show, onClose }) => {
  const [tagList, setTagList] = useState<ITag[]>([
    {
      id: '1',
      name: 'Hey',
    },
    {
      id: '2',
      name: 'Hey t',
    },
    {
      id: '3',
      name: 'Hey the',
    },
    {
      id: '4',
      name: 'Hey there',
    },
    {
      id: '5',
      name: 'Hey there m',
    },
    {
      id: '6',
      name: 'Hey there my ',
    },
    {
      id: '7',
      name: 'Hey there my de',
    },
    {
      id: '8',
      name: 'Hey there my dear',
    },
  ]);

  const deleteItem = useCallback(
    (id: ITag['id']) =>
      setTagList((state) => state.filter((tag) => tag.id !== id)),
    [],
  );

  const addItem = useCallback(
    (tag: ITag) => setTagList((state) => [...state, tag]),
    [],
  );

  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Add Tags"
      className="d-flex flex-column gap-4"
    >
      <TagForm onSubmit={addItem} />
      <TagList tagList={tagList} onDelete={deleteItem} />

      <button className="btn btn-outline-gu-purple btn-hover-gu-white fw-bold fs-5 border-2">
        Save
      </button>
    </Modal>
  );
};

export default TagModal;
