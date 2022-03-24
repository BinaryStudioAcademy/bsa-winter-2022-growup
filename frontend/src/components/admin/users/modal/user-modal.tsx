import { memo } from 'react';
import { Modal } from 'components/common/common';
import UserForm from './user-form';

type Props = {
  show: boolean;
  onClose: () => void;
};

const UserModal: React.FC<Props> = memo(({ show, onClose }) => (
  <Modal
    show={show}
    onClose={onClose}
    title="Add User"
    className="d-flex flex-column gap-4"
  >
    <UserForm onSubmit={onClose} />
  </Modal>
));

export default UserModal;
