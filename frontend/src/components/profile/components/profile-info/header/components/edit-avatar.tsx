import { FormEvent } from 'react';
import { Form } from 'react-bootstrap';
import { useAppDispatch, useState } from 'hooks/hooks';

import { Modal } from 'components/common/common';
import { profileActions } from 'store/profile';

type Props = {
  show: boolean;
  onClose: () => void;
  title: string;
};

const EditAvatar: React.FC<Props> = (props) => {
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();

  const changeHandler = (e: FormEvent): void => {
    const event = e as FormEvent<HTMLInputElement>;
    if (event.currentTarget.files) setFile(event.currentTarget.files[0]);
  };

  const submitHandler = (e: FormEvent): void => {
    e.preventDefault();

    if (file) {
      dispatch(profileActions.updateAvatar(file));
      props.onClose();
    }
  };

  return (
    <Modal {...props}>
      <Form onSubmit={submitHandler}>
        <Form.Control
          placeholder="Image"
          type="file"
          onChange={changeHandler}
        />
        <div className="d-flex">
          <button className="btn btn-outline-gu-purple flex-fill fw-bold border-2 mt-4">
            Save
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditAvatar;
