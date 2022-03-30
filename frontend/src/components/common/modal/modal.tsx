import { Modal as ModalWindow } from 'react-bootstrap';
import { Button } from '../common';
import './styles.scss';

type Props = {
  show: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  buttonText?: string;
  onSubmit?: () => void;
  footer?: boolean;
};

const Modal: React.FC<Props> = ({
  show,
  onClose,
  title,
  children,
  className,
  buttonText,
  onSubmit,
  footer = false,
}) => {
  return (
    <ModalWindow show={show} onHide={onClose} centered>
      <ModalWindow.Header closeButton className="fw-bold fs-3">
        {title}
      </ModalWindow.Header>
      <ModalWindow.Body className={className}>{children}</ModalWindow.Body>
      {footer && (
        <ModalWindow.Footer className="w-100 bg-gu-white justify-content-start fw-bold fs-3">
          <Button
            variant="gu-pink"
            className="text-gu-white"
            onClick={onSubmit}
          >
            {buttonText || 'Save'}
          </Button>
        </ModalWindow.Footer>
      )}
    </ModalWindow>
  );
};

export default Modal;
