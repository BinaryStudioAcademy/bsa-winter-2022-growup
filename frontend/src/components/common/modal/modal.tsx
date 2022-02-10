import { Modal as ModalWindow } from 'react-bootstrap';

type PropTypes = {
  show: boolean;
  onClose: () => void;

  title: string;
  className?: string;
};

const Modal: React.FC<PropTypes> = ({
  show,
  onClose,
  title,
  children,
  className,
}) => {
  return (
    <ModalWindow show={show} onHide={onClose}>
      <ModalWindow.Header closeButton className="fw-bold fs-4">
        {title}
      </ModalWindow.Header>
      <ModalWindow.Body className={className}>{children}</ModalWindow.Body>
    </ModalWindow>
  );
};

export default Modal;
