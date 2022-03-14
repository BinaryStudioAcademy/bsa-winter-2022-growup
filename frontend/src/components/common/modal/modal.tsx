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
        <ModalWindow.Footer className="fw-bold fs-3 w-100">
          <Button themeType="btn-secondary" text="Close" onSubmit={onClose} />
          <Button
            themeType="btn-gu-pink text-gu-white"
            text={buttonText || 'Save'}
            onSubmit={onSubmit}
          />
        </ModalWindow.Footer>
      )}
    </ModalWindow>
  );
};

export default Modal;
