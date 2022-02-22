import { Modal as ModalWindow } from 'react-bootstrap';
import { Button } from '../common';
import './styles.scss';

type PropTypes = {
  show: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  buttonText?: string;
  onSubmit?: () => void;
};

const Modal: React.FC<PropTypes> = ({
  show,
  onClose,
  title,
  children,
  className,
  buttonText,
  onSubmit,
}) => {
  return (
    <ModalWindow show={show} onHide={onClose} centered>
      <ModalWindow.Header closeButton className="fw-bold fs-3">
        {title}
      </ModalWindow.Header>
      <ModalWindow.Body className={className}>{children}</ModalWindow.Body>
      <ModalWindow.Footer className="fw-bold fs-3">
        <Button
          themeType={'btn-gu-pink text-gu-white'}
          text={buttonText || 'Save'}
          onSubmit={onSubmit}
        />
      </ModalWindow.Footer>
    </ModalWindow>
  );
};

export default Modal;
