import { memo } from 'react';
import { Modal } from 'components/common/common';
import UserForm from './user-form';

type PropTypes = {
  show: boolean;
  onClose: () => void;
};

const UserModal: React.FC<PropTypes> = memo(({ show, onClose }) => {
  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Add Tags"
      className="d-flex flex-column gap-4"
    >
      <UserForm onSubmit={onClose} />
    </Modal>
  );
});

export default UserModal;
