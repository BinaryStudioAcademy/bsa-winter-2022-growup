import { Form } from 'react-bootstrap';
import { useAppDispatch, useCallback, useState } from 'hooks/hooks';
import { NotificationManager } from 'react-notifications';

import { Modal } from 'components/common/common';
import { profileActions } from 'store/profile';

import ImageCrop from './image-crop';

type Props = {
  show: boolean;
  onClose: () => void;
  title: string;
};

const EditAvatar: React.FC<Props> = (props) => {
  const [error, setError] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const dispatch = useAppDispatch();

  const closeModal = useCallback(() => {
    setError('');
    props.onClose();
  }, []);

  const submitHandler = useCallback((file: Blob): void => {
    setImageLoading(true);
    dispatch(profileActions.updateAvatar(file))
      .unwrap()
      .then(() => {
        setImageLoading(false);
        closeModal();
      })
      .catch((error) => {
        NotificationManager.error(error.message);
      });
  }, []);

  return (
    <Modal
      show={props.show}
      title={props.title}
      onClose={closeModal}
      footer={false}
    >
      <Form className="d-flex flex-column gap-4">
        <ImageCrop
          setError={setError}
          onSave={submitHandler}
          isLoading={imageLoading}
        />

        {!!error.length && <div className="alert alert-danger">{error}</div>}
      </Form>
    </Modal>
  );
};

export default EditAvatar;
