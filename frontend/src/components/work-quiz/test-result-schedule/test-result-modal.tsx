import { Modal } from 'react-bootstrap';
interface Props {
  show: boolean;
  handleClose: () => void;
  description: string;
  typeTitle: string;
}
const TestResultModal = ({
  show,
  handleClose,
  description,
  typeTitle,
}: Props): JSX.Element => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className="bg-gu-blue">
        <Modal.Title className="text-gu-white">{typeTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{description}</Modal.Body>
    </Modal>
  );
};

export default TestResultModal;
