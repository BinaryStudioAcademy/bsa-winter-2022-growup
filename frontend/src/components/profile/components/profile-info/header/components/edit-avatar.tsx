import { Form } from 'react-bootstrap';
import { useAppDispatch, useCallback, useState } from 'hooks/hooks';

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
  const dispatch = useAppDispatch();

  const closeModal = useCallback(() => {
    setError('');
    props.onClose();
  }, []);

  const submitHandler = useCallback((file: Blob): void => {
    // eslint-disable-next-line
    console.log(file.size, file.size / 1024 / 1024);
    if (file.size / 1024 / 1024 > 1) {
      setError('File size can not be greater than 1mb');
      return;
    }

    dispatch(profileActions.updateAvatar(file));
    closeModal();
  }, []);

  return (
    <Modal show={props.show} title={props.title} onClose={closeModal}>
      <Form className="d-flex flex-column gap-4">
        <ImageCrop onSave={submitHandler} />

        {!!error.length && <div className="alert alert-danger">{error}</div>}
      </Form>
    </Modal>
  );
};

export default EditAvatar;
