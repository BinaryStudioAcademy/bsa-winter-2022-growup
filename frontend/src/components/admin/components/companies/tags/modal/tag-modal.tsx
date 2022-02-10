import { Modal } from 'components/common/common';

import TagForm from './form';

type PropTypes = {
  show: boolean;
  onClose: () => void;
};

const TagModal: React.FC<PropTypes> = ({ show, onClose }) => {
  return (
    <Modal show={show} onClose={onClose} title="Add Tags">
      <TagForm />
    </Modal>
  );
};

export default TagModal;
