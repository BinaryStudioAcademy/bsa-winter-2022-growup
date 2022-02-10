import { Modal as ModalWindow } from 'react-bootstrap';

type PropTypes = {
  show: boolean;
  onClose: () => void;

  title: string;
};

const Modal: React.FC<PropTypes> = ({ show, onClose, title, children }) => {
  return (
    <ModalWindow show={show} onHide={onClose}>
      <ModalWindow.Header closeButton>{title}</ModalWindow.Header>
      <ModalWindow.Body>{children}</ModalWindow.Body>
    </ModalWindow>
  );
};

export default Modal;
